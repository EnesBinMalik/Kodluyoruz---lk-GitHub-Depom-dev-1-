import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-70 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
        let borderColor = 'border-emerald-200 bg-white';

        if (toast.type === 'error' || toast.type === 'warning') {
          icon = <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />;
          borderColor = 'border-rose-200 bg-white';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-amber-600 shrink-0" />;
          borderColor = 'border-amber-200 bg-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-lg transition-all animate-in slide-in-from-bottom-5 duration-200 ${borderColor}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {icon}
              <p className="text-xs font-semibold text-slate-800 truncate">
                {toast.message}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {toast.undoAction && (
                <button
                  onClick={() => {
                    toast.undoAction?.();
                    onDismiss(toast.id);
                  }}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
                >
                  Geri Al
                </button>
              )}
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                aria-label="Bildirimi Kapat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
