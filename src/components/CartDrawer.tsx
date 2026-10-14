import { useState } from 'react';
import { useCart } from '../context/useCart';
import { formatearMoneda } from '../data/productos';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    cerrarCarrito,
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
    mensajeToast
  } = useCart();

  const [inputCupon, setInputCupon] = useState('');
  const [errorCupon, setErrorCupon] = useState<string | null>(null);

  const handleAplicarCupon = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorCupon(null);
    if (!inputCupon.trim()) return;

    const res = aplicarCupon(inputCupon);
    if (!res.exito) {
      setErrorCupon(res.mensaje);
    } else {
      setInputCupon('');
    }
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let mensaje = `⚽ *¡Hola Gotoso Sport PT! Quiero realizar un pedido:*\n\n`;
    items.forEach((item, index) => {
      const tallaStr = item.tallaSeleccionada ? ` [Talla: ${item.tallaSeleccionada}]` : '';
      mensaje += `${index + 1}. *${item.producto.nombre}*${tallaStr}\n   - Cantidad: ${item.cantidad}\n   - Subtotal: ${formatearMoneda(item.producto.precioNumerico * item.cantidad)}\n`;
    });

    mensaje += `\n💵 *Subtotal:* ${formatearMoneda(subtotalPrecio)}`;
    if (descuento > 0 && cuponAplicado) {
      mensaje += `\n🎟️ *Descuento Cupón (${cuponAplicado}):* -${formatearMoneda(descuento)}`;
    }
    mensaje += `\n📦 *Total a pagar:* ${formatearMoneda(totalPrecio)}\n`;
    mensaje += `\n¿Me indican los medios de pago disponibles y datos para el envío? Muchas gracias!`;

    const url = `https://wa.me/573000000000?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Toast de notificación */}
      {mensajeToast && (
        <div style={styles.toast}>
          <span style={{ fontSize: '1.1rem' }}>✓</span>
          <span>{mensajeToast}</span>
        </div>
      )}

      {/* Backdrop oscuro */}
      {isCartOpen && (
        <div
          onClick={cerrarCarrito}
          style={styles.backdrop}
          aria-label="Cerrar carrito"
        />
      )}

      {/* Panel lateral / Drawer */}
      <aside
        style={{
          ...styles.drawer,
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Cabecera */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Tu Carrito</h2>
            <span style={styles.countText}>{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</span>
          </div>
          <button
            onClick={cerrarCarrito}
            style={styles.closeBtn}
            title="Cerrar carrito"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Lista de productos o estado vacío */}
        <div style={styles.body}>
          {items.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🛒</div>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Tu carrito está vacío</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                ¡Explora nuestro catálogo y equípate con lo mejor del fútbol!
              </p>
              <Link
                to="/productos"
                onClick={cerrarCarrito}
                style={styles.exploreBtn}
              >
                Ver Catálogo
              </Link>
            </div>
          ) : (
            <div style={styles.itemsList}>
              {items.map(({ producto, cantidad, tallaSeleccionada }) => (
                <div key={`${producto.id}-${tallaSeleccionada || 'std'}`} style={styles.itemCard}>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={styles.itemImg}
                  />
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{producto.nombre}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={styles.itemCategory}>{producto.categoria}</span>
                      {tallaSeleccionada && (
                        <span style={styles.itemSizeBadge}>Talla: {tallaSeleccionada}</span>
                      )}
                    </div>
                    <span style={styles.itemPrice}>
                      {formatearMoneda(producto.precioNumerico)}
                    </span>

                    {/* Controles de cantidad */}
                    <div style={styles.quantityControls}>
                      <div style={styles.qtyBox}>
                        <button
                          onClick={() => restarProducto(producto.id, tallaSeleccionada)}
                          style={styles.qtyBtn}
                          title="Restar uno"
                        >
                          -
                        </button>
                        <span style={styles.qtyValue}>{cantidad}</span>
                        <button
                          onClick={() => agregarProducto(producto, tallaSeleccionada)}
                          style={styles.qtyBtn}
                          title="Agregar uno"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => eliminarProducto(producto.id, tallaSeleccionada)}
                        style={styles.deleteBtn}
                        title="Eliminar producto"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con cupones, totales y botón WhatsApp */}
        {items.length > 0 && (
          <div style={styles.footer}>
            {/* SECCIÓN DE CUPÓN DE DESCUENTO */}
            <div style={styles.couponSection}>
              {cuponAplicado ? (
                <div style={styles.couponActiveBadge}>
                  <span>🎟️ Cupón <strong>{cuponAplicado}</strong> aplicado</span>
                  <button onClick={removerCupon} style={styles.couponRemoveBtn}>
                    ✕
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAplicarCupon} style={styles.couponForm}>
                  <input
                    type="text"
                    placeholder="Código de cupón (Ej: GOTOSO10)"
                    value={inputCupon}
                    onChange={(e) => setInputCupon(e.target.value)}
                    style={styles.couponInput}
                  />
                  <button type="submit" style={styles.couponBtn}>
                    Aplicar
                  </button>
                </form>
              )}
              {errorCupon && <span style={styles.couponError}>{errorCupon}</span>}
            </div>

            {/* RESUMEN DE TOTALES */}
            <div style={styles.summaryRow}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{formatearMoneda(subtotalPrecio)}</span>
            </div>

            {descuento > 0 && (
              <div style={styles.summaryRow}>
                <span style={{ color: 'var(--primary)' }}>Descuento ({cuponAplicado}):</span>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                  -{formatearMoneda(descuento)}
                </span>
              </div>
            )}

            <div style={styles.summaryRow}>
              <span style={{ color: 'var(--text-muted)' }}>Envío:</span>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>A convenir vía WhatsApp</span>
            </div>

            <div style={{ ...styles.summaryRow, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
              <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>Total:</span>
              <span style={{ color: 'var(--primary)', fontSize: '1.3rem', fontWeight: '800' }}>
                {formatearMoneda(totalPrecio)}
              </span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              style={styles.whatsappBtn}
            >
              Probar pedido por WhatsApp (demo) 💬
            </button>

            <button
              onClick={vaciarCarrito}
              style={styles.clearBtn}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '440px',
    height: '100vh',
    backgroundColor: '#0f172a',
    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#fff',
    margin: 0,
  },
  countText: {
    fontSize: '0.85rem',
    color: 'var(--primary)',
    fontWeight: '600',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '1.4rem',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.25rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: '2rem 1rem',
  },
  emptyIcon: {
    fontSize: '3.5rem',
    marginBottom: '1rem',
    opacity: 0.6,
  },
  exploreBtn: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    padding: '10px 24px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '0.95rem',
    textDecoration: 'none',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  itemCard: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  itemImg: {
    width: '75px',
    height: '75px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  itemName: {
    color: '#fff',
    fontSize: '0.92rem',
    fontWeight: '600',
    margin: 0,
    lineHeight: 1.3,
  },
  itemCategory: {
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  },
  itemSizeBadge: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    color: 'var(--primary)',
    border: '1px solid rgba(0, 230, 118, 0.3)',
    borderRadius: '4px',
    padding: '1px 6px',
    fontSize: '0.7rem',
    fontWeight: '700',
  },
  itemPrice: {
    color: 'var(--primary)',
    fontWeight: '700',
    fontSize: '0.95rem',
    marginTop: '0.2rem',
  },
  quantityControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#0f172a',
    borderRadius: '6px',
    padding: '2px 6px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0 6px',
  },
  qtyValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    minWidth: '20px',
    textAlign: 'center',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '1.1rem',
    padding: '4px',
  },
  footer: {
    padding: '1.25rem',
    backgroundColor: '#1e293b',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  couponSection: {
    marginBottom: '0.25rem',
  },
  couponForm: {
    display: 'flex',
    gap: '6px',
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#0f172a',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '8px 10px',
    color: '#fff',
    fontSize: '0.82rem',
    outline: 'none',
  },
  couponBtn: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    fontWeight: '700',
    fontSize: '0.82rem',
    cursor: 'pointer',
  },
  couponActiveBadge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    border: '1px solid var(--primary)',
    borderRadius: '8px',
    padding: '6px 10px',
    color: '#fff',
    fontSize: '0.85rem',
  },
  couponRemoveBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  couponError: {
    color: '#ef4444',
    fontSize: '0.75rem',
    marginTop: '4px',
    display: 'block',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.95rem',
  },
  whatsappBtn: {
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '1.05rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'opacity 0.2s',
  },
  clearBtn: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--text-muted)',
    padding: '8px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#00e676',
    color: '#000',
    padding: '12px 20px',
    borderRadius: '10px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 10px 25px rgba(0, 230, 118, 0.3)',
    zIndex: 2000,
  },
};
