import React from 'react';
import { Sun, Moon, Sparkles, Award } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleTheme,
  activeNav,
  onSelectNav,
}) => {
  const navItems = ['Ana Sayfa', 'Keşfet', 'Makaleler', 'Web3'];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            E
          </div>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectNav('Ana Sayfa');
            }}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap"
          >
            DevPath<span className="text-indigo-600 dark:text-indigo-400 font-extrabold">.academy</span>
          </a>
        </div>

        {/* Zone 2: 4 nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => onSelectNav(item)}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: XP, CP, and Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* XP Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-bold tabular-nums">4,705</span>
            <span className="text-[11px] font-semibold opacity-75">XP</span>
          </div>

          {/* CP Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/50">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-bold tabular-nums">5</span>
            <span className="text-[11px] font-semibold opacity-75">CP</span>
          </div>

          {/* Switch Teması button */}
          <button
            onClick={onToggleTheme}
            aria-label="Switch teması"
            title="Switch teması"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 whitespace-nowrap cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-600" />
            )}
            <span className="hidden sm:inline">Switch teması</span>
          </button>
        </div>
      </div>
    </header>
  );
};
