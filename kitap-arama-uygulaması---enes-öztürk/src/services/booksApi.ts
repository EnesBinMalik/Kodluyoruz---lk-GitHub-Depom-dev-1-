import { Book, GoogleBookItem, GoogleBooksApiResponse, SearchFilterType } from '../types/book';

const LANGUAGE_MAP: Record<string, string> = {
  tr: 'Türkçe',
  en: 'İngilizce',
  de: 'Almanca',
  fr: 'Fransızca',
  ru: 'Rusça',
  es: 'İspanyolca',
  it: 'İtalyanca',
  ar: 'Arapça',
  fa: 'Farsça',
  ja: 'Japonca',
  zh: 'Çince',
  pt: 'Portekizce',
  la: 'Latince',
  el: 'Yunanca',
  nl: 'Felemenkçe',
  pl: 'Lehçe',
};

function stripHtml(html: string = ''): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function normalizeCoverUrl(url?: string): string | null {
  if (!url) return null;
  // Upgrade to HTTPS
  let secure = url.replace(/^http:\/\//i, 'https://');
  // Attempt to remove curl edge/low quality restrictions if present
  if (secure.includes('&edge=curl')) {
    secure = secure.replace('&edge=curl', '');
  }
  return secure;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Tarih belirtilmemiş';
  if (/^\d{4}$/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: dateStr.length > 7 ? 'numeric' : undefined,
      });
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export function normalizeGoogleBook(item: GoogleBookItem): Book {
  const info = item.volumeInfo || {};
  const images = info.imageLinks || {};

  const coverImage =
    normalizeCoverUrl(images.extraLarge) ||
    normalizeCoverUrl(images.large) ||
    normalizeCoverUrl(images.medium) ||
    normalizeCoverUrl(images.thumbnail) ||
    normalizeCoverUrl(images.smallThumbnail) ||
    null;

  let isbn10: string | undefined;
  let isbn13: string | undefined;

  if (Array.isArray(info.industryIdentifiers)) {
    for (const id of info.industryIdentifiers) {
      if (id.type === 'ISBN_13') isbn13 = id.identifier;
      if (id.type === 'ISBN_10') isbn10 = id.identifier;
    }
  }

  const langCode = (info.language || 'tr').toLowerCase();
  const languageName = LANGUAGE_MAP[langCode] || langCode.toUpperCase();

  return {
    id: item.id,
    title: info.title || 'Başlıksız Eser',
    subtitle: info.subtitle,
    authors: info.authors && info.authors.length > 0 ? info.authors : ['Yazar Belirtilmemiş'],
    publisher: info.publisher || 'Yayınevi Belirtilmemiş',
    publishedDate: info.publishedDate || '',
    formattedDate: formatDate(info.publishedDate),
    pageCount: typeof info.pageCount === 'number' && info.pageCount > 0 ? info.pageCount : null,
    description: stripHtml(info.description || 'Bu kitap için detaylı açıklama bulunmamaktadır.'),
    coverImage,
    categories: info.categories && info.categories.length > 0 ? info.categories : ['Genel'],
    language: langCode,
    languageName,
    isbn10,
    isbn13,
    previewLink: info.previewLink ? info.previewLink.replace(/^http:\/\//i, 'https://') : undefined,
    infoLink: info.infoLink ? info.infoLink.replace(/^http:\/\//i, 'https://') : undefined,
    averageRating: info.averageRating,
    ratingsCount: info.ratingsCount,
    isEbook: item.saleInfo?.isEbook,
  };
}

export interface SearchOptions {
  query: string;
  filterType?: SearchFilterType;
  startIndex?: number;
  maxResults?: number;
  orderBy?: 'relevance' | 'newest';
}

export interface SearchResult {
  books: Book[];
  totalItems: number;
}

export async function searchBooks({
  query,
  filterType = 'all',
  startIndex = 0,
  maxResults = 40,
  orderBy = 'relevance',
}: SearchOptions): Promise<SearchResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { books: [], totalItems: 0 };
  }

  // Construct query parameter according to filter type
  let formattedQuery = trimmed;
  if (filterType === 'title') {
    formattedQuery = `intitle:${trimmed}`;
  } else if (filterType === 'author') {
    formattedQuery = `inauthor:${trimmed}`;
  } else if (filterType === 'publisher') {
    formattedQuery = `inpublisher:${trimmed}`;
  }

  const url = new URL('https://www.googleapis.com/books/v1/volumes');
  url.searchParams.set('q', formattedQuery);
  url.searchParams.set('startIndex', startIndex.toString());
  url.searchParams.set('maxResults', maxResults.toString());
  url.searchParams.set('orderBy', orderBy);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Google Books API hatası: ${response.status} ${response.statusText}`);
    }

    const data: GoogleBooksApiResponse = await response.json();

    if (!data.items || data.items.length === 0) {
      return { books: [], totalItems: data.totalItems || 0 };
    }

    const normalizedBooks = data.items.map(normalizeGoogleBook);

    return {
      books: normalizedBooks,
      totalItems: data.totalItems || normalizedBooks.length,
    };
  } catch (error) {
    console.error('searchBooks API hatası:', error);
    throw error;
  }
}

// Curated initial recommendations for Turkish & World Literature classics
export const CURATED_FEATURED_SEARCHES = [
  'Sabahattin Ali',
  'Suç ve Ceza',
  'Kürk Mantolu Madonna',
  'Dostoyevski',
  'Şeker Portakalı',
  'Yaşar Kemal',
  'Simyacı',
  'Stefan Zweig',
  'George Orwell 1984',
  'İlber Ortaylı',
];
