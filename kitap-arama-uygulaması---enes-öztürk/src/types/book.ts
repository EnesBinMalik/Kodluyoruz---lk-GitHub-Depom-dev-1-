export interface GoogleBookVolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: Array<{
    type: string;
    identifier: string;
  }>;
  pageCount?: number;
  printType?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
  saleInfo?: {
    buyLink?: string;
    isEbook?: boolean;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}

export interface GoogleBooksApiResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBookItem[];
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  formattedDate: string;
  pageCount: number | null;
  description: string;
  coverImage: string | null;
  categories: string[];
  language: string;
  languageName: string;
  isbn10?: string;
  isbn13?: string;
  previewLink?: string;
  infoLink?: string;
  averageRating?: number;
  ratingsCount?: number;
  isEbook?: boolean;
}

export type SearchFilterType = 'all' | 'title' | 'author' | 'publisher';

export type SortOption = 'relevance' | 'newest' | 'pages-desc' | 'pages-asc' | 'title';

export type ReadingStatus = 'want_to_read' | 'reading' | 'completed';
