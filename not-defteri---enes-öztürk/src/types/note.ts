export type NoteColor =
  | 'default'
  | 'amber'
  | 'emerald'
  | 'sky'
  | 'indigo'
  | 'purple'
  | 'rose'
  | 'orange';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: NoteColor;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type SortOption = 'updated-desc' | 'created-desc' | 'title-asc' | 'title-desc';

export type ViewMode = 'grid' | 'list';

export const CATEGORIES = [
  'Tümü',
  'Kişisel',
  'İş & Proje',
  'Fikirler',
  'Alışveriş',
  'Ders & Eğitim',
  'Hatırlatıcı'
] as const;

export interface ColorScheme {
  id: NoteColor;
  name: string;
  lightBg: string;
  lightBorder: string;
  lightHover: string;
  darkBg: string;
  darkBorder: string;
  darkHover: string;
  dotColor: string;
}

export const NOTE_COLORS: Record<NoteColor, ColorScheme> = {
  default: {
    id: 'default',
    name: 'Varsayılan',
    lightBg: 'bg-white',
    lightBorder: 'border-slate-200',
    lightHover: 'hover:border-slate-300',
    darkBg: 'dark:bg-slate-900',
    darkBorder: 'dark:border-slate-800',
    darkHover: 'dark:hover:border-slate-700',
    dotColor: 'bg-slate-400',
  },
  amber: {
    id: 'amber',
    name: 'Kehribar',
    lightBg: 'bg-amber-50/70',
    lightBorder: 'border-amber-200',
    lightHover: 'hover:border-amber-300',
    darkBg: 'dark:bg-amber-950/25',
    darkBorder: 'dark:border-amber-800/60',
    darkHover: 'dark:hover:border-amber-700',
    dotColor: 'bg-amber-500',
  },
  emerald: {
    id: 'emerald',
    name: 'Zümrüt',
    lightBg: 'bg-emerald-50/70',
    lightBorder: 'border-emerald-200',
    lightHover: 'hover:border-emerald-300',
    darkBg: 'dark:bg-emerald-950/25',
    darkBorder: 'dark:border-emerald-800/60',
    darkHover: 'dark:hover:border-emerald-700',
    dotColor: 'bg-emerald-500',
  },
  sky: {
    id: 'sky',
    name: 'Gök Mavisi',
    lightBg: 'bg-sky-50/70',
    lightBorder: 'border-sky-200',
    lightHover: 'hover:border-sky-300',
    darkBg: 'dark:bg-sky-950/25',
    darkBorder: 'dark:border-sky-800/60',
    darkHover: 'dark:hover:border-sky-700',
    dotColor: 'bg-sky-500',
  },
  indigo: {
    id: 'indigo',
    name: 'Lacivert',
    lightBg: 'bg-indigo-50/70',
    lightBorder: 'border-indigo-200',
    lightHover: 'hover:border-indigo-300',
    darkBg: 'dark:bg-indigo-950/25',
    darkBorder: 'dark:border-indigo-800/60',
    darkHover: 'dark:hover:border-indigo-700',
    dotColor: 'bg-indigo-500',
  },
  purple: {
    id: 'purple',
    name: 'Mor',
    lightBg: 'bg-purple-50/70',
    lightBorder: 'border-purple-200',
    lightHover: 'hover:border-purple-300',
    darkBg: 'dark:bg-purple-950/25',
    darkBorder: 'dark:border-purple-800/60',
    darkHover: 'dark:hover:border-purple-700',
    dotColor: 'bg-purple-500',
  },
  rose: {
    id: 'rose',
    name: 'Gül',
    lightBg: 'bg-rose-50/70',
    lightBorder: 'border-rose-200',
    lightHover: 'hover:border-rose-300',
    darkBg: 'dark:bg-rose-950/25',
    darkBorder: 'dark:border-rose-800/60',
    darkHover: 'dark:hover:border-rose-700',
    dotColor: 'bg-rose-500',
  },
  orange: {
    id: 'orange',
    name: 'Turuncu',
    lightBg: 'bg-orange-50/70',
    lightBorder: 'border-orange-200',
    lightHover: 'hover:border-orange-300',
    darkBg: 'dark:bg-orange-950/25',
    darkBorder: 'dark:border-orange-800/60',
    darkHover: 'dark:hover:border-orange-700',
    dotColor: 'bg-orange-500',
  },
};
