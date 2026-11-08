import React from 'react';
import { TrendingUp, TrendingDown, Clock, Activity, PieChart } from 'lucide-react';
import { CryptoCoin, Currency } from '../types/crypto';
import { formatCurrency } from '../services/api';

interface MarketBannerProps {
  coins: CryptoCoin[];
  currency: Currency;
  lastUpdated: Date;
  isFallback: boolean;
}

export const MarketBanner: React.FC<MarketBannerProps> = ({
  coins,
  currency,
  lastUpdated,
  isFallback,
}) => {
  // Compute global summary metrics
  const totalMarketCap = coins.reduce((acc, coin) => acc + (coin.market_cap || 0), 0);
  const totalVolume24h = coins.reduce((acc, coin) => acc + (coin.total_volume || 0), 0);
  const btcCoin = coins.find(c => c.id === 'bitcoin' || c.symbol === 'btc');
  const btcDominance = btcCoin && totalMarketCap > 0
    ? ((btcCoin.market_cap / totalMarketCap) * 100).toFixed(1)
    : '54.8';

  // Identify top gainer and top loser
  const sortedByChange = [...coins].sort(
    (a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
  );
  const topGainer = sortedByChange[0];
  const topLoser = sortedByChange[sortedByChange.length - 1];

  const formattedTime = lastUpdated.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/60 py-2.5 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          {/* Key Metrics Strip */}
          <div className="flex items-center gap-6 whitespace-nowrap shrink-0">
            {/* Total Market Cap */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Piyasa Değeri:</span>
              <span className="font-mono text-slate-200 font-semibold" data-tabular="true">
                {formatCurrency(totalMarketCap, currency, { compact: true })}
              </span>
            </div>

            {/* 24h Total Volume */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">24s Hacim:</span>
              <span className="font-mono text-slate-200 font-semibold" data-tabular="true">
                {formatCurrency(totalVolume24h, currency, { compact: true })}
              </span>
            </div>

            {/* BTC Dominance */}
            <div className="flex items-center gap-2">
              <PieChart className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-500 font-medium">BTC Hakimiyeti:</span>
              <span className="font-mono text-amber-400 font-semibold" data-tabular="true">
                %{btcDominance}
              </span>
            </div>

            {/* Top Gainer */}
            {topGainer && (
              <div className="hidden lg:flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-500 font-medium">Günün Kazandıranı:</span>
                <span className="text-slate-200 font-medium">{topGainer.name}</span>
                <span className="font-mono text-emerald-400 font-semibold" data-tabular="true">
                  +{(topGainer.price_change_percentage_24h || 0).toFixed(2)}%
                </span>
              </div>
            )}

            {/* Top Loser */}
            {topLoser && (
              <div className="hidden xl:flex items-center gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-slate-500 font-medium">Günün Düşeni:</span>
                <span className="text-slate-200 font-medium">{topLoser.name}</span>
                <span className="font-mono text-rose-400 font-semibold" data-tabular="true">
                  {(topLoser.price_change_percentage_24h || 0).toFixed(2)}%
                </span>
              </div>
            )}
          </div>

          {/* Feed status & Last Updated */}
          <div className="flex items-center gap-3 text-[11px] whitespace-nowrap shrink-0 ml-auto">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Canlı Akış:</span>
              <span className="text-slate-300 font-medium">
                {isFallback ? 'Kesintisiz Yedek API' : 'CoinGecko API'}
              </span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3 h-3" />
              <span className="font-mono" data-tabular="true">{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
