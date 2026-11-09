import React from 'react';
import { Choice, RoundWinner } from '../types/game';
import { CHOICES } from '../utils/gameLogic';
import { Swords, User, Bot, Sparkles, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';

interface ArenaProps {
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  lastWinner: RoundWinner | null;
  lastReason: string | null;
  lastScoreChange: number | null;
  isRevealing: boolean;
  roundNumber: number;
}

export const Arena: React.FC<ArenaProps> = ({
  playerChoice,
  computerChoice,
  lastWinner,
  lastReason,
  lastScoreChange,
  isRevealing,
  roundNumber,
}) => {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
      {/* Round Header / Kicker */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
            Meydan Okuma Alanı
          </span>
        </div>
        <div className="font-mono-num font-semibold text-slate-300">
          {roundNumber > 0 ? `Tur #${roundNumber}` : 'Oyun Başlangıcı'}
        </div>
      </div>

      {/* Duel Zone: Player Hand vs Computer Hand */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
        {/* PLAYER CARD (Cols 1-3) */}
        <div className="md:col-span-3 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>Sizin Hamleniz</span>
          </div>

          <div
            className={`w-full max-w-[220px] aspect-[4/3] rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-300 relative ${
              isRevealing
                ? 'bg-slate-800/80 border-amber-500/60 animate-shake shadow-lg shadow-amber-500/10'
                : playerChoice
                ? lastWinner === 'player'
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-xl shadow-emerald-500/20 scale-[1.03]'
                  : lastWinner === 'computer'
                  ? 'bg-slate-800/40 border-slate-700 opacity-80'
                  : 'bg-slate-800/60 border-slate-600'
                : 'bg-slate-900/40 border-dashed border-slate-800 text-slate-600'
            }`}
          >
            {isRevealing ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl sm:text-5xl select-none animate-bounce">
                  ✊
                </span>
                <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Taş...
                </span>
              </div>
            ) : playerChoice ? (
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-5xl sm:text-6xl select-none filter drop-shadow">
                  {CHOICES[playerChoice].emoji}
                </span>
                <span className="font-display font-bold text-lg text-slate-100">
                  {CHOICES[playerChoice].label}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {CHOICES[playerChoice].verb}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center p-2">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
                  ?
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Aşağıdan bir seçim yapın
                </span>
              </div>
            )}

            {/* Winner Badge on Card */}
            {!isRevealing && playerChoice && lastWinner === 'player' && (
              <div className="absolute -top-3 -right-2 bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                <span>+1 Kazandı</span>
              </div>
            )}
          </div>
        </div>

        {/* VS / OUTCOME BADGE (Col 4) */}
        <div className="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0">
          {isRevealing ? (
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-extrabold text-sm animate-pulse">
              VS
            </div>
          ) : lastWinner ? (
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                  lastWinner === 'player'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : lastWinner === 'computer'
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {lastWinner === 'player' && <CheckCircle2 className="w-6 h-6" />}
                {lastWinner === 'computer' && <XCircle className="w-6 h-6" />}
                {lastWinner === 'tie' && <MinusCircle className="w-6 h-6" />}
              </div>
              <span
                className={`text-xs font-mono-num font-bold mt-1 ${
                  lastWinner === 'player'
                    ? 'text-emerald-400'
                    : lastWinner === 'computer'
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }`}
              >
                {lastScoreChange && lastScoreChange > 0
                  ? '+1 Puan'
                  : lastScoreChange && lastScoreChange < 0
                  ? '-1 Puan'
                  : '0 Puan'}
              </span>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
              VS
            </div>
          )}
        </div>

        {/* COMPUTER CARD (Cols 5-7) */}
        <div className="md:col-span-3 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>Bilgisayarın Hamlesi</span>
          </div>

          <div
            className={`w-full max-w-[220px] aspect-[4/3] rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-300 relative ${
              isRevealing
                ? 'bg-slate-800/80 border-amber-500/60 animate-shake shadow-lg shadow-amber-500/10'
                : computerChoice
                ? lastWinner === 'computer'
                  ? 'bg-rose-950/40 border-rose-500 shadow-xl shadow-rose-500/20 scale-[1.03]'
                  : lastWinner === 'player'
                  ? 'bg-slate-800/40 border-slate-700 opacity-80'
                  : 'bg-slate-800/60 border-slate-600'
                : 'bg-slate-900/40 border-dashed border-slate-800 text-slate-600'
            }`}
          >
            {isRevealing ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl sm:text-5xl select-none animate-bounce">
                  ✊
                </span>
                <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Kağıt... Makas!
                </span>
              </div>
            ) : computerChoice ? (
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-5xl sm:text-6xl select-none filter drop-shadow">
                  {CHOICES[computerChoice].emoji}
                </span>
                <span className="font-display font-bold text-lg text-slate-100">
                  {CHOICES[computerChoice].label}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {CHOICES[computerChoice].verb}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center p-2">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Rakip bekleniyor
                </span>
              </div>
            )}

            {/* Winner Badge on Computer Card */}
            {!isRevealing && computerChoice && lastWinner === 'computer' && (
              <div className="absolute -top-3 -right-2 bg-rose-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                <span>+1 Bilgisayar</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Outcome Banner & Explanation */}
      {lastReason && !isRevealing && (
        <div
          className={`mt-6 p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left transition-all ${
            lastWinner === 'player'
              ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
              : lastWinner === 'computer'
              ? 'bg-rose-950/30 border-rose-800/50 text-rose-200'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 font-medium text-sm">
            <span>
              {lastWinner === 'player'
                ? '🎉 Turu Kazandınız!'
                : lastWinner === 'computer'
                ? '💥 Turu Bilgisayar Kazandı!'
                : '🤝 Berabere!'}
            </span>
            <span className="text-slate-400 font-normal">| {lastReason}</span>
          </div>

          <div className="text-xs font-mono-num font-semibold shrink-0">
            {lastWinner === 'player' && (
              <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                Skor Tabelasına +1 Puan Eklendi
              </span>
            )}
            {lastWinner === 'computer' && (
              <span className="text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                Skor Tabelasından -1 Puan Eksiltildi
              </span>
            )}
            {lastWinner === 'tie' && (
              <span className="text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                Skor Değişmedi (0)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
