export type Choice = 'rock' | 'paper' | 'scissors';

export type RoundWinner = 'player' | 'computer' | 'tie';

export interface RoundRecord {
  id: number;
  roundNumber: number;
  playerChoice: Choice;
  computerChoice: Choice;
  winner: RoundWinner;
  scoreChange: number; // +1, -1, or 0
  scoreAfterRound: number;
  reason: string;
  timestamp: string;
}

export type GameStatus = 'playing' | 'revealing' | 'player_won' | 'computer_won';

export interface GameStats {
  totalRounds: number;
  playerWins: number;
  computerWins: number;
  ties: number;
  currentStreak: number;
  bestStreak: number;
}
