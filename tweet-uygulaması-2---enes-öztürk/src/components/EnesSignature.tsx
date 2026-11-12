/**
 * @license
 * İmzalı Tasarım Bileşeni: Enes Öztürk İmzası
 * "enes öztürk imzalı olsun" gereksinimi için özel olarak hazırlandı.
 */

import React from 'react';
import { Award, Code2, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface EnesSignatureProps {
  variant?: 'banner' | 'footer' | 'badge' | 'card';
  onOpenArchitecture?: () => void;
}

export const EnesSignature: React.FC<EnesSignatureProps> = ({
  variant = 'footer',
  onOpenArchitecture,
}) => {
  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/80 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
        <span>Enes Öztürk İmzalı</span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 p-5 text-white shadow-lg mb-6">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
                Özel Tasarım
              </span>
              <span className="text-xs text-sky-100 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> OOP & MVC Mimarisi
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Tweet Uygulaması 2 · Enes Öztürk İmzasıyla
            </h2>
            <p className="text-sm text-sky-100/90 max-w-xl">
              180 karakter limitli tweet akışı, karşılıklı arkadaşlık istekleri ve sadece arkadaşların görebildiği korumalı profiller.
            </p>
          </div>

          {onOpenArchitecture && (
            <button
              onClick={onOpenArchitecture}
              className="px-4 py-2 bg-white text-slate-900 rounded-xl font-semibold text-xs hover:bg-sky-50 transition-all shadow-md shrink-0 flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-sky-600" />
              <span>OOP & MVC Mimarisi İncele</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            EÖ
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">Enes Öztürk</span>
              <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Baş Geliştirici & Sistem Mimarı
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex justify-between items-center">
          <span>Sürüm 2.0 (OOP + MVC)</span>
          {onOpenArchitecture && (
            <button
              onClick={onOpenArchitecture}
              className="text-sky-600 dark:text-sky-400 font-medium hover:underline cursor-pointer"
            >
              Mimarî Şema
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default: Footer variant
  return (
    <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
            E
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Tweet Uygulaması 2
          </span>
          <span>·</span>
          <span className="text-sky-600 dark:text-sky-400 font-medium">
            Enes Öztürk İmzalıdır
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span>OOP & MVC Mimari Deseni</span>
          <span>·</span>
          <span>180 Karakter Kuralı</span>
          <span>·</span>
          <span>Arkadaş Korumalı Akış</span>
        </div>
      </div>
    </footer>
  );
};
