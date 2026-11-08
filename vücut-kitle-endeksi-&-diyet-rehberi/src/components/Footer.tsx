import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Author Signature */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                FitIndex &bull; VKİ Rehberi
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Vücut Kitle Endeksi (BMI) hesaplama, kişiselleştirilmiş Akdeniz tipi diyet programları, ideal kilo tahmini ve günlük sıvı ihtiyacı asistanı.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-emerald-400">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Tasarım ve Geliştirme: <strong>Enes Öztürk</strong></span>
            </div>
          </div>

          {/* Quick Routes */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Hızlı Gezinti
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  VKİ / BMI Hesaplama
                </Link>
              </li>
              <li>
                <Link to="/bmi-nedir" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  BMI Nedir? Bilimsel Rehber
                </Link>
              </li>
              <li>
                <Link to="/diyet-listeleri" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Kişiselleştirilmiş Diyet Listeleri
                </Link>
              </li>
              <li>
                <Link to="/gecmis" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Hesaplama Geçmişi
                </Link>
              </li>
            </ul>
          </div>

          {/* Health Disclaimer */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sağlık Uyarısı
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bu web uygulamasındaki VKİ değerleri ve örnek diyet menüleri yalnızca bilgilendirme ve farkındalık amaçlıdır. Herhangi bir tıbbi teşhis veya tedavi yerine geçmez. Kronik hastalığınız varsa mutlaka doktorunuza ve uzman diyetisyeninize başvurunuz.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} FitIndex. Tüm hakları saklıdır. <strong className="text-white font-medium">Enes Öztürk</strong> imzalı özel proje.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">React 19 &bull; Styled Components &bull; React Router &bull; LocalStorage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
