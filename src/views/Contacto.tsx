import { useState } from 'react';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && email && mensaje) {
      setEnviado(true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.badge}>CANALES DE ATENCIÓN</span>
        <h1 style={styles.title}>Ponte en Contacto</h1>
        <p style={styles.subtitle}>
          ¿Tienes dudas sobre un producto, quieres encargar una camiseta o consultar el estado de tu pedido? Estamos listos para ayudarte.
        </p>
      </div>

      <div style={styles.mainGrid}>
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div style={styles.card}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#fff', fontWeight: '800' }}>
            Envíanos un Mensaje
          </h2>

          {enviado ? (
            <div style={styles.successBox}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✓</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                ¡Gracias por tu mensaje, {nombre}!
              </h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Esta es una demostración: el formulario validó tus datos, pero no envió ni guardó el mensaje.
                Para recibir consultas reales, conecta el formulario a un servicio de correo o a un backend.
              </p>
              <button
                onClick={() => {
                  setEnviado(false);
                  setNombre('');
                  setEmail('');
                  setTelefono('');
                  setMensaje('');
                }}
                style={styles.btnReset}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div>
                <label htmlFor="contacto-nombre" style={styles.label}>Nombre Completo *</label>
                <input
                  id="contacto-nombre"
                  type="text"
                  name="nombre"
                  autoComplete="name"
                  required
                  placeholder="Tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div>
                <label htmlFor="contacto-email" style={styles.label}>Correo Electrónico *</label>
                <input
                  id="contacto-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div>
                <label htmlFor="contacto-telefono" style={styles.label}>Teléfono / WhatsApp</label>
                <input
                  id="contacto-telefono"
                  type="tel"
                  name="telefono"
                  autoComplete="tel"
                  placeholder="Ej: +57 300 123 4567"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div>
                <label htmlFor="contacto-mensaje" style={styles.label}>Mensaje o Consulta *</label>
                <textarea
                  id="contacto-mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.btnSubmit}>
                Enviar Mensaje ✉️
              </button>
            </form>
          )}
        </div>

        {/* COLUMNA DERECHA: ATENCIÓN INMEDIATA Y PREGUNTAS FRECUENTES */}
        <div style={styles.sidebar}>
          {/* TARJETA WHATSAPP DIRECTO */}
          <div style={styles.whatsappCard}>
            <div style={styles.whatsappIcon}>💬</div>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '800' }}>
              ¿Prefieres atención inmediata?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Contacto de demostración: +57 300 000 0000. Reemplaza este número de ejemplo por la línea real del emprendimiento antes de publicar.
            </p>
            <a
              href="https://wa.me/573000000000?text=Hola%20Gotoso%20Sport%20PT,%20deseo%20hacer%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.whatsappBtn}
            >
              Probar enlace de WhatsApp ➔
            </a>
          </div>

          {/* DATOS DE CONTACTO */}
          <div style={styles.card}>
            <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '1rem', fontWeight: '700' }}>
              Información de la Tienda
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
              Datos comerciales de ejemplo para esta actividad.
            </p>
            <ul style={styles.infoList}>
              <li style={styles.infoItem}>
                <span style={styles.infoIcon}>✉️</span>
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>Correo de demostración</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    contacto@gotososportpt.example
                  </span>
                </div>
              </li>
              <li style={styles.infoItem}>
                <span style={styles.infoIcon}>🕒</span>
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>Horario de Atención</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Lunes a Sábado: 8:00 AM - 8:00 PM
                  </span>
                </div>
              </li>
              <li style={styles.infoItem}>
                <span style={styles.infoIcon}>📦</span>
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>Envíos Nacionales</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Despachos en 24 a 48 horas hábiles
                  </span>
                </div>
              </li>
              <li style={styles.infoItem}>
                <span style={styles.infoIcon}>🛡️</span>
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>Garantía Total</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Cambios por talla y garantía de satisfacción
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1100px',
    margin: '3rem auto 5rem auto',
    padding: '0 1.5rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    color: 'var(--primary)',
    border: '1px solid rgba(0, 230, 118, 0.3)',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '1rem',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    color: '#fff',
    fontWeight: '900',
    marginBottom: '0.75rem',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.05rem',
    maxWidth: '650px',
    margin: '0 auto',
    lineHeight: 1.5,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    alignItems: 'start',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    padding: '2.5rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: '#0f172a',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btnSubmit: {
    backgroundColor: 'var(--primary)',
    color: '#000',
    border: 'none',
    padding: '13px',
    borderRadius: '10px',
    fontWeight: '800',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '0.75rem',
  },
  successBox: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    border: '1px solid var(--primary)',
    padding: '2rem',
    borderRadius: '16px',
    textAlign: 'center',
  },
  btnReset: {
    marginTop: '1.5rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--primary)',
    color: 'var(--primary)',
    padding: '8px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  whatsappCard: {
    backgroundColor: 'linear-gradient(135deg, #1e293b 0%, #064e3b 100%)',
    border: '1px solid rgba(37, 211, 102, 0.4)',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(37, 211, 102, 0.15)',
  },
  whatsappIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  whatsappBtn: {
    display: 'block',
    backgroundColor: '#25D366',
    color: '#fff',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: '800',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  infoList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  infoIcon: {
    fontSize: '1.5rem',
    backgroundColor: '#0f172a',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
};