import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* COLUMNA 1: MARCA E INFORMACIÓN */}
        <div style={styles.brandCol}>
          <h3 style={styles.logo}>
            GOTOSO<span style={{ color: 'var(--primary)' }}>SPORT</span> PT
          </h3>
          <p style={styles.description}>
            Tu tienda de confianza para equipamiento deportivo de fútbol. Calidad, rendimiento y diseño único en cada prenda y accesorio.
          </p>
        </div>

        {/* COLUMNA 2: ENLACES RÁPIDOS */}
        <div style={styles.col}>
          <h4 style={styles.title}>Navegación</h4>
          <ul style={styles.list}>
            <li><Link to="/" style={styles.link}>Inicio</Link></li>
            <li><Link to="/productos" style={styles.link}>Productos</Link></li>
            <li><Link to="/contacto" style={styles.link}>Contacto</Link></li>
          </ul>
        </div>

        {/* COLUMNA 3: REDES SOCIALES */}
        <div style={styles.col}>
          <h4 style={styles.title}>Síguenos</h4>
          <div style={styles.socialContainer}>
            <a href="#instagram" style={styles.socialLink} onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#facebook" style={styles.socialLink} onClick={(e) => e.preventDefault()}>Facebook</a>
            <a href="#tiktok" style={styles.socialLink} onClick={(e) => e.preventDefault()}>TikTok</a>
            <a href="#x" style={styles.socialLink} onClick={(e) => e.preventDefault()}>X (Twitter)</a>
          </div>
        </div>

      </div>

      {/* DERECHOS DE AUTOR */}
      <div style={styles.copyright}>
        <p>© {new Date().getFullYear()} Gotoso Sport PT. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    marginTop: 'auto',
    paddingTop: '3rem',
    color: 'var(--text-muted)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem 2.5rem 1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2.5rem',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '1px',
  },
  description: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: 'var(--text-muted)',
  },
  col: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  title: {
    fontSize: '1.1rem',
    color: '#fff',
    fontWeight: '700',
    borderBottom: '2px solid var(--primary)',
    display: 'inline-block',
    paddingBottom: '4px',
    width: 'fit-content',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.6rem',
  },
  link: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
  },
  socialContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.6rem',
  },
  socialLink: {
    color: 'var(--primary)',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  copyright: {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center' as const,
    padding: '1.2rem',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    backgroundColor: '#0a0f1d',
  },
};