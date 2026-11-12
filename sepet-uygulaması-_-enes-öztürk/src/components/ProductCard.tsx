import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../data/products';
import { Star, Plus, Minus, Trash2, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onQuickView,
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
      
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center text-xs text-slate-400">
            Yükleniyor...
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Overlay Action: Hızlı İncele */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-slate-900 text-xs font-semibold rounded-lg shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Hızlı İncele
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-1 text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-sm rounded-md shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-rose-600 rounded-md shadow-xs">
              %{discountPercent} İndirim
            </span>
          )}
        </div>

        {/* In-Cart Indicator Dot */}
        {quantityInCart > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-md shadow-sm">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>{quantityInCart} sepette</span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-slate-500 tracking-wider uppercase">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Stokta Var
            </span>
          </div>

          {/* Interactive Cart Buttons */}
          {quantityInCart === 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Sepete Ekle</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Stepper */}
              <div className="flex-1 flex items-center justify-between p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => onUpdateQuantity(product.id, quantityInCart - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-slate-200/60 text-slate-800 shadow-2xs transition-colors cursor-pointer"
                  title={quantityInCart === 1 ? 'Sepetten Çıkar' : 'Adet Azalt'}
                >
                  {quantityInCart === 1 ? (
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  ) : (
                    <Minus className="w-3.5 h-3.5" />
                  )}
                </button>

                <div className="text-center px-2">
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {quantityInCart} Adet
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-slate-200/60 text-slate-800 shadow-2xs transition-colors cursor-pointer"
                  title="Adet Artır"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct remove from cart button */}
              <button
                onClick={() => onRemoveFromCart(product.id)}
                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                title="Sepetten Tamamen Çıkar"
                aria-label="Sepetten Çıkar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
