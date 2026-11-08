import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Pin, 
  Palette, 
  Tag, 
  List, 
  ListOrdered, 
  CheckSquare, 
  Check, 
  Calendar,
  Save
} from 'lucide-react';
import { Note, NoteColor, NOTE_COLORS, CATEGORIES } from '../types/note';
import { formatDate } from '../utils/storage';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteToEdit?: Note | null;
  onSave: (noteData: {
    id?: string;
    title: string;
    content: string;
    category: string;
    color: NoteColor;
    isPinned: boolean;
    tags: string[];
  }) => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  noteToEdit,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('Genel');
  const [color, setColor] = useState<NoteColor>('default');
  const [isPinned, setIsPinned] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || '');
      setContent(noteToEdit.content || '');
      setCategory(noteToEdit.category || 'Genel');
      setColor(noteToEdit.color || 'default');
      setIsPinned(noteToEdit.isPinned || false);
      setTags(noteToEdit.tags || []);
    } else {
      setTitle('');
      setContent('');
      setCategory('Genel');
      setColor('default');
      setIsPinned(false);
      setTags([]);
    }
    setTagInput('');
  }, [noteToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const insertFormatting = (prefix: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = content;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newContent = `${before}${prefix}${after}`;
    setContent(newContent);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length);
      }
    }, 10);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onSave({
      id: noteToEdit?.id,
      title: title.trim() || 'Başlıksız Not',
      content: content.trim(),
      category: category || 'Genel',
      color,
      isPinned,
      tags
    });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const currentColorConfig = NOTE_COLORS[color] || NOTE_COLORS.default;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-xl rounded-2xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-all ${
          currentColorConfig.lightBg
        } ${currentColorConfig.darkBg} ${currentColorConfig.lightBorder} ${
          currentColorConfig.darkBorder
        }`}
        onKeyDown={handleKeyDown}
      >
        {/* Modal Başlığı */}
        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {noteToEdit ? 'Notu Düzenle' : 'Yeni Not Oluştur'}
            </h2>
            {noteToEdit?.updatedAt && (
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" />
                {formatDate(noteToEdit.updatedAt)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPinned(!isPinned)}
              className={`p-2 rounded-lg transition-colors ${
                isPinned
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/60'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              title={isPinned ? 'Sabitlemeyi kaldır' : 'Notu sabitle'}
            >
              <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Gövdesi */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Başlık Alanı */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Başlık
            </label>
            <input
              type="text"
              placeholder="Not başlığını buraya girin..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-base font-semibold bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all"
              autoFocus
            />
          </div>

          {/* Kategori ve Renk Seçimi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer"
              >
                {CATEGORIES.filter((c) => c !== 'Tümü').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Renk Teması
              </label>
              <div className="flex items-center gap-2 py-1.5">
                {(Object.keys(NOTE_COLORS) as NoteColor[]).map((cKey) => {
                  const c = NOTE_COLORS[cKey];
                  const isSelected = color === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setColor(cKey)}
                      className={`w-6 h-6 rounded-full ${c.dotColor} flex items-center justify-center transition-all ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white ring-offset-white dark:ring-offset-slate-900 scale-110'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hızlı Biçimlendirme Araç Çubuğu */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-xs text-slate-400 mr-1">Hızlı Araçlar:</span>
            <button
              type="button"
              onClick={() => insertFormatting('\n• ')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
              title="Madde İşareti Ekle"
            >
              <List className="w-3 h-3" />
              <span>Madde</span>
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n1. ')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
              title="Numaralı Liste Ekle"
            >
              <ListOrdered className="w-3 h-3" />
              <span>Numaralı</span>
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('\n- [ ] ')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
              title="Kontrol Listesi Ekle"
            >
              <CheckSquare className="w-3 h-3" />
              <span>Görev</span>
            </button>
          </div>

          {/* İçerik Metin Alanı */}
          <div>
            <textarea
              ref={textareaRef}
              rows={8}
              placeholder="Notunuzu buraya yazın..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl p-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none resize-none leading-relaxed transition-all"
            />
            <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
              <span>Ctrl + Enter ile hızlı kaydet</span>
              <span>
                {wordCount} kelime · {charCount} karakter
              </span>
            </div>
          </div>

          {/* Etiket Yönetimi */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Etiketler
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Etiket ekleyin (örn: proje, önemli)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 focus:border-amber-500 dark:focus:border-amber-400 rounded-xl text-slate-900 dark:text-white outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-colors"
              >
                Ekle
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-rose-500 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Modal Alt Aksiyonları */}
        <div className="px-6 py-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-end gap-3 bg-white/40 dark:bg-slate-900/40">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!title.trim() && !content.trim()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl shadow-sm transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{noteToEdit ? 'Değişiklikleri Kaydet' : 'Notu Kaydet'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
