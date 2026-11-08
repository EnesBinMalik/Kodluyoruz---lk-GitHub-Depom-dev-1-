import React from 'react';
import { Coins, Heart, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Signature */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-200">
                KriptoPara <span className="text-amber-400">Takip Platformu</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Tasarım ve Geliştirme: <strong className="text-amber-400 font-semibold">Enes Öztürk</strong>
              </div>
            </div>
          </div>

          {/* Technology and Architecture badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>Canlı Kripto API (Axios)</span>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Netlify Uyumlu SPA</span>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>React Hooks (useState & useEffect)</span>
          </div>

          {/* Copyright */}
          <div className="text-slate-500 text-center md:text-right">
            <span>© {new Date().getFullYear()} Enes Öztürk. Tüm hakları saklıdır.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
