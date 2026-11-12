import React from 'react';
import { Terminal, Moon, Sun, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onQuickTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  onQuickTest,
}) => {
  const navItems = [
    { id: 'console', label: 'Test Konsolu' },
    { id: 'mys', label: 'Müşteri Sistemi' },
    { id: 'routes', label: 'Rota Tablosu' },
    { id: 'tests', label: 'Birim Testleri' },
    { id: 'code', label: 'PHP & TS Kodları' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#console"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('console');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
                <Terminal className="w-4 h-4" />
              </div>
              <span>Router MYS</span>
            </a>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span aria-hidden="true">·</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Enes Öztürk İmzalı</span>
            </span>
          </div>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-slate-900 dark:text-white font-semibold'
                      : 'hover:text-slate-900 dark:hover:text-white text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Tema Değiştir"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onQuickTest}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              Hızlı İstek Gönder
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center gap-4 py-2 overflow-x-auto border-t border-slate-100 dark:border-slate-800/80">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-xs whitespace-nowrap py-1 px-2 rounded-md font-medium ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
