import React from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../data/products';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, ArrowLeft, PackageCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = React.useState({
    fullName: 'Enes Öztürk',
    phone: '0555 123 45 67',
    email: 'enes@example.com',
    city: 'İstanbul',
    address: 'Bağdat Caddesi No: 42 Daire: 7 Kadıköy',
    paymentMethod: 'credit-card',
    orderNote: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 1000 || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 59;
  const discountAmount = discountPercent > 0 ? (subtotal * discountPercent) / 100 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      const generatedOrderNo = 'EO-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrderNo);
      onOrderCompleted();
    }, 1000);
  };

  const handleReset = () => {
    setIsCompleted(false);
    onClose();
  };

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
        <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-xl animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/80">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900">
                {isCompleted ? 'Siparişiniz Alındı' : 'Siparişi Tamamla'}
              </h3>
            </div>
            <button
              onClick={isCompleted ? handleReset : onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isCompleted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in-50">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-slate-900">
                    Tebrikler, Siparişiniz Başarıyla Oluşturuldu!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Sipariş Takip Numaranız: <strong className="text-slate-900 font-mono">{orderNumber}</strong>
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">Teslim Edilecek Kişi:</span>
                    <span className="text-slate-900">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">Teslimat Adresi:</span>
                    <span className="text-slate-900 truncate max-w-[220px]">{formData.city} / {formData.address}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200 text-sm">
                    <span>Toplam Ödenen:</span>
                    <span className="text-amber-700">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 font-medium max-w-md mx-auto">
                  ✨ Enes Öztürk Store ailesi olarak siparişinizi en kısa sürede kargoya teslim edeceğiz.
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Yeni Alışverişe Başla
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      E-Posta Adresi
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Şehir
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teslimat Adresi
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-slate-400"
                  />
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Ödeme Yöntemi
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer text-xs transition-colors ${formData.paymentMethod === 'credit-card' ? 'border-amber-600 bg-amber-50/50 text-slate-900 font-semibold' : 'border-slate-200 text-slate-600'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'credit-card' })}
                        className="text-amber-600"
                      />
                      <CreditCard className="w-4 h-4 text-slate-700" />
                      <span>Kredi / Banka Kartı</span>
                    </label>

                    <label className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer text-xs transition-colors ${formData.paymentMethod === 'cod' ? 'border-amber-600 bg-amber-50/50 text-slate-900 font-semibold' : 'border-slate-200 text-slate-600'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className="text-amber-600"
                      />
                      <Truck className="w-4 h-4 text-slate-700" />
                      <span>Kapıda Ödeme</span>
                    </label>
                  </div>
                </div>

                {/* Summary Strip */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Ödenecek Toplam Tutar:</span>
                    <span className="text-xs text-slate-400 block">KDV ve Kargo Dahil</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-900 tabular-nums">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-2 py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <span>İşleniyor...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Siparişi Onayla ve Tamamla</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
