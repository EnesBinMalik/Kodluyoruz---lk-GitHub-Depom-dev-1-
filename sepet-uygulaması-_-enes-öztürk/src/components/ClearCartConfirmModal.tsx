import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ClearCartConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemCount: number;
}

export const ClearCartConfirmModal: React.FC<ClearCartConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        />

        {/* Modal card */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all sm:w-full sm:max-w-md animate-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-slate-900">
              Sepeti Tamamen Boşaltmak İstiyor Musunuz?
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Sepetinizdeki toplam <strong className="text-slate-800">{itemCount} adet ürünün tamamı</strong> kaldırılacaktır. Bu işlem geri alınamaz.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row-reverse gap-2 sm:gap-3">
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 transition-colors cursor-pointer active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Evet, Sepeti Boşalt</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
