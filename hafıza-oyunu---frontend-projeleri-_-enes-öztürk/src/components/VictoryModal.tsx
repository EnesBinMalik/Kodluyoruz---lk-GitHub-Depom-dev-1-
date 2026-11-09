import React from 'react';
import { Trophy, RotateCcw, Award, CheckCircle, Clock, Zap } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  moves: number;
  bestScore: number | null;
  isNewBestScore: boolean;
  secondsElapsed: number;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  moves,
  bestScore,
  isNewBestScore,
  secondsElapsed,
  onRestart,
}) => {
  if (!isOpen) return null;

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins} dakika ${secs} saniye`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy icon */}
        <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          {isNewBestScore ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800 mb-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              YENİ EN İYİ SKOR!
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800 mb-1">
              <CheckCircle className="w-3.5 h-3.5" />
              TEBRİKLER!
            </div>
          )}
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hafıza Oyunu Tamamlandı!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tüm 12 kart başarıyla eşleştirildi ve temizlendi.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 py-1 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              Toplam Hamle (Moves)
            </span>
            <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {moves}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
              En İyi Skor (Rekor)
            </span>
            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
              {bestScore} hamle
            </span>
          </div>

          <div className="col-span-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Tamamlama Süresi
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
              {formatTime(secondsElapsed)}
            </span>
          </div>
        </div>

        {/* Signature Attribution Stamp */}
        <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs text-indigo-900 dark:text-indigo-200 font-medium">
              Frontend Web Dev &middot; Seviye 2
            </span>
          </div>
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
            Enes Öztürk İmzalı
          </span>
        </div>

        {/* Restart Action */}
        <button
          onClick={onRestart}
          className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Yeniden Başlat (Restart)</span>
        </button>
      </div>
    </div>
  );
};
