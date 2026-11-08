import React, { useState, useRef, useEffect } from 'react';
import { 
  Pin, 
  Palette, 
  Plus, 
  Tag, 
  Check, 
  CornerDownLeft,
  X 
} from 'lucide-react';
import { NoteColor, NOTE_COLORS, CATEGORIES } from '../types/note';

interface NoteComposerProps {
  onAddNote: (note: {
    title: string;
    content: string;
    category: string;
    color: NoteColor;
    isPinned: boolean;
    tags: string[];
  }) => void;
}

export const NoteComposer: React.FC<NoteComposerProps> = ({ onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('Kişisel');
  const [color, setColor] = useState<NoteColor>('default');
  const [isPinned, setIsPinned] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  // Dışarı tıklandığında eğer içerik boşsa kapat, doluysa açık tut veya kaydet
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!title.trim() && !content.trim()) {
          setIsExpanded(false);
          setShowColorPicker(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, content]);

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

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onAddNote({
      title: title.trim() || 'Başlıksız Not',
      content: content.trim(),
      category: category || 'Genel',
      color,
      isPinned,
      tags
    });

    // Reset state
    setTitle('');
    setContent('');
    setCategory('Kişisel');
    setColor('default');
    setIsPinned(false);
    setTags([]);
    setTagInput('');
    setIsExpanded(false);
    setShowColorPicker(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const currentColorConfig = NOTE_COLORS[color];

  return (
    <div className="max-w-2xl mx-auto my-6 px-4">
      <div
        ref={containerRef}
        className={`transition-all duration-200 rounded-2xl border shadow-sm ${
          currentColorConfig.lightBg
        } ${currentColorConfig.darkBg} ${currentColorConfig.lightBorder} ${
          currentColorConfig.darkBorder
        } ${isExpanded ? 'shadow-md p-4' : 'p-3 hover:shadow-md cursor-text'}`}
        onClick={() => {
          if (!isExpanded) {
            setIsExpanded(true);
            setTimeout(() => contentInputRef.current?.focus(), 50);
          }
        }}
      >
        {!isExpanded ? (
          <div className="flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400">
            <span className="text-sm font-medium pl-2 select-none">
              Hızlı bir not yazın...
            </span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                Ctrl + Enter
              </span>
              <div className="p-1.5 bg-amber-500 text-white rounded-lg">
                <Plus className="w-4 h-4" />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-3">
            {/* Başlık ve Sabitleme */}
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                placeholder="Başlık"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-base font-semibold bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsPinned(!isPinned)}
                className={`p-2 rounded-lg transition-colors ${
                  isPinned
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/60'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title={isPinned ? 'Sabitlemeyi kaldır' : 'Notu başa sabitle'}
              >
                <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* İçerik */}
            <textarea
              ref={contentInputRef}
              rows={3}
              placeholder="Bir not yazın..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-sm bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none resize-none leading-relaxed"
            />

            {/* Etiket Listesi */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-rose-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Kontroller & Aksiyonlar */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2.5">
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Kategori Seçici */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-xs bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2 py-1.5 outline-none cursor-pointer"
                >
                  {CATEGORIES.filter((c) => c !== 'Tümü').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* Renk Seçici Butonu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    title="Not Rengi Değiştir"
                  >
                    <Palette className="w-4 h-4" />
                  </button>

                  {/* Renk Seçici Popover */}
                  {showColorPicker && (
                    <div className="absolute left-0 bottom-full mb-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-20 flex items-center gap-1.5">
                      {(Object.keys(NOTE_COLORS) as NoteColor[]).map((cKey) => {
                        const c = NOTE_COLORS[cKey];
                        const isSelected = color === cKey;
                        return (
                          <button
                            key={cKey}
                            type="button"
                            onClick={() => {
                              setColor(cKey);
                              setShowColorPicker(false);
                            }}
                            className={`w-5 h-5 rounded-full ${c.dotColor} flex items-center justify-center transition-transform hover:scale-110 ${
                              isSelected ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white ring-offset-white dark:ring-offset-slate-800' : ''
                            }`}
                            title={c.name}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Etiket Ekleme Inputu */}
                <div className="flex items-center gap-1 text-xs">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Etiket ekle..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="w-24 px-1.5 py-1 text-xs bg-transparent border-b border-transparent focus:border-slate-400 outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Kaydet / Vazgeç Butonları */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setShowColorPicker(false);
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg transition-colors"
                >
                  Kapat
                </button>
                <button
                  type="submit"
                  disabled={!title.trim() && !content.trim()}
                  className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none rounded-lg shadow-sm transition-all"
                >
                  <span>Kaydet</span>
                  <CornerDownLeft className="w-3 h-3" />
                </button>
              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  );
};
