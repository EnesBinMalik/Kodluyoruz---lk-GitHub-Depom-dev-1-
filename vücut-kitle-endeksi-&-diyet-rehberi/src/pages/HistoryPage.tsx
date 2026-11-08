import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  Scale, 
  Sparkles, 
  Clock, 
  Activity, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { BmiCalculationRecord } from '../types/bmi';
import { 
  getStoredHistory, 
  deleteRecordFromHistory, 
  clearAllHistory,
  saveLastInput
} from '../utils/bmiCalculator';
import { getBmiCategory } from '../data/bmiCategories';
import { 
  PrimaryButton, 
  SecondaryButton, 
  DangerButton 
} from '../components/styled/Buttons';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();

  // React hooks: useState & useEffect
  const [historyRecords, setHistoryRecords] = useState<BmiCalculationRecord[]>([]);
  const [clearedNotice, setClearedNotice] = useState<boolean>(false);

  // Load history on mount
  useEffect(() => {
    const records = getStoredHistory();
    setHistoryRecords(records);
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteRecordFromHistory(id);
    setHistoryRecords(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Tüm hesaplama geçmişinizi silmek istediğinizden emin misiniz?')) {
      clearAllHistory();
      setHistoryRecords([]);
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3000);
    }
  };

  const handleLoadRecord = (record: BmiCalculationRecord) => {
    saveLastInput({
      heightCm: record.heightCm,
      weightKg: record.weightKg,
      age: record.age,
      gender: record.gender,
      activityLevel: record.activityLevel,
    });
    navigate('/');
  };

  // Average calculations
  const totalCount = historyRecords.length;
  const avgBmi = totalCount > 0 
    ? (historyRecords.reduce((acc, r) => acc + r.bmi, 0) / totalCount).toFixed(1)
    : 0;
  const latestWeight = totalCount > 0 ? historyRecords[0].weightKg : null;
  const firstWeight = totalCount > 0 ? historyRecords[totalCount - 1].weightKg : null;
  const weightChange = (latestWeight !== null && firstWeight !== null && totalCount > 1) 
    ? (latestWeight - firstWeight).toFixed(1) 
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide">
          <History className="w-4 h-4 text-emerald-600" />
          <span>Tarayıcıda Saklanan Verileriniz (localStorage)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Hesaplama Geçmişi
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Daha önce yaptığınız VKİ hesaplamaları, kilo kayıtlarınız ve zaman içerisindeki gelişiminiz.
        </p>
      </section>

      {/* Summary KPI Cards */}
      {totalCount > 0 && (
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
              Kayıt Sayısı
            </span>
            <span className="text-2xl font-black text-slate-900">
              {totalCount} adet
            </span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
              Ortalama VKİ
            </span>
            <span className="text-2xl font-black text-emerald-700">
              {avgBmi} kg/m²
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
            <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
              Ağırlık Değişimi
            </span>
            <span className={`text-2xl font-black ${
              weightChange === null 
                ? 'text-slate-500' 
                : Number(weightChange) < 0 
                  ? 'text-emerald-600' 
                  : 'text-amber-600'
            }`}>
              {weightChange === null 
                ? '1 Kayıt Mevcut' 
                : `${Number(weightChange) > 0 ? '+' : ''}${weightChange} kg`}
            </span>
          </div>
        </section>
      )}

      {/* History List or Empty State */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Kayıtlı Ölçümler
            </h3>
            <p className="text-xs text-slate-500">
              Veriler tarayıcınızın yerel hafızasında güvenle saklanmaktadır.
            </p>
          </div>

          {totalCount > 0 && (
            <DangerButton
              $size="sm"
              onClick={handleClearAll}
              title="Tüm kayıtları sil"
            >
              <Trash2 className="w-4 h-4" />
              <span>Tümünü Temizle</span>
            </DangerButton>
          )}
        </div>

        {clearedNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tüm geçmiş kayıtlar başarıyla temizlendi.</span>
          </div>
        )}

        {totalCount === 0 ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Scale className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-800">
                Henüz kayıtlı bir hesaplama bulunmuyor
              </h4>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Ana sayfadaki hesaplama aracını kullanarak ilk vücut kitle endeksinizi ve diyet listenizi kaydedebilirsiniz.
              </p>
            </div>
            <div className="pt-2">
              <PrimaryButton $size="md" onClick={() => navigate('/')}>
                <Sparkles className="w-4 h-4" />
                <span>İlk Hesaplamayı Yap</span>
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {historyRecords.map((record) => {
              const category = getBmiCategory(record.bmi);
              return (
                <div
                  key={record.id}
                  className="p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50/50"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-xs shrink-0"
                      style={{ backgroundColor: category.bgColor, color: category.color }}
                    >
                      <span className="text-lg leading-none">{record.bmi}</span>
                      <span className="text-[10px] font-bold mt-0.5 opacity-80">VKİ</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-base">
                          {record.weightKg} kg &bull; {record.heightCm} cm
                        </span>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                          style={{
                            backgroundColor: category.bgColor,
                            color: category.color,
                            borderColor: category.borderColor,
                          }}
                        >
                          {record.categoryName}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {record.dateStr}
                        </span>
                        <span>&bull;</span>
                        <span>{record.age} Yaş, {record.gender === 'female' ? 'Kadın' : 'Erkek'}</span>
                        <span>&bull;</span>
                        <span>İdeal: {record.idealWeightMin} - {record.idealWeightMax} kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    <SecondaryButton
                      $size="sm"
                      onClick={() => handleLoadRecord(record)}
                      title="Bu verileri hesaplayıcıya aktar"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Hesaplayıcıya Al</span>
                    </SecondaryButton>

                    <button
                      type="button"
                      onClick={() => handleDelete(record.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Kayıttan sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
