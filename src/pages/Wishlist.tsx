import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "../styles/wishlist.css";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty </h2>
        <p>Add products you love to see them here.</p>
        <button onClick={() => navigate("/")}>Browse Products</button>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      <div className="wishlist-grid">
        {wishlist.map(({ product }) => (
          <div key={product.id} className="wishlist-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              onClick={() => navigate(`/product/${product.id}`)}
            />

            <h4>{product.title}</h4>
            <p className="wishlist-price">₹ {product.price}</p>

            <div className="wishlist-actions">
              <button
                className="view-btn"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View
              </button>

              <button
                className="remove-btn"
                onClick={() => toggleWishlist(product)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
