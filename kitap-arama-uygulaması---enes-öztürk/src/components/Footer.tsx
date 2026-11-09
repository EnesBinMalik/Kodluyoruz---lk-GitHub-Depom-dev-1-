import React from 'react';
import { BookOpen, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Project Info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-lg bg-amber-700 dark:bg-amber-600 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                Proje 4 · Kitap Arama Uygulaması
              </p>
              <p className="text-xs text-stone-700 dark:text-stone-400">
                Google Books API Entegrasyonu ile Geliştirilmiştir
              </p>
            </div>
          </div>

          {/* Enes Öztürk Signature Badge */}
          <div className="flex flex-col items-center md:items-end">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-300 font-medium">
              <Code2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Geliştirici & Tasarım:</span>
              <strong className="font-semibold text-amber-950 dark:text-amber-200 font-serif tracking-wide">
                Enes Öztürk
              </strong>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1.5">
              Tüm hakları saklıdır · 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
