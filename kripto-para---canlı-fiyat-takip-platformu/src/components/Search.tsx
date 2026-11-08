import React, { useRef, useEffect } from 'react';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';

interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
  totalCoins: number;
  onQuickFilter?: (symbol: string) => void;
}

export const Search: React.FC<SearchProps> = ({
  searchQuery,
  onSearchChange,
  totalResults,
  totalCoins,
  onQuickFilter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onSearchChange('');
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  const quickPicks = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'AVAX'];

  return (
    <div className="w-full">
      <div className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Main Search Bar */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-400 transition-colors">
            <SearchIcon className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Kripto para ara (örn: Bitcoin, BTC, Ethereum, SOL)..."
            className="w-full pl-10 pr-24 py-3 bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  inputRef.current?.focus();
                }}
                className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
                title="Aramayı Temizle"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Quick Picks & Counter */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="hidden sm:inline text-slate-500">Hızlı Arama:</span>
            {quickPicks.map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => onQuickFilter && onQuickFilter(sym)}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  searchQuery.toUpperCase() === sym
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>

          {/* Results Info */}
          <div className="text-right whitespace-nowrap text-slate-400 pl-2">
            <span className="font-mono text-slate-200 font-semibold" data-tabular="true">
              {totalResults}
            </span>
            <span className="text-slate-500"> / {totalCoins} varlık</span>
          </div>
        </div>
      </div>
    </div>
  );
};
