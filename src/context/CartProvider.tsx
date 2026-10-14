import React, { useState, useEffect, type ReactNode } from 'react';
import { CartContext } from './cartTypes';
import { CUPONES_VALIDOS } from '../data/productos';
import type { Producto, ItemCarrito } from '../types';

const LOCAL_STORAGE_KEY = 'gotoso_sport_carrito';
const LOCAL_STORAGE_CUPON = 'gotoso_sport_cupon';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    try {
      const guardado = localStorage.getItem(LOCAL_STORAGE_KEY);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [cuponAplicado, setCuponAplicado] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_CUPON) || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mensajeToast, setMensajeToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error al guardar carrito en localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (cuponAplicado) {
        localStorage.setItem(LOCAL_STORAGE_CUPON, cuponAplicado);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_CUPON);
      }
    } catch (e) {
      console.error('Error al guardar cupon en localStorage', e);
    }
  }, [cuponAplicado]);

  const mostrarToast = (mensaje: string) => {
    setMensajeToast(mensaje);
    setTimeout(() => {
      setMensajeToast((prev) => (prev === mensaje ? null : prev));
    }, 2500);
  };

  const agregarProducto = (producto: Producto, talla?: string) => {
    const tallaEfectiva = talla || (producto.tallas && producto.tallas.length > 0 ? producto.tallas[0] : undefined);

    setItems((prevItems) => {
      const existente = prevItems.find(
        (item) => item.producto.id === producto.id && item.tallaSeleccionada === tallaEfectiva
      );

      if (existente) {
        return prevItems.map((item) =>
          item.producto.id === producto.id && item.tallaSeleccionada === tallaEfectiva
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prevItems, { producto, cantidad: 1, tallaSeleccionada: tallaEfectiva }];
    });

    const textoTalla = tallaEfectiva ? ` (${tallaEfectiva})` : '';
    mostrarToast(`¡${producto.nombre}${textoTalla} añadido al carrito!`);
  };

  const restarProducto = (productoId: number, talla?: string) => {
    setItems((prevItems) => {
      const existente = prevItems.find(
        (item) => item.producto.id === productoId && (!talla || item.tallaSeleccionada === talla)
      );
      if (!existente) return prevItems;

      if (existente.cantidad <= 1) {
        return prevItems.filter(
          (item) => !(item.producto.id === productoId && item.tallaSeleccionada === existente.tallaSeleccionada)
        );
      }

      return prevItems.map((item) =>
        item.producto.id === productoId && item.tallaSeleccionada === existente.tallaSeleccionada
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
    });
  };

  const eliminarProducto = (productoId: number, talla?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.producto.id === productoId && (!talla || item.tallaSeleccionada === talla))
      )
    );
    mostrarToast('Producto eliminado del carrito');
  };

  const vaciarCarrito = () => {
    setItems([]);
    setCuponAplicado(null);
  };

  // Cálculos de montos
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotalPrecio = items.reduce(
    (acc, item) => acc + item.producto.precioNumerico * item.cantidad,
    0
  );

  let descuento = 0;
  if (cuponAplicado && subtotalPrecio > 0) {
    const cupon = CUPONES_VALIDOS.find(
      (c) => c.codigo.toUpperCase() === cuponAplicado.toUpperCase()
    );
    if (cupon) {
      if (cupon.porcentajeDescuento) {
        descuento = Math.round(subtotalPrecio * (cupon.porcentajeDescuento / 100));
      } else if (cupon.montoFijo) {
        descuento = Math.min(cupon.montoFijo, subtotalPrecio);
      }
    }
  }

  const totalPrecio = Math.max(0, subtotalPrecio - descuento);

  const aplicarCupon = (codigo: string): { exito: boolean; mensaje: string } => {
    const cupon = CUPONES_VALIDOS.find(
      (c) => c.codigo.toUpperCase() === codigo.trim().toUpperCase()
    );

    if (!cupon) {
      return { exito: false, mensaje: 'Cupón no válido o expirado.' };
    }

    setCuponAplicado(cupon.codigo);
    mostrarToast(`¡Cupón ${cupon.codigo} aplicado con éxito!`);
    return { exito: true, mensaje: `¡Cupón ${cupon.codigo} aplicado! ${cupon.descripcion}` };
  };

  const removerCupon = () => {
    setCuponAplicado(null);
    mostrarToast('Cupón removido');
  };

  const abrirCarrito = () => setIsCartOpen(true);
  const cerrarCarrito = () => setIsCartOpen(false);
  const toggleCarrito = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        agregarProducto,
        restarProducto,
        eliminarProducto,
        vaciarCarrito,
        totalItems,
        subtotalPrecio,
        descuento,
        totalPrecio,
        cuponAplicado,
        aplicarCupon,
        removerCupon,
        isCartOpen,
        abrirCarrito,
        cerrarCarrito,
        toggleCarrito,
        mensajeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
