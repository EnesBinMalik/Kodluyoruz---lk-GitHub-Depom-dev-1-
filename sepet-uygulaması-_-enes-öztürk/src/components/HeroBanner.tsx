import React from 'react';
import { HERO_IMAGE } from '../data/products';
import { ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-xs font-semibold text-amber-900 tracking-wide uppercase">
                2026 Özel Seçki & Tasarım: Enes Öztürk
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Yaşam Tarzınızı Yansıtan <span className="text-amber-600">Premium</span> Ürünler.
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Özenle seçilmiş ses sistemleri, akıllı giyilebilir teknolojiler ve masaüstü aksesuarları. İster tek tek, ister dilediğiniz adetle sepetinize ekleyin ve kolayca yönetin.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95"
              >
                Ürünleri Keşfet
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800">1.000 ₺</span> üzeri Kargo Bedava
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">Hızlı Kargo</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">2 Yıl Garanti</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">14 Gün İade</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">Orijinal Ürün</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 sm:aspect-16/9 bg-slate-100 border border-slate-200/80 group">
              <img
                src={HERO_IMAGE}
                alt="Enes Öztürk Sepet Uygulaması Koleksiyonu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-white/50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Enes Öztürk Signature Collection</p>
                  <p className="text-[11px] text-slate-500">Masaüstü, Ses ve Mobil Düzenleyici Ekipmanlar</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                  8 Seçkin Ürün
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
