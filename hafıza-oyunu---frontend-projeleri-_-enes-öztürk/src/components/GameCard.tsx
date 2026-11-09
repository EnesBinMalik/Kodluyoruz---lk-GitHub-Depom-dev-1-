import React from 'react';
import { CardItem } from '../types';
import { Code2 } from 'lucide-react';

interface GameCardProps {
  card: CardItem;
  onClick: (card: CardItem) => void;
  isLocked: boolean;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  card,
  onClick,
  isLocked,
  index,
}) => {
  const handleClick = () => {
    if (isLocked || card.isFlipped || card.isMatched) {
      return;
    }
    onClick(card);
  };

  // If card is matched, it is removed from the screen according to the prompt:
  // "eğer bu kartlar birbirinin aynıysa o kartlar ekrandan kaldırılır"
  if (card.isMatched) {
    return (
      <div
        className="w-full aspect-[4/5] sm:aspect-square rounded-2xl border border-dashed border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center pointer-events-none transition-all duration-500 opacity-20 scale-90"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600">
          Eşleşti
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={card.isFlipped || isLocked ? -1 : 0}
      aria-label={`Kart ${index + 1}: ${card.isFlipped ? card.name : 'Kapalı Kart'}`}
      className="w-full aspect-[4/5] sm:aspect-square perspective-1000 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl group select-none"
    >
      <div
        className={`relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d shadow-sm hover:shadow-md ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD BACK (Face Down - Kapalı Durum) */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950 p-2 sm:p-3 flex flex-col items-center justify-between border border-indigo-700/40 dark:border-indigo-500/20 backface-hidden group-hover:scale-[1.02] transition-transform">
          {/* Subtle tech grid watermark / pattern */}
          <div className="w-full flex items-center justify-between text-indigo-400/50">
            <Code2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono tracking-widest opacity-60">#{index + 1}</span>
          </div>

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300 shadow-inner group-hover:text-indigo-200 transition-colors">
            <span className="text-xl sm:text-2xl font-bold font-mono">?</span>
          </div>

          <div className="text-[10px] font-mono text-indigo-300/40 uppercase tracking-widest">
            Enes Ö.
          </div>
        </div>

        {/* CARD FRONT (Face Up - Açık Durum) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl bg-white dark:bg-slate-900 p-2.5 sm:p-3 flex flex-col items-center justify-between border-2 border-indigo-400 dark:border-indigo-500 shadow-lg rotate-y-180 backface-hidden bg-gradient-to-b ${card.bgGradient}`}
        >
          <div className="w-full flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500">
              #{card.pairId + 1}
            </span>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: card.color }}
            />
          </div>

          {/* Icon */}
          <div className="my-auto flex flex-col items-center justify-center gap-1">
            <span className="text-3xl sm:text-4xl filter drop-shadow-sm transition-transform duration-300 hover:scale-110">
              {card.icon}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 text-center tracking-tight px-1 truncate max-w-full">
              {card.name}
            </span>
          </div>

          <div className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider">
            FRONTEND
          </div>
        </div>
      </div>
    </div>
  );
};
