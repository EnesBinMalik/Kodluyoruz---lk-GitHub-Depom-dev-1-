import React from 'react';
import { Choice } from '../types/game';
import { CHOICES } from '../utils/gameLogic';

interface ChoiceControlsProps {
  onSelectChoice: (choice: Choice) => void;
  disabled: boolean;
}

export const ChoiceControls: React.FC<ChoiceControlsProps> = ({
  onSelectChoice,
  disabled,
}) => {
  const choicesList: Array<{
    id: Choice;
    shortcut: string;
  }> = [
    { id: 'rock', shortcut: '1' },
    { id: 'paper', shortcut: '2' },
    { id: 'scissors', shortcut: '3' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Hamlenizi Yapın
        </h3>
        <span className="text-xs text-slate-400">
          Butonlara tıklayın veya klavyeden <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">1</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">2</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">3</kbd> tuşlarına basın
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {choicesList.map(({ id, shortcut }) => {
          const item = CHOICES[id];
          return (
            <button
              key={id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectChoice(id)}
              className={`group relative p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 select-none ${
                disabled
                  ? 'opacity-50 cursor-not-allowed bg-slate-900 border-slate-800'
                  : `${item.colorScheme.bg} ${item.colorScheme.border} hover:-translate-y-1 hover:shadow-xl ${item.colorScheme.glow} active:scale-[0.98]`
              }`}
            >
              {/* Shortcut Tag */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-400 group-hover:text-slate-200 group-hover:border-slate-600 transition-colors">
                  Tuş: {shortcut}
                </span>
              </div>

              {/* Emoji Icon */}
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 filter drop-shadow transition-transform duration-200 group-hover:scale-110">
                {item.emoji}
              </div>

              {/* Label & Rule */}
              <div className="font-display font-bold text-xl sm:text-2xl text-slate-100 group-hover:text-white mb-1">
                {item.label}
              </div>

              <div className="text-xs text-slate-400 font-medium">
                {item.description}
              </div>

              {/* Action Hint */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-amber-400 font-medium transition-colors">
                <span>Seçmek için tıkla</span>
                <span className="font-bold">→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
