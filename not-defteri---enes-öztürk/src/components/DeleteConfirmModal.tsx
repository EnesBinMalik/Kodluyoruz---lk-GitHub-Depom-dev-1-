import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Note } from '../types/note';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  note: Note | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  note,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-1">
              Bu notu silmek istediğinize emin misiniz?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              "{note.title || 'Başlıksız Not'}" başlıklı not kalıcı olarak silinecektir.
            </p>
            {note.content && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 italic mb-4">
                "{note.content}"
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-sm transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Notu Sil</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
