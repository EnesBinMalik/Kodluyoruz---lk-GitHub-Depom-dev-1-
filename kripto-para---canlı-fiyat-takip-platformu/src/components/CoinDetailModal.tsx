import React, { useState } from 'react';
import { X, Star, TrendingUp, TrendingDown, ExternalLink, Calculator, ArrowRight } from 'lucide-react';
import { CryptoCoin, Currency } from '../types/crypto';
import { formatCurrency, formatNumber } from '../services/api';
import { Sparkline } from './Sparkline';

interface CoinDetailModalProps {
  coin: CryptoCoin | null;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onClose: () => void;
}

export const CoinDetailModal: React.FC<CoinDetailModalProps> = ({
  coin,
  currency,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  const [converterAmount, setConverterAmount] = useState<string>('1');

  if (!coin) return null;

  const change24 = coin.price_change_percentage_24h ?? 0;
  const isPositive = change24 >= 0;
  const numAmount = parseFloat(converterAmount) || 0;
  const convertedTotal = numAmount * coin.current_price;

  // 24h Range calculation
  const low24 = coin.low_24h || coin.current_price * 0.95;
  const high24 = coin.high_24h || coin.current_price * 1.05;
  const rangeSpan = high24 - low24 || 1;
  const currentPosition = Math.min(
    Math.max(((coin.current_price - low24) / rangeSpan) * 100, 0),
    100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-start justify-between gap-4 bg-slate-900/90">
          <div className="flex items-center gap-4">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-12 h-12 rounded-full bg-slate-800 p-0.5 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{coin.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-semibold uppercase">
                  {coin.symbol}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  #{coin.market_cap_rank}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-bold font-mono text-white tracking-tight" data-tabular="true">
                  {formatCurrency(coin.current_price, currency)}
                </span>
                <span
                  className={`font-mono text-sm font-semibold inline-flex items-center gap-1 ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                  data-tabular="true"
                >
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {isPositive ? '+' : ''}
                  {change24.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => onToggleFavorite(coin.id, e)}
              className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              title={isFavorite ? 'İzleme listesinden çıkar' : 'İzleme listesine ekle'}
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-amber-400 text-amber-400' : ''
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* 7-Day Sparkline overview */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Son 7 Günlük Fiyat Trendi
              </span>
              <span
                className={`text-xs font-mono font-medium ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? 'Yükseliş Trendi' : 'Düşüş Trendi'}
              </span>
            </div>
            <div className="py-2 flex justify-center">
              <Sparkline
                data={coin.sparkline_in_7d?.price}
                isPositive={isPositive}
                width={520}
                height={90}
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* 24-Hour Range Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>24s En Düşük: <strong className="font-mono text-slate-200" data-tabular="true">{formatCurrency(low24, currency)}</strong></span>
              <span>24s En Yüksek: <strong className="font-mono text-slate-200" data-tabular="true">{formatCurrency(high24, currency)}</strong></span>
            </div>
            <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full"
                style={{ width: `${currentPosition}%` }}
              />
            </div>
          </div>

          {/* Detailed Financial Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">Piyasa Değeri</span>
              <span className="font-mono text-sm font-semibold text-slate-100" data-tabular="true">
                {formatCurrency(coin.market_cap, currency, { compact: true })}
              </span>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">24 Saatlik Hacim</span>
              <span className="font-mono text-sm font-semibold text-slate-100" data-tabular="true">
                {formatCurrency(coin.total_volume, currency, { compact: true })}
              </span>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">Dolaşımdaki Arz</span>
              <span className="font-mono text-sm font-semibold text-slate-100" data-tabular="true">
                {formatNumber(coin.circulating_supply, { compact: true })} {coin.symbol.toUpperCase()}
              </span>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">Toplam Arz</span>
              <span className="font-mono text-sm font-semibold text-slate-100" data-tabular="true">
                {coin.total_supply ? `${formatNumber(coin.total_supply, { compact: true })} ${coin.symbol.toUpperCase()}` : 'Sınırsız'}
              </span>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">Tüm Zamanlar Zirvesi (ATH)</span>
              <span className="font-mono text-sm font-semibold text-slate-100" data-tabular="true">
                {formatCurrency(coin.ath, currency)}
              </span>
            </div>

            <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">ATH Farkı</span>
              <span
                className={`font-mono text-sm font-semibold ${
                  (coin.ath_change_percentage || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
                data-tabular="true"
              >
                {(coin.ath_change_percentage || 0).toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Quick Coin Converter */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Hızlı {coin.name} Dönüştürücü
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={converterAmount}
                  onChange={(e) => setConverterAmount(e.target.value)}
                  className="w-full bg-transparent text-slate-100 font-mono text-sm focus:outline-none"
                  placeholder="Miktar"
                />
                <span className="text-xs font-mono font-bold text-amber-400 uppercase shrink-0">
                  {coin.symbol}
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2">
                <span className="font-mono text-slate-100 font-semibold text-sm truncate" data-tabular="true">
                  {formatCurrency(convertedTotal, currency)}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase shrink-0">
                  {currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <span>Veri Kaynağı: Gerçek Zamanlı Kripto Ağı</span>
          <a
            href={`https://www.coingecko.com/en/coins/${coin.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            <span>Detaylı Piyasa Raporu</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
