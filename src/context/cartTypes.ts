import { createContext } from 'react';
import type { Producto, ItemCarrito } from '../types';

export interface CartContextType {
  items: ItemCarrito[];
  agregarProducto: (producto: Producto, talla?: string) => void;
  restarProducto: (productoId: number, talla?: string) => void;
  eliminarProducto: (productoId: number, talla?: string) => void;
  vaciarCarrito: () => void;
  totalItems: number;
  subtotalPrecio: number;
  descuento: number;
  totalPrecio: number;
  cuponAplicado: string | null;
  aplicarCupon: (codigo: string) => { exito: boolean; mensaje: string };
  removerCupon: () => void;
  isCartOpen: boolean;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  toggleCarrito: () => void;
  mensajeToast: string | null;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
