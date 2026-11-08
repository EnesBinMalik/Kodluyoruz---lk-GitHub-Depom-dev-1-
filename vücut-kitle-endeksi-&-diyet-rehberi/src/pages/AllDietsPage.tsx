import React, { useState } from 'react';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { CATEGORY_DIET_PLANS } from '../data/dietData';
import { BMI_CATEGORIES } from '../data/bmiCategories';
import { DietPlanCard } from '../components/DietPlanCard';
import { TabButton } from '../components/styled/Buttons';

export const AllDietsPage: React.FC = () => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('normal');

  const activePlan = CATEGORY_DIET_PLANS[selectedCategoryKey] || CATEGORY_DIET_PLANS.normal;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide">
          <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
          <span>Kapsamlı Diyet & Beslenme Kütüphanesi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Tüm Diyet Programları
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Her vücut kitle endeksi kategorisi için uzmanlıkla hazırlanmış, Türk damak tadına ve Akdeniz beslenme modeline uygun diyet menülerini inceleyin.
        </p>
      </section>

      {/* Category Switcher Tabs */}
      <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Object.values(BMI_CATEGORIES).map((cat) => {
            const isSelected = selectedCategoryKey === cat.key;
            return (
              <TabButton
                key={cat.key}
                $active={isSelected}
                onClick={() => setSelectedCategoryKey(cat.key)}
                className="!text-xs sm:!text-sm"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.shortLabel}</span>
              </TabButton>
            );
          })}
        </div>
      </div>

      {/* Selected Diet Plan Card Component */}
      <div className="animate-fadeIn">
        <DietPlanCard plan={activePlan} userWeight={72} />
      </div>

      {/* Footer Info Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700 mb-1">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Kişiselleştirilmiş Öneri İçin:</span>
        </div>
        Kendi boy ve kilo verilerinize göre size en uygun diyet listesini anında görüntülemek için ana sayfadaki BMI hesaplama aracını kullanabilirsiniz.
      </div>
    </div>
  );
};
