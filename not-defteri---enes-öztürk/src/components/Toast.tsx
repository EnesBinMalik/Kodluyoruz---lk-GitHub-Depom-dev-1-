import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-lg border border-slate-800 dark:border-slate-100 text-sm transition-all animate-in slide-in-from-bottom-2 fade-in duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 dark:text-rose-600 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 dark:text-sky-600 shrink-0" />}
            <span className="truncate font-medium">{toast.message}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss(toast.id);
                }}
                className="px-2.5 py-1 text-xs font-semibold bg-white/15 dark:bg-slate-900/10 hover:bg-white/25 dark:hover:bg-slate-900/20 rounded-md transition-colors whitespace-nowrap"
              >
                {toast.action.label}
              </button>
            )}
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-slate-400 hover:text-white dark:hover:text-slate-900 rounded-md transition-colors"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
