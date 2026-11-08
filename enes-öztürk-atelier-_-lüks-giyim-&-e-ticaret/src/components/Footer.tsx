import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Trust Highlights */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-amber-200 shrink-0" />
              <div>
                <strong className="block text-stone-200 text-sm">Hızlı & Sigortalı Sevkiyat</strong>
                Tüm siparişler 1-3 iş gününde özel koruma kılıfları ile teslim edilir.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-amber-200 shrink-0" />
              <div>
                <strong className="block text-stone-200 text-sm">14 Gün Kolay Değişim & İade</strong>
                Koşulsuz iade ve değişim güvencesi ile rahat alışveriş.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-200 shrink-0" />
              <div>
                <strong className="block text-stone-200 text-sm">Doğal & Sertifikalı Kumaşlar</strong>
                Merinos yünü, Mısır pamuğu ve İtalyan kaşmir garantisi.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Signature Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="text-2xl font-serif-brand font-semibold tracking-tight text-white inline-block">
              ENES ÖZTÜRK
              <span className="text-xs font-mono font-normal tracking-widest text-amber-200 ml-2">
                ATELIER
              </span>
            </Link>
            
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed font-light">
              Modern terzilik, zamansız kumaş dokuları ve minimalist silüetler.
              Günümüz koşullarında konfor ve estetiği bir araya getiren bağımsız tasarım stüdyosu.
            </p>

            {/* Signature badge */}
            <div className="pt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-stone-800/80 border border-stone-700 text-xs text-amber-200 font-serif-brand italic">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Tasarım & Geliştirme: Enes Öztürk İmzalı</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-200">
              Koleksiyon
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/" className="hover:text-white transition-colors">Kaban & Ceket</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Sweatshirt & Hoodie</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Triko & Kazak</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Yün & Selvedge Pantolon</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Poplin Gömlek</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-200">
              Müşteri Hizmetleri
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">İletişim & Showroom</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition-colors">Favori Parçalarım</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Sepetim</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Sıkça Sorulan Sorular</Link></li>
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-200">
              Teknoloji & Altyapı
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Bu e-ticaret platformu React Router URL senkronizasyonu, Styled Components buton mimarisi ve Axios destekli MockAPI.io veri katmanı ile geliştirilmiştir.
            </p>
            <div className="text-[11px] font-mono text-stone-400 pt-1">
              Netlify SPA Ready (/_redirects)
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Enes Öztürk Atelier. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Enes Öztürk</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>tarafından özenle tasarlanmıştır.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
