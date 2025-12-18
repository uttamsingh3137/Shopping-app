import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getAllProduct } from "../services/productService";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
