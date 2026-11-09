import React from 'react';
import { X, Check, ShieldCheck, Target, Keyboard } from 'lucide-react';
import { CHOICES } from '../utils/gameLogic';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Oyun Rehberi</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl text-slate-100">
            Taş Kağıt Makas Kuralları
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Proje gereksinimlerine göre hazırlanan kural ve puanlama sistemi
          </p>
        </div>

        {/* 3 Core Rules (Prompt Explicit Requirements) */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Temel Galibiyet Kuralları
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-amber-900/40 flex items-center gap-3">
            <span className="text-2xl">{CHOICES.rock.emoji}</span>
            <div className="text-xs">
              <strong className="text-amber-300 font-semibold block text-sm">
                Taş, makası kırarak yener.
              </strong>
              <span className="text-slate-400">
                Taş seçimi makasa üstünlük sağlar ve +1 puan kazandırır.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-emerald-900/40 flex items-center gap-3">
            <span className="text-2xl">{CHOICES.paper.emoji}</span>
            <div className="text-xs">
              <strong className="text-emerald-300 font-semibold block text-sm">
                Kağıt, taşı sararak yener.
              </strong>
              <span className="text-slate-400">
                Kağıt seçimi taşa üstünlük sağlar ve +1 puan kazandırır.
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-cyan-900/40 flex items-center gap-3">
            <span className="text-2xl">{CHOICES.scissors.emoji}</span>
            <div className="text-xs">
              <strong className="text-cyan-300 font-semibold block text-sm">
                Makas, kağıdı keserek yener.
              </strong>
              <span className="text-slate-400">
                Makas seçimi kağıda üstünlük sağlar ve +1 puan kazandırır.
              </span>
            </div>
          </div>
        </div>

        {/* Scoring & Winning Criteria */}
        <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 mb-6 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Puanlama ve Oyun Bitiş Şartları</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Siz kazanırsanız:</strong> Skor tabelasına <strong>+1 puan eklenir</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Bilgisayar kazanırsa:</strong> Skor tabelasından <strong>1 puan eksiltilir (-1)</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Beraberlikte:</strong> Yapılan seçimler aynıysa skora <strong>herhangi puan yansımaz (0)</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Oyun Sonu:</strong> Skor tabelasında <strong>+3 rakamı göründüğünde BİZ</strong>, <strong>-3 göründüğünde ise BİLGİSAYAR</strong> oyunu kazanır.
              </span>
            </li>
          </ul>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-300">Klavye Kısayolları:</span>
          </div>
          <div className="flex items-center gap-2">
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">1</kbd> Taş</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">2</kbd> Kağıt</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">3</kbd> Makas</span>
          </div>
        </div>

        {/* Got It Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
        >
          Anladım, Oyuna Dön
        </button>
      </div>
    </div>
  );
};
