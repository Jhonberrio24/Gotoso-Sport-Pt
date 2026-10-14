import { createContext } from 'react';

export interface WishlistContextType {
  favoritos: number[];
  toggleFavorito: (id: number) => void;
  esFavorito: (id: number) => boolean;
  totalFavoritos: number;
  isWishlistOpen: boolean;
  abrirWishlist: () => void;
  cerrarWishlist: () => void;
  limpiarFavoritos: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

