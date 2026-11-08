import React from 'react';
import { LayoutGrid, Table, ArrowUpDown, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { FilterCategory, ViewMode, SortField, SortOrder } from '../types/crypto';

interface FilterBarProps {
  filterCategory: FilterCategory;
  onFilterChange: (category: FilterCategory) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  favoritesCount: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterCategory,
  onFilterChange,
  viewMode,
  onViewModeChange,
  favoritesCount,
  sortField,
  sortOrder,
  onSortChange,
}) => {
  const categories: { id: FilterCategory; label: string; icon?: React.ReactNode; count?: number }[] = [
    { id: 'all', label: 'Tüm Kripto Paralar' },
    { id: 'top10', label: 'İlk 10 Sıralama' },
    { id: 'gainers', label: 'En Çok Kazandıranlar', icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'losers', label: 'En Çok Kaybettirenler', icon: <TrendingDown className="w-3.5 h-3.5 text-rose-400" /> },
    {
      id: 'favorites',
      label: 'İzleme Listem',
      icon: <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />,
      count: favoritesCount,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
      {/* Category Segmented Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
        {categories.map((cat) => {
          const isActive = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onFilterChange(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              {cat.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* View Switcher & Mobile Sort */}
      <div className="flex items-center justify-end gap-2 shrink-0">
        {/* Sort selector for small screens */}
        <div className="sm:hidden flex items-center">
          <select
            value={`${sortField}-${sortOrder}`}
            onChange={(e) => {
              const [field] = e.target.value.split('-') as [SortField, SortOrder];
              onSortChange(field);
            }}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="market_cap_rank-asc">Sıralama: Piyasa Değeri</option>
            <option value="current_price-desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="current_price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price_change_percentage_24h-desc">Değişim: En Çok Artan</option>
            <option value="price_change_percentage_24h-asc">Değişim: En Çok Düşen</option>
            <option value="total_volume-desc">Hacim: En Yüksek</option>
          </select>
        </div>

        {/* View mode toggle buttons (Table vs Grid) */}
        <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            type="button"
            onClick={() => onViewModeChange('table')}
            title="Tablo Görünümü"
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'table'
                ? 'bg-slate-800 text-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            title="Kart (Izgara) Görünümü"
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-slate-800 text-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
