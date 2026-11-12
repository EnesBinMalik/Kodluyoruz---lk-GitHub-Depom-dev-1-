/**
 * @license
 * Tweet Kartı Bileşeni
 * Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { Heart, Trash2, Share2, ShieldCheck, MessageCircle, Repeat2 } from 'lucide-react';
import { Tweet } from '../models/Tweet';
import { AppController } from '../controllers/AppController';

interface TweetCardProps {
  tweet: Tweet;
  onNavigateToProfile?: (userId: string) => void;
  onTweetDeleted?: () => void;
}

export const TweetCard: React.FC<TweetCardProps> = ({
  tweet,
  onNavigateToProfile,
  onTweetDeleted,
}) => {
  const app = AppController.getInstance();
  const currentUser = app.getCurrentUser();

  const isLiked = currentUser ? tweet.isLikedBy(currentUser.id) : false;
  const isAuthor = currentUser ? currentUser.id === tweet.authorId : false;
  const isEnes = tweet.authorUsername === 'enes';

  const [copied, setCopied] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    app.tweets.toggleLike(tweet.id, currentUser);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    if (window.confirm('Bu tweeti silmek istediğinizden emin misiniz?')) {
      const deleted = app.tweets.deleteTweet(tweet.id, currentUser);
      if (deleted && onTweetDeleted) {
        onTweetDeleted();
      }
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`"${tweet.content}" — @${tweet.authorUsername}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Metin içindeki hashtagleri belirginleştirme
  const renderFormattedContent = (content: string) => {
    const words = content.split(/(\s+)/);
    return words.map((word, idx) => {
      if (word.startsWith('#') && word.length > 1) {
        return (
          <span key={idx} className="text-sky-600 dark:text-sky-400 font-medium">
            {word}
          </span>
        );
      }
      if (word.startsWith('@') && word.length > 1) {
        return (
          <span key={idx} className="text-indigo-600 dark:text-indigo-400 font-medium">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <article className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-xs">
      <div className="flex gap-3">
        {/* Yazar Profil Resmi */}
        <button
          onClick={() => onNavigateToProfile && onNavigateToProfile(tweet.authorId)}
          className="shrink-0 focus:outline-none cursor-pointer group"
        >
          <img
            src={tweet.authorAvatarUrl}
            alt={tweet.authorName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-sky-500 transition-all"
          />
        </button>

        {/* İçerik Gövdesi */}
        <div className="flex-1 min-w-0">
          {/* Üst Satır: İsim, Kullanıcı Adı, Tarih */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <button
                onClick={() => onNavigateToProfile && onNavigateToProfile(tweet.authorId)}
                className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:underline truncate cursor-pointer"
              >
                {tweet.authorName}
              </button>

              {isEnes && (
                <span
                  title="Tweet Uygulaması 2 Mimarı"
                  className="inline-flex items-center text-sky-500"
                >
                  <ShieldCheck className="w-4 h-4 fill-sky-100 dark:fill-sky-950" />
                </span>
              )}

              <span className="text-xs text-slate-400 truncate">@{tweet.authorUsername}</span>
              <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs text-slate-400 shrink-0">{tweet.getFormattedTime()}</span>
            </div>

            {/* Silme Seçeneği (Yazar ise) */}
            {isAuthor && (
              <button
                onClick={handleDelete}
                title="Tweeti Sil"
                className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tweet Metni */}
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
            {renderFormattedContent(tweet.content)}
          </p>

          {/* Tweet Alt Etkileşim Çubuğu */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            {/* Beğeni Butonu */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                isLiked
                  ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 font-semibold'
                  : 'hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  isLiked ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              <span className="font-mono tabular-nums">{tweet.likesCount}</span>
            </button>

            {/* Paylaş / Kopyala */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Kopyalandı!' : 'Paylaş'}</span>
            </button>

            {/* 180 Karakter Rozeti */}
            <span className="text-[11px] text-slate-400 font-mono tabular-nums">
              {tweet.characterCount}/180 krk
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
