import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useWishlist } from '../context/useWishlist';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const { totalItems, abrirCarrito } = useCart();
  const { totalFavoritos, abrirWishlist } = useWishlist();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* LOGO */}
        <Link to="/" style={styles.logo} onClick={() => setMenuAbierto(false)}>
          GOTOSO<span style={{ color: 'var(--primary)' }}>SPORT</span> PT
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="navDesktop" style={styles.navDesktop}>
          <Link to="/" style={isActive('/') ? styles.activeLink : styles.link}>
            Inicio
          </Link>
          <Link to="/productos" style={isActive('/productos') ? styles.activeLink : styles.link}>
            Productos
          </Link>
          <Link to="/contacto" style={isActive('/contacto') ? styles.activeLink : styles.link}>
            Contacto
          </Link>

          {/* BOTÓN FAVORITOS */}
          <button
            onClick={abrirWishlist}
            style={styles.iconButton}
            title="Ver mis favoritos"
            aria-label="Ver mis favoritos"
          >
            <span>❤️</span>
            {totalFavoritos > 0 && <span style={styles.badgeSmall}>{totalFavoritos}</span>}
          </button>

          {/* BOTÓN INTERACTIVO DEL CARRITO */}
          <button
            onClick={abrirCarrito}
            style={styles.cartButton}
            title="Abrir carrito de compras"
            aria-label="Abrir carrito de compras"
          >
            <span>🛒</span>
            <span style={styles.badgeText}>Carrito</span>
            <span style={styles.badgeNumber}>{totalItems}</span>
          </button>
        </nav>

        {/* CONTROLES MÓVILES */}
        <div className="mobileControls" style={styles.mobileControls}>
          <button
            onClick={abrirWishlist}
            style={styles.cartButtonMobile}
            aria-label="Abrir favoritos"
          >
            ❤️
            {totalFavoritos > 0 && <span style={styles.badgeMobileDot}>{totalFavoritos}</span>}
          </button>

          <button
            onClick={abrirCarrito}
            style={styles.cartButtonMobile}
            aria-label="Abrir carrito"
          >
            🛒
            {totalItems > 0 && <span style={styles.badgeMobileDot}>{totalItems}</span>}
          </button>

          <button
            onClick={() => setMenuAbierto((prev) => !prev)}
            style={styles.hamburgerBtn}
            aria-label="Abrir menú"
          >
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {menuAbierto && (
        <div style={styles.mobileMenu}>
          <Link
            to="/"
            style={isActive('/') ? styles.activeLinkMobile : styles.linkMobile}
            onClick={() => setMenuAbierto(false)}
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            style={isActive('/productos') ? styles.activeLinkMobile : styles.linkMobile}
            onClick={() => setMenuAbierto(false)}
          >
            Productos
          </Link>
          <Link
            to="/contacto"
            style={isActive('/contacto') ? styles.activeLinkMobile : styles.linkMobile}
            onClick={() => setMenuAbierto(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '0.9rem 1.5rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#fff',
    textDecoration: 'none',
  },
  navDesktop: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  link: {
    color: 'var(--text-muted)',
    fontWeight: '600',
    transition: 'color 0.2s',
    textDecoration: 'none',
  },
  activeLink: {
    color: 'var(--primary)',
    fontWeight: '700',
    borderBottom: '2px solid var(--primary)',
    paddingBottom: '4px',
    textDecoration: 'none',
  },
  iconButton: {
    backgroundColor: '#0f172a',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '50%',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    fontSize: '1rem',
  },
  badgeSmall: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#ef4444',
    color: '#fff',
    borderRadius: '10px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '1px 5px',
  },
  cartButton: {
    backgroundColor: '#0f172a',
    border: '1px solid var(--primary)',
    padding: '6px 14px',
    borderRadius: '20px',
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  badgeText: {
    color: '#fff',
    fontSize: '0.85rem',
  },
  badgeNumber: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    padding: '2px 7px',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: '800',
  },
  mobileControls: {
    display: 'none',
    alignItems: 'center',
    gap: '0.75rem',
  },
  cartButtonMobile: {
    backgroundColor: '#0f172a',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#fff',
    borderRadius: '10px',
    padding: '6px 10px',
    fontSize: '1.1rem',
    position: 'relative',
    cursor: 'pointer',
  },
  badgeMobileDot: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    backgroundColor: 'var(--primary)',
    color: '#000',
    borderRadius: '10px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    padding: '2px 5px',
  },
  hamburgerBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.6rem',
    cursor: 'pointer',
    padding: '4px',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  linkMobile: {
    color: 'var(--text-muted)',
    fontWeight: '600',
    padding: '8px 0',
  },
  activeLinkMobile: {
    color: 'var(--primary)',
    fontWeight: '700',
    padding: '8px 0',
  },
};