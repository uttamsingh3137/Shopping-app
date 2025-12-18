import { useLocation, useNavigate } from "react-router-dom";
import "../styles/orderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { items } = location.state || { items: [] };

  return (
    <div className="order-success-container">
      <div className="success-card">
        <div className="checkmark">✓</div>

        <h2>Order Placed Successfully</h2>
        <p className="delivery-text">
          Your order will be delivered in 2–3 days
        </p>

        <div className="ordered-items">
          {items.map((item: any) => (
            <div key={item.product.id} className="ordered-item">
              <img src={item.product.thumbnail} />
              <div>
                <p>{item.product.title}</p>
                <span>
                  Qty: {item.quantity} • ₹{" "}
                  {item.product.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
