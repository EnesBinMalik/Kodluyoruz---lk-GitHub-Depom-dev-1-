import React from 'react';
import { X, CheckCircle, ShieldCheck, Twitter, Code2, Heart, Award } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Cover banner */}
        <div className="h-28 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 relative p-4 flex items-end">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white p-1.5 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex justify-between items-end -mt-12 mb-3">
            <img
              src="/src/assets/images/avatar_enes_ozturk_1794247644235.jpg"
              alt="Enes Öztürk"
              className="w-22 h-22 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
            />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Resmi Proje İmzası
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Enes Öztürk
              </h2>
              <Award className="w-5 h-5 text-sky-500 fill-sky-500/20" />
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              @enesozturk · Kurucu & Baş Yazılım Mühendisi
            </p>
          </div>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Bu Tweet Uygulaması, kullanıcıların düşüncelerini 180 karakter sınırıyla en öz ve etkili şekilde paylaşabilmesi amacıyla <strong>Enes Öztürk</strong> tarafından tasarlanmış ve kodlanmıştır.
          </p>

          {/* Project Requirements checklist */}
          <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">
              Sağlanan Proje Özellikleri:
            </span>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Kullanıcı Kayıt & Giriş:</strong> Kullanıcı adı ve şifre ile güvenli üyelik ve giriş sistemi.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>180 Karakter Sınırı:</strong> Canlı sayaç ve dairesel gösterge ile sıkı 180 karakter denetimi.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Misafir Modu Koruması:</strong> Kayıtlı olmayanlar tüm tweetleri okuyabilir, ancak paylaşamaz.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Son Tweet En Başta:</strong> En son paylaşılan tweet anında sayfanın en başında gösterilir.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Enes Öztürk İmzası:</strong> Tüm sayfada, başlıkta, profil kartlarında ve imzada yer alır.</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              React 19 & Tailwind CSS v4
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              Tasarım & Geliştirme: Enes Öztürk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
