import React from 'react';
import { BookOpen, Bookmark, Moon, Sun, Sparkles } from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onResetSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  onOpenFavorites,
  isDark,
  onToggleDark,
  onResetSearch,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand / Logo with Enes Öztürk Signature */}
        <button
          onClick={onResetSearch}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-700 dark:bg-amber-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Kitap Arama
              </span>
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                Enes Öztürk
              </span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-400 font-sans hidden sm:block">
              Google Books API Kütüphanesi
            </p>
          </div>
        </button>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Reset */}
          <button
            onClick={onResetSearch}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Öne Çıkanlar</span>
          </button>

          {/* Favorites & Reading List Button */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            title="Okuma Listesi ve Favoriler"
          >
            <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Okuma Listem</span>
            {favoritesCount > 0 && (
              <span className="bg-amber-700 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDark}
            aria-label={isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
