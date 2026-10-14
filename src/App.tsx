import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import WhatsAppButton from './components/WhatsAppButton';
import Inicio from './views/Inicio';
import Productos from './views/Productos';
import Contacto from './views/Contacto';
import { CartProvider } from './context/CartProvider';
import { WishlistProvider } from './context/WishlistProvider';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
          <Navbar />
          <CartDrawer />
          <WishlistModal />
          <WhatsAppButton />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}