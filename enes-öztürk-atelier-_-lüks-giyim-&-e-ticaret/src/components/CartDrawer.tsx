import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CartItem } from '../types';
import { StyledPrimaryButton, StyledSecondaryButton } from './styled/Buttons';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, cartSubtotal, cartTotal, discountAmount } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-serif-brand font-semibold text-stone-900">
                Alışveriş Çantası ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-sm font-medium text-stone-800">Çantanız henüz boş</p>
                <p className="text-xs text-stone-500">Koleksiyon ürünlerini keşfetmek için kataloğu inceleyin.</p>
                <div className="pt-2">
                  <StyledPrimaryButton
                    $size="sm"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/');
                    }}
                  >
                    Kataloğu Aç
                  </StyledPrimaryButton>
                </div>
              </div>
            ) : (
              cart.map((item: CartItem) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-3 pb-4 border-b border-stone-100 last:border-b-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-xs font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </h3>
                    <div className="text-[11px] text-stone-500">
                      {item.selectedSize} / {item.selectedColor}
                    </div>
                    <div className="text-xs font-mono-num font-bold text-stone-900">
                      ₺{item.product.price.toLocaleString('tr-TR')}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-stone-300 rounded overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="px-2 py-0.5 bg-stone-50 text-stone-600 hover:bg-stone-200"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-[11px] font-mono-num font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="px-2 py-0.5 bg-stone-50 text-stone-600 hover:bg-stone-200"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Ara Toplam</span>
                  <span className="font-mono-num font-medium text-stone-900">
                    ₺{cartSubtotal.toLocaleString('tr-TR')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>İndirim (ENES2026)</span>
                    <span className="font-mono-num">-₺{discountAmount.toLocaleString('tr-TR')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-950 pt-1 border-t border-stone-200">
                  <span>Toplam</span>
                  <span className="font-mono-num">
                    ₺{cartTotal.toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <StyledPrimaryButton
                  $fullWidth
                  $size="md"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                >
                  Sepete Git & Satın Al <ArrowRight className="w-4 h-4 ml-1" />
                </StyledPrimaryButton>
                <StyledSecondaryButton
                  $fullWidth
                  $size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Alışverişe Devam Et
                </StyledSecondaryButton>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
