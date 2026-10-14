import { useWishlist } from '../context/useWishlist';
import { useCart } from '../context/useCart';
import { listaProductos, formatearMoneda } from '../data/productos';

export default function WishlistModal() {
  const { favoritos, isWishlistOpen, cerrarWishlist, toggleFavorito, limpiarFavoritos } = useWishlist();
  const { agregarProducto } = useCart();

  if (!isWishlistOpen) return null;

  const productosFavoritos = listaProductos.filter((p) => favoritos.includes(p.id));

  const handleMoverAlCarrito = (producto: typeof listaProductos[0]) => {
    agregarProducto(producto);
    toggleFavorito(producto.id);
  };

  return (
    <div style={styles.backdrop} onClick={cerrarWishlist}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>❤️</span>
            <h2 style={styles.title}>Mis Favoritos ({productosFavoritos.length})</h2>
          </div>
          <button onClick={cerrarWishlist} style={styles.closeBtn} title="Cerrar favoritos">
            ✕
          </button>
        </div>

        <div style={styles.body}>
          {productosFavoritos.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={{ fontSize: '3rem', opacity: 0.5, marginBottom: '1rem' }}>🤍</span>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>No tienes favoritos guardados</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Haz clic en el corazón de cualquier producto para guardarlo y revisarlo cuando quieras.
              </p>
            </div>
          ) : (
            <div style={styles.list}>
              {productosFavoritos.map((prod) => (
                <div key={prod.id} style={styles.item}>
                  <img src={prod.imagen} alt={prod.nombre} style={styles.img} />
                  <div style={styles.info}>
                    <h4 style={styles.name}>{prod.nombre}</h4>
                    <span style={styles.cat}>{prod.categoria}</span>
                    <span style={styles.price}>{formatearMoneda(prod.precioNumerico)}</span>
                  </div>
                  <div style={styles.actions}>
                    <button
                      onClick={() => handleMoverAlCarrito(prod)}
                      style={styles.btnMoveCart}
                      title="Mover al carrito"
                    >
                      Mover al Carrito 🛒
                    </button>
                    <button
                      onClick={() => toggleFavorito(prod.id)}
                      style={styles.btnRemove}
                      title="Quitar de favoritos"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {productosFavoritos.length > 0 && (
          <div style={styles.footer}>
            <button onClick={limpiarFavoritos} style={styles.btnClear}>
              Limpiar lista de favoritos
            </button>
          </div>
        )}
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
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '560px',
    width: '100%',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
  },
  title: {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: '800',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  body: {
    padding: '1.25rem',
    overflowY: 'auto',
    flex: 1,
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#1e293b',
    padding: '0.9rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  img: {
    width: '65px',
    height: '65px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: '700',
    marginBottom: '2px',
  },
  cat: {
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    display: 'block',
    textTransform: 'uppercase',
  },
  price: {
    color: 'var(--primary)',
    fontWeight: '800',
    fontSize: '0.95rem',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  btnMoveCart: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '0.8rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  btnRemove: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '4px',
  },
  footer: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    textAlign: 'center',
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
  },
  btnClear: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

