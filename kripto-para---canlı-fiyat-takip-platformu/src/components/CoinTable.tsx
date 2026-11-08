import React from 'react';
import { Star, ChevronUp, ChevronDown, ArrowUpDown, ChevronRight } from 'lucide-react';
import { CryptoCoin, Currency, SortField, SortOrder } from '../types/crypto';
import { formatCurrency } from '../services/api';
import { Sparkline } from './Sparkline';

interface CoinTableProps {
  coins: CryptoCoin[];
  currency: Currency;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCoin: (coin: CryptoCoin) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  isLoading: boolean;
  onResetSearch?: () => void;
}

export const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  currency,
  favorites,
  onToggleFavorite,
  onSelectCoin,
  sortField,
  sortOrder,
  onSort,
  isLoading,
  onResetSearch,
}) => {
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
    );
  };

  if (!isLoading && coins.length === 0) {
    return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
          <Star className="w-6 h-6 text-slate-500" />
        </div>
        <h3 className="text-base font-semibold text-slate-200 mb-1">
          Kriterlere Uygun Kripto Para Bulunamadı
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
          Arama teriminizi değiştirebilir ya da filtreleri temizleyerek tüm para birimlerini listeleyebilirsiniz.
        </p>
        {onResetSearch && (
          <button
            type="button"
            onClick={onResetSearch}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
          >
            Filtreleri Temizle
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-slate-800/80 rounded-2xl bg-slate-900/40 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/80">
              <th className="py-3.5 px-3 w-10 text-center">#</th>
              <th className="py-3.5 px-2 w-8 text-center">Favori</th>
              <th
                onClick={() => onSort('name')}
                className="py-3.5 px-4 cursor-pointer hover:text-slate-200 transition-colors group select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Varlık</span>
                  {renderSortIndicator('name')}
                </div>
              </th>
              <th
                onClick={() => onSort('current_price')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-200 transition-colors group select-none"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Fiyat</span>
                  {renderSortIndicator('current_price')}
                </div>
              </th>
              <th
                onClick={() => onSort('price_change_percentage_24h')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-200 transition-colors group select-none"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>24s Değişim</span>
                  {renderSortIndicator('price_change_percentage_24h')}
                </div>
              </th>
              <th className="py-3.5 px-4 text-right hidden lg:table-cell">24s Aralık (D / Y)</th>
              <th
                onClick={() => onSort('total_volume')}
                className="py-3.5 px-4 text-right hidden sm:table-cell cursor-pointer hover:text-slate-200 transition-colors group select-none"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>24s Hacim</span>
                  {renderSortIndicator('total_volume')}
                </div>
              </th>
              <th
                onClick={() => onSort('market_cap_rank')}
                className="py-3.5 px-4 text-right hidden md:table-cell cursor-pointer hover:text-slate-200 transition-colors group select-none"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Piyasa Değeri</span>
                  {renderSortIndicator('market_cap_rank')}
                </div>
              </th>
              <th className="py-3.5 px-4 text-center hidden xl:table-cell w-36">Son 7 Gün</th>
              <th className="py-3.5 px-3 w-10 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {/* map function to render coins dynamically */}
            {coins.map((coin) => {
              const isFav = favorites.includes(coin.id);
              const change24 = coin.price_change_percentage_24h ?? 0;
              const isPositive = change24 >= 0;
              const sparklinePoints = coin.sparkline_in_7d?.price;

              return (
                <tr
                  key={coin.id}
                  onClick={() => onSelectCoin(coin)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  {/* Rank */}
                  <td className="py-3.5 px-3 text-center text-slate-500 font-mono text-[11px]" data-tabular="true">
                    {coin.market_cap_rank || '—'}
                  </td>

                  {/* Favorite star toggle */}
                  <td className="py-3.5 px-2 text-center">
                    <button
                      type="button"
                      onClick={(e) => onToggleFavorite(coin.id, e)}
                      title={isFav ? 'İzleme listesinden çıkar' : 'İzleme listesine ekle'}
                      className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-600 group-hover:text-slate-400'
                        }`}
                      />
                    </button>
                  </td>

                  {/* Name and Symbol with Logo */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-7 h-7 rounded-full bg-slate-800 shrink-0 object-contain"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Clean fallback for image load failure
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-200 group-hover:text-amber-400 transition-colors truncate">
                          {coin.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Current Price */}
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono text-slate-100 font-semibold text-sm" data-tabular="true">
                      {formatCurrency(coin.current_price, currency)}
                    </span>
                  </td>

                  {/* 24h Change */}
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`font-mono font-medium inline-flex items-center justify-end gap-1 ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                      data-tabular="true"
                    >
                      {isPositive ? '+' : ''}
                      {change24.toFixed(2)}%
                    </span>
                  </td>

                  {/* 24h High / Low Range */}
                  <td className="py-3.5 px-4 text-right hidden lg:table-cell text-slate-400 font-mono text-[11px]" data-tabular="true">
                    <div className="flex flex-col items-end">
                      <span className="text-slate-300">{formatCurrency(coin.high_24h, currency)}</span>
                      <span className="text-slate-500">{formatCurrency(coin.low_24h, currency)}</span>
                    </div>
                  </td>

                  {/* 24h Volume */}
                  <td className="py-3.5 px-4 text-right hidden sm:table-cell font-mono text-slate-300" data-tabular="true">
                    {formatCurrency(coin.total_volume, currency, { compact: true })}
                  </td>

                  {/* Market Cap */}
                  <td className="py-3.5 px-4 text-right hidden md:table-cell font-mono text-slate-300 font-medium" data-tabular="true">
                    {formatCurrency(coin.market_cap, currency, { compact: true })}
                  </td>

                  {/* 7d Sparkline Chart */}
                  <td className="py-3 px-4 hidden xl:table-cell">
                    <div className="flex items-center justify-center">
                      <Sparkline
                        data={sparklinePoints}
                        isPositive={isPositive}
                        width={120}
                        height={32}
                      />
                    </div>
                  </td>

                  {/* Action link */}
                  <td className="py-3.5 px-3 text-center text-slate-600 group-hover:text-slate-300 transition-colors">
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
