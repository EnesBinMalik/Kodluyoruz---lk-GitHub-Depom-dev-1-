import React from 'react';
import { CheckCircle2, Circle, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChecklistItem } from '../types/homework';

interface ChecklistProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
}

export const Checklist: React.FC<ChecklistProps> = ({ items, onToggleItem }) => {
  const completedCount = items.filter((i) => i.isCompleted).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-6">
      {/* Score / Progress Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span>Kodluyoruz Değerlendirme Kriterleri</span>
              <span aria-hidden="true">&middot;</span>
              <span>10 Maddelik Tam Uyumluluk</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              Ödev Tamamlama Kontrol Listesi
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Öğretmenin yönergesinde yer alan tüm maddeleri buradan kontrol edebilir ve hazır olduğunuzdan emin olabilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {completedCount} / {items.length}
              </div>
              <p className="text-xs text-slate-500">Tamamlanan Madde</p>
            </div>
            <button
              type="button"
              onClick={triggerCelebration}
              className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition-colors cursor-pointer"
              title="Kutlama Fişeği Patlat"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Tamamlanma Oranı</span>
            <span className="font-mono font-bold text-orange-600 tabular-nums">%{progressPercent}</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Tüm Yönerge Maddeleri ({items.length})
        </h3>

        <div className="space-y-3">
          {items.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  item.isCompleted
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">
                      #{index + 1}
                    </span>
                    <h4
                      className={`text-sm font-bold ${
                        item.isCompleted ? 'text-slate-900 line-through decoration-slate-300' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.category === 'github'
                          ? 'bg-blue-100 text-blue-800'
                          : item.category === 'local'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {item.category === 'github'
                        ? 'GitHub.com'
                        : item.category === 'local'
                        ? 'Yerel / Git'
                        : 'Fork İşlemi'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
