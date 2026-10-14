interface CardProps {
  titulo: string;
  precio: string;
  imagen: string;
  categoria?: string;
  tallas?: string[];
  cantidadEnCarrito?: number;
  esFavorito?: boolean;
  onToggleFavorito?: () => void;
  onAgregar?: () => void;
  onRestar?: () => void;
  onConsultar?: () => void;
}

export default function Card({
  titulo,
  precio,
  imagen,
  categoria = 'Fútbol',
  tallas = [],
  cantidadEnCarrito = 0,
  esFavorito = false,
  onToggleFavorito,
  onAgregar,
  onRestar,
  onConsultar,
}: CardProps) {
  return (
    <div style={styles.card}>
      <div style={styles.imgContainer}>
        <span style={styles.tag}>{categoria}</span>
        <img src={imagen} alt={titulo} style={styles.image} />
        {onToggleFavorito && (
          <button
            type="button"
            onClick={onToggleFavorito}
            style={styles.favoriteButton}
            aria-label={esFavorito ? `Quitar ${titulo} de favoritos` : `Guardar ${titulo} en favoritos`}
            aria-pressed={esFavorito}
          >
            {esFavorito ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{titulo}</h3>
        {tallas.length > 0 && (
          <div style={styles.sizes}>
            <span style={styles.sizesLabel}>Tallas:</span>
            {tallas.slice(0, 4).map((talla) => (
              <span key={talla} style={styles.sizeTag}>{talla}</span>
            ))}
          </div>
        )}
        <div style={styles.footer}>
          <span style={styles.price}>{precio}</span>
          {onConsultar && (
            <button type="button" style={styles.detailsButton} onClick={onConsultar}>
              Detalles
            </button>
          )}
        </div>
        {cantidadEnCarrito > 0 && onRestar ? (
          <div style={styles.quantityControls}>
            <button type="button" style={styles.quantityButton} onClick={onRestar} aria-label={`Quitar una unidad de ${titulo}`}>
              −
            </button>
            <span style={styles.quantityLabel}>{cantidadEnCarrito} en carrito</span>
            <button type="button" style={styles.quantityButton} onClick={onAgregar} aria-label={`Agregar una unidad de ${titulo}`}>
              +
            </button>
          </div>
        ) : (
          <button type="button" style={styles.button} onClick={onAgregar} disabled={!onAgregar}>
            Elegir talla y comprar 🛒
          </button>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },
  imgContainer: {
    position: 'relative' as const,
    height: '220px',
    backgroundColor: '#0f172a',
    overflow: 'hidden',
  },
  tag: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'var(--primary)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    backdropFilter: 'blur(4px)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  favoriteButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    width: '38px',
    height: '38px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '50%',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  content: {
    padding: '1.25rem',
  },
  title: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#fff',
  },
  sizes: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '5px',
    marginBottom: '1rem',
  },
  sizesLabel: {
    color: 'var(--text-muted)',
    fontSize: '0.78rem',
  },
  sizeTag: {
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '6px',
    padding: '2px 6px',
    color: '#e2e8f0',
    fontSize: '0.72rem',
  },
  footer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: 'var(--primary)',
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  detailsButton: {
    border: '1px solid rgba(0, 230, 118, 0.6)',
    padding: '7px 11px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    fontWeight: '700',
    cursor: 'pointer',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },
  quantityButton: {
    width: '34px',
    height: '34px',
    border: '1px solid rgba(0, 230, 118, 0.6)',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '700',
  },
  quantityLabel: {
    color: '#fff',
    fontSize: '0.82rem',
    fontWeight: '700',
  },
};