import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import "../styles/products.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="container">Loading product...</p>;
  }

  if (!product) {
    return <p className="container">Product not found</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    addToCart(product);

    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="container">
      <div className="product-details">
        <div className="product-image-wrapper">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>

          <h3>₹ {product.price}</h3>

          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`btn-cart ${added ? "btn-success" : ""}`}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>

            <button onClick={handleBuyNow} className="btn-buy">
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              style={{
                padding: "10px 14px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: isInWishlist(product.id) ? "#fee2e2" : "#fff",
                color: "#ef4444",
                cursor: "pointer",
              }}
            >
              {isInWishlist(product.id) ? "♥ Wishlisted" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
