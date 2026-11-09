import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ProjectRequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectRequirementsModal: React.FC<ProjectRequirementsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const requirements = [
    {
      title: '4x3 Matris Düzeni',
      desc: 'Board üzerinde toplam 12 kart yer alır ve kartlar 4 sütun x 3 satır şeklinde konumlandırılmıştır.',
      status: true,
    },
    {
      title: '6 Çift Kart (Her Karttan İki Adet)',
      desc: 'Toplam 12 kart, tam olarak 6 farklı eşleşen çiftten oluşur.',
      status: true,
    },
    {
      title: 'Başlangıçta Kapalı Kartlar',
      desc: 'Oyun başladığında tüm kartlar tamamen kapalı (face-down) vaziyette gelir.',
      status: true,
    },
    {
      title: 'Eşleşen Kartların Kaldırılması',
      desc: 'Arka arkaya seçilen iki kart aynıysa, o kartlar ekrandan kaldırılır.',
      status: true,
    },
    {
      title: 'Eşleşmeyen Kartların Kapatılması',
      desc: 'Farklı kartlar seçildiğinde, kısa bir süre sonra kartlar tekrar kapalı hale getirilir.',
      status: true,
    },
    {
      title: 'Moves Değeri (Hamle Sayacı)',
      desc: 'Her deneme işleminden sonra moves değeri 1 arttırılır ve puan olarak takip edilir.',
      status: true,
    },
    {
      title: 'En İyi Skor & LocalStorage',
      desc: 'Oyun bittiğinde en iyi skor yapılmışsa localStorage’a kaydedilir ve ekranda anlık gösterilir.',
      status: true,
    },
    {
      title: 'En Altta Restart Butonu & Rastgele Karıştırma',
      desc: 'Ekranın en altında konumlandırılan Restart butonu her tıklandığında kartları rastgele karıştırır.',
      status: true,
    },
    {
      title: 'Enes Öztürk İmzalı',
      desc: 'Proje, geliştirici Enes Öztürk’ün onaylı imzası ve rozetiyle mühürlenmiştir.',
      status: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Proje 3: Hafıza Oyunu Şartnamesi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Frontend Web Development Projeleri &middot; 2. Seviye
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3">
          {requirements.map((req, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {req.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {req.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Hazırlayan:{' '}
            <span className="font-bold text-slate-900 dark:text-white">
              Enes Öztürk
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Anladım, Oyuna Dön
          </button>
        </div>
      </div>
    </div>
  );
};
