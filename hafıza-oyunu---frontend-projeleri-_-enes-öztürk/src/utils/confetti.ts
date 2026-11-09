import confetti from 'canvas-confetti';

export const triggerVictoryConfetti = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // Left side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.2, y: 0.6 },
      colors: ['#6366F1', '#38BDF8', '#F59E0B', '#10B981', '#EC4899'],
    });
    // Right side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#6366F1', '#38BDF8', '#F59E0B', '#10B981', '#EC4899'],
    });
  }, 250);
};
