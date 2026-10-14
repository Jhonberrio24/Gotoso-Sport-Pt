import { useState, useMemo } from 'react';
import { listaProductos, formatearMoneda } from '../data/productos';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import ProductModal from '../components/ProductModal';
import Card from '../components/Card';
import type { Producto } from '../types';

type TipoOrden = 'default' | 'precio-asc' | 'precio-desc' | 'nombre-asc';

export default function Productos() {
  const { items, agregarProducto, restarProducto } = useCart();
  const { esFavorito, toggleFavorito } = useWishlist();

  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [orden, setOrden] = useState<TipoOrden>('default');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    return ['Todos', ...Array.from(new Set(listaProductos.map((p) => p.categoria)))];
  }, []);

  // Filtrado y ordenamiento de productos
  const productosFiltrados = useMemo(() => {
    return listaProductos
      .filter((prod) => {
        const coincideCategoria =
          categoriaSeleccionada === 'Todos' || prod.categoria === categoriaSeleccionada;
        const coincideBusqueda =
          prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          prod.categoria.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
      })
      .sort((a, b) => {
        if (orden === 'precio-asc') return a.precioNumerico - b.precioNumerico;
        if (orden === 'precio-desc') return b.precioNumerico - a.precioNumerico;
        if (orden === 'nombre-asc') return a.nombre.localeCompare(b.nombre);
        return 0;
      });
  }, [busqueda, categoriaSeleccionada, orden]);

  const getCantidadEnCarrito = (id: number) => {
    return items
      .filter((i) => i.producto.id === id)
      .reduce((sum, i) => sum + i.cantidad, 0);
  };

  const handleLimpiarFiltros = () => {
    setBusqueda('');
    setCategoriaSeleccionada('Todos');
    setOrden('default');
  };

  return (
    <div style={styles.container}>
      {/* MODAL DE VISTA RÁPIDA */}
      <ProductModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />

      {/* TÍTULO Y DESCRIPCIÓN */}
      <div style={styles.header}>
        <h1 style={styles.title}>Catálogo Oficial Gotoso Sport PT</h1>
        <p style={styles.subtitle}>
          Encuentra prendas históricas, equipaciones de temporada y accesorios para alto rendimiento.
        </p>
      </div>

      {/* BARRA DE BÚSQUEDA Y ORDENAMIENTO */}
      <div style={styles.controlsBar}>
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por camiseta, balón, marca, guayos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={styles.searchInput}
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              style={styles.clearSearchBtn}
              title="Borrar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        <div style={styles.sortContainer}>
          <label style={styles.sortLabel}>Ordenar por:</label>
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value as TipoOrden)}
            style={styles.sortSelect}
          >
            <option value="default">Recomendados</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="nombre-asc">Nombre (A - Z)</option>
          </select>
        </div>
      </div>

      {/* PÍLDORAS DE CATEGORÍAS */}
      <div style={styles.categoriesPills}>
        {categorias.map((cat) => {
          const isActiva = categoriaSeleccionada === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              style={isActiva ? styles.pillActive : styles.pill}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* CONTADOR DE RESULTADOS */}
      <div style={styles.resultsMeta}>
        <span>
          Mostrando <strong>{productosFiltrados.length}</strong> de {listaProductos.length} productos
        </span>
        {(busqueda || categoriaSeleccionada !== 'Todos' || orden !== 'default') && (
          <button onClick={handleLimpiarFiltros} style={styles.resetFilterBtn}>
            Limpiar filtros
          </button>
        )}
      </div>

      {/* GRID DE PRODUCTOS O ESTADO VACÍO */}
      {productosFiltrados.length === 0 ? (
        <div style={styles.emptyState}>
          <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚽</span>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>No se encontraron productos</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            No hay artículos que coincidan con &quot;{busqueda}&quot; en la categoría seleccionada.
          </p>
          <button onClick={handleLimpiarFiltros} style={styles.resetBtn}>
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {productosFiltrados.map((prod) => {
            const cantidad = getCantidadEnCarrito(prod.id);

            return (
              <Card
                key={prod.id}
                titulo={prod.nombre}
                precio={formatearMoneda(prod.precioNumerico)}
                imagen={prod.imagen}
                categoria={prod.categoria}
                tallas={prod.tallas}
                cantidadEnCarrito={cantidad}
                esFavorito={esFavorito(prod.id)}
                onToggleFavorito={() => toggleFavorito(prod.id)}
                onAgregar={() => {
                  if (cantidad === 0) {
                    setProductoSeleccionado(prod);
                  } else {
                    agregarProducto(prod);
                  }
                }}
                onRestar={() => restarProducto(prod.id)}
                onConsultar={() => setProductoSeleccionado(prod)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto 4rem auto',
    padding: '0 1.5rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
    color: '#fff',
    fontWeight: '900',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.05rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  controlsBar: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
  },
  searchContainer: {
    position: 'relative',
    flex: '1 1 320px',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '12px 38px 12px 38px',
    backgroundColor: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  sortLabel: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
  sortSelect: {
    backgroundColor: '#1e293b',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '10px 14px',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  categoriesPills: {
    display: 'flex',
    gap: '0.6rem',
    overflowX: 'auto',
    paddingBottom: '0.8rem',
    marginBottom: '1.5rem',
  },
  pill: {
    backgroundColor: '#1e293b',
    color: 'var(--text-muted)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '8px 16px',
    borderRadius: '25px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  pillActive: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: '1px solid var(--primary)',
    padding: '8px 16px',
    borderRadius: '25px',
    fontSize: '0.85rem',
    fontWeight: '700',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  resultsMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    marginBottom: '2rem',
  },
  resetFilterBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  emptyState: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '20px',
    padding: '4rem 2rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  resetBtn: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '18px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  imgWrapper: {
    position: 'relative',
    height: '230px',
    backgroundColor: '#0f172a',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: 'var(--primary)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    backdropFilter: 'blur(4px)',
  },
  cardFavBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '50%',
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  quickViewBtn: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
    whiteSpace: 'nowrap',
  },
  cardBody: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: '1.05rem',
    color: '#fff',
    fontWeight: '700',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    lineHeight: 1.3,
  },
  sizesPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '0.75rem',
    flexWrap: 'wrap',
  },
  sizesPreviewLabel: {
    color: 'var(--text-muted)',
    fontSize: '0.72rem',
    marginRight: '2px',
  },
  sizeTag: {
    backgroundColor: '#0f172a',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '4px',
    padding: '1px 5px',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
  },
  cardPrice: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--primary)',
    marginBottom: '1.25rem',
  },
  btnAgregar: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    padding: '11px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '0.95rem',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity 0.2s',
  },
  btnGroupInCart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    border: '1px solid var(--primary)',
    padding: '4px',
  },
  qtyActionBtn: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    fontWeight: '800',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBadge: {
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.85rem',
  },
};