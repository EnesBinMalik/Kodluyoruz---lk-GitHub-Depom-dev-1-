import React from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../data/products';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check, AlertCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCartRequest: () => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedDiscountPercent: number;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCartRequest,
  onProceedToCheckout,
  couponCode,
  setCouponCode,
  appliedDiscountPercent,
  onApplyCoupon,
}) => {
  const [couponInput, setCouponInput] = React.useState('');
  const [couponError, setCouponError] = React.useState('');
  const [couponSuccess, setCouponSuccess] = React.useState(false);

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 1000;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 59;
  const discountAmount = appliedDiscountPercent > 0 ? (subtotal * appliedDiscountPercent) / 100 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess(true);
      setCouponError('');
    } else {
      setCouponError('Geçersiz kupon kodu. Deneyin: "ENES10" veya "OZTURK20"');
      setCouponSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-900 text-white rounded-lg">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Alışveriş Sepeti</h2>
                  <p className="text-xs text-slate-500">
                    Toplam <span className="font-semibold text-slate-800">{totalItemCount} adet</span> ürün
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={onClearCartRequest}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200"
                    title="Sepetteki Tüm Ürünleri Çıkar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Sepeti Boşalt</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
                  <span>
                    {isFreeShipping ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Tebrikler, Kargo Ücretsiz!
                      </span>
                    ) : (
                      <span>
                        Ücretsiz kargo için <strong className="text-slate-900">{formatCurrency(freeShippingThreshold - subtotal)}</strong> daha ekleyin
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                    %{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Sepetiniz Boş</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Henüz sepetinize ürün eklemediniz. Enes Öztürk seçkilerini keşfederek hemen alışverişe başlayın.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Ürünlere Göz At
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-2xs group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                          {product.category}
                        </span>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 -mr-1 -mt-1 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Bu Ürünü Sepetten Çıkar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate" title={product.name}>
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-slate-700 tabular-nums mt-0.5">
                        {formatCurrency(product.price)}
                      </p>
                    </div>

                    {/* Stepper & Line Total */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white hover:bg-slate-200/80 rounded text-slate-700 shadow-2xs transition-colors cursor-pointer"
                          title={quantity === 1 ? 'Ürünü Çıkar' : 'Azalt'}
                        >
                          {quantity === 1 ? (
                            <Trash2 className="w-3 h-3 text-rose-600" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white hover:bg-slate-200/80 rounded text-slate-700 shadow-2xs transition-colors cursor-pointer"
                          title="Artır"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                          {formatCurrency(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="İndirim Kodu (örn: ENES10)"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 uppercase font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Uygula
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </p>
                )}
                {appliedDiscountPercent > 0 && (
                  <div className="mt-1.5 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80 font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Kupon uygulandı: %{appliedDiscountPercent} İndirim
                    </span>
                    <button
                      onClick={() => onApplyCoupon('')}
                      className="text-[11px] text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
                    >
                      Kaldır
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="font-semibold text-slate-900 tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>İndirim Tutarı (%{appliedDiscountPercent})</span>
                    <span className="tabular-nums">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Kargo Ücreti</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {isFreeShipping ? (
                      <span className="text-emerald-600 font-bold">Ücretsiz</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>KDV (%20 Dahil)</span>
                  <span className="tabular-nums">{formatCurrency((subtotal * 0.2) / 1.2)}</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Genel Toplam</span>
                  <span className="text-base text-amber-700 tabular-nums">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] text-slate-400">
                🔒 256-Bit SSL Şifreli Güvenli Alışveriş · Enes Öztürk Güvencesiyle
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
