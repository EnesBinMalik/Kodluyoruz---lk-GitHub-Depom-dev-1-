import React, { useState } from 'react';
import { Search, X, Filter, Book, User, Building2 } from 'lucide-react';
import { SearchFilterType } from '../types/book';

interface SearchBarProps {
  onSearch: (query: string, filterType: SearchFilterType) => void;
  isLoading: boolean;
  initialQuery?: string;
  initialFilter?: SearchFilterType;
}

const QUICK_SUGGESTIONS = [
  { label: 'Kürk Mantolu Madonna', type: 'title' as SearchFilterType },
  { label: 'Sabahattin Ali', type: 'author' as SearchFilterType },
  { label: 'Suç ve Ceza', type: 'title' as SearchFilterType },
  { label: 'Dostoyevski', type: 'author' as SearchFilterType },
  { label: 'Şeker Portakalı', type: 'title' as SearchFilterType },
  { label: 'Yaşar Kemal', type: 'author' as SearchFilterType },
  { label: 'Stefan Zweig', type: 'author' as SearchFilterType },
  { label: 'Simyacı', type: 'title' as SearchFilterType },
  { label: '1984 George Orwell', type: 'all' as SearchFilterType },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  initialQuery = '',
  initialFilter = 'all',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<SearchFilterType>(initialFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), filterType);
    }
  };

  const handleSuggestionClick = (text: string, type: SearchFilterType) => {
    setQuery(text);
    setFilterType(type);
    onSearch(text, type);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Form - Submits only on Enter or Button Click */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 p-2 sm:p-2.5 transition-all focus-within:ring-2 focus-within:ring-amber-600/30 focus-within:border-amber-600"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Filter Type Selector */}
          <div className="relative shrink-0">
            <label htmlFor="search-filter-select" className="sr-only">Arama Kriteri</label>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300">
              <Filter className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <select
                id="search-filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as SearchFilterType)}
                className="bg-transparent border-none text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer pr-1"
              >
                <option value="all" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">
                  Tümü
                </option>
                <option value="title" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">
                  Kitap Adı
                </option>
                <option value="author" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">
                  Yazar Adı
                </option>
                <option value="publisher" className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">
                  Yayınevi
                </option>
              </select>
            </div>
          </div>

          {/* Search Text Input */}
          <div className="relative flex-1 flex items-center min-w-0">
            <Search className="w-5 h-5 text-stone-400 dark:text-stone-500 ml-2 shrink-0 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                filterType === 'title'
                  ? 'Kitap adı girin... (örn: İnce Memed, Tutunamayanlar)'
                  : filterType === 'author'
                  ? 'Yazar adı girin... (örn: Sabahattin Ali, Dostoyevski)'
                  : filterType === 'publisher'
                  ? 'Yayınevi adı girin... (örn: Can Yayınları, İletişim)'
                  : 'Kitap veya yazar ismi yazın... (örn: Simyacı, Franz Kafka)'
              }
              className="w-full py-2.5 px-3 bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 mr-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full transition-colors"
                title="Temizle"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 disabled:bg-stone-300 dark:disabled:bg-stone-800 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Aranıyor...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Kitap Ara</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-4 flex items-center flex-wrap gap-2 text-xs">
        <span className="text-stone-600 dark:text-stone-400 font-medium shrink-0">Hızlı Arama:</span>
        {QUICK_SUGGESTIONS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleSuggestionClick(item.label, item.type)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-800/60 transition-colors cursor-pointer"
          >
            {item.type === 'author' ? (
              <User className="w-3 h-3 text-stone-400" />
            ) : item.type === 'publisher' ? (
              <Building2 className="w-3 h-3 text-stone-400" />
            ) : (
              <Book className="w-3 h-3 text-stone-400" />
            )}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
