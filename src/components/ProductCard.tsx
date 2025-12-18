import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import "../styles/products.css";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-thumb"
        />
      </Link>

      <Link to={`/product/${product.id}`} className="product-link">
        <h4>{product.title}</h4>
      </Link>

      <p className="price">₹ {product.price}</p>

      <Link to={`/product/${product.id}`} className="details-link">
        View Details →
      </Link>
    </div>
  );
};

export default ProductCard;
