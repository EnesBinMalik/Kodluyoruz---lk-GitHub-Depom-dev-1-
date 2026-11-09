import React, { useEffect, useState } from 'react';
import {
  X,
  BookOpen,
  Calendar,
  Building2,
  FileText,
  Globe,
  Hash,
  Star,
  ExternalLink,
  Heart,
  Bookmark,
  Share2,
  Check,
  Sparkles,
} from 'lucide-react';
import { Book, ReadingStatus } from '../types/book';
import { BookCover } from './BookCover';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (book: Book) => void;
  readingStatus?: ReadingStatus;
  onChangeReadingStatus: (bookId: string, status: ReadingStatus | null) => void;
  onSearchAuthor?: (author: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  isFavorite,
  onToggleFavorite,
  readingStatus,
  onChangeReadingStatus,
  onSearchAuthor,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!book) return null;

  const handleCopyCitation = () => {
    const citation = `${book.authors.join(', ')}. (${book.publishedDate.substring(0, 4) || 't.y.'}). ${book.title}. ${book.publisher}.`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800 transition-all text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Kitap Detay Bilgileri · Enes Öztürk Kataloğu</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Book Cover & Quick Actions */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-48 sm:w-56 shadow-xl rounded-lg overflow-hidden">
                <BookCover
                  coverUrl={book.coverImage}
                  title={book.title}
                  author={book.authors.join(', ')}
                  size="lg"
                />
              </div>

              {/* Action Buttons: Favorite & Reading List */}
              <div className="w-full mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(book)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                      : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}</span>
                </button>

                {/* Reading Status Selector */}
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 font-medium mb-2">
                    <Bookmark className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Okuma Durumum:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {(
                      [
                        { id: 'want_to_read', label: 'Okunacak' },
                        { id: 'reading', label: 'Okunuyor' },
                        { id: 'completed', label: 'Okundu' },
                      ] as const
                    ).map((status) => {
                      const isActive = readingStatus === status.id;
                      return (
                        <button
                          key={status.id}
                          type="button"
                          onClick={() =>
                            onChangeReadingStatus(
                              book.id,
                              isActive ? null : status.id
                            )
                          }
                          className={`py-1.5 px-1 text-[11px] font-medium rounded-lg transition-colors cursor-pointer text-center ${
                            isActive
                              ? 'bg-amber-700 text-white font-semibold shadow-xs'
                              : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                          }`}
                        >
                          {status.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Google Books External Link */}
                {(book.previewLink || book.infoLink) && (
                  <a
                    href={book.previewLink || book.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 transition-colors"
                  >
                    <span>Google Books'ta İncele</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Complete Specifications & Synopsis */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                {/* Categories */}
                <div className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">
                  <span>{book.categories.join(' · ') || 'Genel Edebiyat'}</span>
                </div>

                {/* Book Title */}
                <h2
                  id="book-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight"
                >
                  {book.title}
                </h2>

                {/* Subtitle */}
                {book.subtitle && (
                  <p className="font-serif italic text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-1">
                    {book.subtitle}
                  </p>
                )}

                {/* Authors */}
                <div className="mt-3 flex items-center flex-wrap gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <span className="font-medium text-stone-600 dark:text-stone-400">Yazar:</span>
                  {book.authors.map((author) => (
                    <button
                      key={author}
                      type="button"
                      onClick={() => {
                        if (onSearchAuthor) {
                          onSearchAuthor(author);
                          onClose();
                        }
                      }}
                      className="font-semibold text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-400 underline decoration-amber-500/40 underline-offset-4 cursor-pointer"
                    >
                      {author}
                    </button>
                  ))}
                </div>

                {/* Google Ratings if available */}
                {typeof book.averageRating === 'number' && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-center text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= Math.round(book.averageRating || 0)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300 dark:text-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {book.averageRating}
                    </span>
                    {book.ratingsCount && (
                      <span className="text-stone-600 dark:text-stone-400">({book.ratingsCount} değerlendirme)</span>
                    )}
                  </div>
                )}

                {/* Detailed Specifications Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800">
                  {/* Sayfa Sayısı */}
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] text-stone-600 dark:text-stone-400 font-medium">
                        Sayfa Sayısı
                      </span>
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
                        {book.pageCount ? `${book.pageCount} sayfa` : 'Belirtilmemiş'}
                      </span>
                    </div>
                  </div>

                  {/* Yayın Tarihi */}
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] text-stone-600 dark:text-stone-400 font-medium">
                        Yayın Tarihi
                      </span>
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {book.formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Yayınevi */}
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] text-stone-600 dark:text-stone-400 font-medium">
                        Yayınevi
                      </span>
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 line-clamp-1">
                        {book.publisher}
                      </span>
                    </div>
                  </div>

                  {/* Dil */}
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] text-stone-600 dark:text-stone-400 font-medium">
                        Eser Dili
                      </span>
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {book.languageName}
                      </span>
                    </div>
                  </div>

                  {/* ISBN Numaraları */}
                  {(book.isbn13 || book.isbn10) && (
                    <div className="col-span-2 flex items-start gap-2.5 pt-2 border-t border-stone-200 dark:border-stone-700/60">
                      <Hash className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                      <div className="flex items-center gap-4 flex-wrap text-xs">
                        {book.isbn13 && (
                          <div>
                            <span className="text-[11px] text-stone-600 dark:text-stone-400 mr-1">ISBN-13:</span>
                            <span className="font-mono font-medium">{book.isbn13}</span>
                          </div>
                        )}
                        {book.isbn10 && (
                          <div>
                            <span className="text-[11px] text-stone-600 dark:text-stone-400 mr-1">ISBN-10:</span>
                            <span className="font-mono font-medium">{book.isbn10}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Book Synopsis / Description */}
                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                    Kitap Özeti & Açıklama
                  </h3>
                  <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-h-56 overflow-y-auto pr-2 space-y-2 whitespace-pre-line font-sans border-l-2 border-amber-600/30 pl-3">
                    {book.description || 'Bu kitap için detaylı açıklama veya arka kapak yazısı girilmemiş.'}
                  </div>
                </div>
              </div>

              {/* Bottom Citation & Creator Footer */}
              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">Kaynak Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Kaynakça / Künye Kopyala</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-stone-600 dark:text-stone-400">
                  <span>Kürasyon: </span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Enes Öztürk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
