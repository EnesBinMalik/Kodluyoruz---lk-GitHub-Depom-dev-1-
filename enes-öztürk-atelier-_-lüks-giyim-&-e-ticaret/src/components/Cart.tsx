import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  X,
  CreditCard,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { CartItem, OrderData } from '../types';
import { api } from '../services/api';
import {
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledBackButton,
  StyledCartButton
} from './styled/Buttons';

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useShop();

  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);

  // Checkout form fields
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('İstanbul');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cod' | 'bank_transfer'>('credit_card');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const orderPayload: OrderData = {
      orderId: 'EO-' + Math.floor(100000 + Math.random() * 900000),
      customerName,
      email,
      phone,
      address,
      city,
      paymentMethod,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: cartTotal,
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    try {
      // Axios request to record order
      await api.createOrder(orderPayload);
      
      // Trigger festive celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setCompletedOrder(orderPayload);
      clearCart();
    } catch (err) {
      console.warn('Order submission error', err);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Alışveriş Çantası
              </div>
              <h1 className="text-3xl font-serif-brand font-semibold text-stone-900 mt-1">
                Sepetim ({cart.reduce((a, b) => a + b.quantity, 0)} Ürün)
              </h1>
            </div>
            
            <StyledBackButton onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" /> Alışverişe Devam Et
            </StyledBackButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Order Completed Success Banner */}
        {completedOrder && (
          <div className="mb-8 p-6 sm:p-8 bg-white border border-emerald-300 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-xl font-serif-brand font-bold text-stone-900">
                  Siparişiniz Başarıyla Alındı!
                </h2>
                <p className="text-xs text-stone-600 mt-0.5 font-mono">
                  Sipariş Kodu: <strong className="text-stone-900">{completedOrder.orderId}</strong> · Enes Öztürk Atelier
                </p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded border border-stone-200 text-xs space-y-2 text-stone-700">
              <div><strong>Alıcı:</strong> {completedOrder.customerName} ({completedOrder.email})</div>
              <div><strong>Teslimat Adresi:</strong> {completedOrder.address}, {completedOrder.city}</div>
              <div><strong>Ödeme Yöntemi:</strong> {completedOrder.paymentMethod === 'credit_card' ? 'Kredi Kartı' : 'Kapıda Ödeme'}</div>
              <div><strong>Toplam Tutar:</strong> ₺{completedOrder.total.toLocaleString('tr-TR')} (Axios ile kaydedildi)</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <StyledPrimaryButton $size="sm" onClick={() => navigate('/')}>
                Yeni Koleksiyonları İncele
              </StyledPrimaryButton>
              <StyledSecondaryButton $size="sm" onClick={() => setCompletedOrder(null)}>
                Kapat
              </StyledSecondaryButton>
            </div>
          </div>
        )}

        {/* Empty Cart View */}
        {cart.length === 0 && !completedOrder ? (
          <div className="bg-white rounded-lg border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4 my-12 shadow-xs">
            <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif-brand font-semibold text-stone-900">
              Sepetinizde Ürün Bulunmuyor
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Enes Öztürk imzalı zamansız parçaları keşfetmek için ürün kataloğunu ziyaret edebilirsiniz.
            </p>
            <div className="pt-2">
              <StyledPrimaryButton $size="md" onClick={() => navigate('/')}>
                Kataloğa Git <ArrowRight className="w-4 h-4 ml-1" />
              </StyledPrimaryButton>
            </div>
          </div>
        ) : cart.length > 0 && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Shipping Progress */}
              <div className="bg-white p-4 rounded-lg border border-stone-200 text-xs">
                {cartSubtotal >= 1500 ? (
                  <div className="flex items-center gap-2 text-emerald-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tebrikler! Siparişiniz için <strong>Ücretsiz Kargo</strong> kazandınız.</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-stone-700">
                      <span>Ücretsiz kargo için <strong className="font-mono-num text-stone-950">₺{(1500 - cartSubtotal).toLocaleString('tr-TR')}</strong> daha ekleyin!</span>
                      <span className="font-mono-num">{Math.round((cartSubtotal / 1500) * 100)}%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-stone-900 h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (cartSubtotal / 1500) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-lg border border-stone-200 divide-y divide-stone-100">
                {/* Dinamik map fonksiyonu ile sepet ürünleri */}
                {cart.map((item: CartItem) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                    
                    {/* Item Image */}
                    <div
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="w-20 h-24 sm:w-24 sm:h-28 bg-stone-100 rounded overflow-hidden shrink-0 cursor-pointer border border-stone-200"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                        {item.product.category}
                      </div>

                      <h3
                        onClick={() => navigate(`/product/${item.product.id}`)}
                        className="text-sm font-semibold text-stone-900 truncate hover:text-stone-600 cursor-pointer"
                      >
                        {item.product.name}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-stone-600">
                        <span>Beden: <strong className="font-semibold text-stone-900">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Renk: <strong className="font-semibold text-stone-900">{item.selectedColor}</strong></span>
                      </div>

                      <div className="text-sm font-mono-num font-bold text-stone-900 pt-1">
                        ₺{item.product.price.toLocaleString('tr-TR')}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                      <div className="flex items-center border border-stone-300 rounded overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="p-1 sm:px-2.5 sm:py-1 bg-stone-50 hover:bg-stone-200 text-stone-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono-num font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="p-1 sm:px-2.5 sm:py-1 bg-stone-50 hover:bg-stone-200 text-stone-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors"
                        title="Ürünü Sepetten Kaldır"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Clear cart action */}
              <div className="flex justify-between items-center text-xs text-stone-500 pt-2">
                <span>Stoklar sepette 30 dakika süreyle rezerve edilir.</span>
                <button
                  onClick={clearCart}
                  className="text-stone-600 hover:text-rose-600 underline underline-offset-2"
                >
                  Sepeti Boşalt
                </button>
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs space-y-4">
                
                <h3 className="font-serif-brand font-semibold text-lg text-stone-900 border-b border-stone-100 pb-3">
                  Sipariş Özeti
                </h3>

                {/* Subtotal breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Ara Toplam</span>
                    <span className="font-mono-num font-medium text-stone-900">
                      ₺{cartSubtotal.toLocaleString('tr-TR')}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>İndirim ({appliedCoupon})</span>
                      <span className="font-mono-num">-₺{discountAmount.toLocaleString('tr-TR')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-600">
                    <span>Kargo Ücreti</span>
                    <span className="font-mono-num font-medium text-stone-900">
                      {shippingFee === 0 ? 'Ücretsiz' : `₺${shippingFee}`}
                    </span>
                  </div>

                  <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-bold text-stone-950">
                    <span>Toplam</span>
                    <span className="font-mono-num">
                      ₺{cartTotal.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <div className="pt-2 border-t border-stone-100">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded text-xs">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Kupon: <strong>{appliedCoupon}</strong> (%20 İndirim)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Kuponu Kaldır"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="İndirim Kodu (örn: ENES2026)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-stone-300 rounded text-xs text-stone-800 uppercase focus:ring-1 focus:ring-stone-900"
                        />
                        <StyledSecondaryButton type="submit" $size="sm">
                          Uygula
                        </StyledSecondaryButton>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-600">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Primary Checkout Button */}
                <div className="pt-2">
                  <StyledPrimaryButton
                    $fullWidth
                    $size="lg"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Siparişi Tamamla <ArrowRight className="w-4 h-4 ml-1" />
                  </StyledPrimaryButton>
                </div>

                {/* Security trust badge */}
                <div className="pt-2 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-Bit SSL Güvenli Ödeme Altyapısı</span>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Checkout Modal Form */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-xl font-serif-brand font-semibold text-stone-900">
                  Teslimat & Ödeme Bilgileri
                </h3>
                <p className="text-xs text-stone-500">Enes Öztürk Atelier Sipariş Formu</p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enes Öztürk"
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0532 000 00 00"
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                  E-Posta Adresi *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enes@example.com"
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Teslimat Adresi *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Abdi İpekçi Cad. No:42 D:5"
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Şehir *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="İstanbul"
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">
                  Ödeme Yöntemi
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label
                    className={`flex items-center gap-2 p-3 border rounded cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'border-stone-900 bg-stone-50 font-semibold'
                        : 'border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                    />
                    <CreditCard className="w-4 h-4 text-stone-700" />
                    <span>Kredi Kartı</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 border rounded cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-50 font-semibold'
                        : 'border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <Truck className="w-4 h-4 text-stone-700" />
                    <span>Kapıda Ödeme</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs flex justify-between font-medium">
                <span>Ödenecek Toplam Tutar:</span>
                <span className="font-mono-num font-bold text-stone-950">
                  ₺{cartTotal.toLocaleString('tr-TR')}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <StyledSecondaryButton
                  type="button"
                  $size="sm"
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  Vazgeç
                </StyledSecondaryButton>
                
                <StyledPrimaryButton
                  type="submit"
                  $size="md"
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? 'İşleniyor...' : 'Siparişi Onayla & Öde'}
                </StyledPrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
