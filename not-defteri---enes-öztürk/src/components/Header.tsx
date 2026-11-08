import React, { useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Sun, 
  Moon, 
  LayoutGrid, 
  List, 
  Download, 
  Upload,
  X
} from 'lucide-react';
import { ViewMode } from '../types/note';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeToggle: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onOpenNewNoteModal: () => void;
  onExportNotes: () => void;
  onImportNotes: (file: File) => void;
  totalNotesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeToggle,
  theme,
  onThemeToggle,
  onOpenNewNoteModal,
  onExportNotes,
  onImportNotes,
  totalNotesCount
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportNotes(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Sol Alan: Logo & İsim */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shadow-sm shadow-amber-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                Not Defteri
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                Enes Öztürk
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              {totalNotesCount} kayıtlı not
            </span>
          </div>
        </div>

        {/* Orta Alan: Arama Kutusu */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Notlarda ara (başlık, içerik, etiket)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-sm bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl border border-transparent focus:border-amber-400 dark:focus:border-amber-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md"
                title="Aramayı temizle"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sağ Alan: Aksiyonlar & Yeni Not Butonu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Görünüm Değiştirici */}
          <button
            type="button"
            onClick={onViewModeToggle}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={viewMode === 'grid' ? 'Liste Görünümüne Geç' : 'Izgara Görünümüne Geç'}
            aria-label="Görünüm Değiştir"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>

          {/* Dışa Aktar (Yedek Al) */}
          <button
            type="button"
            onClick={onExportNotes}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors hidden sm:flex"
            title="Notları JSON Olarak Dışa Aktar"
            aria-label="Dışa Aktar"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* İçe Aktar (Yedekten Yükle) */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors hidden sm:flex"
            title="JSON Dosyasından Notları İçe Aktar"
            aria-label="İçe Aktar"
          >
            <Upload className="w-4 h-4" />
          </button>

          {/* Tema Değiştir */}
          <button
            type="button"
            onClick={onThemeToggle}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={theme === 'dark' ? 'Açık Temaya Geç' : 'Karanlık Temaya Geç'}
            aria-label="Tema Değiştir"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Yeni Not Butonu */}
          <button
            type="button"
            onClick={onOpenNewNoteModal}
            className="ml-1 sm:ml-2 flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Not</span>
          </button>
        </div>

      </div>
    </header>
  );
};
