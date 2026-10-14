export interface Producto {
  id: number;
  nombre: string;
  precio: string;
  precioNumerico: number;
  categoria: string;
  imagen: string;
  destacado?: boolean;
  descripcion?: string;
  tallas?: string[];
  detalles?: string[];
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  tallaSeleccionada?: string;
}

export interface Cupon {
  codigo: string;
  porcentajeDescuento?: number;
  montoFijo?: number;
  descripcion: string;
}
