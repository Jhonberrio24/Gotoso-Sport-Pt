import { useState } from 'react';
import type { Producto } from '../types';
import { formatearMoneda } from '../data/productos';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';

interface ProductModalProps {
  producto: Producto | null;
  onClose: () => void;
}

export default function ProductModal({ producto, onClose }: ProductModalProps) {
  const { agregarProducto } = useCart();
  const { esFavorito, toggleFavorito } = useWishlist();

  const [tallaSeleccionada, setTallaSeleccionada] = useState<string>(() => {
    return producto?.tallas && producto.tallas.length > 0 ? producto.tallas[0] : '';
  });

  const [cantidad, setCantidad] = useState(1);

  if (!producto) return null;

  const fav = esFavorito(producto.id);

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) {
      agregarProducto(producto, tallaSeleccionada);
    }
    onClose();
  };

  const handleComprarWhatsApp = () => {
    const textoTalla = tallaSeleccionada ? `\n- *Talla seleccionada:* ${tallaSeleccionada}` : '';
    const mensaje = `⚽ *¡Hola Gotoso Sport PT! Quiero comprar de inmediato:*\n\n` +
      `*Producto:* ${producto.nombre}\n` +
      `- *Cantidad:* ${cantidad}${textoTalla}\n` +
      `- *Total:* ${formatearMoneda(producto.precioNumerico * cantidad)}\n\n` +
      `¿Tienen disponibilidad para despacho inmediato?`;

    const url = `https://wa.me/573000000000?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* BOTÓN CERRAR */}
        <button onClick={onClose} style={styles.closeBtn} title="Cerrar modal">
          ✕
        </button>

        <div style={styles.grid}>
          {/* COLUMNA IMAGEN */}
          <div style={styles.imgCol}>
            <img src={producto.imagen} alt={producto.nombre} style={styles.image} />
            <span style={styles.badge}>{producto.categoria}</span>

            {/* BOTÓN FAVORITO */}
            <button
              onClick={() => toggleFavorito(producto.id)}
              style={styles.favBtn}
              title={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
              {fav ? '❤️' : '🤍'}
            </button>
          </div>

          {/* COLUMNA DETALLES */}
          <div style={styles.infoCol}>
            <span style={styles.categoryText}>{producto.categoria}</span>
            <h2 style={styles.title}>{producto.nombre}</h2>
            <p style={styles.price}>{formatearMoneda(producto.precioNumerico)}</p>

            <p style={styles.description}>{producto.descripcion}</p>

            {/* SELECTOR DE TALLAS */}
            {producto.tallas && producto.tallas.length > 0 && (
              <div style={styles.sizesSection}>
                <label style={styles.sizesLabel}>
                  Selecciona tu talla / medida:
                </label>
                <div style={styles.sizesList}>
                  {producto.tallas.map((talla) => {
                    const activa = tallaSeleccionada === talla;
                    return (
                      <button
                        key={talla}
                        onClick={() => setTallaSeleccionada(talla)}
                        style={activa ? styles.sizeBtnActive : styles.sizeBtn}
                      >
                        {talla}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PUNTOS DESTACADOS */}
            {producto.detalles && producto.detalles.length > 0 && (
              <div style={styles.detailsList}>
                <h4 style={styles.detailsTitle}>Detalles del artículo:</h4>
                <ul style={styles.bullets}>
                  {producto.detalles.map((detalle, idx) => (
                    <li key={idx} style={styles.bulletItem}>
                      <span style={{ color: 'var(--primary)', marginRight: '6px' }}>✓</span>
                      {detalle}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CANTIDAD Y BOTONES */}
            <div style={styles.actions}>
              <div style={styles.qtyContainer}>
                <button
                  onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                  style={styles.qtyBtn}
                >
                  -
                </button>
                <span style={styles.qtyNum}>{cantidad}</span>
                <button
                  onClick={() => setCantidad((prev) => prev + 1)}
                  style={styles.qtyBtn}
                >
                  +
                </button>
              </div>

              <button onClick={handleAgregar} style={styles.addBtn}>
                Agregar al Carrito 🛒
              </button>
            </div>

            <button onClick={handleComprarWhatsApp} style={styles.whatsappDirectBtn}>
              Consultar por WhatsApp (demo) 💬
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1100,
    padding: '1rem',
  },
  modal: {
    backgroundColor: '#0f172a',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '850px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    fontSize: '1.1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  },
  imgCol: {
    position: 'relative',
    backgroundColor: '#1e293b',
    minHeight: '340px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: '24px',
    borderBottomLeftRadius: '24px',
  },
  badge: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'var(--primary)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  favBtn: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  infoCol: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  categoryText: {
    color: 'var(--primary)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '0.3rem',
  },
  title: {
    fontSize: '1.45rem',
    color: '#fff',
    fontWeight: '800',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  },
  price: {
    fontSize: '1.6rem',
    color: 'var(--primary)',
    fontWeight: '900',
    marginBottom: '1rem',
  },
  description: {
    color: 'var(--text-muted)',
    fontSize: '0.92rem',
    lineHeight: 1.5,
    marginBottom: '1.25rem',
  },
  sizesSection: {
    marginBottom: '1.25rem',
  },
  sizesLabel: {
    display: 'block',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  sizesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  sizeBtn: {
    backgroundColor: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  sizeBtnActive: {
    backgroundColor: 'var(--primary)',
    border: '1px solid var(--primary)',
    color: '#000',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '800',
  },
  detailsList: {
    marginBottom: '1.25rem',
    backgroundColor: '#1e293b',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  detailsTitle: {
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  bullets: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  bulletItem: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
  },
  actions: {
    display: 'flex',
    gap: '0.8rem',
    marginBottom: '0.8rem',
  },
  qtyContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '0 8px',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  qtyNum: {
    color: '#fff',
    fontWeight: '700',
    minWidth: '24px',
    textAlign: 'center',
  },
  addBtn: {
    flex: 1,
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    padding: '12px',
    fontWeight: '800',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  whatsappDirectBtn: {
    width: '100%',
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
};
