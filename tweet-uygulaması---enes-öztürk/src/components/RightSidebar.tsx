import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTweets } from '../context/TweetContext';
import { Search, Sparkles, TrendingUp, Award, Check, ExternalLink } from 'lucide-react';

interface RightSidebarProps {
  onOpenDeveloperModal: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onOpenDeveloperModal }) => {
  const { users, currentUser, switchUser } = useAuth();
  const { searchQuery, setSearchQuery, activeTag, setActiveTag } = useTweets();

  const trendingTopics = [
    { tag: '#EnesÖztürk', category: 'Geliştirici İmzası', tweetCount: '1.8 B Tweet' },
    { tag: '#180Karakter', category: 'Yeni Özellik', tweetCount: '3.4 B Tweet' },
    { tag: '#TweetApp', category: 'Teknoloji · Trend', tweetCount: '5.2 B Tweet' },
    { tag: '#Yazılım', category: 'Yazılım ve Kodlama', tweetCount: '12.1 B Tweet' },
    { tag: '#Tasarım', category: 'UI / UX Tasarımı', tweetCount: '4.8 B Tweet' },
  ];

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
    }
  };

  return (
    <aside className="w-72 lg:w-80 shrink-0 hidden xl:flex flex-col gap-4 sticky top-0 h-screen py-6 px-4 overflow-y-auto">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Tweet veya kullanıcı ara..."
          className="w-full bg-slate-100 dark:bg-slate-800/80 border border-transparent dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:bg-white dark:focus:bg-slate-900 focus:border-sky-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Featured Developer Card: Enes Öztürk */}
      <div className="bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-transparent border border-sky-200 dark:border-sky-900/60 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-2.5">
          <Award className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
            Proje İmzası
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/src/assets/images/avatar_enes_ozturk_1794247644235.jpg"
            alt="Enes Öztürk"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-500/30"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              Enes Öztürk
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              @enesozturk · Uygulama Sahibi
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
          180 karakter sınırlamalı, son tweetlerin en başta gösterildiği modern mikroblog platformu.
        </p>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sky-200/60 dark:border-sky-900/40">
          <button
            onClick={onOpenDeveloperModal}
            className="flex-1 py-1.5 px-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold text-center transition-colors cursor-pointer"
          >
            İmza Detayları
          </button>
          {currentUser?.username !== 'enesozturk' && (
            <button
              onClick={() => switchUser('enesozturk')}
              title="Enes Öztürk hesabına hızlı geçiş"
              className="py-1.5 px-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Enes Olarak Gir
            </button>
          )}
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-sky-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Günün Gündemleri
            </h3>
          </div>
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="text-xs text-sky-500 hover:underline"
            >
              Filtreyi Kaldır
            </button>
          )}
        </div>

        <div className="space-y-3">
          {trendingTopics.map(item => {
            const isSelected = activeTag === item.tag;
            return (
              <button
                key={item.tag}
                onClick={() => handleTagClick(item.tag)}
                className={`w-full text-left p-2 -mx-2 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="text-[11px] text-slate-400 dark:text-slate-500">
                  {item.category}
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {item.tag}
                </div>
                <div className="text-[11px] text-slate-400 font-mono tabular-nums">
                  {item.tweetCount}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Who To Follow */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
          Kimi Takip Etmeli
        </h3>
        <div className="space-y-3">
          {users
            .filter(u => u.id !== currentUser?.id)
            .slice(0, 3)
            .map(user => (
              <div key={user.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      @{user.username}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => switchUser(user.username)}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                >
                  Profiline Geç
                </button>
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
};
