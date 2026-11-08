import React from 'react';
import { getBmiCategory } from '../data/bmiCategories';

interface BmiGaugeProps {
  bmi: number;
}

export const BmiGauge: React.FC<BmiGaugeProps> = ({ bmi }) => {
  const currentCategory = getBmiCategory(bmi);

  // Map BMI (range 15 to 45) to percentage (0 to 100%)
  const minBmi = 14;
  const maxBmi = 42;
  const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi));
  const percentage = ((clampedBmi - minBmi) / (maxBmi - minBmi)) * 100;

  // Key thresholds in scale:
  // 18.5 => ((18.5 - 14) / 28) * 100 = 16.07%
  // 25.0 => ((25.0 - 14) / 28) * 100 = 39.28%
  // 30.0 => ((30.0 - 14) / 28) * 100 = 57.14%
  // 35.0 => ((35.0 - 14) / 28) * 100 = 75.00%
  // 40.0 => ((40.0 - 14) / 28) * 100 = 92.85%

  const segments = [
    { label: 'Zayıf', range: '< 18.5', color: '#0ea5e9', bgClass: 'bg-sky-500', width: '16%' },
    { label: 'Normal', range: '18.5 - 24.9', color: '#10b981', bgClass: 'bg-emerald-500', width: '23.3%' },
    { label: 'Fazla Kilo', range: '25 - 29.9', color: '#f59e0b', bgClass: 'bg-amber-500', width: '17.8%' },
    { label: '1. Obezite', range: '30 - 34.9', color: '#f97316', bgClass: 'bg-orange-500', width: '17.8%' },
    { label: '2. Obezite', range: '35 - 39.9', color: '#ef4444', bgClass: 'bg-red-500', width: '17.8%' },
    { label: 'Morbid', range: '≥ 40', color: '#991b1b', bgClass: 'bg-rose-900', width: '7.3%' },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            VKİ Göstergesi
          </span>
          <h4 className="text-base font-bold text-slate-800">
            Endeks Cetveli & Konumunuz
          </h4>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-bold border transition-colors"
          style={{
            backgroundColor: currentCategory.bgColor,
            color: currentCategory.color,
            borderColor: currentCategory.borderColor,
          }}
        >
          {currentCategory.shortLabel} ({bmi})
        </div>
      </div>

      {/* Visual Bar Track */}
      <div className="relative pt-6 pb-2">
        {/* Dynamic Needle Pin */}
        <div
          className="absolute -top-1 transition-all duration-700 ease-out flex flex-col items-center z-10"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <div
            className="px-2 py-0.5 rounded text-[11px] font-extrabold text-white shadow-md flex items-center gap-1"
            style={{ backgroundColor: currentCategory.color }}
          >
            <span>{bmi}</span>
          </div>
          <div
            className="w-0 h-0 border-x-4 border-x-transparent border-t-[6px]"
            style={{ borderTopColor: currentCategory.color }}
          />
        </div>

        {/* Multi-segmented continuous bar */}
        <div className="h-4 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-100 p-0.5 gap-0.5">
          {segments.map((seg, idx) => (
            <div
              key={idx}
              style={{ width: seg.width }}
              className={`h-full ${seg.bgClass} first:rounded-l-full last:rounded-r-full transition-opacity opacity-90 hover:opacity-100`}
              title={`${seg.label} (${seg.range})`}
            />
          ))}
        </div>
      </div>

      {/* Scale labels */}
      <div className="grid grid-cols-6 text-center pt-2 text-[10px] sm:text-xs text-slate-500 font-medium border-t border-slate-100 mt-3">
        <div>
          <span className="block font-semibold text-sky-600">Zayıf</span>
          <span className="text-[10px] text-slate-400">&lt; 18.5</span>
        </div>
        <div>
          <span className="block font-semibold text-emerald-600">Normal</span>
          <span className="text-[10px] text-slate-400">18.5-24.9</span>
        </div>
        <div>
          <span className="block font-semibold text-amber-600">Kilolu</span>
          <span className="text-[10px] text-slate-400">25-29.9</span>
        </div>
        <div>
          <span className="block font-semibold text-orange-600">1. Obez</span>
          <span className="text-[10px] text-slate-400">30-34.9</span>
        </div>
        <div>
          <span className="block font-semibold text-red-600">2. Obez</span>
          <span className="text-[10px] text-slate-400">35-39.9</span>
        </div>
        <div>
          <span className="block font-semibold text-rose-900">Morbid</span>
          <span className="text-[10px] text-slate-400">≥ 40</span>
        </div>
      </div>
    </div>
  );
};
