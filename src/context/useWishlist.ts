import { useContext } from 'react';
import { WishlistContext, type WishlistContextType } from './wishlistTypes';

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist debe ser utilizado dentro de un WishlistProvider');
  }
  return context;
};

