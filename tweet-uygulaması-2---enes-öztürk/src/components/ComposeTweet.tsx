/**
 * @license
 * Tweet Oluşturucu Bileşeni: 180 Karakter Limitli Dinamik Editör
 * Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { Send, Hash, Sparkles, AlertCircle } from 'lucide-react';
import { AppController } from '../controllers/AppController';
import { Tweet } from '../models/Tweet';

interface ComposeTweetProps {
  onTweetPosted?: () => void;
  placeholder?: string;
}

export const ComposeTweet: React.FC<ComposeTweetProps> = ({
  onTweetPosted,
  placeholder = 'Neler oluyor? (En fazla 180 karakter)...',
}) => {
  const app = AppController.getInstance();
  const currentUser = app.getCurrentUser();

  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  if (!currentUser) {
    return null;
  }

  const maxLength = Tweet.MAX_LENGTH; // 180
  const currentLength = content.length;
  const remaining = maxLength - currentLength;
  const progressRatio = Math.min(1, currentLength / maxLength);

  // Dairesel ilerleme çubuğu hesaplaması
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  // Renk hesaplama: son 20 karakterde turuncu, 0 kaldığında kırmızı
  let ringColor = 'text-sky-500';
  let counterColor = 'text-slate-400 dark:text-slate-500';
  if (remaining <= 20 && remaining > 0) {
    ringColor = 'text-amber-500';
    counterColor = 'text-amber-600 dark:text-amber-400 font-semibold';
  } else if (remaining <= 0) {
    ringColor = 'text-rose-500';
    counterColor = 'text-rose-600 dark:text-rose-400 font-bold';
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= maxLength) {
      setContent(val);
      if (error) setError(null);
    }
  };

  const handleAddTag = (tag: string) => {
    if (content.includes(tag)) return;
    const separator = content.endsWith(' ') || content.length === 0 ? '' : ' ';
    const newText = `${content}${separator}${tag} `;
    if (newText.length <= maxLength) {
      setContent(newText);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Lütfen bir içerik yazın.');
      return;
    }

    setIsPosting(true);
    const result = app.tweets.postTweet(content, currentUser);
    setIsPosting(false);

    if (result.success) {
      setContent('');
      setError(null);
      if (onTweetPosted) onTweetPosted();
    } else {
      setError(result.errorMessage || 'Tweet paylaşılamadı.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs transition-shadow hover:shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {currentUser.name}
              </span>
              <span className="font-mono text-slate-400">@{currentUser.username}</span>
            </div>

            <textarea
              value={content}
              onChange={handleTextChange}
              placeholder={placeholder}
              rows={3}
              maxLength={maxLength}
              className="w-full resize-none bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-lg">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Hızlı Etiket Ekleme Önerileri */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-slate-500">
          <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
            <Hash className="w-3 h-3" /> Etiket:
          </span>
          {['#OOP', '#MVC', '#EnesÖztürk', '#TweetApp'].map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => handleAddTag(tag)}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shrink-0 cursor-pointer text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Alt Çubuk: 180 Karakter Canlı Sayacı + Gönder Butonu */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {/* Dairesel Progress Çemberi */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  className={`transition-all duration-150 ${ringColor}`}
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Karakter Sayı Metni (180 limit) */}
            <div className="flex items-baseline gap-1 text-xs">
              <span className={`font-mono ${counterColor}`}>{currentLength}</span>
              <span className="text-slate-400 font-mono">/ {maxLength}</span>
              {remaining <= 20 && (
                <span className="ml-1 text-[11px] text-slate-400">({remaining} kaldı)</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!content.trim() || isPosting || currentLength > maxLength}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPosting ? 'Paylaşılıyor...' : 'Tweet Paylaş'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
