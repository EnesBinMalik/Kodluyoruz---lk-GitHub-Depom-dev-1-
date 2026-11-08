/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Pin, 
  Filter, 
  ArrowUpDown, 
  FileText, 
  PlusCircle, 
  RotateCcw, 
  Search,
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Note, NoteColor, SortOption, ViewMode, CATEGORIES, NOTE_COLORS } from './types/note';
import { 
  getStoredNotes, 
  saveStoredNotes, 
  getStoredTheme, 
  saveStoredTheme 
} from './utils/storage';
import { Header } from './components/Header';
import { NoteComposer } from './components/NoteComposer';
import { NoteCard } from './components/NoteCard';
import { NoteModal } from './components/NoteModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Toast, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  // 1. Notlar & Kalıcılık (LocalStorage)
  const [notes, setNotes] = useState<Note[]>(() => getStoredNotes());

  // 2. Tema Yönetimi
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme());

  // 3. Filtreleme & Arama Durumları
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedColor, setSelectedColor] = useState<NoteColor | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('updated-desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // 4. Modal Durumları
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    note: Note | null;
  }>({
    isOpen: false,
    note: null
  });

  // 5. Bildirimler (Toast) & Geri Alma
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [lastDeletedNote, setLastDeletedNote] = useState<Note | null>(null);

  // HTML sınıfını tema ile senkronize et
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  // Notlar değiştikçe otomatik LocalStorage'a kaydet
  useEffect(() => {
    saveStoredNotes(notes);
  }, [notes]);

  const showToast = useCallback((
    message: string, 
    type: 'success' | 'info' | 'error' = 'success',
    action?: { label: string; onClick: () => void }
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, message, type, action };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Yeni Not Ekleme
  const handleAddNote = (noteData: {
    title: string;
    content: string;
    category: string;
    color: NoteColor;
    isPinned: boolean;
    tags: string[];
  }) => {
    const newNote: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: noteData.title,
      content: noteData.content,
      category: noteData.category,
      color: noteData.color,
      isPinned: noteData.isPinned,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: noteData.tags
    };

    setNotes((prev) => [newNote, ...prev]);
    showToast('Yeni not başarıyla kaydedildi!');
  };

  // Not Düzenleme (Modal üzerinden)
  const handleSaveModal = (data: {
    id?: string;
    title: string;
    content: string;
    category: string;
    color: NoteColor;
    isPinned: boolean;
    tags: string[];
  }) => {
    if (data.id) {
      // Güncelle
      setNotes((prev) =>
        prev.map((n) =>
          n.id === data.id
            ? {
                ...n,
                title: data.title,
                content: data.content,
                category: data.category,
                color: data.color,
                isPinned: data.isPinned,
                tags: data.tags,
                updatedAt: new Date().toISOString()
              }
            : n
        )
      );
      showToast('Not güncellendi.');
    } else {
      // Yeni Ekle
      handleAddNote(data);
    }
  };

  // Not Silme
  const handleConfirmDelete = () => {
    if (!deleteModalState.note) return;
    const deleted = deleteModalState.note;
    
    setLastDeletedNote(deleted);
    setNotes((prev) => prev.filter((n) => n.id !== deleted.id));
    
    showToast('Not silindi.', 'info', {
      label: 'Geri Al',
      onClick: () => {
        setNotes((prev) => [deleted, ...prev]);
        showToast('Not geri yüklendi!');
      }
    });

    setDeleteModalState({ isOpen: false, note: null });
  };

  // Sabitleme Durumunu Değiştirme
  const handleTogglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextPinned = !n.isPinned;
          showToast(nextPinned ? 'Not başa sabitlendi.' : 'Sabitleme kaldırıldı.', 'info');
          return {
            ...n,
            isPinned: nextPinned,
            updatedAt: new Date().toISOString()
          };
        }
        return n;
      })
    );
  };

  // Karttan Hızlı Renk Değiştirme
  const handleChangeColor = (id: string, color: NoteColor) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, color, updatedAt: new Date().toISOString() } : n
      )
    );
    showToast('Not rengi güncellendi.', 'info');
  };

  // Metni Panoya Kopyalama
  const handleCopyContent = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Not içeriği panoya kopyalandı!');
    }
  };

  // JSON Dışa Aktarma
  const handleExportNotes = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
      const downloadAnchor = document.createElement('a');
      const dateSlug = new Date().toISOString().split('T')[0];
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `enes_ozturk_notlar_${dateSlug}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Notlar JSON dosyası olarak indirildi.');
    } catch {
      showToast('Dışa aktarma sırasında bir sorun oluştu.', 'error');
    }
  };

  // JSON İçe Aktarma
  const handleImportNotes = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const imported = JSON.parse(content);
        if (Array.isArray(imported)) {
          // İçe aktarılan notları mevcutlarla birleştir (tekrarsız ID)
          const existingIds = new Set(notes.map((n) => n.id));
          const newNotes = imported.filter((n: Note) => n && n.id && !existingIds.has(n.id));
          
          if (newNotes.length > 0) {
            setNotes((prev) => [...newNotes, ...prev]);
            showToast(`${newNotes.length} adet yeni not içe aktarıldı!`);
          } else {
            showToast('Tüm notlar zaten listenizde mevcut.', 'info');
          }
        } else {
          showToast('Geçersiz dosya biçimi.', 'error');
        }
      } catch {
        showToast('JSON dosyası okunurken hata oluştu.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Filtrelenmiş ve Sıralanmış Notlar
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // 1. Arama sorgusu
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = note.title.toLowerCase().includes(q);
        const matchesContent = note.content.toLowerCase().includes(q);
        const matchesTags = note.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesCategory = note.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesContent && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // 2. Kategori filtresi
      if (selectedCategory !== 'Tümü' && note.category !== selectedCategory) {
        return false;
      }

      // 3. Renk filtresi
      if (selectedColor !== 'all' && note.color !== selectedColor) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'updated-desc') {
        return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
      }
      if (sortBy === 'created-desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title, 'tr');
      }
      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title, 'tr');
      }
      return 0;
    });
  }, [notes, searchQuery, selectedCategory, selectedColor, sortBy]);

  // Sabitlenenler ve Diğerleri
  const pinnedNotes = useMemo(() => filteredNotes.filter((n) => n.isPinned), [filteredNotes]);
  const otherNotes = useMemo(() => filteredNotes.filter((n) => !n.isPinned), [filteredNotes]);

  // Kategori sayıları hesaplama
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tümü: notes.length };
    for (const note of notes) {
      counts[note.category] = (counts[note.category] || 0) + 1;
    }
    return counts;
  }, [notes]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 1. Üst Başlık Çubuğu */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeToggle={() => setViewMode((m) => (m === 'grid' ? 'list' : 'grid'))}
        theme={theme}
        onThemeToggle={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        onOpenNewNoteModal={() => {
          setNoteToEdit(null);
          setIsModalOpen(true);
        }}
        onExportNotes={handleExportNotes}
        onImportNotes={handleImportNotes}
        totalNotesCount={notes.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* 2. Hızlı Not Ekleme Bileşeni */}
        <NoteComposer onAddNote={handleAddNote} />

        {/* 3. Filtreleme & Kategori Sekmeleri */}
        <div className="mt-8 mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Kategori Butonları (Segmented control) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`ml-1.5 text-[10px] py-0.5 px-1.5 rounded-full ${
                      isActive ? 'bg-amber-600/70 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sağ Kontroller: Sıralama & Renk Filtresi */}
            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
              
              {/* Renk Filtresi */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedColor('all')}
                  className={`w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[9px] font-bold ${
                    selectedColor === 'all' ? 'ring-2 ring-amber-500 ring-offset-1' : ''
                  }`}
                  title="Tüm Renkler"
                >
                  ✓
                </button>
                {(['amber', 'emerald', 'sky', 'purple', 'rose'] as NoteColor[]).map((cKey) => {
                  const c = NOTE_COLORS[cKey];
                  const isSelected = selectedColor === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setSelectedColor(selectedColor === cKey ? 'all' : cKey)}
                      className={`w-4 h-4 rounded-full ${c.dotColor} transition-transform hover:scale-110 ${
                        isSelected ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-1 scale-110' : ''
                      }`}
                      title={c.name}
                    />
                  );
                })}
              </div>

              {/* Sıralama Açılır Menüsü */}
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-slate-700 dark:text-slate-300 outline-none cursor-pointer font-medium"
                >
                  <option value="updated-desc">Son Güncellenen</option>
                  <option value="created-desc">En Yeni Eklenen</option>
                  <option value="title-asc">Başlık (A-Z)</option>
                  <option value="title-desc">Başlık (Z-A)</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* 4. Not Listeleri & Izgaraları */}
        {filteredNotes.length === 0 ? (
          // Boş Durum (Empty State)
          <div className="my-16 text-center max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              {searchQuery ? <Search className="w-7 h-7" /> : <FileText className="w-7 h-7" />}
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
              {searchQuery ? 'Eşleşen Not Bulunamadı' : 'Henüz Not Eklenmemiş'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {searchQuery 
                ? `"${searchQuery}" aramasıyla eşleşen herhangi bir not bulunamadı. Filtreleri temizlemeyi deneyin.`
                : 'Yeni bir not oluşturarak düşüncelerinizi, görevlerinizi ve fikirlerinizi kaydetmeye başlayın.'
              }
            </p>
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tümü');
                  setSelectedColor('all');
                }}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-colors"
              >
                Filtreleri Temizle
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setNoteToEdit(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 mx-auto px-4 py-2.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white rounded-xl shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>İlk Notunuzu Ekleyin</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* SABİTLENEN NOTLAR BÖLÜMÜ */}
            {pinnedNotes.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Pin className="w-3.5 h-3.5 fill-current" />
                  <span>Sabitlenen Notlar ({pinnedNotes.length})</span>
                </div>
                
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                    : 'flex flex-col gap-3'
                }>
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      viewMode={viewMode}
                      onEdit={(n) => {
                        setNoteToEdit(n);
                        setIsModalOpen(true);
                      }}
                      onDelete={(n) => setDeleteModalState({ isOpen: true, note: n })}
                      onTogglePin={handleTogglePin}
                      onChangeColor={handleChangeColor}
                      onCopyContent={handleCopyContent}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* DİĞER NOTLAR BÖLÜMÜ */}
            {otherNotes.length > 0 && (
              <section>
                {pinnedNotes.length > 0 && (
                  <div className="flex items-center gap-2 mb-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Diğer Notlar ({otherNotes.length})</span>
                  </div>
                )}

                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                    : 'flex flex-col gap-3'
                }>
                  {otherNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      viewMode={viewMode}
                      onEdit={(n) => {
                        setNoteToEdit(n);
                        setIsModalOpen(true);
                      }}
                      onDelete={(n) => setDeleteModalState({ isOpen: true, note: n })}
                      onTogglePin={handleTogglePin}
                      onChangeColor={handleChangeColor}
                      onCopyContent={handleCopyContent}
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

      </main>

      {/* 5. Alt Bilgi (Footer) - Enes Öztürk İmzalı */}
      <Footer />

      {/* 6. Düzenleme / Ekleme Modalı */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNoteToEdit(null);
        }}
        noteToEdit={noteToEdit}
        onSave={handleSaveModal}
      />

      {/* 7. Silme Onay Modalı */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        note={deleteModalState.note}
        onClose={() => setDeleteModalState({ isOpen: false, note: null })}
        onConfirm={handleConfirmDelete}
      />

      {/* 8. Toast Bildirimleri */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
