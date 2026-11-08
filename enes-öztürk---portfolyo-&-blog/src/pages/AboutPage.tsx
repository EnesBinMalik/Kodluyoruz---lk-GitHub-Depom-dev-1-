import React from 'react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { Signature } from '../components/Signature';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  FileText, 
  Mail, 
  MapPin, 
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onOpenContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact }) => {
  const handlePrintCV = () => {
    window.print();
  };

  return (
    <div className="space-y-24 sm:space-y-28 max-w-4xl mx-auto">

      {/* ================= HEADER & INTRO ================= */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center gap-3 text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400">
          <span>Hakkımda</span>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
          <span>Biyografi & Vizyon</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          Yazılım mühendisliği, modern arayüz mimarisi ve kullanıcı deneyimi kesişimindeyim.
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{PERSONAL_INFO.location}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>6+ Yıl Profesyonel Deneyim</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>{PERSONAL_INFO.email}</span>
          </span>
        </div>

        {/* Long Bio Paragraphs */}
        <div className="pt-4 space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Merhaba! Ben <strong>Enes Öztürk</strong>. Bilgisayar mühendisliği temelimle birlikte, modern web teknolojilerinin sınırlarını zorlayan ve kullanıcıların günlük hayatına değer katan yüksek kaliteli yazılımlar üretmeyi tutkuyla sürdürüyorum.
          </p>
          <p>
            Kariyerim boyunca fintech platformlarından kurumsal bulut yönetim araçlarına, kapsamlı tasarım sistemlerinden yüksek trafikli dağıtık altyapılara kadar geniş bir yelpazede görev aldım. Ön yüz geliştirme süreçlerinde estetik ve performansı bir araya getirirken; arka yüzde tip güvenliği, dayanıklı veri modellemesi ve temiz mimari yaklaşımlarını benimsiyorum.
          </p>
          <p>
            Benim için bir yazılım sadece çalışan kod bloklarından ibaret değildir. İyi bir yazılım; geliştiricilerin rahatça okuyup geliştirebildiği, son kullanıcının hiç düşünmeden sezgisel olarak etkileşime girebildiği ve zamanın testine dayanan yaşayan bir sistemdir.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-[0.98]"
          >
            Bana Ulaşın
          </button>
          <button
            onClick={handlePrintCV}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Özgeçmişi Yazdır / PDF</span>
          </button>
        </div>
      </section>

      {/* ================= DETAYLI İŞ DENEYİMLERİ ZAMAN ÇİZELGESİ ================= */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
            Kariyer Çizelgesi
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            İş Deneyimleri & Rolleri
          </h2>
        </div>

        <div className="space-y-10">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-4 group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white ring-4 ring-[#FAFAFA] dark:ring-[#0A0D14]" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {exp.period}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{exp.company}</span>
                <span aria-hidden="true">·</span>
                <span>{exp.location}</span>
                <span aria-hidden="true">·</span>
                <span>{exp.type}</span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {exp.description}
              </p>

              {/* Specific Achievements */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Öne Çıkan Başarılar:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="pt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx}>
                    {tech}
                    {idx < exp.technologies.length - 1 && <span className="text-slate-300 dark:text-slate-700 ml-2">/</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BECERİLER & YETENEKLER ================= */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
            Teknoloji & Uzmanlık
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Yetenekler ve Teknik Yığın
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400">{item.experience}</span>
                    </div>
                    {/* Visual proficiency bar */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-700"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ÇALIŞMA PRENSİPLERİ ================= */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
            Mühendislik Değerleri
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Çalışma Prensipleri & Felsefem
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              01. Performans & Hız Önceliği
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Her milisaniyenin kullanıcı dikkatinde ve dönüşüm oranında doğrudan karşılığı vardır. Gereksiz bağımlılıklardan kaçınır, Core Web Vitals ölçümlerini sürekli takip ederim.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              02. Tip Güvenliği ve Sağlam Mimari
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              TypeScript ve şema doğrulaması ile çalışma zamanı sürprizlerini önceden engellerim. Kodun gelecekteki bakım maliyetini minimumda tutacak modüler yapılar tasarlarım.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              03. Erişilebilirlik ve Kapsayıcılık
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Arayüzlerin klavye kontrolü, ekran okuyucu uyumluluğu ve WCAG kontrast oranlarına tam uyması bir seçenek değil, mühendislik gereğidir.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              04. Şeffaf İletişim ve Sürekli Paylaşım
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Gereksinimlerin netleştirilmesi, açık kod incelemeleri ve dokümantasyon kültürü; başarılı bir ürünün en kritik yapı taşlarıdır.
            </p>
          </div>
        </div>
      </section>

      {/* ================= EĞİTİM & SERTİFİKALAR ================= */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
            Akademik & Lisanslar
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Eğitim & Sertifikasyonlar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">2015 - 2019</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                Bilgisayar Mühendisliği (Lisans)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Algoritmalar, Dağıtık Sistemler ve Yazılım Mimarisi odaklı eğitim. Yüksek Onur Derecesi.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">2023 - Güncel</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                AWS Solutions Architect Associate
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Bulut altyapısı, yüksek erişilebilirlik, felaket kurtarma ve güvenlik mimarisi sertifikası.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Signoff */}
      <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Birlikte çalışmak ister misiniz?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Danışmanlık, tam zamanlı projeler veya açık kaynak ortaklıkları için iletişime geçebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Signature className="w-40 h-10" />
          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
          >
            İletişim
          </button>
        </div>
      </div>

    </div>
  );
};
