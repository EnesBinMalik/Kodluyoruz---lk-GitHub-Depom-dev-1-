/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TweetProvider, useTweets } from './context/TweetContext';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { TweetBox } from './components/TweetBox';
import { TweetCard } from './components/TweetCard';
import { AuthModal } from './components/AuthModal';
import { DeveloperModal } from './components/DeveloperModal';
import {
  Sparkles,
  Award,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  RefreshCw,
  Search,
  X,
  MessageSquare,
  Home,
  Hash,
  ShieldCheck,
} from 'lucide-react';

const MainApp: React.FC = () => {
  const { currentUser, isGuest, openAuthModal } = useAuth();
  const {
    filteredTweets,
    filter,
    setFilter,
    activeTag,
    setActiveTag,
    searchQuery,
    setSearchQuery,
    resetTweets,
  } = useTweets();

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tweet_theme');
      if (saved) return saved === 'dark';
    } catch {
      // fallback
    }
    return true; // Default to dark for slick modern Twitter/X microblog feel
  });

  const [developerModalOpen, setDeveloperModalOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tweet_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tweet_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center">
      <div className="w-full max-w-7xl flex">
        {/* Left Sidebar */}
        <Sidebar
          onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        {/* Center Main Feed Viewport */}
        <main className="flex-1 min-w-0 max-w-2xl border-r border-slate-200 dark:border-slate-800 pb-20 md:pb-8">
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="md:hidden w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>Ana Akış</span>
                    <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                      (En yeniler en üstte)
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <button
                      onClick={() => setDeveloperModalOpen(true)}
                      className="hover:text-sky-500 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Award className="w-3.5 h-3.5 text-sky-500" />
                      <span>Enes Öztürk İmzalı</span>
                    </button>
                    <span>·</span>
                    <span>180 Karakter</span>
                  </div>
                </div>
              </div>

              {/* Mobile Actions: Guest buttons or user avatar + Theme toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  title="Temayı Değiştir"
                  className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                </button>

                {isGuest ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Giriş
                    </button>
                    <button
                      onClick={() => openAuthModal('register')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-colors cursor-pointer"
                    >
                      Kayıt
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-sky-500/30"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Feed Filter Tabs */}
            <div className="flex items-center gap-6 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => {
                  setFilter('all');
                  setActiveTag(null);
                }}
                className={`pb-2 relative transition-colors cursor-pointer ${
                  filter === 'all' && !activeTag
                    ? 'text-sky-600 dark:text-sky-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Senin İçin
                {filter === 'all' && !activeTag && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>

              <button
                onClick={() => {
                  setFilter('popular');
                  setActiveTag(null);
                }}
                className={`pb-2 relative transition-colors cursor-pointer ${
                  filter === 'popular'
                    ? 'text-sky-600 dark:text-sky-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Popüler Tweetler
                {filter === 'popular' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTag('#EnesÖztürk');
                }}
                className={`pb-2 relative transition-colors cursor-pointer ${
                  activeTag === '#EnesÖztürk'
                    ? 'text-sky-600 dark:text-sky-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                #EnesÖztürk
                {activeTag === '#EnesÖztürk' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            </div>
          </header>

          {/* Active Filter or Search Notification Bar */}
          {(activeTag || searchQuery) && (
            <div className="bg-sky-50/70 dark:bg-sky-950/40 border-b border-sky-100 dark:border-sky-900/40 px-4 py-2 flex items-center justify-between text-xs">
              <span className="text-sky-900 dark:text-sky-200">
                Filtrelenen içerik:{' '}
                <strong>{activeTag || `"${searchQuery}"`}</strong>
              </span>
              <button
                onClick={() => {
                  setActiveTag(null);
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-medium cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Filtreyi Temizle
              </button>
            </div>
          )}

          {/* Feed Content */}
          <div className="p-3 sm:p-4">
            {/* Tweetbox (Compose 180 chars or guest prompt) */}
            <TweetBox />

            {/* List of Tweets */}
            <div className="space-y-3">
              {filteredTweets.length > 0 ? (
                filteredTweets.map(tweet => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    Henüz tweet bulunamadı
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    Arama kriterinizle eşleşen bir tweet yok veya filtreleme yapıldı.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTag(null);
                      setSearchQuery('');
                      setFilter('all');
                    }}
                    className="mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Tüm Tweetleri Göster
                  </button>
                </div>
              )}
            </div>

            {/* End of feed banner & Signature */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>Tweet Uygulaması — <strong>Enes Öztürk İmzalı</strong></span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                En güncel tweetler her zaman sayfanın başında yer alır. Maksimum 180 karakter.
              </p>
            </div>
          </div>
        </main>

        {/* Right Sidebar (Search, Trending, Signature) */}
        <RightSidebar onOpenDeveloperModal={() => setDeveloperModalOpen(true)} />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around py-2.5 px-4 shadow-lg">
        <button
          onClick={() => {
            setFilter('all');
            setActiveTag(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
            filter === 'all' ? 'text-sky-500' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Akış</span>
        </button>

        <button
          onClick={() => {
            setFilter('popular');
            setActiveTag(null);
          }}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
            filter === 'popular' ? 'text-sky-500' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Hash className="w-5 h-5" />
          <span>Trendler</span>
        </button>

        <button
          onClick={() => {
            if (isGuest) {
              openAuthModal('login', 'Tweet paylaşabilmek için lütfen giriş yapın.');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              document.querySelector('textarea')?.focus();
            }
          }}
          className="flex items-center justify-center w-10 h-10 -mt-3 rounded-full bg-sky-500 text-white shadow-md shadow-sky-500/40 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        <button
          onClick={() => setDeveloperModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 cursor-pointer"
        >
          <Award className="w-5 h-5 text-sky-500" />
          <span>Enes Öztürk</span>
        </button>

        <button
          onClick={() => {
            if (isGuest) {
              openAuthModal('login');
            } else {
              setDeveloperModalOpen(true);
            }
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 cursor-pointer"
        >
          {isGuest ? (
            <>
              <LogIn className="w-5 h-5" />
              <span>Giriş</span>
            </>
          ) : (
            <img
              src={currentUser?.avatar}
              alt="Profil"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-sky-500"
            />
          )}
          <span>{isGuest ? 'Giriş' : 'Profil'}</span>
        </button>
      </nav>

      {/* Auth Modal (Login / Register) */}
      <AuthModal />

      {/* Developer Signature & Specification Details Modal */}
      <DeveloperModal
        isOpen={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TweetProvider>
        <MainApp />
      </TweetProvider>
    </AuthProvider>
  );
}
