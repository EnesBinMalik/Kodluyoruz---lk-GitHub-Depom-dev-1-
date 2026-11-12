import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTweets } from '../context/TweetContext';
import {
  Home,
  Hash,
  Bookmark,
  Award,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserCheck,
  Send,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface SidebarProps {
  onOpenDeveloperModal: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenDeveloperModal,
  isDark,
  toggleTheme,
}) => {
  const { currentUser, isGuest, logout, setGuestMode, switchUser, users, openAuthModal } = useAuth();
  const { filter, setFilter, setActiveTag, setSearchQuery } = useTweets();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleNavClick = (navType: 'all' | 'popular' | 'bookmarks') => {
    setActiveTag(null);
    setSearchQuery('');
    if (navType === 'all') setFilter('all');
    else if (navType === 'popular') setFilter('popular');
  };

  const handleTweetButtonClick = () => {
    if (isGuest) {
      openAuthModal('login', 'Tweet paylaşabilmek için lütfen giriş yapın veya kayıt olun.');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Focus textarea
      const el = document.querySelector('textarea');
      el?.focus();
    }
  };

  return (
    <aside className="w-64 lg:w-72 shrink-0 hidden md:flex flex-col justify-between h-screen sticky top-0 px-4 py-6 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      {/* Top Part: Brand + Nav */}
      <div className="space-y-6">
        {/* Brand Logo & Signature */}
        <div className="px-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
                Tweet
              </h1>
              <button
                onClick={onOpenDeveloperModal}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Enes Öztürk İmzalı</span>
                <Award className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 text-sm font-semibold">
          <button
            onClick={() => handleNavClick('all')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-100 dark:bg-slate-800/80 text-sky-600 dark:text-sky-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Ana Sayfa (Akış)</span>
          </button>

          <button
            onClick={() => handleNavClick('popular')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all cursor-pointer ${
              filter === 'popular'
                ? 'bg-slate-100 dark:bg-slate-800/80 text-sky-600 dark:text-sky-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Hash className="w-5 h-5" />
            <span>Popüler Tweetler</span>
          </button>

          <button
            onClick={onOpenDeveloperModal}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
          >
            <Award className="w-5 h-5 text-sky-500" />
            <span>Geliştirici İmzası</span>
          </button>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-5 h-5 text-amber-400" />
                <span>Açık Tema</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-slate-600" />
                <span>Koyu Tema</span>
              </>
            )}
          </button>
        </nav>

        {/* Primary Tweet CTA Button */}
        <div className="pt-2">
          <button
            onClick={handleTweetButtonClick}
            className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md shadow-sky-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isGuest ? 'Giriş Yap ve Tweetle' : 'Tweet Paylaş (180)'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Part: User Info / Guest Actions */}
      <div className="relative pt-4 border-t border-slate-200 dark:border-slate-800">
        {/* User menu dropdown */}
        {showUserMenu && currentUser && (
          <div className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-20 space-y-1 animate-fadeIn">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Hesap Değiştir veya Çıkış
            </div>
            {users
              .filter(u => u.id !== currentUser.id)
              .slice(0, 3)
              .map(u => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.username);
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                >
                  <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="truncate flex-1 font-medium text-slate-800 dark:text-slate-200">
                    {u.name}
                  </span>
                  <span className="text-slate-400 text-[11px]">@{u.username}</span>
                </button>
              ))}

            <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

            <button
              onClick={() => {
                setGuestMode();
                setShowUserMenu(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer font-medium"
            >
              <UserCheck className="w-4 h-4" />
              <span>Misafir Moduna Geç</span>
            </button>

            <button
              onClick={() => {
                logout();
                setShowUserMenu(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        )}

        {currentUser ? (
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
              />
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {currentUser.name}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 truncate">
                  @{currentUser.username}
                </div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        ) : (
          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Şu anda <strong>Misafir</strong> olarak görüntülüyorsunuz.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="flex-1 py-1.5 px-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 text-center transition-colors cursor-pointer"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="flex-1 py-1.5 px-2 bg-sky-500 hover:bg-sky-600 rounded-lg text-xs font-semibold text-white text-center transition-colors cursor-pointer"
              >
                Kayıt Ol
              </button>
            </div>
          </div>
        )}

        {/* Developer signature in sidebar */}
        <div className="mt-3 px-2 text-center">
          <button
            onClick={onOpenDeveloperModal}
            className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-sky-500 transition-colors cursor-pointer block w-full truncate"
          >
            © 2025 Enes Öztürk İmzalı
          </button>
        </div>
      </div>
    </aside>
  );
};
