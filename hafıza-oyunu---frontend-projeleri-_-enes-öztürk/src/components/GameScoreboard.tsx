import React from 'react';
import { CardTheme } from '../types';
import { Trophy, Activity, CheckCheck, Clock, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

interface GameScoreboardProps {
  moves: number;
  bestScore: number | null;
  matchedPairs: number;
  totalPairs: number;
  secondsElapsed: number;
  cardTheme: CardTheme;
  onChangeTheme: (theme: CardTheme) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onShowRequirements: () => void;
}

export const GameScoreboard: React.FC<GameScoreboardProps> = ({
  moves,
  bestScore,
  matchedPairs,
  totalPairs,
  secondsElapsed,
  cardTheme,
  onChangeTheme,
  isSoundEnabled,
  onToggleSound,
  onShowRequirements,
}) => {
  // Format seconds to mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Banner with Signature & Specs Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            EO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Geliştirici: Enes Öztürk
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                İmzalı
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Frontend Web Dev &middot; 2. Seviye &middot; Proje 3
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            title={isSoundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            aria-label="Ses Ayarı"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Project Requirements Modal Button */}
          <button
            onClick={onShowRequirements}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Proje Şartnamesi</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Moves, Best Score, Matched, Timer) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Moves (Hamle Sayısı / Puan) */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Moves (Hamle)
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
              {moves}
            </div>
          </div>
        </div>

        {/* Best Score (En İyi Skor - localStorage) */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-500 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              En İyi Skor
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
              {bestScore !== null ? `${bestScore} hamle` : '—'}
            </div>
          </div>
        </div>

        {/* Matched Pairs */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Eşleşen
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
              {matchedPairs} / {totalPairs}
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Süre
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {formatTime(secondsElapsed)}
            </div>
          </div>
        </div>
      </div>

      {/* Card Theme Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 px-2">
          Kart Teması:
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeTheme('frontend')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              cardTheme === 'frontend'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ⚛️ Frontend
          </button>
          <button
            onClick={() => onChangeTheme('tech_emoji')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              cardTheme === 'tech_emoji'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🚀 Emojiler
          </button>
          <button
            onClick={() => onChangeTheme('arcade')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              cardTheme === 'arcade'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🕹️ Arcade
          </button>
        </div>
      </div>
    </div>
  );
};
