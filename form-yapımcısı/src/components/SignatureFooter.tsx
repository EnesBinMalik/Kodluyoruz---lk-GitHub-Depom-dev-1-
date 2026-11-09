import React from 'react';
import { Heart, Code2, Sparkles, UserCheck } from 'lucide-react';

interface SignatureFooterProps {
  fieldCount: number;
}

export const SignatureFooter: React.FC<SignatureFooterProps> = ({ fieldCount }) => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/80 backdrop-blur-md py-4 px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2 font-medium">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-slate-900 font-semibold tracking-tight">Proje 6: Form Yapımcısı</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            {fieldCount} Bileşen Aktif
          </span>
        </div>

        {/* User Signature Requirement: Enes Öztürk */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100/80 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span className="text-xs text-slate-500 font-normal">Tasarım & Geliştirme:</span>
          <span className="text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1">
            Enes Öztürk
            <UserCheck className="w-3.5 h-3.5 text-indigo-600 inline ml-0.5" />
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};
