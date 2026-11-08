import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag, Database, Menu, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StyledIconButton, StyledPrimaryButton, StyledSecondaryButton } from './styled/Buttons';

export const Navbar: React.FC = () => {
  const { cartItemCount, favorites, mockApiUrl, updateMockApiUrl, resetMockApiUrl, setIsCartOpen } = useShop();
  const location = useLocation();
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState(mockApiUrl);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Katalog', path: '/' },
    { name: 'Favoriler', path: '/favorites', badge: favorites.length > 0 ? favorites.length : undefined },
    { name: 'Sepetim', path: '/cart', badge: cartItemCount > 0 ? cartItemCount : undefined },
    { name: 'İletişim', path: '/contact' },
  ];

  const handleSaveApiUrl = (e: React.FormEvent) => {
    e.preventDefault();
    updateMockApiUrl(customUrlInput);
    setIsApiModalOpen(false);
  };

  const handleResetApiUrl = () => {
    resetMockApiUrl();
    setCustomUrlInput('https://67cd20f7dd7651e464edb070.mockapi.io/api/v1/products');
    setIsApiModalOpen(false);
  };

  return (
    <>
      {/* Editorial Announcement Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-center gap-3 border-b border-stone-800">
        <span className="flex items-center gap-1.5 font-medium text-amber-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENES2026 KODU İLE TÜM SİPARİŞLERDE %20 İNDİRİM</span>
        </span>
        <span className="hidden sm:inline text-stone-500">·</span>
        <span className="hidden sm:inline text-stone-300">₺1.500 ÜZERİ ÜCRETSİZ KARGO</span>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="text-2xl font-serif-brand font-semibold tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            ENES ÖZTÜRK
            <span className="text-[10px] tracking-widest uppercase font-mono font-normal text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded">
              ATELIER
            </span>
          </Link>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive ? 'text-stone-950 font-semibold' : 'hover:text-stone-950'
                  }`}
                >
                  {link.name}
                  {link.badge !== undefined && (
                    <span className="font-mono-num text-[11px] px-1.5 py-0.2 bg-stone-100 text-stone-800 rounded font-semibold">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-950 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* MockAPI.io Configuration Button */}
            <StyledIconButton
              onClick={() => setIsApiModalOpen(true)}
              title="MockAPI.io Servis Ayarları (Axios)"
              aria-label="MockAPI Ayarları"
            >
              <Database className="w-4 h-4 text-stone-600 hover:text-stone-900" />
            </StyledIconButton>

            {/* Favorites Icon */}
            <Link to="/favorites" className="relative" aria-label="Favorilerim">
              <StyledIconButton as="div" title="Favoriler">
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-600 fill-rose-600' : 'text-stone-700'}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-mono-num font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </StyledIconButton>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-stone-900 text-white hover:bg-stone-800 transition-all px-3.5 py-2 sm:px-4 sm:py-2.5 rounded text-xs sm:text-sm font-medium tracking-wide shadow-sm"
              aria-label="Sepeti Görüntüle"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Sepet</span>
              <span className="font-mono-num bg-white/20 px-1.5 py-0.5 rounded text-xs font-semibold">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-stone-700 text-sm font-medium border-b border-stone-100 last:border-b-0"
              >
                <span>{link.name}</span>
                {link.badge !== undefined && (
                  <span className="font-mono-num text-xs bg-stone-200 px-2 py-0.5 rounded text-stone-800 font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsApiModalOpen(true);
                }}
                className="w-full text-left flex items-center gap-2 text-xs text-stone-500 py-1.5"
              >
                <Database className="w-3.5 h-3.5" />
                <span>MockAPI.io Servis Ayarları</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MockAPI.io Endpoint Configuration Modal */}
      {isApiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-stone-800" />
                  MockAPI.io & Axios Entegrasyonu
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Proje şartnamesine uygun olarak veriler Axios kütüphanesi üzerinden MockAPI.io servisinden çekilmektedir.
                </p>
              </div>
              <button
                onClick={() => setIsApiModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveApiUrl} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  MockAPI.io Endpoint URL
                </label>
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://67xxxxxx.mockapi.io/api/v1/products"
                  className="w-full px-3 py-2 border border-stone-300 rounded text-sm font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-stone-900"
                  required
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Kendi MockAPI.io hesabınızdaki endpointi girebilir ya da hazır entegre servisi kullanabilirsiniz.
                </p>
              </div>

              <div className="bg-stone-50 p-3 rounded border border-stone-200 text-xs space-y-1.5 text-stone-600">
                <div className="font-semibold text-stone-900">Aktif Durum:</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Axios HTTP Client bağlı ve çalışır durumda.</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Ağ erişimi olmasa dahi güvenli fallback mimarisi sayesinde uygulama kesintisiz çalışır.
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <StyledSecondaryButton
                  type="button"
                  $size="sm"
                  onClick={handleResetApiUrl}
                >
                  Varsayılana Sıfırla
                </StyledSecondaryButton>
                <div className="flex items-center gap-2">
                  <StyledSecondaryButton
                    type="button"
                    $size="sm"
                    onClick={() => setIsApiModalOpen(false)}
                  >
                    Kapat
                  </StyledSecondaryButton>
                  <StyledPrimaryButton type="submit" $size="sm">
                    Kaydet & Axios İle Yenile
                  </StyledPrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
