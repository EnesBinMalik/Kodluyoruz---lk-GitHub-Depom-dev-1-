import React from 'react';
import { ShoppingBag, Search, Sparkles, X, Heart } from 'lucide-react';
import { formatCurrency } from '../data/products';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSignature: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  wishlistCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSignature,
  searchQuery,
  setSearchQuery,
}) => {
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Zone 1: Brand Wordmark & Enes Öztürk Signature */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex flex-col group">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-slate-800 transition-colors">
                ÖZTÜRK<span className="text-amber-600">.</span>STORE
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                Tasarım & Geliştirme: Enes Öztürk
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation & Live Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün adı veya kategori ara..."
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder-slate-400 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Aramayı Temizle"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Zone 3: Actions & Cart Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Arama"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Enes Öztürk Signature Modal Trigger */}
            <button
              onClick={onOpenSignature}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-colors whitespace-nowrap"
              title="Geliştirici Hakkında"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Enes Öztürk</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
              aria-label={`Alışveriş Sepeti, ${cartCount} ürün`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">
                Sepetim
              </span>
              {cartCount > 0 && (
                <span className="text-xs font-bold text-amber-400 pl-1 border-l border-slate-700 tabular-nums hidden sm:inline">
                  {formatCurrency(cartTotal)}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar Drawer */}
        {showMobileSearch && (
          <div className="md:hidden py-3 border-t border-slate-100">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün veya kategori ara..."
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-100 rounded-full border border-slate-200 focus:outline-none focus:border-slate-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
