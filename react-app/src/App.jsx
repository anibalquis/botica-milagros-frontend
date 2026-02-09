import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { UIProvider } from './contexts/UIContext';
import { SearchProvider } from './contexts/SearchContext';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <CartProvider>
        <UIProvider>
          <SearchProvider>
            <ToastProvider>
              <Routes>
                {/* Login page - without layout */}
                <Route path="/login" element={<Login />} />

                {/* Main layout pages */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/productos" element={<Products />} />
                  <Route path="/productos/:categoria" element={<Products />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/perfil" element={<Profile />} />
                </Route>
              </Routes>
            </ToastProvider>
          </SearchProvider>
        </UIProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
