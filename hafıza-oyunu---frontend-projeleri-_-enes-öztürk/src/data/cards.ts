import { CardItem, CardTheme } from '../types';

interface PairDefinition {
  pairId: number;
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
}

export const THEME_PAIRS: Record<CardTheme, PairDefinition[]> = {
  frontend: [
    {
      pairId: 0,
      name: 'React',
      icon: '⚛️',
      color: '#0ea5e9',
      bgGradient: 'from-sky-500/15 to-blue-600/10 dark:from-sky-500/20 dark:to-blue-600/20',
    },
    {
      pairId: 1,
      name: 'TypeScript',
      icon: '🔷',
      color: '#3178c6',
      bgGradient: 'from-blue-600/15 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20',
    },
    {
      pairId: 2,
      name: 'JavaScript',
      icon: '⚡',
      color: '#eab308',
      bgGradient: 'from-amber-400/15 to-yellow-600/10 dark:from-amber-400/20 dark:to-yellow-600/20',
    },
    {
      pairId: 3,
      name: 'HTML5',
      icon: '🌐',
      color: '#ea580c',
      bgGradient: 'from-orange-500/15 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20',
    },
    {
      pairId: 4,
      name: 'Tailwind CSS',
      icon: '🎨',
      color: '#06b6d4',
      bgGradient: 'from-cyan-500/15 to-teal-500/10 dark:from-cyan-500/20 dark:to-teal-500/20',
    },
    {
      pairId: 5,
      name: 'Vite',
      icon: '🚀',
      color: '#8b5cf6',
      bgGradient: 'from-purple-500/15 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20',
    },
  ],
  tech_emoji: [
    {
      pairId: 0,
      name: 'Yazılım',
      icon: '💻',
      color: '#3b82f6',
      bgGradient: 'from-blue-500/15 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20',
    },
    {
      pairId: 1,
      name: 'Hız & Güç',
      icon: '⚡',
      color: '#f59e0b',
      bgGradient: 'from-amber-500/15 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
    },
    {
      pairId: 2,
      name: 'Büyük Fikir',
      icon: '🧠',
      color: '#ec4899',
      bgGradient: 'from-pink-500/15 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20',
    },
    {
      pairId: 3,
      name: 'Tasarım',
      icon: '🎨',
      color: '#a855f7',
      bgGradient: 'from-purple-500/15 to-fuchsia-500/10 dark:from-purple-500/20 dark:to-fuchsia-500/20',
    },
    {
      pairId: 4,
      name: 'Araçlar',
      icon: '🛠️',
      color: '#64748b',
      bgGradient: 'from-slate-500/15 to-zinc-500/10 dark:from-slate-500/20 dark:to-zinc-500/20',
    },
    {
      pairId: 5,
      name: 'Başarı',
      icon: '🎯',
      color: '#10b981',
      bgGradient: 'from-emerald-500/15 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20',
    },
  ],
  arcade: [
    {
      pairId: 0,
      name: 'Uzaylı',
      icon: '👾',
      color: '#a855f7',
      bgGradient: 'from-purple-500/15 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20',
    },
    {
      pairId: 1,
      name: 'Konsol',
      icon: '🕹️',
      color: '#ef4444',
      bgGradient: 'from-red-500/15 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20',
    },
    {
      pairId: 2,
      name: 'Elmas',
      icon: '💎',
      color: '#06b6d4',
      bgGradient: 'from-cyan-500/15 to-sky-500/10 dark:from-cyan-500/20 dark:to-sky-500/20',
    },
    {
      pairId: 3,
      name: 'Şans',
      icon: '🎲',
      color: '#eab308',
      bgGradient: 'from-yellow-500/15 to-amber-500/10 dark:from-yellow-500/20 dark:to-amber-500/20',
    },
    {
      pairId: 4,
      name: 'Şampiyon',
      icon: '🏆',
      color: '#f59e0b',
      bgGradient: 'from-amber-500/15 to-yellow-600/10 dark:from-amber-500/20 dark:to-yellow-600/20',
    },
    {
      pairId: 5,
      name: 'Ateş',
      icon: '🔥',
      color: '#f97316',
      bgGradient: 'from-orange-500/15 to-rose-500/10 dark:from-orange-500/20 dark:to-rose-500/20',
    },
  ],
};

// Generates 12 cards (6 pairs) and shuffles them randomly using Fisher-Yates
export function generateDeck(theme: CardTheme = 'frontend'): CardItem[] {
  const pairs = THEME_PAIRS[theme];
  const deck: CardItem[] = [];

  pairs.forEach((pair) => {
    // Each pair appears exactly twice (total = 12 cards)
    deck.push({
      id: `${pair.pairId}-a-${Math.random().toString(36).substring(2, 9)}`,
      pairId: pair.pairId,
      name: pair.name,
      icon: pair.icon,
      color: pair.color,
      bgGradient: pair.bgGradient,
      isFlipped: false,
      isMatched: false,
    });
    deck.push({
      id: `${pair.pairId}-b-${Math.random().toString(36).substring(2, 9)}`,
      pairId: pair.pairId,
      name: pair.name,
      icon: pair.icon,
      color: pair.color,
      bgGradient: pair.bgGradient,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
