import React, { useState } from 'react';
import { Page } from '../types';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  darkMode,
  setDarkMode,
  onOpenContact
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Anasayfa', page: 'home' },
    { label: 'Hakkımda', page: 'about' },
    { label: 'Blog', page: 'blog' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/90 dark:bg-[#0A0D14]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="group text-left text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-sm"
        >
          <span>Enes Öztürk</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-100 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Zone 2: 3-4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navItems.map((item) => {
            const isActive = currentPage === item.page || (item.page === 'blog' && currentPage === 'blog-detail');
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white rounded-full transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <span>İletişime Geç</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-[#0A0D14] px-6 py-4 space-y-3 animate-in fade-in duration-150">
          {navItems.map((item) => {
            const isActive = currentPage === item.page || (item.page === 'blog' && currentPage === 'blog-detail');
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`block w-full text-left py-2 text-base font-medium transition-colors ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg"
            >
              <span>İletişime Geç</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
