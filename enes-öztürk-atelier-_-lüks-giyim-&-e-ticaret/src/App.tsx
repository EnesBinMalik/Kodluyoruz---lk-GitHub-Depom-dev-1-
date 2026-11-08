/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { Favorites } from './components/Favorites';
import { Cart } from './components/Cart';
import { Contact } from './components/Contact';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useShop();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-stone-900 text-stone-50 px-4 py-3 rounded-lg shadow-xl border border-stone-800 text-xs font-medium tracking-wide animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              {/* Sayfa ilk açıldığında varsayılan olarak ürünler sayfası bizi karşılamalıdır */}
              <Route path="/" element={<ProductCatalog />} />
              
              {/* Ürün üzerine tıklandığında o ürünün detaylarına ulaşabilmeliyiz */}
              <Route path="/product/:id" element={<ProductDetail />} />
              
              {/* Favoriler Sayfası */}
              <Route path="/favorites" element={<Favorites />} />
              
              {/* Sepet Sayfası */}
              <Route path="/cart" element={<Cart />} />
              
              {/* İletişim Sayfası */}
              <Route path="/contact" element={<Contact />} />
              
              {/* Catch-all route to Catalog */}
              <Route path="*" element={<ProductCatalog />} />
            </Routes>
          </main>

          <CartDrawer />
          <ToastNotification />
          <Footer />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
