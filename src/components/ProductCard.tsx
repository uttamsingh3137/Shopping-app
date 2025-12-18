import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={product.thumbnail} />
      <h4>{product.title}</h4>
      <p className="price">₹ {product.price}</p>
      <Link to={`/product/${product.id}`}>View Details →</Link>
    </div>
  );
};

export default ProductCard;
