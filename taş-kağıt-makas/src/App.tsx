import React, { useState, useEffect, useCallback } from 'react';
import { Choice, RoundRecord, RoundWinner, GameStats } from './types/game';
import { getRandomComputerChoice, evaluateRound } from './utils/gameLogic';
import { playSound } from './utils/audio';
import { Header } from './components/Header';
import { ScoreBoard } from './components/ScoreBoard';
import { Arena } from './components/Arena';
import { ChoiceControls } from './components/ChoiceControls';
import { HistoryList } from './components/HistoryList';
import { GameOverModal } from './components/GameOverModal';
import { RulesModal } from './components/RulesModal';
import { Footer } from './components/Footer';

export default function App() {
  const [score, setScore] = useState<number>(0);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);
  const [lastWinner, setLastWinner] = useState<RoundWinner | null>(null);
  const [lastReason, setLastReason] = useState<string | null>(null);
  const [lastScoreChange, setLastScoreChange] = useState<number | null>(null);
  const [history, setHistory] = useState<RoundRecord[]>([]);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  // Statistics
  const [stats, setStats] = useState<GameStats>({
    totalRounds: 0,
    playerWins: 0,
    computerWins: 0,
    ties: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  const isGameOver = score >= 3 || score <= -3;

  // Handle a round play
  const handlePlayerChoice = useCallback(
    (choice: Choice) => {
      if (isRevealing || isGameOver) return;

      playSound.click(!soundEnabled);
      setIsRevealing(true);
      setPlayerChoice(choice);
      setComputerChoice(null);

      // Computer picks randomly
      const compChoice = getRandomComputerChoice();
      const evaluation = evaluateRound(choice, compChoice);

      // Brief anticipation shake
      playSound.shake(!soundEnabled);

      setTimeout(() => {
        setComputerChoice(compChoice);
        setLastWinner(evaluation.winner);
        setLastReason(evaluation.reason);
        setLastScoreChange(evaluation.scoreChange);
        setIsRevealing(false);

        // Calculate new score based on rules:
        // Turu kazanan bilgisayar ise -1 puan, aksi halde (biz kazandıysak) +1 puan, berabere ise 0.
        const newScore = Math.max(-3, Math.min(3, score + evaluation.scoreChange));
        setScore(newScore);

        // Update streaks and stats
        setStats((prev) => {
          let newStreak = prev.currentStreak;
          if (evaluation.winner === 'player') {
            newStreak = prev.currentStreak >= 0 ? prev.currentStreak + 1 : 1;
          } else if (evaluation.winner === 'computer') {
            newStreak = prev.currentStreak <= 0 ? prev.currentStreak - 1 : -1;
          }

          const newBest = Math.max(prev.bestStreak, newStreak > 0 ? newStreak : 0);

          return {
            totalRounds: prev.totalRounds + 1,
            playerWins: prev.playerWins + (evaluation.winner === 'player' ? 1 : 0),
            computerWins: prev.computerWins + (evaluation.winner === 'computer' ? 1 : 0),
            ties: prev.ties + (evaluation.winner === 'tie' ? 1 : 0),
            currentStreak: newStreak,
            bestStreak: newBest,
          };
        });

        // Add to history
        const newRecord: RoundRecord = {
          id: Date.now(),
          roundNumber: history.length + 1,
          playerChoice: choice,
          computerChoice: compChoice,
          winner: evaluation.winner,
          scoreChange: evaluation.scoreChange,
          scoreAfterRound: newScore,
          reason: evaluation.reason,
          timestamp: new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };
        setHistory((prev) => [newRecord, ...prev]);

        // Sound triggers
        if (newScore >= 3) {
          playSound.matchWin(!soundEnabled);
        } else if (newScore <= -3) {
          playSound.matchLose(!soundEnabled);
        } else if (evaluation.winner === 'player') {
          playSound.winRound(!soundEnabled);
        } else if (evaluation.winner === 'computer') {
          playSound.loseRound(!soundEnabled);
        } else {
          playSound.tieRound(!soundEnabled);
        }
      }, 420);
    },
    [isRevealing, isGameOver, soundEnabled, score, history.length]
  );

  // Restart / Reset Game
  const handleResetGame = useCallback(() => {
    playSound.click(!soundEnabled);
    setScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setLastWinner(null);
    setLastReason(null);
    setLastScoreChange(null);
    setIsRevealing(false);
    setHistory([]);
    setStats({
      totalRounds: 0,
      playerWins: 0,
      computerWins: 0,
      ties: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
  }, [soundEnabled]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or modal is open
      if (isRulesOpen) {
        if (e.key === 'Escape') setIsRulesOpen(false);
        return;
      }

      if (e.key === '1') {
        handlePlayerChoice('rock');
      } else if (e.key === '2') {
        handlePlayerChoice('paper');
      } else if (e.key === '3') {
        handlePlayerChoice('scissors');
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetGame();
      } else if (e.key === 'm' || e.key === 'M') {
        setSoundEnabled((prev) => !prev);
      } else if (e.key === 'h' || e.key === 'H') {
        setIsRulesOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRulesOpen, handlePlayerChoice, handleResetGame]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenRules={() => setIsRulesOpen(true)}
        onResetGame={handleResetGame}
        roundCount={history.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        {/* Visual Scoreboard Gauge (-3 to +3) */}
        <ScoreBoard
          score={score}
          playerWins={stats.playerWins}
          computerWins={stats.computerWins}
          ties={stats.ties}
        />

        {/* Showdown Battle Arena */}
        <Arena
          playerChoice={playerChoice}
          computerChoice={computerChoice}
          lastWinner={lastWinner}
          lastReason={lastReason}
          lastScoreChange={lastScoreChange}
          isRevealing={isRevealing}
          roundNumber={history.length}
        />

        {/* Choice Buttons for Player (Rock, Paper, Scissors) */}
        <ChoiceControls
          onSelectChoice={handlePlayerChoice}
          disabled={isRevealing || isGameOver}
        />

        {/* Round History List */}
        <HistoryList
          history={history}
          currentStreak={stats.currentStreak}
          bestStreak={stats.bestStreak}
        />
      </main>

      {/* Developer Signature & Footer */}
      <Footer />

      {/* Modals */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      <GameOverModal
        isOpen={isGameOver}
        score={score}
        stats={stats}
        onRestart={handleResetGame}
      />
    </div>
  );
}
