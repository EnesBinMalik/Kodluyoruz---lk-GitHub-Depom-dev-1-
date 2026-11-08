import React from 'react';
import { Heart, Database, ShieldCheck, Sparkles, Feather } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Sol Kısım: Proje & İsim İmzası */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                Proje 1 - Not Tutma Uygulaması
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                v1.0
              </span>
            </div>
            
            {/* ENES ÖZTÜRK İMZASI */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mt-1">
              <Feather className="w-4 h-4 text-amber-500" />
              <span>Geliştirici & Tasarım:</span>
              <span className="font-display font-bold text-amber-600 dark:text-amber-400 tracking-wide text-base underline decoration-amber-400/50 underline-offset-4">
                Enes Öztürk
              </span>
            </div>
          </div>

          {/* Orta Kısım: LocalStorage & Güvenlik Güvencesi */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Verileriniz tarayıcınızda (LocalStorage) kalıcı olarak saklanır.</span>
          </div>

          {/* Sağ Kısım: Kısayol İpucu */}
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
                Ctrl + Enter
              </kbd>
              <span>Hızlı Kaydet</span>
            </div>
            <span aria-hidden="true">·</span>
            <span>© {new Date().getFullYear()} Enes Öztürk</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
