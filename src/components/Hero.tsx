import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* BADGE DESTACADO */}
        <div style={styles.badge}>
          <span>⚽</span>
          <span>TIENDA OFICIAL DEPORTIVA</span>
        </div>

        <h1 style={styles.title}>
          EQUÍPATE PARA GANAR CON <br />
          <span style={styles.highlight}>GOTOSO SPORT PT</span>
        </h1>

        <p style={styles.subtitle}>
          Encuentra camisetas retro, balones de competición, guayos profesionales e indumentaria de alta calidad para llevar tu pasión futbolera al siguiente nivel.
        </p>

        {/* BOTONES DE ACCIÓN */}
        <div style={styles.btnGroup}>
          <Link to="/productos" style={styles.primaryBtn}>
            Ver Catálogo Completo ➔
          </Link>
          <a
            href="https://wa.me/573000000000?text=Hola%20Gotoso%20Sport%20PT,%20quiero%20más%20información%20sobre%20sus%20productos"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.secondaryBtn}
          >
            WhatsApp (demo) 💬
          </a>
        </div>

        {/* MÉTRICAS / CONFIANZA */}
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>100%</span>
            <span style={styles.statLabel}>Autenticidad & Calidad</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNumber}>🇨🇴</span>
            <span style={styles.statLabel}>Envíos a todo el país</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statNumber}>+500</span>
            <span style={styles.statLabel}>Futbolistas Satisfechos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '4rem 1rem 3rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    background: 'radial-gradient(circle at 50% 20%, rgba(0, 230, 118, 0.08) 0%, transparent 60%)',
  },
  container: {
    maxWidth: '860px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: 'var(--card-bg)',
    padding: '3.5rem 2rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    color: 'var(--primary)',
    border: '1px solid rgba(0, 230, 118, 0.3)',
    padding: '6px 16px',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: '900',
    marginBottom: '1.2rem',
    color: '#fff',
    lineHeight: 1.15,
  },
  highlight: {
    color: 'var(--primary)',
    textShadow: '0 0 20px rgba(0, 230, 118, 0.3)',
  },
  subtitle: {
    fontSize: '1.15rem',
    color: 'var(--text-muted)',
    marginBottom: '2.5rem',
    maxWidth: '680px',
    lineHeight: 1.6,
  },
  btnGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  primaryBtn: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    padding: '14px 32px',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: '1.05rem',
    textDecoration: 'none',
    boxShadow: '0 8px 20px rgba(0, 230, 118, 0.3)',
    transition: 'transform 0.2s, background-color 0.2s',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '14px 28px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  statsGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--primary)',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  statDivider: {
    width: '1px',
    height: '35px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};
