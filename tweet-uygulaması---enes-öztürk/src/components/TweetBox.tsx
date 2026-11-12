import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTweets } from '../context/TweetContext';
import { Sparkles, Image as ImageIcon, Smile, LogIn, UserPlus, CheckCircle2 } from 'lucide-react';

const MAX_CHARS = 180;

const SUGGESTED_TAGS = ['#EnesÖztürk', '#TweetApp', '#Yazılım', '#Teknoloji', '#Web'];

export const TweetBox: React.FC = () => {
  const { currentUser, isGuest, openAuthModal } = useAuth();
  const { addTweet } = useTweets();
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [justPosted, setJustPosted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const remainingChars = MAX_CHARS - content.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 25 && remainingChars >= 0;
  const progressRatio = Math.min(1, Math.max(0, content.length / MAX_CHARS));

  // Circle progress calculation
  const circleRadius = 14;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - progressRatio * circleCircumference;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS + 10) {
      setContent(val);
      setErrorMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) {
      openAuthModal('login', 'Tweet paylaşabilmek için lütfen giriş yapın veya kayıt olun.');
      return;
    }

    if (!content.trim()) return;

    if (content.length > MAX_CHARS) {
      setErrorMessage(`Tweet en fazla 180 karakter olabilir! Şu an: ${content.length}`);
      return;
    }

    const result = addTweet(content);
    if (result.success) {
      setContent('');
      setJustPosted(true);
      setTimeout(() => setJustPosted(false), 2400);
      setErrorMessage('');
    } else if (result.error) {
      setErrorMessage(result.error);
    }
  };

  const handleTagClick = (tag: string) => {
    if (isGuest) {
      openAuthModal('login', 'Tweet yazabilmek için lütfen giriş yapın.');
      return;
    }
    if ((content + ' ' + tag).length <= MAX_CHARS) {
      setContent(prev => (prev ? `${prev} ${tag}` : tag));
      textareaRef.current?.focus();
    }
  };

  const insertEmoji = (emoji: string) => {
    if ((content + emoji).length <= MAX_CHARS) {
      setContent(prev => prev + emoji);
      textareaRef.current?.focus();
    }
    setShowEmojiPicker(false);
  };

  const quickEmojis = ['🚀', '💻', '✨', '🔥', '👏', '🎯', '⚡', '☕', '❤️', '💡'];

  // GUEST MODE VIEW: Unregistered user banner
  if (isGuest) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Misafir Modu · Yalnızca Okuma
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Tweetleri okuyabilir, arayabilir ve inceleyebilirsiniz.
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              180 karakterlik kendi tweetlerinizi paylaşmak için hesabınıza giriş yapın veya ücretsiz kayıt olun.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openAuthModal('login', 'Tweet paylaşabilmek için lütfen giriş yapın.')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
            <button
              onClick={() => openAuthModal('register', '180 karakterle sesinizi duyurmak için hemen kayıt olun.')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Kayıt Ol</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN USER VIEW: Real-time compose box with 180 char enforcement
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-4 shadow-xs transition-colors">
      {justPosted && (
        <div className="mb-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-300 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Tweetiniz başarıyla paylaşıldı ve en üste eklendi!</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-3 p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl text-xs font-medium text-rose-700 dark:text-rose-300">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 ring-2 ring-slate-100 dark:ring-slate-800"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                {currentUser?.name}
                <span className="font-normal text-slate-400 dark:text-slate-500 ml-1">@{currentUser?.username}</span>
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                180 Karakter Sınırı
              </span>
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleTextChange}
              placeholder="Neler oluyor? (En fazla 180 karakter...)"
              rows={3}
              maxLength={MAX_CHARS}
              className="w-full resize-none border-0 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden text-base sm:text-lg leading-relaxed p-0"
            />

            {/* Quick Suggested Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-1 border-t border-slate-100 dark:border-slate-800/60 mt-1">
              <span className="text-xs text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-500" />
                Önerilen:
              </span>
              {SUGGESTED_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Emoji popup bar */}
            {showEmojiPicker && (
              <div className="flex items-center gap-1.5 p-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 my-2">
                {quickEmojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => insertEmoji(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-lg hover:scale-125 transition-transform cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Actions & Live Character Counter */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  title="Emoji Ekle"
                  className="p-2 text-slate-500 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/50 rounded-lg transition-colors cursor-pointer"
                >
                  <Smile className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (content.length <= MAX_CHARS - 12) {
                      setContent(prev => (prev ? `${prev} #EnesÖztürk` : '#EnesÖztürk'));
                    }
                  }}
                  title="Enes Öztürk Etiketi"
                  className="px-2.5 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-colors"
                >
                  #EnesÖztürk
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Visual Circular Gauge & Character Counter */}
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r={circleRadius}
                        fill="none"
                        className="stroke-slate-200 dark:stroke-slate-800"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r={circleRadius}
                        fill="none"
                        className={`transition-all duration-150 ${
                          isOverLimit
                            ? 'stroke-rose-500'
                            : isNearLimit
                            ? 'stroke-amber-500'
                            : 'stroke-sky-500'
                        }`}
                        strokeWidth="3"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span
                    className={`font-mono text-xs tabular-nums font-semibold ${
                      isOverLimit
                        ? 'text-rose-500 font-bold'
                        : isNearLimit
                        ? 'text-amber-500 font-medium'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {remainingChars}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!content.trim() || isOverLimit}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                    !content.trim() || isOverLimit
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : 'bg-sky-500 hover:bg-sky-600 active:scale-98 text-white shadow-sky-500/20'
                  }`}
                >
                  Tweetle
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
