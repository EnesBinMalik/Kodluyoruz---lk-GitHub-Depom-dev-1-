import React, { useState } from 'react';
import { 
  Utensils, 
  Droplets, 
  Sparkles, 
  Clock, 
  ArrowRightLeft, 
  CheckCircle2, 
  HeartHandshake, 
  Copy, 
  Printer, 
  Coffee,
  Check
} from 'lucide-react';
import { CategoryDietPlan, MealItem } from '../types/bmi';
import { TabButton, SecondaryButton } from './styled/Buttons';

interface DietPlanCardProps {
  plan: CategoryDietPlan;
  userWeight?: number;
  userBmi?: number;
}

export const DietPlanCard: React.FC<DietPlanCardProps> = ({ 
  plan, 
  userWeight = 70, 
  userBmi 
}) => {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({});

  const currentDay = plan.sampleDays[activeDayIdx] || plan.sampleDays[0];
  const waterLiters = ((userWeight * plan.waterFormulaPerKg) / 1000).toFixed(1);

  const toggleMealComplete = (mealKey: string) => {
    setCompletedMeals(prev => ({
      ...prev,
      [mealKey]: !prev[mealKey]
    }));
  };

  const handleCopyDiet = () => {
    if (!currentDay) return;
    const textToCopy = `📋 ${plan.title} - ${currentDay.dayName}
Hedef: ${currentDay.focus} (${currentDay.targetCalories} kcal)

ÖĞÜNLER:
${currentDay.meals
  .map(
    (m: MealItem) =>
      `• [${m.mealTime}] ${m.mealName}: ${m.description} (${m.caloriesEstimate} kcal)`
  )
  .join('\n')}

💧 Günlük Su Hedefi: En az ${waterLiters} Litre
Sağlıklı Yaşam Rehberi - Enes Öztürk`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden print:border-none print:shadow-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide border border-emerald-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Kişiselleştirilmiş Diyet & Beslenme Listesi
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {plan.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-1.5 max-w-2xl">
              {plan.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <SecondaryButton 
              $size="sm" 
              onClick={handleCopyDiet}
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              title="Öğünleri panoya kopyala"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
            </SecondaryButton>
            <SecondaryButton 
              $size="sm" 
              onClick={handlePrint}
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 hidden sm:inline-flex"
              title="Diyeti yazdır"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır</span>
            </SecondaryButton>
          </div>
        </div>

        {/* Highlight Stats Pill */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-center">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
              Günlük Kalori
            </span>
            <span className="text-lg font-bold text-emerald-300">
              {plan.dailyCalorieRange}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
              Önerilen Su
            </span>
            <span className="text-lg font-bold text-sky-300 flex items-center justify-center gap-1">
              <Droplets className="w-4 h-4" />
              {waterLiters} Litre / gün
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
              Makro Dağılımı
            </span>
            <span className="text-xs sm:text-sm font-bold text-amber-300">
              %{plan.macronutrientRatio.protein} Protein / %{plan.macronutrientRatio.carbs} Karb / %{plan.macronutrientRatio.fat} Yağ
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
              Uygulama Modeli
            </span>
            <span className="text-sm font-bold text-teal-200">
              Akdeniz & Doğal Beslenme
            </span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Core Principles */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Bu Diyetin Temel Kuralları & Püf Noktaları
          </h4>
          <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
            {plan.principles.map((principle, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Day Selector Tabs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-600" />
              Günlük Öğün Programı
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              Öğünleri tamamladıkça işaretleyebilirsiniz
            </span>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
            {plan.sampleDays.map((day, idx) => (
              <TabButton
                key={idx}
                $active={activeDayIdx === idx}
                onClick={() => setActiveDayIdx(idx)}
              >
                <span>{day.dayName}</span>
                <span className="text-[11px] opacity-75 font-normal">
                  ({day.targetCalories} kcal)
                </span>
              </TabButton>
            ))}
          </div>
        </div>

        {/* Current Day Focus */}
        {currentDay && (
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-emerald-900">
            <span className="font-semibold">
              Günün Odağı: <span className="font-normal">{currentDay.focus}</span>
            </span>
            <span className="font-bold text-emerald-700">
              Yaklaşık {currentDay.targetCalories} kcal
            </span>
          </div>
        )}

        {/* Meals Timeline */}
        <div className="space-y-4">
          {currentDay?.meals.map((meal, idx) => {
            const mealKey = `${activeDayIdx}_${idx}`;
            const isDone = !!completedMeals[mealKey];

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  isDone
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200/80 shadow-sm hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      onClick={() => toggleMealComplete(mealKey)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-colors shrink-0 mt-0.5 ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 hover:border-emerald-500 text-transparent'
                      }`}
                      title={isDone ? 'Tamamlandı olarak işaretlendi' : 'Tamamlandı olarak işaretle'}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold text-slate-800">
                          {meal.mealName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {meal.mealTime}
                        </span>
                      </div>
                      <p className={`mt-2 text-sm text-slate-700 leading-relaxed ${isDone ? 'line-through text-slate-400' : ''}`}>
                        {meal.description}
                      </p>

                      {meal.options && meal.options.length > 0 && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-1.5">
                          <span className="font-semibold text-emerald-700 shrink-0">Alternatif:</span>
                          <span>{meal.options.join(' / ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                    ~{meal.caloriesEstimate} kcal
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Healthy Swaps & Drinks Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          {/* Healthy Swaps */}
          <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5">
            <h5 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-3">
              <ArrowRightLeft className="w-4 h-4 text-amber-600" />
              Akıllı Besin Değişim Tablosu
            </h5>
            <div className="space-y-3">
              {plan.healthySwaps.map((swap, idx) => (
                <div key={idx} className="text-xs bg-white/80 p-3 rounded-xl border border-amber-100">
                  <div className="flex items-center justify-between text-slate-700 font-semibold mb-1">
                    <span className="text-rose-600 line-through">❌ {swap.avoid}</span>
                    <span className="text-emerald-700 font-bold">👉 {swap.prefer}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {swap.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Drinks & Habit tips */}
          <div className="bg-sky-50/50 border border-sky-200/80 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h5 className="text-sm font-bold text-sky-900 flex items-center gap-2 mb-3">
                <Coffee className="w-4 h-4 text-sky-600" />
                Önerilen Sağlıklı İçecekler & Sıvılar
              </h5>
              <ul className="space-y-2 text-xs text-slate-700 mb-4">
                {plan.recommendedDrinks.map((drink, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                    <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>{drink}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-100/70 p-3.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Enes Öztürk Beslenme Tavsiyesi:</span>
                <span>Her bireyin metabolizması, alerjileri ve günlük rutini benzersizdir. Diyet sürecinizi tartıdaki rakamdan ziyade aynadaki duruşunuz ve zindeliğinizle değerlendirin.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
