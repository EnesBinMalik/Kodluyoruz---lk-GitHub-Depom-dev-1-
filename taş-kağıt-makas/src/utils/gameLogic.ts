import { Choice, RoundWinner } from '../types/game';

export interface ChoiceDetail {
  id: Choice;
  label: string;
  verb: string;
  description: string;
  beats: Choice;
  beatenBy: Choice;
  emoji: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    glow: string;
    badge: string;
  };
}

export const CHOICES: Record<Choice, ChoiceDetail> = {
  rock: {
    id: 'rock',
    label: 'Taş',
    verb: 'Makası kırar',
    description: 'Taş, makası kırarak yener.',
    beats: 'scissors',
    beatenBy: 'paper',
    emoji: '🪨',
    colorScheme: {
      bg: 'bg-amber-950/20 hover:bg-amber-900/30 active:bg-amber-900/50',
      border: 'border-amber-700/50 hover:border-amber-500',
      text: 'text-amber-300',
      glow: 'shadow-amber-500/20',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    },
  },
  paper: {
    id: 'paper',
    label: 'Kağıt',
    verb: 'Taşı sarar',
    description: 'Kağıt, taşı sararak yener.',
    beats: 'rock',
    beatenBy: 'scissors',
    emoji: '📄',
    colorScheme: {
      bg: 'bg-emerald-950/20 hover:bg-emerald-900/30 active:bg-emerald-900/50',
      border: 'border-emerald-700/50 hover:border-emerald-500',
      text: 'text-emerald-300',
      glow: 'shadow-emerald-500/20',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    },
  },
  scissors: {
    id: 'scissors',
    label: 'Makas',
    verb: 'Kağıdı keser',
    description: 'Makas, kağıdı keserek yener.',
    beats: 'paper',
    beatenBy: 'rock',
    emoji: '✂️',
    colorScheme: {
      bg: 'bg-cyan-950/20 hover:bg-cyan-900/30 active:bg-cyan-900/50',
      border: 'border-cyan-700/50 hover:border-cyan-500',
      text: 'text-cyan-300',
      glow: 'shadow-cyan-500/20',
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    },
  },
};

export function getRandomComputerChoice(): Choice {
  const choices: Choice[] = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

export function evaluateRound(
  playerChoice: Choice,
  computerChoice: Choice
): {
  winner: RoundWinner;
  scoreChange: number;
  reason: string;
} {
  if (playerChoice === computerChoice) {
    return {
      winner: 'tie',
      scoreChange: 0,
      reason: `İki taraf da ${CHOICES[playerChoice].label} seçti. Berabere!`,
    };
  }

  if (CHOICES[playerChoice].beats === computerChoice) {
    let reason = '';
    if (playerChoice === 'rock') reason = 'Taş, makası kırarak yener.';
    else if (playerChoice === 'paper') reason = 'Kağıt, taşı sararak yener.';
    else if (playerChoice === 'scissors') reason = 'Makas, kağıdı keserek yener.';

    return {
      winner: 'player',
      scoreChange: 1,
      reason,
    };
  }

  // Computer wins
  let reason = '';
  if (computerChoice === 'rock') reason = 'Taş, makası kırarak yener.';
  else if (computerChoice === 'paper') reason = 'Kağıt, taşı sararak yener.';
  else if (computerChoice === 'scissors') reason = 'Makas, kağıdı keserek yener.';

  return {
    winner: 'computer',
    scoreChange: -1,
    reason,
  };
}
