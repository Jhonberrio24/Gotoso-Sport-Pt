import { useState } from 'react';

export default function WhatsAppButton() {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  const handleClick = () => {
    const mensaje = '¡Hola Gotoso Sport PT! Tengo una consulta sobre los productos de la tienda.';
    const url = `https://wa.me/573000000000?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={styles.floatingContainer}>
      {mostrarTooltip && (
        <div style={styles.tooltip}>
          <span style={styles.tooltipTitle}>¿Tienes dudas?</span>
          <span style={styles.tooltipText}>Enlace de demostración: reemplaza el número antes de publicar.</span>
        </div>
      )}

      <button
        onClick={handleClick}
        onMouseEnter={() => setMostrarTooltip(true)}
        onMouseLeave={() => setMostrarTooltip(false)}
        style={styles.button}
        title="Abrir WhatsApp de demostración"
        aria-label="Abrir WhatsApp de demostración"
      >
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="#fff"
          style={{ display: 'block' }}
        >
          <path d="M16.01 2.01C8.28 2.01 2 8.29 2 16.02c0 2.47.64 4.87 1.87 6.99L2 30l7.21-1.89c2.05 1.12 4.36 1.71 6.8 1.71 7.73 0 14.01-6.28 14.01-14.01 0-7.73-6.28-14.01-14.01-14.01zm0 25.63c-2.18 0-4.31-.59-6.17-1.7l-.44-.26-4.58 1.2 1.22-4.46-.29-.46c-1.22-1.94-1.87-4.19-1.87-6.5 0-6.42 5.22-11.64 11.64-11.64 6.42 0 11.64 5.22 11.64 11.64 0 6.42-5.22 11.64-11.64 11.64zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.11 1.37-.2.23-.41.26-.76.09-.35-.18-1.48-.55-2.82-1.74-1.04-.93-1.75-2.08-1.95-2.43-.2-.35-.02-.54.15-.71.16-.16.35-.41.53-.61.18-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.18-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.66c-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.18.23 2.46 3.76 5.96 5.27.83.36 1.48.58 1.99.74.84.27 1.6.23 2.21.14.67-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.08-.14-.31-.23-.66-.41z" />
        </svg>
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  floatingContainer: {
    position: 'fixed',
    bottom: '24px',
    left: '24px',
    zIndex: 998,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  button: {
    backgroundColor: '#25D366',
    border: 'none',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  tooltip: {
    backgroundColor: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '8px 14px',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  tooltipTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: '0.82rem',
  },
  tooltipText: {
    color: 'var(--primary)',
    fontSize: '0.78rem',
  },
};
