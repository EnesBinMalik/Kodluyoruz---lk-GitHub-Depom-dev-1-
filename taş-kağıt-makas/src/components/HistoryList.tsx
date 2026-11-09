import React, { useState } from 'react';
import { RoundRecord, RoundWinner } from '../types/game';
import { CHOICES } from '../utils/gameLogic';
import { History, Award, Flame } from 'lucide-react';

interface HistoryListProps {
  history: RoundRecord[];
  currentStreak: number;
  bestStreak: number;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  currentStreak,
  bestStreak,
}) => {
  const [filter, setFilter] = useState<'all' | 'player' | 'computer' | 'tie'>('all');

  const filteredHistory = history.filter((item) => {
    if (filter === 'all') return true;
    return item.winner === filter;
  });

  const getWinnerBadge = (winner: RoundWinner) => {
    if (winner === 'player') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          Oyuncu (Biz)
        </span>
      );
    }
    if (winner === 'computer') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
          Bilgisayar
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
        Berabere
      </span>
    );
  };

  const getScoreBadge = (scoreChange: number, scoreAfter: number) => {
    if (scoreChange > 0) {
      return (
        <div className="flex items-center gap-1.5 font-mono-num text-xs">
          <span className="font-bold text-emerald-400">+{scoreChange}</span>
          <span className="text-slate-400">→</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-semibold">
            {scoreAfter > 0 ? `+${scoreAfter}` : scoreAfter}
          </span>
        </div>
      );
    }
    if (scoreChange < 0) {
      return (
        <div className="flex items-center gap-1.5 font-mono-num text-xs">
          <span className="font-bold text-rose-400">{scoreChange}</span>
          <span className="text-slate-400">→</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-semibold">
            {scoreAfter > 0 ? `+${scoreAfter}` : scoreAfter}
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 font-mono-num text-xs text-slate-400">
        <span>0</span>
        <span className="text-slate-400">→</span>
        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
          {scoreAfter > 0 ? `+${scoreAfter}` : scoreAfter}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-100">
              Tur Geçmişi
            </h3>
            <p className="text-xs text-slate-400">
              Oynanan turların kazananları ve skor yansımaları
            </p>
          </div>
        </div>

        {/* Streaks Summary */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Mevcut Seri:</span>
            <span className="font-mono-num font-bold text-amber-400">
              {currentStreak}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>En İyi Seri:</span>
            <span className="font-mono-num font-bold text-emerald-400">
              {bestStreak}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto text-xs border-b border-slate-800/60">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
            filter === 'all'
              ? 'bg-slate-700 text-white font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          Tüm Turlar ({history.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('player')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
            filter === 'player'
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-semibold'
              : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800'
          }`}
        >
          Bizim Kazandıklarımız ({history.filter((h) => h.winner === 'player').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('computer')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
            filter === 'computer'
              ? 'bg-rose-950/80 text-rose-300 border border-rose-700/60 font-semibold'
              : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800'
          }`}
        >
          Bilgisayarın Kazandıkları ({history.filter((h) => h.winner === 'computer').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('tie')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
            filter === 'tie'
              ? 'bg-slate-800 text-slate-200 border border-slate-600 font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          Berabereler ({history.filter((h) => h.winner === 'tie').length})
        </button>
      </div>

      {/* History Table / Content */}
      {filteredHistory.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <p className="text-sm">
            {history.length === 0
              ? 'Henüz tur oynanmadı. Yukarıdaki seçeneklerden birini tıklayarak oyuna başlayın.'
              : 'Bu filtreye uygun tur kaydı bulunmuyor.'}
          </p>
        </div>
      ) : (
        <div className="max-h-80 overflow-y-auto custom-scrollbar mt-3 divide-y divide-slate-800/60">
          {filteredHistory.map((round) => {
            const pChoice = CHOICES[round.playerChoice];
            const cChoice = CHOICES[round.computerChoice];

            return (
              <div
                key={round.id}
                className="py-3 px-2 sm:px-3 hover:bg-slate-800/40 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                {/* Round & Moves */}
                <div className="flex items-center gap-3">
                  <span className="font-mono-num font-bold text-slate-400 w-12 shrink-0">
                    Tur #{round.roundNumber}
                  </span>

                  {/* Player Hand vs Computer Hand */}
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700/80 text-slate-200 flex items-center gap-1 font-medium">
                      <span>{pChoice.emoji}</span>
                      <span>{pChoice.label}</span>
                    </span>

                    <span className="text-slate-500 font-bold">vs</span>

                    <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700/80 text-slate-200 flex items-center gap-1 font-medium">
                      <span>{cChoice.emoji}</span>
                      <span>{cChoice.label}</span>
                    </span>
                  </div>
                </div>

                {/* Outcome & Reason */}
                <div className="flex items-center gap-3 justify-between sm:justify-end flex-1">
                  <div className="text-slate-400 truncate max-w-[240px] hidden md:block">
                    {round.reason}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {getWinnerBadge(round.winner)}
                    {getScoreBadge(round.scoreChange, round.scoreAfterRound)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
