import React from 'react';
import { Trophy, Bot, Shield, Flame, AlertTriangle } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  playerWins: number;
  computerWins: number;
  ties: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  playerWins,
  computerWins,
  ties,
}) => {
  const steps = [-3, -2, -1, 0, 1, 2, 3];

  const getStatusText = () => {
    if (score === 3) return { text: 'Tebrikler! Oyunu Biz Kazandık!', color: 'text-emerald-400' };
    if (score === -3) return { text: 'Bilgisayar Kazandı!', color: 'text-rose-400' };
    if (score === 2) return { text: 'Son 1 Puan! Kazanmaya çok yakınız 🔥', color: 'text-emerald-300' };
    if (score === 1) return { text: 'Öndeyiz! (+1) Hedef: +3', color: 'text-emerald-400' };
    if (score === 0) return { text: 'Skor Dengede (0). İlk puanı kapan öne geçer.', color: 'text-slate-400' };
    if (score === -1) return { text: 'Bilgisayar 1 puan önde (-1). Toparlan!', color: 'text-rose-300' };
    if (score === -2) return { text: 'Tehlike Çanları! Bilgisayara 1 puan kaldı ⚠️', color: 'text-rose-400' };
    return { text: '', color: 'text-slate-400' };
  };

  const status = getStatusText();

  // Percentage from 0% (at -3) to 100% (at +3)
  const scorePercent = ((score + 3) / 6) * 100;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting depending on who is leading */}
      <div
        className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 ${
          score < 0 ? 'bg-rose-500' : 'bg-transparent'
        }`}
      />
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 ${
          score > 0 ? 'bg-emerald-500' : 'bg-transparent'
        }`}
      />

      {/* Main Header / Two Sides */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Computer Side */}
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
              score < 0
                ? 'bg-rose-950/40 border-rose-600/50 text-rose-400 shadow-lg shadow-rose-950/50'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
          >
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <span>Bilgisayar</span>
              {score <= -2 && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
            </div>
            <div className="text-sm text-slate-300 font-medium">
              Hedef:{' '}
              <span className="font-mono-num font-bold text-rose-400">-3 Puan</span>
            </div>
          </div>
        </div>

        {/* Big Central Score Display */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-0.5">
            Skor Tabelası
          </span>
          <div className="flex items-center gap-1">
            <span
              className={`font-mono-num text-4xl sm:text-5xl font-black tracking-tight transition-all duration-300 ${
                score > 0
                  ? 'text-emerald-400 drop-shadow-[0_0_16px_rgba(52,211,153,0.3)]'
                  : score < 0
                  ? 'text-rose-400 drop-shadow-[0_0_16px_rgba(244,63,94,0.3)]'
                  : 'text-slate-200'
              }`}
            >
              {score > 0 ? `+${score}` : score}
            </span>
          </div>
        </div>

        {/* Player Side */}
        <div className="flex items-center gap-3 flex-row-reverse text-right">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
              score > 0
                ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-400 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
          >
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5 justify-end">
              {score >= 2 && <Flame className="w-3.5 h-3.5 text-amber-400" />}
              <span>Biz (Oyuncu)</span>
            </div>
            <div className="text-sm text-slate-300 font-medium">
              Hedef:{' '}
              <span className="font-mono-num font-bold text-emerald-400">+3 Puan</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Step Interactive Track */}
      <div className="my-5">
        {/* Track Bar Background */}
        <div className="relative h-3 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
          {/* Fill Bar */}
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              score > 0
                ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                : score < 0
                ? 'bg-gradient-to-l from-amber-500 to-rose-500'
                : 'bg-slate-700'
            }`}
            style={{
              width: `${Math.abs(scorePercent - 50) * 2}%`,
              marginLeft: score >= 0 ? '50%' : `${scorePercent}%`,
            }}
          />
          {/* Center line marker */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-600 -translate-x-1/2 pointer-events-none" />
        </div>

        {/* Step Nodes (-3, -2, -1, 0, +1, +2, +3) */}
        <div className="grid grid-cols-7 gap-1 mt-3">
          {steps.map((step) => {
            const isCurrent = score === step;
            const isComputerSide = step < 0;
            const isPlayerSide = step > 0;
            const isCenter = step === 0;

            let bgColor = 'bg-slate-800/60 text-slate-500 border-slate-700/60';
            if (isCurrent) {
              if (isPlayerSide) {
                bgColor =
                  'bg-emerald-500 text-slate-950 font-bold border-emerald-300 shadow-md shadow-emerald-500/30 scale-110';
              } else if (isComputerSide) {
                bgColor =
                  'bg-rose-500 text-white font-bold border-rose-300 shadow-md shadow-rose-500/30 scale-110';
              } else {
                bgColor =
                  'bg-amber-400 text-slate-950 font-bold border-amber-200 shadow-md shadow-amber-400/30 scale-110';
              }
            } else if (
              (score > 0 && step > 0 && step <= score) ||
              (score < 0 && step < 0 && step >= score)
            ) {
              bgColor = isPlayerSide
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                : 'bg-rose-950/60 text-rose-400 border-rose-800/60';
            }

            return (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-mono-num border transition-all duration-300 ${bgColor}`}
                >
                  {step > 0 ? `+${step}` : step}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-medium hidden sm:block">
                  {step === -3
                    ? 'Bilgisayar'
                    : step === 3
                    ? 'Oyuncu'
                    : step === 0
                    ? 'Denge'
                    : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Callout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span className={`font-semibold ${status.color}`}>
            {status.text}
          </span>
        </div>

        {/* Small Match Counts */}
        <div className="flex items-center gap-3 text-slate-400 font-mono-num">
          <span>
            Siz: <strong className="text-emerald-400">{playerWins}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Bilgisayar: <strong className="text-rose-400">{computerWins}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Berabere: <strong className="text-slate-300">{ties}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
