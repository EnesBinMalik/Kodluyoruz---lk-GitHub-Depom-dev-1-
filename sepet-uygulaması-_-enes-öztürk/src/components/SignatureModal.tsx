import React from 'react';
import { X, CheckCircle, Code2, Award, Heart, Sparkles, ShoppingCart } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal card */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
                EÖ
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Enes Öztürk</h3>
                <p className="text-xs text-amber-700 font-semibold">Tasarım & Yazılım Mühendisi</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 text-xs text-slate-600 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Proje İmzası & Özellikleri</span>
              </div>
              <p className="leading-relaxed">
                Bu sepet uygulaması, <strong className="text-slate-900">Enes Öztürk</strong> tarafından modern web standartları, yüksek performans ve kullanıcı deneyimi ilkeleri gözetilerek geliştirilmiştir.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Uygulanan İstekler & Gereksinimler:</h4>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bir dizi ürün içeriğinin filtrelenebilir ve aranabilir listelenmesi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Listelenen ürünlerin sepete eklenmesi ve sepetten tek tek çıkarılması</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Birden fazla farklı ürünün ve her üründen çoklu adette sepete eklenebilmesi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ürünlerin tek tek ("Kaldır" veya adet azaltma) ya da <strong>tamamının tek tuşla ("Sepeti Boşalt")</strong> çıkarılabilmesi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Enes Öztürk özel imza rozeti ve branding yapısı</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-center justify-between text-xs text-amber-900">
              <span className="font-semibold">Versiyon 1.0.0 (2026)</span>
              <span className="text-[11px] font-medium">React 19 + TypeScript + Tailwind CSS</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Anladım, Alışverişe Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
