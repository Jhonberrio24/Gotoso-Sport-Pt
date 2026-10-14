# Gotoso Sport PT ⚽🏆

Tienda web moderna de artículos deportivos y fútbol desarrollada con **React 19**, **TypeScript** y **Vite**.

## Presentación del emprendimiento

**Gotoso Sport PT** es una propuesta de tienda virtual para aficionados, jugadores y coleccionistas de fútbol. Busca facilitar la búsqueda de artículos deportivos reunidos en un solo catálogo y ayudar a cada cliente a elegir según su presupuesto, uso y talla. Ofrece camisetas, uniformes, balones, calzado y accesorios; la aplicación incluye navegación por vistas, carrito, favoritos y un catálogo de productos. Los precios, productos, reseñas y políticas que aparecen en la interfaz son contenido de demostración.

La tienda es un prototipo académico: el formulario de contacto no envía ni almacena mensajes, y los datos de contacto marcados como demostración deben reemplazarse antes de publicar.

---

## 🚀 Características y Funcionalidades

### 1. 🛒 Carrito de Compras Avanzado
- **Panel lateral (Drawer):** Despliegue fluido sin recargar la página.
- **Cupones de Descuento:** Aplica códigos promocionales (`GOTOSO10`, `BIENVENIDA`, `FUTBOL20`) con cálculo de descuento inmediato.
- **Selector de Tallas:** Guarda la talla elegida por producto en el carrito (ej. *Camiseta Junior 2004 - Talla L*).
- **Checkout por WhatsApp:** Genera automáticamente el mensaje detallado con productos, tallas, cantidades, descuentos y monto total listo para enviar.
- **Persistencia:** Guarda los productos en `localStorage` para que no se pierdan al recargar.

### 2. 👁️ Modal de Vista Rápida de Producto
- Inspecciona fotografías en alta definición, detalles del tejido y especificaciones oficiales.
- Selector interactivo de tallas para camisetas, uniformes y calzado.
- Botones de compra directa por WhatsApp y adición rápida al carrito.

### 3. ❤️ Lista de Deseos / Favoritos (Wishlist)
- Marca cualquier prenda o balón como favorito con el ícono de corazón.
- Contador reactivo en el Navbar y panel modal para revisar o transferir favoritos al carrito de compras.
- Sincronizado en `localStorage`.

### 4. 🔍 Catálogo con Búsqueda y Filtros en Tiempo Real
- Buscador instantáneo por texto (equipo, prenda, tipo de producto).
- Píldoras de categorías (*Retro, Coleccionables, Autógrafos, Equipaciones, Internacional, Calzado, etc.*).
- Ordenamiento por precio (menor a mayor, mayor a menor), nombre o recomendados.

### 5. 💬 Botón Flotante de WhatsApp
- Burbuja flotante persistente en la esquina inferior con tooltip para resolver dudas de inmediato desde cualquier pantalla.

### 6. ⭐ Prueba Social y Preguntas Frecuentes (FAQ)
- Testimonios con calificaciones de 5 estrellas y sellos de compradores verificados en la página de inicio.
- Acordeón de respuestas a dudas habituales sobre medios de pago, envíos y garantías.

---

## 📁 Estructura del Proyecto

```text
gotoso-sport-pt/
├── public/                     # Archivos estáticos e íconos
├── src/
│   ├── assets/                 # Imágenes y recursos multimedia
│   ├── components/             # Componentes reutilizables
│   │   ├── CartDrawer.tsx      # Carrito lateral con cupones y checkout WhatsApp
│   │   ├── Card.tsx            # Tarjeta de producto reutilizable con props
│   │   ├── Footer.tsx          # Pie de página y redes sociales
│   │   ├── Hero.tsx            # Banner principal de inicio
│   │   ├── Navbar.tsx          # Barra superior con carrito y favoritos
│   │   ├── ProductModal.tsx    # Modal de vista rápida y tallas
│   │   ├── WhatsAppButton.tsx  # Botón flotante de atención directa
│   │   └── WishlistModal.tsx   # Panel de productos favoritos
│   ├── context/                # Estado global de la aplicación
│   │   ├── CartProvider.tsx    # Proveedor del carrito
│   │   ├── cartTypes.ts        # Tipos y contexto del carrito
│   │   ├── useCart.ts          # Hook para consumir el carrito
│   │   ├── WishlistProvider.tsx# Proveedor de favoritos
│   │   ├── wishlistTypes.ts    # Tipos y contexto de favoritos
│   │   └── useWishlist.ts      # Hook para consumir favoritos
│   ├── data/
│   │   └── productos.ts        # Base de datos de productos y cupones
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript compartidas
│   ├── views/                  # Vistas principales
│   │   ├── Contacto.tsx        # Formulario y canales de soporte
│   │   ├── Inicio.tsx          # Home con Hero, testimonios y FAQ
│   │   └── Productos.tsx       # Catálogo con filtros y búsqueda
│   ├── App.tsx                 # Enrutamiento y proveedores globales
│   ├── index.css               # Variables de estilo globales y tema
│   └── main.tsx                # Punto de entrada de React
├── index.html                  # Plantilla HTML en español
└── package.json                # Dependencias y scripts
```

---

## 🛠️ Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo con HMR
npm run dev

# Compilar proyecto para producción
npm run build

# Validar calidad de código con ESLint
npm run lint
```

## Evidencias para la actividad

Antes de entregar, toma una captura de cada vista con la dirección visible en el navegador:

- Inicio: `/`
- Productos: `/productos`
- Contacto: `/contacto`

En la sustentación, demuestra la navegación entre las tres rutas y explica el uso de componentes, props y `map()` para mostrar los productos. Si trabajan dos integrantes, ambos deben explicar una parte del proyecto.
