import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Scale, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BMI_CATEGORIES } from '../data/bmiCategories';
import { PrimaryButton } from '../components/styled/Buttons';

export const WhatIsBmiPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const faqs = [
    {
      question: 'Vücut Kitle Endeksi (VKİ / BMI) formülü nedir?',
      answer: 'Vücut Kitle Endeksi; kilonuzun (kg), metre cinsinden boyunuzun karesine bölünmesiyle (kg / m²) hesaplanır. Örneğin: 70 kg ağırlığında ve 1.75 m boyundaki bir birey için: 70 / (1.75 * 1.75) = 22.86 kg/m² çıkar ve "Normal / Sağlıklı Kilo" aralığındadır.'
    },
    {
      question: 'Vücut Kitle Endeksi sporcular için yanıltıcı olabilir mi?',
      answer: 'Evet! VKİ yalnızca toplam ağırlığa bakar; bu ağırlığın ne kadarının kas, ne kadarının yağ veya su olduğunu ayırt edemez. Düzenli ağırlık çalışan bir vücut geliştirmeci yoğun kas kütlesi nedeniyle VKİ tablosunda "Fazla Kilolu" hatta "Obez" çıkabilirken, aslında vücut yağ oranı %10 gibi son derece sağlıklı bir seviyede olabilir.'
    },
    {
      question: 'İdeal kilo nasıl belirlenir?',
      answer: 'İdeal kilo, VKİ değerinizin Dünya Sağlık Örgütü tarafından sağlıklı kabul edilen 18.5 ile 24.9 kg/m² aralığında kaldığı ağırlıktır. Örneğin 170 cm boyundaki bir birey için bu ağırlık sınırı yaklaşık 53.5 kg ile 72.0 kg arasındadır.'
    },
    {
      question: 'Çıkan sonuca göre diyet listesi nasıl seçilir?',
      answer: 'Uygulamamızda VKİ sonucunuz Zayıf çıkarsa kas gelişimini destekleyen besleyici kalori fazlası içeren bir program; Normal çıkarsa kilonuzu ve sağlığınızı koruyan Akdeniz tipi dengeli beslenme; Fazla Kilo veya Obezite seviyesinde ise sağlıklı kalori açığı yaratan, insülin direncini kıran ve ödem atan bir diyet programı atanır.'
    },
    {
      question: 'Kadınlar ve erkekler için VKİ sınırları farklı mıdır?',
      answer: 'Dünya Sağlık Örgütü standart VKİ sınırlarını yetişkin kadın ve erkekler için aynı (18.5 - 24.9) olarak kabul eder. Ancak vücut yağ dağılımı (elma veya armut tipi) ve kas oranları cinsiyete göre farklılık gösterdiğinden, bel çevresi ölçümü de ek olarak takip edilmelidir.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold tracking-wide">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Kapsamlı Sağlık & Bilim Rehberi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Vücut Kitle Endeksi (BMI) Nedir?
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Dünya Sağlık Örgütü (WHO) tarafından bireylerin boylarına göre sağlıklı kiloda olup olmadıklarını değerlendirmek için kullanılan evrensel ölçüt.
        </p>
      </section>

      {/* Main Concept Card */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Tanım ve Matematiksel Formül
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              İngilizce adıyla <strong>Body Mass Index (BMI)</strong>, Türkçede <strong>Vücut Kitle Endeksi (VKİ)</strong> veya <strong>Boy-Kilo İndeksi</strong> olarak anılır. 19. yüzyılda Belçikalı matematikçi Adolphe Quetelet tarafından geliştirilmiştir.
            </p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 text-center shadow-inner">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
            Evrensel Hesaplama Formülü
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center justify-center gap-3">
            <span>VKİ = Kilo (kg)</span>
            <span className="text-emerald-400">/</span>
            <span>[ Boy (m) ]²</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 max-w-md mx-auto">
            Örnek: 1.70 m boy ve 65 kg ağırlık için: 65 / (1.70 × 1.70) = 22.49 kg/m²
          </p>
        </div>
      </section>

      {/* WHO Classification Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            Dünya Sağlık Örgütü (WHO) Kategori Tablosu
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/80 text-xs font-bold uppercase text-slate-600 tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">VKİ Değer Aralığı</th>
                  <th className="py-4 px-6">Sağlık Riski & Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.values(BMI_CATEGORIES).map((cat) => (
                  <tr key={cat.key} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-slate-900">{cat.name}</span>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-700">
                      {cat.rangeText}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-sm">
                      {cat.healthRisk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Limitations of BMI */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-900 font-bold text-lg">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
          <h4>Vücut Kitle Endeksinin Sınırları & Dikkat Edilmesi Gerekenler</h4>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">
          VKİ genel bir tarama aracı olmakla birlikte herkes için tek başına yeterli bir teşhis koyamaz. Aşağıdaki durumlarda tek başına VKİ değerlendirmesi yanıltıcı olabilir:
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Sporcular ve Kaslı Bireyler:</strong> Kas dokusu yağdan daha yoğun olduğu için VKİ yüksek çıkabilir.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Yaşlı Bireyler:</strong> Yaşla birlikte kas kaybı (sarkopeni) yaşanıp yağ oranı artsa da VKİ normal görünebilir.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Hamile ve Emziren Kadınlar:</strong> Bebeğin ve plasentanın ağırlığı nedeniyle standart VKİ uygulanamaz.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Çocuklar ve Ergenler:</strong> Yaş ve cinsiyete göre persentil eğrileri (büyüme eğrisi) kullanılmalıdır.</span>
          </li>
        </ul>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          Sıkça Sorulan Sorular (SSS)
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action card */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6 text-emerald-300" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold">
          Kendi Vücut Kitle Endeksinizi Öğrenmeye Hazır Mısınız?
        </h3>
        <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
          Sadece 10 saniye içinde boy ve kilonuzu girerek kişiselleştirilmiş analizinizi ve size özel diyetinizi anında alın.
        </p>
        <div className="pt-2">
          <PrimaryButton
            $size="lg"
            onClick={() => navigate('/')}
            className="!bg-white !text-emerald-800 hover:!bg-emerald-50 !shadow-lg"
          >
            <span>Hemen Hesapla</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
};
