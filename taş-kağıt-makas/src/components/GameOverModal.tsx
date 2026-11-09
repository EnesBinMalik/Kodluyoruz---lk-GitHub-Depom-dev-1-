import React, { useEffect, useRef } from 'react';
import { Trophy, Bot, RotateCcw, Award } from 'lucide-react';
import { GameStats } from '../types/game';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  stats: GameStats;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  stats,
  onRestart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPlayerWinner = score >= 3;

  useEffect(() => {
    if (!isOpen || !isPlayerWinner) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6', '#FBBF24'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height / 2 + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 14 - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (particles.some((p) => p.y < canvas.height + 50)) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, isPlayerWinner]);

  if (!isOpen) return null;

  const winRate =
    stats.totalRounds > 0
      ? Math.round((stats.playerWins / stats.totalRounds) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      {isPlayerWinner && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10"
        />
      )}

      <div
        className={`relative z-20 w-full max-w-md bg-slate-900 border rounded-3xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden ${
          isPlayerWinner
            ? 'border-emerald-500/50 shadow-emerald-950/50'
            : 'border-rose-500/50 shadow-rose-950/50'
        }`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none ${
            isPlayerWinner ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />

        {/* Icon & Trophy */}
        <div className="relative mb-5 flex justify-center">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 shadow-xl ${
              isPlayerWinner
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-emerald-500/20'
                : 'bg-rose-500/20 border-rose-400 text-rose-400 shadow-rose-500/20'
            }`}
          >
            {isPlayerWinner ? (
              <Trophy className="w-10 h-10 animate-pulse" />
            ) : (
              <Bot className="w-10 h-10" />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 tracking-tight mb-2">
          {isPlayerWinner ? 'Tebrikler! Oyunu Kazandınız! 🎉' : 'Bilgisayar Kazandı! 🤖'}
        </h2>

        {/* Description matching exact prompt rules */}
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          {isPlayerWinner
            ? 'Skor tabelasında +3 puan hedefine başarıyla ulaştınız ve galibiyeti aldınız.'
            : 'Skor tabelası -3 puana ulaştı ve turu bilgisayar kazandı. Bir dahaki sefere daha iyi bir stratejiyle rövanş alabilirsiniz!'}
        </p>

        {/* Match Statistics Box */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-6">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Maç İstatistikleri</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block mb-0.5">Toplam Tur</span>
              <span className="font-mono-num font-bold text-base text-slate-200">
                {stats.totalRounds}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block mb-0.5">Siz / Bot</span>
              <span className="font-mono-num font-bold text-base text-slate-200">
                <span className="text-emerald-400">{stats.playerWins}</span>
                <span className="text-slate-500 mx-1">-</span>
                <span className="text-rose-400">{stats.computerWins}</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block mb-0.5">Kazanma Oranı</span>
              <span className="font-mono-num font-bold text-base text-amber-400">
                %{winRate}
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA: Play Again / Restart */}
        <button
          type="button"
          onClick={onRestart}
          className={`w-full py-3.5 px-6 rounded-xl font-display font-bold text-base transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
            isPlayerWinner
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25 active:scale-[0.98]'
              : 'bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white shadow-rose-500/25 active:scale-[0.98]'
          }`}
        >
          <RotateCcw className="w-5 h-5" />
          <span>{isPlayerWinner ? 'Yeniden Oyna' : 'Rövanş Maçı Başlat'}</span>
        </button>

        {/* Designer Signature inside Modal */}
        <p className="mt-4 text-[11px] text-slate-400 font-medium">
          Enes Öztürk İmzalı Oyun Deneyimi
        </p>
      </div>
    </div>
  );
};
