import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/cart.css";
import "../styles/checkout.css";

const Checkout = () => {
  const { isAuthenticated } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //   if (cartItems.length === 0) {
  //     return <h2 style={{ padding: "20px" }}>Empty Cart</h2>;
  //   }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = () => {
    navigate("/order-success", {
      state: { items: cartItems },
    });
    clearCart();
  };

  if (cartItems.length === 0) {
    return <div className="empty-cart">Your cart is empty 🛒</div>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-items">
        <h2>Review Items</h2>

        {cartItems.map(({ product, quantity }) => (
          <div key={product.id} className="checkout-item">
            <img src={product.thumbnail} alt={product.title} />

            <div className="checkout-info">
              <h4>{product.title}</h4>
              <p className="checkout-price">₹ {product.price}</p>

              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  +
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>

            <strong>₹ {product.price * quantity}</strong>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Items</span>
          <span>{cartItems.length}</span>
        </div>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹ {total}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <hr />

        <div className="summary-total">Total: ₹ {total.toFixed(2)}</div>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
