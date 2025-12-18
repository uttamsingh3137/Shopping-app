import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Shopping.com
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </Link>

        <Link to="/wishlist">
          Wishlist
          {wishlist.length > 0 && (
            <span className="cart-badge">{wishlist.length}</span>
          )}
        </Link>

        {isAuthenticated ? (
          <>
            <span className="user-email">Hi, {user?.name}</span>

            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
