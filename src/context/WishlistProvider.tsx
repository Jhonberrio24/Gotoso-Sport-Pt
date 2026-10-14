import React, { useState, useEffect, type ReactNode } from 'react';
import { WishlistContext } from './wishlistTypes';

const LOCAL_STORAGE_WISHLIST = 'gotoso_sport_favoritos';

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoritos, setFavoritos] = useState<number[]>(() => {
    try {
      const guardado = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(favoritos));
    } catch (e) {
      console.error('Error al guardar favoritos en localStorage', e);
    }
  }, [favoritos]);

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const esFavorito = (id: number) => favoritos.includes(id);

  const totalFavoritos = favoritos.length;

  const abrirWishlist = () => setIsWishlistOpen(true);
  const cerrarWishlist = () => setIsWishlistOpen(false);

  const limpiarFavoritos = () => setFavoritos([]);

  return (
    <WishlistContext.Provider
      value={{
        favoritos,
        toggleFavorito,
        esFavorito,
        totalFavoritos,
        isWishlistOpen,
        abrirWishlist,
        cerrarWishlist,
        limpiarFavoritos,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

