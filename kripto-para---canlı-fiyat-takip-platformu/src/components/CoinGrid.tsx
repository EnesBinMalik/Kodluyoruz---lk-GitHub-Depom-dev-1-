import React from 'react';
import { Star, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { CryptoCoin, Currency } from '../types/crypto';
import { formatCurrency } from '../services/api';
import { Sparkline } from './Sparkline';

interface CoinGridProps {
  coins: CryptoCoin[];
  currency: Currency;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCoin: (coin: CryptoCoin) => void;
  isLoading: boolean;
}

export const CoinGrid: React.FC<CoinGridProps> = ({
  coins,
  currency,
  favorites,
  onToggleFavorite,
  onSelectCoin,
  isLoading,
}) => {
  if (!isLoading && coins.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        Kriterlere uygun kripto para bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* map function for cards */}
      {coins.map((coin) => {
        const isFav = favorites.includes(coin.id);
        const change24 = coin.price_change_percentage_24h ?? 0;
        const isPositive = change24 >= 0;
        const sparklinePoints = coin.sparkline_in_7d?.price;

        return (
          <div
            key={coin.id}
            onClick={() => onSelectCoin(coin)}
            className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full bg-slate-800 shrink-0 object-contain"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-100 group-hover:text-amber-400 transition-colors truncate text-sm">
                      {coin.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono" data-tabular="true">
                      #{coin.market_cap_rank}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    {coin.symbol}
                  </span>
                </div>
              </div>

              {/* Favorite button */}
              <button
                type="button"
                onClick={(e) => onToggleFavorite(coin.id, e)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                title={isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              >
                <Star
                  className={`w-4 h-4 ${
                    isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                  }`}
                />
              </button>
            </div>

            {/* Price & Change */}
            <div className="my-2">
              <div className="text-xl font-bold font-mono text-white tracking-tight" data-tabular="true">
                {formatCurrency(coin.current_price, currency)}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                {isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span
                  className={`text-xs font-mono font-semibold ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                  data-tabular="true"
                >
                  {isPositive ? '+' : ''}
                  {change24.toFixed(2)}%
                </span>
                <span className="text-[10px] text-slate-500">24s</span>
              </div>
            </div>

            {/* Sparkline */}
            <div className="my-3 py-2 border-y border-slate-800/60 flex items-center justify-center">
              <Sparkline
                data={sparklinePoints}
                isPositive={isPositive}
                width={200}
                height={40}
              />
            </div>

            {/* Card Footer Details */}
            <div className="pt-1 text-[11px] space-y-1.5 text-slate-400 font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-sans">24s Hacim:</span>
                <span className="text-slate-300" data-tabular="true">
                  {formatCurrency(coin.total_volume, currency, { compact: true })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-sans">Piyasa Değeri:</span>
                <span className="text-slate-300" data-tabular="true">
                  {formatCurrency(coin.market_cap, currency, { compact: true })}
                </span>
              </div>
            </div>

            {/* Open prompt */}
            <div className="mt-3 pt-2 text-[11px] text-amber-400/90 font-medium flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Detayları İncele</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
