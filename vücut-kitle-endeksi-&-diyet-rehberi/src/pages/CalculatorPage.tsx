import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  Ruler, 
  Calendar, 
  Activity, 
  ArrowRight, 
  CheckCircle, 
  RotateCcw, 
  Sparkles,
  Info,
  Droplets,
  Flame,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Gender, ActivityLevel, BmiCalculationRecord } from '../types/bmi';
import { 
  calculateAllMetrics, 
  getStoredLastInput, 
  saveLastInput, 
  saveRecordToHistory,
  ACTIVITY_MULTIPLIERS
} from '../utils/bmiCalculator';
import { getBmiCategory } from '../data/bmiCategories';
import { 
  CalculateButton, 
  SecondaryButton, 
  QuickSelectButton,
  PrimaryButton
} from '../components/styled/Buttons';
import { BmiGauge } from '../components/BmiGauge';
import { DietPlanCard } from '../components/DietPlanCard';
import { getDietPlanForCategory } from '../data/dietData';

export const CalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  // State hooks (useState)
  const [heightCm, setHeightCm] = useState<number>(172);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<Gender>('female');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [calculatedRecord, setCalculatedRecord] = useState<BmiCalculationRecord | null>(null);
  const [hasCalculatedOnce, setHasCalculatedOnce] = useState<boolean>(false);

  // Load from localStorage on mount (useEffect hook)
  useEffect(() => {
    const lastInput = getStoredLastInput();
    if (lastInput) {
      setHeightCm(lastInput.heightCm);
      setWeightKg(lastInput.weightKg);
      setAge(lastInput.age);
      setGender(lastInput.gender);
      setActivityLevel(lastInput.activityLevel);
    }
  }, []);

  // Real-time instant preview calculation
  const instantMetrics = calculateAllMetrics({
    heightCm,
    weightKg,
    age,
    gender,
    activityLevel,
  });
  const instantCategory = getBmiCategory(instantMetrics.bmi);

  // Handle calculation submission
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const record = calculateAllMetrics({
      heightCm,
      weightKg,
      age,
      gender,
      activityLevel,
    });

    // Save to localStorage
    saveLastInput({ heightCm, weightKg, age, gender, activityLevel });
    saveRecordToHistory(record);

    setCalculatedRecord(record);
    setHasCalculatedOnce(true);

    // Trigger celebration confetti if normal BMI
    if (record.categoryKey === 'normal') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#6ee7b7'],
        });
      } catch (err) {
        // Safe fallback if canvas is restricted
      }
    }

    // Smooth scroll down to results section
    setTimeout(() => {
      const resultElem = document.getElementById('results-section');
      if (resultElem) {
        resultElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Quick preset helper
  const applyPreset = (presetHeight: number, presetWeight: number, presetGender: Gender, presetAge: number) => {
    setHeightCm(presetHeight);
    setWeightKg(presetWeight);
    setGender(presetGender);
    setAge(presetAge);
  };

  const handleReset = () => {
    setHeightCm(172);
    setWeightKg(70);
    setAge(26);
    setGender('female');
    setActivityLevel('moderate');
    setCalculatedRecord(null);
    setHasCalculatedOnce(false);
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Vücut Kitle Endeksi (VKİ) & Kişiselleştirilmiş Diyet Listesi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Sağlıklı Kilonuzu Öğrenin, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Size Özel Diyetinizi Alın
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Boy ve kilonuzu girerek Vücut Kitle Endeksinizi (BMI) hesaplayın; Dünya Sağlık Örgütü standartlarına uygun analizinizi ve size özel hazırlanmış günlük diyet listenizi hemen keşfedin.
        </p>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Hızlı Örnekler:</span>
          <button
            type="button"
            onClick={() => applyPreset(165, 50, 'female', 24)}
            className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
          >
            Zayıf Örneği (165cm / 50kg)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(174, 66, 'female', 28)}
            className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
          >
            İdeal Kilo (174cm / 66kg)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(180, 89, 'male', 32)}
            className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
          >
            Fazla Kilo (180cm / 89kg)
          </button>
        </div>
      </section>

      {/* Main Calculation Card */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10">
          <form onSubmit={handleCalculate} className="space-y-8">
            {/* Cinsiyet ve Yaş Seçimi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
              {/* Gender */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Cinsiyetiniz
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <QuickSelectButton
                    type="button"
                    $active={gender === 'female'}
                    onClick={() => setGender('female')}
                  >
                    <span className="text-lg">👩</span>
                    <span>Kadın</span>
                  </QuickSelectButton>
                  <QuickSelectButton
                    type="button"
                    $active={gender === 'male'}
                    onClick={() => setGender('male')}
                  >
                    <span className="text-lg">👨</span>
                    <span>Erkek</span>
                  </QuickSelectButton>
                </div>
              </div>

              {/* Age */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="age-input" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Yaşınız
                  </label>
                  <span className="text-sm font-extrabold text-emerald-700">
                    {age} yaş
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="age-input"
                      type="number"
                      min={10}
                      max={110}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value) || 18)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                    />
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setAge((prev) => Math.max(10, prev - 1))}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setAge((prev) => Math.min(100, prev + 1))}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Boy (Height) Slider & Numeric Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="height-range" className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Ruler className="w-4 h-4 text-emerald-600" />
                  <span>Boy Uzunluğunuz (cm)</span>
                </label>
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                  <input
                    type="number"
                    min={100}
                    max={230}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Math.max(80, Math.min(250, Number(e.target.value) || 170)))}
                    className="w-16 text-right font-extrabold text-emerald-800 bg-transparent focus:outline-none text-base"
                  />
                  <span className="text-xs font-bold text-emerald-600">cm</span>
                </div>
              </div>

              <input
                id="height-range"
                type="range"
                min={110}
                max={220}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
                <span>110 cm</span>
                <span>150 cm</span>
                <span>170 cm</span>
                <span>190 cm</span>
                <span>220 cm</span>
              </div>
            </div>

            {/* Kilo (Weight) Slider & Numeric Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="weight-range" className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Scale className="w-4 h-4 text-teal-600" />
                  <span>Vücut Ağırlığınız (kg)</span>
                </label>
                <div className="flex items-center gap-1.5 bg-teal-50 border border-teal-200 px-3 py-1 rounded-xl">
                  <input
                    type="number"
                    min={30}
                    max={250}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(25, Math.min(250, Number(e.target.value) || 60)))}
                    className="w-16 text-right font-extrabold text-teal-800 bg-transparent focus:outline-none text-base"
                  />
                  <span className="text-xs font-bold text-teal-600">kg</span>
                </div>
              </div>

              <input
                id="weight-range"
                type="range"
                min={35}
                max={180}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
                <span>35 kg</span>
                <span>60 kg</span>
                <span>80 kg</span>
                <span>110 kg</span>
                <span>180 kg</span>
              </div>
            </div>

            {/* Fiziksel Aktivite Düzeyi */}
            <div className="space-y-3 pt-2">
              <label htmlFor="activity-select" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Günlük Hareketlilik & Egzersiz Seviyesi</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).slice(0, 3).map((actKey) => {
                  const act = ACTIVITY_MULTIPLIERS[actKey];
                  return (
                    <QuickSelectButton
                      key={actKey}
                      type="button"
                      $active={activityLevel === actKey}
                      onClick={() => setActivityLevel(actKey)}
                      className="!py-2.5 !text-xs !justify-start !text-left"
                    >
                      <div className="truncate">
                        <div className="font-bold">{act.label}</div>
                        <div className="text-[10px] opacity-75 truncate">{act.desc}</div>
                      </div>
                    </QuickSelectButton>
                  );
                })}
              </div>
            </div>

            {/* Instant Real-Time Preview Bar */}
            <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xs"
                  style={{ backgroundColor: instantCategory.bgColor, color: instantCategory.color }}
                >
                  {instantMetrics.bmi}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Anlık Vücut Kitle Endeksi</div>
                  <div className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                    <span>{instantCategory.name}</span>
                    <span className="text-xs font-normal text-slate-500">({instantCategory.rangeText})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <Info className="w-4 h-4 text-slate-400" />
                <span>İdeal Kilo Aralığı: <strong className="text-emerald-700">{instantMetrics.idealWeightMin} - {instantMetrics.idealWeightMax} kg</strong></span>
              </div>
            </div>

            {/* Action Buttons using Styled Components */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <SecondaryButton
                type="button"
                $size="md"
                onClick={handleReset}
                className="w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Sıfırla</span>
              </SecondaryButton>

              <CalculateButton
                type="submit"
                $size="lg"
                className="w-full sm:w-auto flex-1 max-w-md"
              >
                <Sparkles className="w-5 h-5 mr-1" />
                <span>BMI Hesapla & Diyetimi Göster</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </CalculateButton>
            </div>
          </form>
        </div>
      </section>

      {/* Calculated Results & Diet Section */}
      <section id="results-section" className="space-y-8 max-w-5xl mx-auto pt-4">
        {hasCalculatedOnce && calculatedRecord ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Summary Cards */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                    Hesaplama Sonucunuz & Sağlık Karneniz
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Vücut Kitle Endeksiniz: <span style={{ color: getBmiCategory(calculatedRecord.bmi).color }}>{calculatedRecord.bmi} kg/m²</span>
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {getBmiCategory(calculatedRecord.bmi).summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <PrimaryButton
                    $size="sm"
                    onClick={() => navigate('/gecmis')}
                  >
                    <span>Geçmişime Kaydedildi</span>
                    <CheckCircle className="w-4 h-4" />
                  </PrimaryButton>
                </div>
              </div>

              {/* Four Stat Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    İdeal Kilo
                  </div>
                  <div className="text-xl font-black text-emerald-950">
                    {calculatedRecord.idealWeightMin} - {calculatedRecord.idealWeightMax} <span className="text-xs font-normal text-emerald-700">kg</span>
                  </div>
                  <div className="text-[11px] text-emerald-700/80 mt-0.5">
                    Boyunuza ({calculatedRecord.heightCm} cm) göre
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
                    <Droplets className="w-4 h-4 text-sky-600" />
                    Günlük Su İhtiyacı
                  </div>
                  <div className="text-xl font-black text-sky-950">
                    {calculatedRecord.dailyWaterLiters} <span className="text-xs font-normal text-sky-700">Litre</span>
                  </div>
                  <div className="text-[11px] text-sky-700/80 mt-0.5">
                    Hücresel hidrasyon için
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                    <Flame className="w-4 h-4 text-amber-600" />
                    BMR (Bazal Metabolizma)
                  </div>
                  <div className="text-xl font-black text-amber-950">
                    {calculatedRecord.targetCalorieBmr} <span className="text-xs font-normal text-amber-700">kcal</span>
                  </div>
                  <div className="text-[11px] text-amber-700/80 mt-0.5">
                    Tam dinlenme enerjisi
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">
                    <Activity className="w-4 h-4 text-purple-600" />
                    TDEE (Günlük Harcama)
                  </div>
                  <div className="text-xl font-black text-purple-950">
                    {calculatedRecord.targetCalorieTdee} <span className="text-xs font-normal text-purple-700">kcal</span>
                  </div>
                  <div className="text-[11px] text-purple-700/80 mt-0.5">
                    Hareket düzeyiniz dahil
                  </div>
                </div>
              </div>

              {/* Visual Needle Gauge */}
              <div className="mt-6">
                <BmiGauge bmi={calculatedRecord.bmi} />
              </div>
            </div>

            {/* Custom Tailored Diet Card */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Sonucunuza Özel Hazırlanmış Diyet Programı
                  </h3>
                  <p className="text-sm text-slate-500">
                    {calculatedRecord.categoryName} kategorisindeki bireyler için dengeli ve lezzetli beslenme planı.
                  </p>
                </div>
              </div>

              <DietPlanCard
                plan={getDietPlanForCategory(calculatedRecord.categoryKey)}
                userWeight={calculatedRecord.weightKg}
                userBmi={calculatedRecord.bmi}
              />
            </div>
          </div>
        ) : (
          /* Initial welcoming guide when user hasn't calculated yet */
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                Nasıl Çalışır?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Vücut Kitle Endeksinize Göre Diyet Neden Önemlidir?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Herkesin kilo profili ve metabolizma ihtiyacı farklıdır. Zayıf bireylerin kas kütlesi kazanması için besin yoğunluğu yüksek kalori fazlasına, fazla kilolu bireylerin ise kas kaybetmeden yağ yakacak hafif kalori açığına ihtiyacı vardır. Yukarıdaki formu doldurarak kişisel planınızı hemen görüntüleyin.
              </p>
              <div className="pt-2">
                <PrimaryButton $size="md" onClick={() => handleCalculate()}>
                  <Sparkles className="w-4 h-4" />
                  <span>Mevcut Değerlerle Hesapla</span>
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
