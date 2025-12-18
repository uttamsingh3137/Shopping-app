import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <div className="empty-cart">Your cart is empty 🛒</div>;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.map(({ product, quantity }) => (
        <div key={product.id} className="cart-item">
          <img src={product.thumbnail} alt={product.title} />

          <div className="cart-info">
            <h4>{product.title}</h4>
            <p className="cart-price">₹ {product.price}</p>

            <div className="cart-qty">
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

      <div className="cart-summary">
        <span className="cart-total">Total: ₹ {total}</span>
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
