import React from 'react';
import { RefreshCw, Coins, ArrowRightLeft } from 'lucide-react';
import { Currency } from '../types/crypto';

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onRefresh: () => void;
  isLoading: boolean;
  onOpenConverter: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  onRefresh,
  isLoading,
  onOpenConverter,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single element brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('markets')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Coins className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
                  Kripto<span className="text-amber-400">Para</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
                  Enes Öztürk
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button
              onClick={() => onNavigate('markets')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'markets' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Piyasalar
            </button>
            <button
              onClick={() => onNavigate('top10')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'top10' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              İlk 10 Varlık
            </button>
            <button
              onClick={() => onNavigate('gainers')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'gainers' ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Günün Liderleri
            </button>
            <button
              onClick={onOpenConverter}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Dönüştürücü</span>
            </button>
          </nav>

          {/* Zone 3: Currency selector and primary actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Currency switch */}
            <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => onCurrencyChange('usd')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  currency === 'usd'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD $
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('try')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  currency === 'try'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                TRY ₺
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('eur')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  currency === 'eur'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EUR €
              </button>
            </div>

            {/* Refresh button with dynamic spin */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              title="Canlı Fiyatları Yenile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700/80 rounded-lg transition-all whitespace-nowrap disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Yenile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
