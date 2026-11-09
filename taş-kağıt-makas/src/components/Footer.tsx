import React from 'react';
import { Sparkles, Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/70 text-slate-400 py-8 px-4 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Project Branding */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-200">
              Proje 5 — Taş Kağıt Makas Oyunu
            </div>
            <div className="text-[11px] text-slate-500">
              Klasik kurallar · Dinamik -3/+3 skor tablosu · Tur geçmişi
            </div>
          </div>
        </div>

        {/* Developer Signature (User Explicit Requirement: enes öztürk imzalı olsun) */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-850 border border-amber-500/30 text-slate-200 shadow-sm shadow-amber-500/5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Geliştirici & Tasarım:</span>
          <span className="font-display font-extrabold text-amber-300 tracking-wide text-sm">
            Enes Öztürk
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5"></span>
        </div>

        {/* Note */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <span>Özenle geliştirilmiştir</span>
          <Heart className="w-3.5 h-3.5 text-rose-500/80 fill-rose-500/20" />
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
};
