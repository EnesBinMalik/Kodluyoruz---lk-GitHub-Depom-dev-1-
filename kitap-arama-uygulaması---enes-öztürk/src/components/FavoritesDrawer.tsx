import React, { useState } from 'react';
import { X, Bookmark, Trash2, Info, BookOpen, CheckCircle, Clock, BookMarked } from 'lucide-react';
import { Book, ReadingStatus } from '../types/book';
import { BookCover } from './BookCover';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Book[];
  onRemoveFavorite: (bookId: string) => void;
  onSelectBook: (book: Book) => void;
  readingStatuses: Record<string, ReadingStatus>;
  onChangeReadingStatus: (bookId: string, status: ReadingStatus | null) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectBook,
  readingStatuses,
  onChangeReadingStatus,
}) => {
  const [filter, setFilter] = useState<'all' | ReadingStatus>('all');

  if (!isOpen) return null;

  const filteredBooks = favorites.filter((book) => {
    if (filter === 'all') return true;
    return readingStatuses[book.id] === filter;
  });

  const getStatusLabel = (status?: ReadingStatus) => {
    switch (status) {
      case 'want_to_read':
        return { text: 'Okunacak', color: 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' };
      case 'reading':
        return { text: 'Okunuyor', color: 'text-blue-700 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800' };
      case 'completed':
        return { text: 'Okundu', color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
      default:
        return { text: 'Listede', color: 'text-stone-600 bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700' };
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-700 dark:text-amber-500" />
            <div>
              <h2 className="font-serif font-bold text-lg leading-tight">Okuma Listem & Favoriler</h2>
              <p className="text-xs text-stone-700 dark:text-stone-400">
                {favorites.length} kayıtlı kitap
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="p-3 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              filter === 'all'
                ? 'bg-amber-700 text-white'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Tümü ({favorites.length})
          </button>
          <button
            onClick={() => setFilter('want_to_read')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              filter === 'want_to_read'
                ? 'bg-amber-700 text-white'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Okunacak
          </button>
          <button
            onClick={() => setFilter('reading')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              filter === 'reading'
                ? 'bg-amber-700 text-white'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Okunuyor
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              filter === 'completed'
                ? 'bg-amber-700 text-white'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            Okundu
          </button>
        </div>

        {/* Book List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredBooks.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-600 dark:text-stone-400">
              <BookOpen className="w-12 h-12 stroke-[1.5] text-stone-300 dark:text-stone-700 mb-3" />
              <p className="font-serif text-base font-semibold text-stone-700 dark:text-stone-300">
                Listenizde kitap bulunmuyor
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-xs">
                Kitap arayarak ilgilendiğiniz eserleri favorilere ekleyebilir, okuma durumunuzu takip edebilirsiniz.
              </p>
            </div>
          ) : (
            filteredBooks.map((book) => {
              const statusInfo = getStatusLabel(readingStatuses[book.id]);
              return (
                <div
                  key={book.id}
                  className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/60 hover:border-amber-400/50 transition-all flex gap-3"
                >
                  {/* Thumbnail Cover */}
                  <div className="w-14 shrink-0 shadow-xs">
                    <BookCover
                      coverUrl={book.coverImage}
                      title={book.title}
                      author={book.authors[0] || ''}
                      size="sm"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveFavorite(book.id)}
                          className="p-1 text-stone-400 hover:text-rose-500 rounded transition-colors"
                          title="Listeden Çıkar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          onSelectBook(book);
                        }}
                        className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-400 transition-colors line-clamp-1 mt-1 cursor-pointer"
                        title={book.title}
                      >
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 truncate">
                        {book.authors.join(', ')}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs pt-1 border-t border-stone-100 dark:border-stone-800">
                      <span className="text-[11px] text-stone-600 dark:text-stone-400 font-mono">
                        {book.pageCount ? `${book.pageCount} sf.` : book.formattedDate}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectBook(book);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        <Info className="w-3 h-3" />
                        <span>Detay</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Enes Öztürk Signature */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-stone-600 dark:text-stone-400 bg-stone-50/50 dark:bg-stone-900/50">
          Enes Öztürk Kişisel Kitaplık Yöneticisi
        </div>
      </div>
    </div>
  );
};
