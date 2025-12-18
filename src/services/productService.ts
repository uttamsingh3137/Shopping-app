import type { Product } from "../types/Product";

const BASE_URL = "https://dummyjson.com/products";

interface ProductsResponse {
  products: Product[];
}

export const getAllProduct = async (): Promise<Product[]> => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data: ProductsResponse = await res.json();
  return data.products;
};


export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};
