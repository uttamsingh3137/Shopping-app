import type { WishlistItem } from "../types/Wishlist";

const KEY = "wishlist";

export const getWishlistFromStorage = (): WishlistItem[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWishlistToStorage = (items: WishlistItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
};
