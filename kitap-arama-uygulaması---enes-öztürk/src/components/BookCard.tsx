import React from 'react';
import { Book as BookIcon, Calendar, Bookmark, Heart, ExternalLink, Info } from 'lucide-react';
import { Book } from '../types/book';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  isFavorite: boolean;
  onToggleFavorite: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) => {
  const authorDisplay = book.authors.join(', ');

  return (
    <article className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 dark:hover:border-amber-600/50 shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden">
      {/* Top Media Area with Cover */}
      <div className="relative p-4 pb-0 bg-stone-50/70 dark:bg-stone-900/50 flex justify-center items-center">
        {/* Cover with 3:4 aspect ratio */}
        <div className="w-36 sm:w-40 transition-transform duration-300 group-hover:-translate-y-1">
          <BookCover
            coverUrl={book.coverImage}
            title={book.title}
            author={authorDisplay}
            size="md"
          />
        </div>

        {/* Favorite quick toggle button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book);
          }}
          aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFavorite
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400'
              : 'bg-white/80 dark:bg-stone-800/80 text-stone-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Book Content / Info Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Language */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 mb-1.5 flex-wrap">
            <span>{book.categories[0] || 'Genel'}</span>
            <span aria-hidden="true">·</span>
            <span>{book.languageName}</span>
          </div>

          {/* Book Title */}
          <h3
            className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug cursor-pointer"
            onClick={() => onSelect(book)}
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Subtitle if available */}
          {book.subtitle && (
            <p className="text-xs text-stone-600 dark:text-stone-400 italic line-clamp-1 mt-0.5">
              {book.subtitle}
            </p>
          )}

          {/* Authors */}
          <p className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-1 line-clamp-1">
            {authorDisplay}
          </p>

          {/* Publisher & Page Count */}
          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
            <span className="truncate max-w-[140px]" title={book.publisher}>
              {book.publisher}
            </span>
            <div className="flex items-center gap-1 tabular-nums shrink-0 font-mono text-[11px]">
              {book.pageCount ? (
                <span>{book.pageCount} sayfa</span>
              ) : (
                <span>{book.publishedDate ? book.publishedDate.substring(0, 4) : '—'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button: Mandatory "Detay" button */}
        <div className="mt-4 pt-2">
          <button
            type="button"
            onClick={() => onSelect(book)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-700 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white text-stone-800 dark:text-stone-200 text-xs font-semibold tracking-wide transition-all cursor-pointer group/btn"
          >
            <Info className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 group-hover/btn:text-white transition-colors" />
            <span>Detay</span>
          </button>
        </div>
      </div>
    </article>
  );
};
