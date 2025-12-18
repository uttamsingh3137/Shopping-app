import type { CartItem } from "../types/Cart";

const CART_KEY = "cart";

export const saveCartToStorage = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const getCartFromStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem(CART_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading cart from storage", error);
    return [];
  }
};
