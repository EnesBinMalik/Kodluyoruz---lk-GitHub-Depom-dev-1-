import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  coverUrl: string | null;
  title: string;
  author: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BookCover: React.FC<BookCoverProps> = ({
  coverUrl,
  title,
  author,
  className = '',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If no cover or error occurred, render stylized fallback cover
  if (!coverUrl || hasError) {
    // Generate deterministic hue based on title characters for unique aesthetic covers
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const palettes = [
      { bg: 'from-amber-900 to-amber-950', border: 'border-amber-700/50', accent: 'text-amber-200' },
      { bg: 'from-stone-800 to-stone-950', border: 'border-stone-700/50', accent: 'text-stone-200' },
      { bg: 'from-emerald-900 to-emerald-950', border: 'border-emerald-700/50', accent: 'text-emerald-200' },
      { bg: 'from-blue-950 to-slate-950', border: 'border-blue-700/50', accent: 'text-blue-200' },
      { bg: 'from-red-950 to-stone-950', border: 'border-red-700/50', accent: 'text-red-200' },
      { bg: 'from-indigo-950 to-slate-950', border: 'border-indigo-700/50', accent: 'text-indigo-200' },
    ];
    const palette = palettes[Math.abs(hash) % palettes.length];

    return (
      <div
        className={`relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-gradient-to-br ${palette.bg} border ${palette.border} p-3.5 flex flex-col justify-between shadow-sm select-none ${className}`}
      >
        {/* Book spine crease line */}
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/25 border-r border-white/10" />

        {/* Decorative inner frame */}
        <div className="absolute inset-1.5 border border-white/10 rounded pointer-events-none" />

        <div className="pl-2 pt-1 z-10">
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-mono block mb-1">
            Klasik Eser
          </span>
          <h4 className="font-serif text-white font-bold leading-tight line-clamp-3 text-xs sm:text-sm">
            {title}
          </h4>
        </div>

        <div className="pl-2 z-10 flex items-center justify-center my-auto py-2 opacity-30 text-white">
          <BookOpen className="w-8 h-8" />
        </div>

        <div className="pl-2 pb-1 z-10 border-t border-white/10 pt-2">
          <p className={`text-[11px] font-medium ${palette.accent} line-clamp-1`}>
            {author}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-sm ${className}`}>
      {/* Book spine edge effect */}
      <div className="absolute left-0 top-0 bottom-0 w-2 z-10 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none" />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-stone-400 dark:text-stone-600 animate-pulse" />
        </div>
      )}

      {/* Cover Image */}
      <img
        src={coverUrl}
        alt={`${title} - ${author}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
