import React from 'react';
import { Heart, Sparkles, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenSignature: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSignature }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          
          {/* Brand & Signature Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                ÖZTÜRK<span className="text-amber-600">.</span>STORE
              </span>
              <span className="text-xs font-semibold text-amber-700 tracking-wide uppercase mt-0.5">
                Enes Öztürk İmzalı Özel Proje
              </span>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Modern tasarım, esnek sepet yönetimi ve akıllı alışveriş deneyimi sunan e-ticaret sepet mimarisi. Enes Öztürk tarafından özenle kodlanmıştır.
            </p>

            <button
              onClick={onOpenSignature}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Geliştirici İmzası & Bilgiler</span>
            </button>
          </div>

          {/* Quick Info */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Müşteri Güvencesi
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>1.000 ₺ Üzeri Ücretsiz Kargo</li>
              <li>14 Gün Koşulsuz İade Hakkı</li>
              <li>24/7 Çevrimiçi Sipariş Takibi</li>
              <li>Orijinal & Faturalı Ürünler</li>
              <li>256-bit SSL Güvenli Altyapı</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              İletişim & Destek
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>destek@enesbino38.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>0850 300 00 00</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Öztürk Store. Tüm hakları saklıdır.</p>
          
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span>Tasarım ve Geliştirme:</span>
            <strong className="text-slate-900 font-bold underline decoration-amber-500 decoration-2 underline-offset-4">
              Enes Öztürk
            </strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
