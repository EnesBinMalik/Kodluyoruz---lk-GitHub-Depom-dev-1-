import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CardItem, CardTheme, ProjectItem } from './types';
import { generateDeck } from './data/cards';
import { COURSE_LEVELS } from './data/projects';
import { soundFX } from './utils/audio';
import { triggerVictoryConfetti } from './utils/confetti';
import { Header } from './components/Header';
import { GameCard } from './components/GameCard';
import { GameScoreboard } from './components/GameScoreboard';
import { VictoryModal } from './components/VictoryModal';
import { ProjectRequirementsModal } from './components/ProjectRequirementsModal';
import { ProjectHierarchy } from './components/ProjectHierarchy';
import {
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FolderKanban,
  HelpCircle,
} from 'lucide-react';

const STORAGE_KEY_BEST_SCORE = 'memory_game_best_score_enes';
const STORAGE_KEY_THEME = 'memory_game_dark_mode';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sound state
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  // Navigation & Project Drawer state
  const [activeNav, setActiveNav] = useState<string>('Ana Sayfa');
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState<boolean>(false);
  const [activeProjectId, setActiveProjectId] = useState<string>('memory-game');

  // Game card theme
  const [cardTheme, setCardTheme] = useState<CardTheme>('frontend');

  // Game Engine state
  const [cards, setCards] = useState<CardItem[]>(() => generateDeck('frontend'));
  const [firstCard, setFirstCard] = useState<CardItem | null>(null);
  const [secondCard, setSecondCard] = useState<CardItem | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Best score from localStorage
  const [bestScore, setBestScore] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_BEST_SCORE);
      return saved ? parseInt(saved, 10) : null;
    }
    return null;
  });
  const [isNewBestScore, setIsNewBestScore] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Apply dark mode class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, isDarkMode.toString());
  }, [isDarkMode]);

  // Sync sound utility with state
  useEffect(() => {
    soundFX.enabled = isSoundEnabled;
  }, [isSoundEnabled]);

  // Timer loop
  useEffect(() => {
    if (isTimerRunning && !isVictory) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isVictory]);

  // Calculate matched pairs count
  const matchedPairs = cards.filter((c) => c.isMatched).length / 2;
  const totalPairs = 6;

  // Restart function
  const handleRestart = useCallback(
    (themeToUse = cardTheme) => {
      soundFX.playShuffle();
      // Generate randomized 12 cards (4x3 matrix)
      const freshDeck = generateDeck(themeToUse);
      setCards(freshDeck);
      setFirstCard(null);
      setSecondCard(null);
      setIsLocked(false);
      setMoves(0);
      setSecondsElapsed(0);
      setIsTimerRunning(false);
      setIsVictory(false);
      setIsNewBestScore(false);
    },
    [cardTheme]
  );

  // Handle card click
  const handleCardClick = (clickedCard: CardItem) => {
    if (isLocked) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Start timer on first interaction
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    soundFX.playFlip();

    // Flip the clicked card immediately
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === clickedCard.id ? { ...c, isFlipped: true } : c))
    );

    if (!firstCard) {
      // First card chosen
      setFirstCard(clickedCard);
    } else {
      // Second card chosen
      setSecondCard(clickedCard);
      setIsLocked(true);

      // Increment moves after each attempt
      const nextMoves = moves + 1;
      setMoves(nextMoves);

      // Check for match
      if (firstCard.pairId === clickedCard.pairId) {
        // MATCH!
        soundFX.playMatch();

        setTimeout(() => {
          setCards((prevCards) => {
            const updated = prevCards.map((c) =>
              c.pairId === clickedCard.pairId ? { ...c, isMatched: true } : c
            );

            // Check if all pairs are now matched
            const matchedCount = updated.filter((c) => c.isMatched).length / 2;
            if (matchedCount === totalPairs) {
              setIsTimerRunning(false);

              // Best score check
              let isNewRecord = false;
              if (bestScore === null || nextMoves < bestScore) {
                localStorage.setItem(STORAGE_KEY_BEST_SCORE, nextMoves.toString());
                setBestScore(nextMoves);
                setIsNewBestScore(true);
                isNewRecord = true;
              } else {
                setIsNewBestScore(false);
              }

              soundFX.playVictory();
              triggerVictoryConfetti();
              setIsVictory(true);
            }

            return updated;
          });

          setFirstCard(null);
          setSecondCard(null);
          setIsLocked(false);
        }, 500);
      } else {
        // MISMATCH!
        soundFX.playMismatch();

        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCard.id || c.id === clickedCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFirstCard(null);
          setSecondCard(null);
          setIsLocked(false);
        }, 850);
      }
    }
  };

  // Change card theme
  const handleChangeTheme = (newTheme: CardTheme) => {
    setCardTheme(newTheme);
    handleRestart(newTheme);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Platform Header */}
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        activeNav={activeNav}
        onSelectNav={(nav) => setActiveNav(nav)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb & Project Navigator Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span>Frontend Web Development Projeleri</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                2&apos;nci Seviye Projeler
              </span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Proje 3 - Hafıza Oyunu
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
                4x3 Matris &middot; 12 Kart
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCurriculumOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer"
            >
              <FolderKanban className="w-4 h-4 text-indigo-500" />
              <span>Tüm Projeler (Müfredat)</span>
            </button>
          </div>
        </div>

        {/* Central Game Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Scoreboard HUD */}
          <GameScoreboard
            moves={moves}
            bestScore={bestScore}
            matchedPairs={matchedPairs}
            totalPairs={totalPairs}
            secondsElapsed={secondsElapsed}
            cardTheme={cardTheme}
            onChangeTheme={handleChangeTheme}
            isSoundEnabled={isSoundEnabled}
            onToggleSound={() => setIsSoundEnabled((prev) => !prev)}
            onShowRequirements={() => setIsRequirementsOpen(true)}
          />

          {/* Prompt Instruction Note */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-900 dark:text-white font-semibold">
                Oyun Kuralları:
              </strong>{' '}
              4x3 matriste toplam 12 kart yer alır (6 çift). Arka arkaya iki kart
              seçin. Kartlar eşleşirse ekrandan kaldırılır, eşleşmezse tekrar
              kapatılır. Her denemede <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">moves</code> puanı artar.
            </p>
          </div>

          {/* 4x3 CARD BOARD GRID */}
          <div className="relative p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg">
            {/* The 4x3 Grid (4 columns, 3 rows = 12 cards) */}
            <div
              className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5"
              role="region"
              aria-label="4x3 Hafıza Kartı Tablosu"
            >
              {cards.map((card, index) => (
                <GameCard
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  isLocked={isLocked}
                  index={index}
                />
              ))}
            </div>

            {/* In-board clear celebration if all matched */}
            {matchedPairs === totalPairs && (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center animate-in fade-in duration-300">
                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  🎉 Tebrikler! Tüm kartlar eşleştirildi ve ekrandan kaldırıldı.
                </span>
              </div>
            )}
          </div>

          {/* MANDATORY BOTTOM RESTART BUTTON */}
          {/* Requirement: "Ekranın en altında 'Restart' butonu olmalıdır. Her restart işleminde kartlar rastgele karıştırılmalıdır." */}
          <div className="flex flex-col items-center justify-center pt-2 pb-6 space-y-3">
            <button
              onClick={() => handleRestart()}
              className="w-full sm:w-auto min-w-[240px] px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Restart (Yeniden Başlat)</span>
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Kartları rastgele karıştırır ve hamle sayacını sıfırlar.
            </span>
          </div>
        </div>
      </main>

      {/* Signature & Accreditation Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              Frontend Web Development Projeleri &middot; Seviye 2 Proje 3
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Hazırlayan &amp; Geliştirici:</span>
            <span className="font-bold text-slate-900 dark:text-white px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
              Enes Öztürk
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <VictoryModal
        isOpen={isVictory}
        moves={moves}
        bestScore={bestScore}
        isNewBestScore={isNewBestScore}
        secondsElapsed={secondsElapsed}
        onRestart={() => handleRestart()}
      />

      <ProjectRequirementsModal
        isOpen={isRequirementsOpen}
        onClose={() => setIsRequirementsOpen(false)}
      />

      <ProjectHierarchy
        activeProjectId={activeProjectId}
        onSelectProject={(proj: ProjectItem) => {
          setActiveProjectId(proj.id);
          if (proj.id === 'memory-game') {
            handleRestart();
          }
        }}
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
      />
    </div>
  );
}
