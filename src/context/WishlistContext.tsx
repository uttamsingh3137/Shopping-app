import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../types/Product";
import type { WishlistItem } from "../types/Wishlist";
import {
  getWishlistFromStorage,
  saveWishlistToStorage,
} from "../utils/wishlistStorage";

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(
    getWishlistFromStorage()
  );

  useEffect(() => {
    saveWishlistToStorage(wishlist);
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.product.id === product.id);
      if (exists) {
        return prev.filter((i) => i.product.id !== product.id);
      }
      return [...prev, { product }];
    });
  };

  const isInWishlist = (id: number) =>
    wishlist.some((i) => i.product.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
