import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductModal from '../components/ProductModal';
import { listaProductos, formatearMoneda } from '../data/productos';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import type { Producto } from '../types';

export default function Inicio() {
  const { agregarProducto } = useCart();
  const { esFavorito, toggleFavorito } = useWishlist();
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const productosDestacados = listaProductos.filter((p) => p.destacado).slice(0, 4);

  const testimonios = [
    {
      nombre: 'Andrés Felipe M.',
      ciudad: 'Barranquilla',
      estrellas: 5,
      comentario: 'La camiseta del Junior 2004 llegó en perfecto estado. Los detalles de la tela y el dorsal son una locura de calidad. 100% recomendados.',
      producto: 'Camiseta Junior 2004'
    },
    {
      nombre: 'Carlos Mario V.',
      ciudad: 'Medellín',
      estrellas: 5,
      comentario: 'Compré los guayos turf y la tracción en grama sintética es increíble. El envío por WhatsApp fue rápido y la asesoría de talla fue exacta.',
      producto: 'Tachones Pro Turf'
    },
    {
      nombre: 'Santiago R.',
      ciudad: 'Bogotá',
      estrellas: 5,
      comentario: 'El balón Brazuca es una joya total para mi colección. Venía súper bien embalado y con sus sellos oficiales intactos.',
      producto: 'Balón FIFA Brazuca'
    }
  ];

  return (
    <div>
      {/* MODAL DE VISTA RÁPIDA */}
      <ProductModal
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />

      {/* 1. HERO PRINCIPAL */}
      <Hero />

      {/* 2. BENEFICIOS / PROPUESTA DE VALOR */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🚚</span>
              <h3 style={styles.featureTitle}>Envíos a Todo el País</h3>
              <p style={styles.featureDesc}>Llegamos a cualquier ciudad de Colombia con transportadoras seguras y guía de seguimiento.</p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🛡️</span>
              <h3 style={styles.featureTitle}>Garantía de Calidad</h3>
              <p style={styles.featureDesc}>Prendas e indumentaria deportiva seleccionadas con los más exigentes estándares futboleros.</p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>💳</span>
              <h3 style={styles.featureTitle}>Pagos Fáciles y Seguros</h3>
              <p style={styles.featureDesc}>Transferencia Bancolombia, Nequi, Daviplata y opciones de pago contra entrega.</p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>⚡</span>
              <h3 style={styles.featureTitle}>Asesoría Personalizada</h3>
              <p style={styles.featureDesc}>Atención humana directa por WhatsApp para verificar tallas, medidas y resolver dudas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTOS DESTACADOS */}
      <section style={styles.featuredSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div>
              <span style={styles.sectionSubtitle}>LO MEJOR DE LA TIENDA</span>
              <h2 style={styles.sectionTitle}>Productos Destacados</h2>
            </div>
            <Link to="/productos" style={styles.viewAllLink}>
              Ver todo el catálogo ➔
            </Link>
          </div>

          <div style={styles.productsGrid}>
            {productosDestacados.map((prod) => {
              const fav = esFavorito(prod.id);

              return (
                <div key={prod.id} style={styles.productCard}>
                  <div style={styles.cardImgContainer}>
                    <img src={prod.imagen} alt={prod.nombre} style={styles.productImg} />
                    <span style={styles.categoryBadge}>{prod.categoria}</span>

                    <button
                      onClick={() => toggleFavorito(prod.id)}
                      style={styles.cardFavBtn}
                      title={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                    >
                      {fav ? '❤️' : '🤍'}
                    </button>

                    <button
                      onClick={() => setProductoSeleccionado(prod)}
                      style={styles.quickViewBtn}
                    >
                      Vista rápida 👁️
                    </button>
                  </div>

                  <div style={styles.productInfo}>
                    <h3
                      onClick={() => setProductoSeleccionado(prod)}
                      style={styles.productName}
                    >
                      {prod.nombre}
                    </h3>
                    <p style={styles.productPrice}>{formatearMoneda(prod.precioNumerico)}</p>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => agregarProducto(prod)}
                        style={styles.addBtn}
                      >
                        Comprar 🛒
                      </button>
                      <button
                        onClick={() => setProductoSeleccionado(prod)}
                        style={styles.detailsBtn}
                        title="Ver detalles y tallas"
                      >
                        Detalles
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. RESEÑAS Y TESTIMONIOS */}
      <section style={styles.reviewsSection}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={styles.sectionSubtitle}>CLIENTES REALES</span>
            <h2 style={styles.sectionTitle}>Lo que dicen nuestros futbolistas</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              La confianza de nuestros clientes en cada rincón del país es nuestro mayor orgullo.
            </p>
          </div>

          <div style={styles.reviewsGrid}>
            {testimonios.map((t, idx) => (
              <div key={idx} style={styles.reviewCard}>
                <div style={styles.reviewStars}>
                  {'★'.repeat(t.estrellas)}
                </div>
                <p style={styles.reviewText}>&quot;{t.comentario}&quot;</p>
                <div style={styles.reviewFooter}>
                  <div>
                    <h4 style={styles.reviewAuthor}>{t.nombre}</h4>
                    <span style={styles.reviewCity}>{t.ciudad}, Colombia</span>
                  </div>
                  <span style={styles.reviewBadge}>Comprador Verificado ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PREGUNTAS FRECUENTES (FAQ) */}
      <section style={styles.faqSection}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={styles.sectionSubtitle}>DUDAS COMUNES</span>
            <h2 style={styles.sectionTitle}>Preguntas Frecuentes</h2>
          </div>

          <div style={styles.faqGrid}>
            <div style={styles.faqItem}>
              <h4 style={styles.faqQ}>¿Hacen envíos a todo el territorio colombiano?</h4>
              <p style={styles.faqA}>
                Sí, despachamos con las principales transportadoras (Servientrega, Inter Rapidísimo y Envía) a ciudades principales e intermedias.
              </p>
            </div>
            <div style={styles.faqItem}>
              <h4 style={styles.faqQ}>¿Cómo sé cuál es mi talla correcta?</h4>
              <p style={styles.faqA}>
                Puedes revisar la selección de tallas en cada producto o escribirnos a nuestro WhatsApp para enviarte medidas exactas en centímetros.
              </p>
            </div>
            <div style={styles.faqItem}>
              <h4 style={styles.faqQ}>¿Qué métodos de pago tienen disponibles?</h4>
              <p style={styles.faqA}>
                Aceptamos transferencias Bancolombia, pagos digitales vía Nequi y Daviplata, y contra entrega según la ciudad de destino.
              </p>
            </div>
            <div style={styles.faqItem}>
              <h4 style={styles.faqQ}>¿Tienen garantía los productos?</h4>
              <p style={styles.faqA}>
                Todos los productos cuentan con garantía por defectos de confección y cambio de talla en caso de que no te quede a la medida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNER PROMOCIONAL INFERIOR */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>¿Buscas una camiseta retro o una talla especial?</h2>
          <p style={styles.ctaText}>
            Contáctanos directamente. Contamos con servicio de búsqueda de reliquias futboleras y pedidos por encargo.
          </p>
          <Link to="/contacto" style={styles.ctaBtn}>
            Contáctanos Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  featuresSection: {
    padding: '3rem 0',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '1.5rem',
  },
  featureCard: {
    backgroundColor: 'var(--card-bg)',
    padding: '1.75rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '2.2rem',
    marginBottom: '1rem',
    display: 'inline-block',
  },
  featureTitle: {
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  featureDesc: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
  featuredSection: {
    padding: '4rem 0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  sectionSubtitle: {
    color: 'var(--primary)',
    fontSize: '0.85rem',
    fontWeight: '800',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#fff',
    marginTop: '0.3rem',
  },
  viewAllLink: {
    color: 'var(--primary)',
    fontWeight: '700',
    fontSize: '1rem',
    textDecoration: 'none',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '2rem',
  },
  productCard: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s',
  },
  cardImgContainer: {
    position: 'relative',
    height: '220px',
    backgroundColor: '#0f172a',
  },
  productImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryBadge: {
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
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  quickViewBtn: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '5px 12px',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
    whiteSpace: 'nowrap',
  },
  productInfo: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '0.75rem',
    minHeight: '2.6rem',
    cursor: 'pointer',
  },
  productPrice: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: 'var(--primary)',
    marginBottom: '1.25rem',
  },
  addBtn: {
    flex: 1,
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    padding: '10px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  detailsBtn: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '10px 14px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  reviewsSection: {
    padding: '4rem 0',
    backgroundColor: '#0a0f1d',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  reviewCard: {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '18px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  reviewStars: {
    color: '#facc15',
    fontSize: '1.2rem',
    letterSpacing: '2px',
    marginBottom: '1rem',
  },
  reviewText: {
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    fontStyle: 'italic',
    marginBottom: '1.5rem',
  },
  reviewFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '1rem',
  },
  reviewAuthor: {
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: '700',
    margin: 0,
  },
  reviewCity: {
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
  },
  reviewBadge: {
    color: 'var(--primary)',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  faqSection: {
    padding: '4rem 0',
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  faqItem: {
    backgroundColor: '#1e293b',
    padding: '1.75rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  faqQ: {
    color: '#fff',
    fontSize: '1.05rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  faqA: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
  ctaSection: {
    padding: '2rem 1.5rem 5rem 1.5rem',
  },
  ctaCard: {
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#1e293b',
    border: '1px solid var(--primary)',
    padding: '3rem 2rem',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 230, 118, 0.1)',
  },
  ctaTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  ctaText: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    maxWidth: '650px',
    margin: '0 auto 2rem auto',
  },
  ctaBtn: {
    display: 'inline-block',
    backgroundColor: 'var(--primary)',
    color: '#000',
    padding: '12px 30px',
    borderRadius: '10px',
    fontWeight: '800',
    fontSize: '1rem',
    textDecoration: 'none',
  },
};