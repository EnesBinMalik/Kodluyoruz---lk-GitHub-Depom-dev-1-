import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../data/products';
import { X, Star, Plus, Minus, ShoppingBag, Check, Shield, Truck, RotateCcw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  quantityInCart: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  quantityInCart,
}) => {
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);

  React.useEffect(() => {
    setSelectedQuantity(1);
  }, [product]);

  if (!product) return null;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal card */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-2xl animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 bg-white/80 hover:bg-white rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-square md:aspect-auto bg-slate-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
                  %{discountPercent} İndirim
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-amber-700">
                    {product.brand} · {product.category}
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400">({product.reviewsCount} Değerlendirme)</span>
                  </div>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Key features */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 mb-2">Öne Çıkan Özellikler:</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase section */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">Adet:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-700 hover:bg-slate-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900 tabular-nums">
                      {selectedQuantity}
                    </span>
                    <button
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-700 hover:bg-slate-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {quantityInCart > 0 && (
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                      Şu an sepette {quantityInCart} adet var
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, selectedQuantity);
                    onClose();
                  }}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{selectedQuantity} Adet Sepete Ekle ({formatCurrency(product.price * selectedQuantity)})</span>
                </button>

                {/* Micro guarantees */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2 text-[10px] text-slate-500">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-600" />
                    <span>Hızlı Gönderi</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-slate-600" />
                    <span>2 Yıl Garanti</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                    <span>Kolay İade</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
