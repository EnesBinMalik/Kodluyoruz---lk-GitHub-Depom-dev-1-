import React, { useState } from 'react';
import { Tweet } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTweets } from '../context/TweetContext';
import {
  Heart,
  Repeat2,
  MessageCircle,
  Bookmark,
  Share2,
  Trash2,
  BadgeCheck,
  Send,
  Sparkles,
} from 'lucide-react';

interface TweetCardProps {
  tweet: Tweet;
}

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const { currentUser, isGuest, openAuthModal } = useAuth();
  const { likeTweet, retweetTweet, bookmarkTweet, deleteTweet, replyTweet, setActiveTag } = useTweets();

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  const hasLiked = currentUser ? tweet.likes.includes(currentUser.id) : false;
  const hasRetweeted = currentUser ? tweet.retweets.includes(currentUser.id) : false;
  const hasBookmarked = currentUser ? tweet.bookmarks.includes(currentUser.id) : false;
  const isAuthor = currentUser ? tweet.userId === currentUser.id : false;

  // Format time display
  const getTimeDisplay = () => {
    const diffMs = Date.now() - tweet.timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'şimdi';
    if (diffMin < 60) return `${diffMin}dk`;
    if (diffHour < 24) return `${diffHour}s`;
    return `${diffDay}g`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      openAuthModal('login', 'Tweetleri beğenmek için lütfen giriş yapın veya kayıt olun.');
      return;
    }
    likeTweet(tweet.id);
  };

  const handleRetweet = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      openAuthModal('login', 'Tweetleri yeniden paylaşmak için lütfen giriş yapın veya kayıt olun.');
      return;
    }
    retweetTweet(tweet.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      openAuthModal('login', 'Tweetleri yer imlerine eklemek için lütfen giriş yapın.');
      return;
    }
    bookmarkTweet(tweet.id);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `"${tweet.content}" — @${tweet.username} (Tweet Uygulaması - Enes Öztürk)`
        );
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2000);
      }
    } catch {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) {
      openAuthModal('login', 'Yorum yazabilmek için lütfen giriş yapın veya kayıt olun.');
      return;
    }
    if (!replyContent.trim()) return;

    const res = replyTweet(tweet.id, replyContent);
    if (res.success) {
      setReplyContent('');
      setShowReplyBox(false);
    }
  };

  // Parse hashtags & mentions
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <button
            key={index}
            onClick={e => {
              e.stopPropagation();
              setActiveTag(part);
            }}
            className="text-sky-600 dark:text-sky-400 hover:underline font-medium inline-block cursor-pointer"
          >
            {part}
          </button>
        );
      }
      if (part.startsWith('@')) {
        return (
          <span
            key={index}
            className="text-sky-600 dark:text-sky-400 font-medium inline-block"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const isEnesOzturk = tweet.username.toLowerCase() === 'enesozturk';

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-3 transition-all hover:border-slate-300 dark:hover:border-slate-700/80 shadow-xs relative">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="absolute top-3 right-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs px-3 py-1.5 rounded-lg shadow-md animate-fadeIn z-10 font-medium">
          Tweet metni panoya kopyalandı!
        </div>
      )}

      {/* Author badge if Enes Öztürk */}
      {isEnesOzturk && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Geliştirici İmzası · Enes Öztürk</span>
        </div>
      )}

      <div className="flex gap-3">
        {/* User Avatar */}
        <div className="shrink-0">
          <img
            src={tweet.userAvatar}
            alt={tweet.userDisplayName}
            referrerPolicy="no-referrer"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          {/* Header Line */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                {tweet.userDisplayName}
              </span>
              {tweet.isVerified && (
                <BadgeCheck className="w-4 h-4 text-sky-500 shrink-0 inline fill-sky-500/10" />
              )}
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                @{tweet.username}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap font-mono tabular-nums">
                {getTimeDisplay()}
              </span>
            </div>

            {/* Delete button (only author) */}
            {isAuthor && (
              <button
                onClick={() => deleteTweet(tweet.id)}
                title="Tweeti Sil"
                className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tweet Text (Max 180 chars) */}
          <p className="mt-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed break-words">
            {renderFormattedContent(tweet.content)}
          </p>

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 max-w-md text-slate-500 dark:text-slate-400">
            {/* Reply Button */}
            <button
              onClick={() => setShowReplyBox(!showReplyBox)}
              className="group flex items-center gap-1.5 text-xs hover:text-sky-500 transition-colors cursor-pointer"
              title="Cevapla"
            >
              <div className="p-1.5 rounded-full group-hover:bg-sky-50 dark:group-hover:bg-sky-950/40 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="font-mono tabular-nums">{tweet.replies.length}</span>
            </button>

            {/* Retweet Button */}
            <button
              onClick={handleRetweet}
              className={`group flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                hasRetweeted ? 'text-emerald-500 font-semibold' : 'hover:text-emerald-500'
              }`}
              title="Yeniden Paylaş"
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  hasRetweeted
                    ? 'bg-emerald-50 dark:bg-emerald-950/50'
                    : 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40'
                }`}
              >
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="font-mono tabular-nums">{tweet.retweets.length}</span>
            </button>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`group flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                hasLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
              }`}
              title="Beğen"
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  hasLiked
                    ? 'bg-rose-50 dark:bg-rose-950/50'
                    : 'group-hover:bg-rose-50 dark:group-hover:bg-rose-950/40'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''} transition-transform`}
                />
              </div>
              <span className="font-mono tabular-nums">{tweet.likes.length}</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`group flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                hasBookmarked ? 'text-sky-500 font-semibold' : 'hover:text-sky-500'
              }`}
              title="Yer İmlerine Ekle"
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  hasBookmarked
                    ? 'bg-sky-50 dark:bg-sky-950/50'
                    : 'group-hover:bg-sky-50 dark:group-hover:bg-sky-950/40'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${hasBookmarked ? 'fill-sky-500' : ''}`} />
              </div>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="group flex items-center gap-1.5 text-xs hover:text-sky-500 transition-colors cursor-pointer"
              title="Tweeti Paylaş / Kopyala"
            >
              <div className="p-1.5 rounded-full group-hover:bg-sky-50 dark:group-hover:bg-sky-950/40 transition-colors">
                <Share2 className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Inline Reply Box */}
          {showReplyBox && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              {isGuest ? (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300">
                    Yorum bırakmak için giriş yapmanız gerekiyor.
                  </span>
                  <button
                    onClick={() => openAuthModal('login', 'Yorum yapmak için giriş yapın.')}
                    className="font-semibold text-sky-500 hover:underline cursor-pointer"
                  >
                    Giriş Yap
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReplySubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)}
                      placeholder="Cevabını tweetle (maks. 180 karakter)..."
                      maxLength={180}
                      className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                    />
                    <button
                      type="submit"
                      disabled={!replyContent.trim()}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 rounded-xl text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Yanıtla</span>
                    </button>
                  </div>
                  <div className="text-right text-[11px] font-mono tabular-nums text-slate-400">
                    {180 - replyContent.length} karakter kaldı
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Reply List */}
          {tweet.replies.length > 0 && (
            <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
              {tweet.replies.map(reply => (
                <div
                  key={reply.id}
                  className="flex gap-2.5 bg-slate-50/80 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40"
                >
                  <img
                    src={reply.userAvatar}
                    alt={reply.userDisplayName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {reply.userDisplayName}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        @{reply.username}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 break-words">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
