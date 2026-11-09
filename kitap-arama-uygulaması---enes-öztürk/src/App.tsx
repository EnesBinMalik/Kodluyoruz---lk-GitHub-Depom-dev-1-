import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  ArrowUpDown,
  Layers,
  LayoutGrid,
  List,
  AlertCircle,
  RotateCcw,
  BookMarked,
  Library,
  Feather,
} from 'lucide-react';
import { Book, ReadingStatus, SearchFilterType, SortOption } from './types/book';
import { searchBooks } from './services/booksApi';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Footer } from './components/Footer';

// Initial spotlight queries to provide a warm welcome screen
const INITIAL_CURATED_BOOKS: Array<Partial<Book>> = [
  {
    id: 'init-1',
    title: 'Kürk Mantolu Madonna',
    subtitle: 'Bir Aşk ve Vicdan Romanı',
    authors: ['Sabahattin Ali'],
    publisher: 'Yapı Kredi Yayınları',
    publishedDate: '1943',
    formattedDate: '1943',
    pageCount: 160,
    categories: ['Türk Edebiyatı', 'Roman'],
    language: 'tr',
    languageName: 'Türkçe',
    description:
      'Sabahattin Ali’nin unutulmaz başyapıtı. Raif Efendi ile Maria Puder’in Berlin’de başlayan, hüzünlü ve derin aşk hikayesini anlatır. İnsan ruhunun en gizli kıvrımlarına dokunan eşsiz bir eser.',
    coverImage: 'https://books.google.com/books/content?id=K6vODwAAQBAJ&printsec=frontcover&img=1&zoom=1',
  },
  {
    id: 'init-2',
    title: 'Suç ve Ceza',
    subtitle: 'Dünya Klasikleri',
    authors: ['Fyodor Dostoyevski'],
    publisher: 'İletişim Yayınları',
    publishedDate: '1866',
    formattedDate: '1866',
    pageCount: 687,
    categories: ['Dünya Klasikleri', 'Psikolojik Roman'],
    language: 'tr',
    languageName: 'Türkçe',
    description:
      'Raskolnikov adlı yoksul bir öğrencinin, toplum yararına bir suç işleyebileceği inancıyla yaşlı tefeci kadını öldürmesi ve ardından vicdanıyla yaşadığı derin buhran.',
    coverImage: 'https://books.google.com/books/content?id=j3A1EAAAQBAJ&printsec=frontcover&img=1&zoom=1',
  },
  {
    id: 'init-3',
    title: 'Şeker Portakalı',
    subtitle: 'Günün Birinde Acıyı Keşfeden Küçük Bir Çocuğun Hikâyesi',
    authors: ['José Mauro de Vasconcelos'],
    publisher: 'Can Yayınları',
    publishedDate: '1968',
    formattedDate: '1968',
    pageCount: 184,
    categories: ['Roman', 'Çağdaş Edebiyat'],
    language: 'tr',
    languageName: 'Türkçe',
    description:
      'Zezé’nin hayal gücü ve kalbindeki sevgiyle dünyayı anlamlandırma çabası. Tüm dünyada milyonlarca okurun kalbine dokunan unutulmaz bir büyüme öyküsü.',
    coverImage: 'https://books.google.com/books/content?id=JjX3zgEACAAJ&printsec=frontcover&img=1&zoom=1',
  },
  {
    id: 'init-4',
    title: 'Satranç',
    subtitle: 'Bir Delilik ve Zeka Hikayesi',
    authors: ['Stefan Zweig'],
    publisher: 'İş Bankası Kültür Yayınları',
    publishedDate: '1942',
    formattedDate: '1942',
    pageCount: 84,
    categories: ['Novella', 'Psikolojik'],
    language: 'tr',
    languageName: 'Türkçe',
    description:
      'Gestapo tarafından bir otel odasında tecrit edilen Dr. B.’nin zihnini korumak için satranç kılavuzuna sığınması ve yıllar sonra bir yolcu gemisinde dünya şampiyonuyla karşılaşması.',
    coverImage: 'https://books.google.com/books/content?id=e7LMDgAAQBAJ&printsec=frontcover&img=1&zoom=1',
  },
];

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('enes_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Search & Results state
  const [submittedQuery, setSubmittedQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<SearchFilterType>('all');
  const [books, setBooks] = useState<Book[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sorting & Filtering
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal & Drawer state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);

  // Favorites & Reading Statuses
  const [favorites, setFavorites] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('enes_book_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [readingStatuses, setReadingStatuses] = useState<Record<string, ReadingStatus>>(() => {
    try {
      const saved = localStorage.getItem('enes_reading_statuses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('enes_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('enes_theme', 'light');
    }
  }, [isDark]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('enes_book_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('LocalStorage hatası:', e);
    }
  }, [favorites]);

  // Persist reading statuses
  useEffect(() => {
    try {
      localStorage.setItem('enes_reading_statuses', JSON.stringify(readingStatuses));
    } catch (e) {
      console.error('LocalStorage hatası:', e);
    }
  }, [readingStatuses]);

  // Trigger search - strictly on form submission!
  const handleSearch = async (query: string, searchFilter: SearchFilterType) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setSubmittedQuery(query);
    setFilterType(searchFilter);
    setHasSearched(true);
    setSelectedCategory('all');

    try {
      const result = await searchBooks({
        query,
        filterType: searchFilter,
        startIndex: 0,
        maxResults: 40,
        orderBy: 'relevance',
      });

      setBooks(result.books);
      setTotalResults(result.totalItems);
    } catch (err: any) {
      setError(
        'Google Books API üzerinden kitaplar getirilirken bir sorun oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.'
      );
      setBooks([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle favorite book
  const handleToggleFavorite = (book: Book) => {
    setFavorites((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  const isBookFavorite = (bookId: string) => {
    return favorites.some((b) => b.id === bookId);
  };

  // Change reading status
  const handleChangeReadingStatus = (bookId: string, status: ReadingStatus | null) => {
    setReadingStatuses((prev) => {
      const updated = { ...prev };
      if (!status) {
        delete updated[bookId];
      } else {
        updated[bookId] = status;
      }
      return updated;
    });
  };

  // Extract unique categories from current results
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => {
      b.categories.forEach((c) => {
        if (c && c.trim()) set.add(c.trim());
      });
    });
    return Array.from(set).slice(0, 8);
  }, [books]);

  // Filtered & Sorted books
  const processedBooks = useMemo(() => {
    let list = [...books];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((b) => b.categories.includes(selectedCategory));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        list.sort((a, b) => (b.publishedDate || '').localeCompare(a.publishedDate || ''));
        break;
      case 'pages-desc':
        list.sort((a, b) => (b.pageCount || 0) - (a.pageCount || 0));
        break;
      case 'pages-asc':
        list.sort((a, b) => (a.pageCount || 0) - (b.pageCount || 0));
        break;
      case 'title':
        list.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
        break;
      case 'relevance':
      default:
        // Keep API natural order
        break;
    }

    return list;
  }, [books, selectedCategory, sortBy]);

  const handleResetSearch = () => {
    setHasSearched(false);
    setSubmittedQuery('');
    setBooks([]);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Top Header */}
      <Header
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
        onResetSearch={handleResetSearch}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Creator Signature Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 font-medium mb-4 shadow-2xs">
            <Feather className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Enes Öztürk Özel Kütüphane & Arama Servisi</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            Milyonlarca Kitap ve Yazarı Keşfedin
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Google Books API altyapısıyla kitap adı veya yazar ismi girerek arama yapın,
            yüksek kaliteli kapak fotoğraflarına ve detaylı yayın bilgilerine anında ulaşın.
          </p>
        </div>

        {/* Search Bar (Only submits on form submit) */}
        <div className="mb-10">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            initialQuery={submittedQuery}
            initialFilter={filterType}
          />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Arama Hatası</p>
              <p className="mt-0.5 text-xs text-rose-700 dark:text-rose-300">{error}</p>
            </div>
            <button
              onClick={() => handleSearch(submittedQuery, filterType)}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium cursor-pointer"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* Results Toolbar (Shown when searched) */}
        {hasSearched && !isLoading && !error && (
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                "{submittedQuery}" için Sonuçlar
              </h2>
              <div className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-400 mt-1">
                <span className="font-mono tabular-nums">{processedBooks.length} eser listeleniyor</span>
                <span aria-hidden="true">·</span>
                <span>Filtre: {filterType === 'title' ? 'Kitap Adı' : filterType === 'author' ? 'Yazar Adı' : filterType === 'publisher' ? 'Yayınevi' : 'Tümü'}</span>
              </div>
            </div>

            {/* Sorting & View Controls */}
            <div className="flex items-center flex-wrap gap-3">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-2.5 py-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-700 dark:text-stone-400">Sırala:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent font-medium text-stone-800 dark:text-stone-200 focus:outline-none cursor-pointer"
                >
                  <option value="relevance" className="bg-white dark:bg-stone-900">İlgiye Göre</option>
                  <option value="newest" className="bg-white dark:bg-stone-900">Yeniden Eskiye</option>
                  <option value="pages-desc" className="bg-white dark:bg-stone-900">Sayfa (Çoktan Aza)</option>
                  <option value="pages-asc" className="bg-white dark:bg-stone-900">Sayfa (Azdan Çoğa)</option>
                  <option value="title" className="bg-white dark:bg-stone-900">Alfabetik (A-Z)</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-lg border border-stone-200 dark:border-stone-700/60">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                      : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                  }`}
                  title="Izgara Görünümü"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                      : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                  }`}
                  title="Liste Görünümü"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Chips (if multiple categories found in results) */}
        {hasSearched && availableCategories.length > 1 && !isLoading && (
          <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-stone-700 dark:text-stone-400 font-medium shrink-0 mr-1">Tür:</span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-amber-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              Tümü
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-700 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeleton State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 animate-pulse"
              >
                <div className="aspect-[3/4] w-36 mx-auto bg-stone-200 dark:bg-stone-800 rounded-lg mb-4" />
                <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mb-2" />
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-4/5 mb-2" />
                <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2 mb-4" />
                <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded-lg mt-auto" />
              </div>
            ))}
          </div>
        )}

        {/* Search Results Display */}
        {hasSearched && !isLoading && processedBooks.length > 0 && (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
                : 'space-y-4'
            }
          >
            {processedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={(selected) => setSelectedBook(selected)}
                isFavorite={isBookFavorite(book.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Empty Search State */}
        {hasSearched && !isLoading && !error && processedBooks.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-4 border border-amber-200 dark:border-amber-800">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              Sonuç Bulunamadı
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">
              "{submittedQuery}" aramasıyla eşleşen herhangi bir kitap bulunamadı. Lütfen yazımı kontrol edin veya arama kriterini "Tümü" olarak değiştirin.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleSearch('Dostoyevski', 'author')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-700 hover:bg-amber-800 text-white cursor-pointer"
              >
                Dostoyevski ile Dene
              </button>
              <button
                type="button"
                onClick={handleResetSearch}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 cursor-pointer"
              >
                Aramayı Sıfırla
              </button>
            </div>
          </div>
        )}

        {/* Initial Welcome Screen (Before first search) */}
        {!hasSearched && !isLoading && (
          <div className="mt-8 space-y-12">
            {/* Curated Spotlight Header */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Öne Çıkan Başyapıtlar
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    Enes Öztürk seçkisiyle Türk ve dünya edebiyatının unutulmaz klasikleri
                  </p>
                </div>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-medium hidden sm:block">
                  Arama Yaparak Başlayın
                </span>
              </div>

              {/* Grid of Curated Books */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {INITIAL_CURATED_BOOKS.map((item) => {
                  const book: Book = {
                    id: item.id || '',
                    title: item.title || '',
                    subtitle: item.subtitle,
                    authors: item.authors || ['Bilinmeyen Yazar'],
                    publisher: item.publisher || 'Yayınevi',
                    publishedDate: item.publishedDate || '1900',
                    formattedDate: item.formattedDate || '1900',
                    pageCount: item.pageCount || 200,
                    description: item.description || '',
                    coverImage: item.coverImage || null,
                    categories: item.categories || ['Edebiyat'],
                    language: item.language || 'tr',
                    languageName: item.languageName || 'Türkçe',
                  };

                  return (
                    <BookCard
                      key={book.id}
                      book={book}
                      onSelect={(b) => setSelectedBook(b)}
                      isFavorite={isBookFavorite(book.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  );
                })}
              </div>
            </div>

            {/* How It Works & Project Guidelines Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50/70 via-stone-50 to-amber-100/30 dark:from-stone-900 dark:via-stone-900/90 dark:to-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-800 dark:text-stone-200">
                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-700/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      1. İsim veya Yazar Yazın
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      Arama çubuğuna aradığınız kitabın veya yazarın adını yazıp Enter'a basın ya da "Kitap Ara" butonuna tıklayın.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-700/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      2. Kapak ve Listeyi İnceleyin
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      Google Books API'den getirilen kapak fotoğrafları, sayfa sayıları ve yayınevi bilgileriyle sonuçları filtreleyin.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-700/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Library className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      3. "Detay" ile Tam Künyeye Erişin
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      "Detay" butonuna tıklayarak sayfa sayısı, yayın tarihi, ISBN, özet ve okuma listesi kontrollerine ulaşın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        isFavorite={selectedBook ? isBookFavorite(selectedBook.id) : false}
        onToggleFavorite={handleToggleFavorite}
        readingStatus={selectedBook ? readingStatuses[selectedBook.id] : undefined}
        onChangeReadingStatus={handleChangeReadingStatus}
        onSearchAuthor={(author) => handleSearch(author, 'author')}
      />

      {/* Reading List & Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={(id) => {
          setFavorites((prev) => prev.filter((b) => b.id !== id));
        }}
        onSelectBook={(book) => {
          setSelectedBook(book);
          setIsFavoritesOpen(false);
        }}
        readingStatuses={readingStatuses}
        onChangeReadingStatus={handleChangeReadingStatus}
      />

      {/* Footer with Enes Öztürk Signature */}
      <Footer />
    </div>
  );
}
