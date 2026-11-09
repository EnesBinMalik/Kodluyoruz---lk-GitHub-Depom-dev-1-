import React from 'react';
import { Volume2, VolumeX, HelpCircle, RotateCcw } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onResetGame: () => void;
  roundCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenRules,
  onResetGame,
  roundCount,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 text-lg select-none">
            ⚔️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg sm:text-xl text-slate-100 tracking-tight whitespace-nowrap">
                Taş Kağıt Makas
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium hidden sm:inline-block">
                Proje 5
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate hidden md:block">
              Hedef: +3 (Biz) veya -3 (Bilgisayar)
            </p>
          </div>
        </div>

        {/* Center / Signature Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Geliştirici:</span>
          <span className="font-semibold text-amber-300">Enes Öztürk</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Sesi kapat' : 'Sesi aç'}
            title={soundEnabled ? 'Sesi kapat (M)' : 'Sesi aç (M)'}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-xs font-medium">
              {soundEnabled ? 'Ses Açık' : 'Sessiz'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenRules}
            aria-label="Kurallar"
            title="Oyun Kuralları (H)"
            className="p-2 rounded-lg border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-all text-xs flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-medium">Kurallar</span>
          </button>

          <button
            type="button"
            onClick={onResetGame}
            aria-label="Oyunu Sıfırla"
            title="Skoru ve Tur Geçmişini Sıfırla (R)"
            className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/90 hover:bg-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">Sıfırla</span>
          </button>
        </div>
      </div>
    </header>
  );
};
