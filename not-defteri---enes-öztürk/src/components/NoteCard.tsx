import React, { useState } from 'react';
import { 
  Pin, 
  Pencil, 
  Trash2, 
  Copy, 
  Palette, 
  Check, 
  Calendar
} from 'lucide-react';
import { Note, NoteColor, NOTE_COLORS, ViewMode } from '../types/note';
import { formatDate } from '../utils/storage';

interface NoteCardProps {
  note: Note;
  viewMode: ViewMode;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onTogglePin: (id: string) => void;
  onChangeColor: (id: string, color: NoteColor) => void;
  onCopyContent: (content: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  viewMode,
  onEdit,
  onDelete,
  onTogglePin,
  onChangeColor,
  onCopyContent
}) => {
  const [showColorMenu, setShowColorMenu] = useState(false);
  const colorConfig = NOTE_COLORS[note.color] || NOTE_COLORS.default;

  // Format content to render line breaks nicely and clickable links if any
  const renderContent = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-words whitespace-pre-wrap">
        {lines.map((line, idx) => {
          // Check for bullet list item
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-amber-500 font-bold select-none">•</span>
                <span>{line.replace(/^(\s*[-•]\s*)/, '')}</span>
              </div>
            );
          }
          return <p key={idx}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        colorConfig.lightBg
      } ${colorConfig.darkBg} ${colorConfig.lightBorder} ${
        colorConfig.darkBorder
      } ${colorConfig.lightHover} ${colorConfig.darkHover} hover:shadow-md ${
        viewMode === 'list' ? 'p-4 sm:p-5' : 'p-5 min-h-[190px]'
      }`}
    >
      <div>
        {/* Üst Kısım: Kategori, Tarih & Pin */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {note.category}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {formatDate(note.updatedAt || note.createdAt)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className={`p-1.5 rounded-lg transition-colors shrink-0 ${
              note.isPinned
                ? 'text-amber-600 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/60'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 opacity-0 group-hover:opacity-100 focus:opacity-100'
            }`}
            title={note.isPinned ? 'Sabitlemeyi kaldır' : 'Notu sabitle'}
            aria-label="Sabitle"
          >
            <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Başlık */}
        {note.title && (
          <h3 
            onClick={() => onEdit(note)}
            className="text-base font-bold text-slate-900 dark:text-white mb-2 cursor-pointer hover:text-amber-600 dark:hover:text-amber-400 transition-colors line-clamp-2"
          >
            {note.title}
          </h3>
        )}

        {/* İçerik */}
        <div 
          onClick={() => onEdit(note)}
          className={`cursor-pointer ${viewMode === 'grid' ? 'line-clamp-6' : ''}`}
        >
          {renderContent(note.content)}
        </div>

        {/* Etiketler */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Alt Aksiyon Çubuğu */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        
        {/* Sol Aksiyonlar: Renk Paleti & Kopyala */}
        <div className="flex items-center gap-1">
          {/* Renk Değiştir */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorMenu(!showColorMenu)}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
              title="Rengi değiştir"
            >
              <Palette className="w-3.5 h-3.5" />
            </button>

            {/* Renk Menüsü Popover */}
            {showColorMenu && (
              <div 
                className="absolute left-0 bottom-full mb-1.5 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-20 flex items-center gap-1"
                onMouseLeave={() => setShowColorMenu(false)}
              >
                {(Object.keys(NOTE_COLORS) as NoteColor[]).map((cKey) => {
                  const c = NOTE_COLORS[cKey];
                  const isSelected = note.color === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => {
                        onChangeColor(note.id, cKey);
                        setShowColorMenu(false);
                      }}
                      className={`w-4 h-4 rounded-full ${c.dotColor} flex items-center justify-center transition-transform hover:scale-125 ${
                        isSelected ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-1' : ''
                      }`}
                      title={c.name}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Panoya Kopyala */}
          <button
            type="button"
            onClick={() => onCopyContent(`${note.title ? `${note.title}\n\n` : ''}${note.content}`)}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            title="Metni panoya kopyala"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sağ Aksiyonlar: Düzenle & Sil */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            title="Notu düzenle"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(note)}
            className="p-1.5 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
            title="Notu sil"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
