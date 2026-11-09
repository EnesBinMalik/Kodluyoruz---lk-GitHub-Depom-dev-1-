import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  UserCheck,
  Send,
  Code,
  Check,
  Calendar,
} from 'lucide-react';
import { FormConfig, FormField } from '../types/form';

interface PreviewModalProps {
  formConfig: FormConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  formConfig,
  isOpen,
  onClose,
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    // Clear error for field upon edit
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    formConfig.fields.forEach((field) => {
      const val = formData[field.id];

      // Required check
      if (field.required) {
        if (field.type === 'checkbox' && !val) {
          newErrors[field.id] = 'Bu onay kutusunu işaretlemeniz gerekmektedir.';
        } else if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
          newErrors[field.id] = 'Bu alan zorunludur.';
        }
      }

      // Email format check
      if (field.type === 'email' && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          newErrors[field.id] = 'Lütfen geçerli bir e-posta adresi giriniz.';
        }
      }

      // Min/Max Length check for text and textarea
      if (val && typeof val === 'string') {
        if (field.validation?.minLength && val.length < field.validation.minLength) {
          newErrors[field.id] = `En az ${field.validation.minLength} karakter girmelisiniz.`;
        }
        if (field.validation?.maxLength && val.length > field.validation.maxLength) {
          newErrors[field.id] = `En fazla ${field.validation.maxLength} karakter girebilirsiniz.`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
      setSubmittedData({ ...formData });

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  };

  const handleResetForm = () => {
    setFormData({});
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[400px] border-8 border-slate-800 rounded-[44px] shadow-2xl my-6 bg-white overflow-hidden';
      case 'tablet':
        return 'max-w-[720px] rounded-2xl shadow-xl my-6 bg-white';
      default:
        return 'max-w-2xl rounded-2xl shadow-xl my-6 bg-white';
    }
  };

  const getThemeButtonClass = () => {
    switch (formConfig.themeColor) {
      case 'emerald':
        return 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200';
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700 shadow-blue-200';
      case 'violet':
        return 'bg-violet-600 hover:bg-violet-700 shadow-violet-200';
      case 'rose':
        return 'bg-rose-600 hover:bg-rose-700 shadow-rose-200';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-700 shadow-amber-200';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Bar Navigation */}
      <header className="h-16 bg-white/95 border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight flex items-center gap-2">
              Form Canlı Önizleme
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Canlı Test
              </span>
            </h1>
            <p className="text-[11px] text-slate-500">
              Formu doldurabilir, doğrulamaları test edebilir ve gönderebilirsiniz.
            </p>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            title="Masaüstü Görünümü"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'desktop'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Masaüstü
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            title="Tablet Görünümü (768px)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'tablet'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            Tablet
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            title="Mobil Görünüm (iPhone 390px)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'mobile'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobil
          </button>
        </div>

        {/* User Signature & Close Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs">
            <span className="text-slate-500">Hazırlayan:</span>
            <span className="font-bold text-indigo-700 flex items-center gap-1">
              Enes Öztürk <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Düzenlemeye Dön</span>
          </button>
        </div>
      </header>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
        <div className={`w-full transition-all duration-300 ${getContainerWidth()}`}>
          {/* Mobile Phone Mock Header (if mobile view selected) */}
          {device === 'mobile' && (
            <div className="bg-slate-900 text-white px-6 py-2.5 flex items-center justify-between text-[11px] font-mono tracking-wider">
              <span>09:41</span>
              <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto" />
              <span>5G 100%</span>
            </div>
          )}

          <div className="p-6 sm:p-10">
            {/* Success State */}
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Form Başarıyla Gönderildi!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Tüm zorunlu alanlar doğrulandı ve form verileriniz sisteme kaydedildi.
                </p>

                {/* Submitted Payload Summary */}
                <div className="mt-6 text-left bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Gönderilen Veriler (JSON)
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Doğrulandı
                    </span>
                  </div>
                  <pre className="text-xs font-mono text-slate-800 bg-white p-3 rounded-xl border border-slate-200 overflow-x-auto max-h-48">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </div>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Yeni Form Doldur
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Düzenleyiciye Dön
                  </button>
                </div>
              </div>
            ) : (
              /* Active Test Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Title & Description */}
                <div className="border-b border-slate-100 pb-5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {formConfig.title || 'Başlıksız Form'}
                  </h2>
                  {formConfig.description && (
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {formConfig.description}
                    </p>
                  )}
                </div>

                {/* Empty check */}
                {formConfig.fields.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    <p className="text-sm">Bu formda henüz hiç bileşen bulunmuyor.</p>
                  </div>
                ) : (
                  /* Form Fields Render */
                  <div className="space-y-5">
                    {formConfig.fields.map((field) => {
                      const hasError = !!errors[field.id];

                      return (
                        <div key={field.id} className="space-y-1.5">
                          {/* Label */}
                          <label className="block text-sm font-semibold text-slate-800">
                            {field.label}
                            {field.required && (
                              <span className="text-rose-500 ml-1" title="Zorunlu Alan">
                                *
                              </span>
                            )}
                          </label>

                          {/* Field Inputs */}
                          {field.type === 'text' && (
                            <input
                              type="text"
                              value={formData[field.id] || ''}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || ''}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${
                                hasError
                                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                              }`}
                            />
                          )}

                          {field.type === 'textarea' && (
                            <textarea
                              rows={field.rows || 3}
                              value={formData[field.id] || ''}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || ''}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all resize-y ${
                                hasError
                                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                              }`}
                            />
                          )}

                          {field.type === 'select' && (
                            <select
                              value={formData[field.id] || ''}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${
                                hasError
                                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                              }`}
                            >
                              <option value="">
                                {field.placeholder || '-- Lütfen Bir Seçenek Belirleyin --'}
                              </option>
                              {field.options?.map((opt) => (
                                <option key={opt.id} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {field.type === 'email' && (
                            <input
                              type="email"
                              value={formData[field.id] || ''}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || 'adiniz@ornek.com'}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${
                                hasError
                                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                              }`}
                            />
                          )}

                          {field.type === 'number' && (
                            <input
                              type="number"
                              value={formData[field.id] || ''}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              placeholder={field.placeholder || '0'}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${
                                hasError
                                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                              }`}
                            />
                          )}

                          {field.type === 'date' && (
                            <input
                              type="date"
                              value={formData[field.id] || ''}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all ${
                                hasError
                                  ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                              }`}
                            />
                          )}

                          {field.type === 'checkbox' && (
                            <div className="flex items-center gap-3 pt-1">
                              <input
                                type="checkbox"
                                id={`chk_${field.id}`}
                                checked={!!formData[field.id]}
                                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <label
                                htmlFor={`chk_${field.id}`}
                                className="text-sm text-slate-700 cursor-pointer"
                              >
                                {field.placeholder || field.label}
                              </label>
                            </div>
                          )}

                          {field.type === 'radio' && (
                            <div className="space-y-2 pt-1">
                              {field.options?.map((opt) => (
                                <label
                                  key={opt.id}
                                  className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700"
                                >
                                  <input
                                    type="radio"
                                    name={`radio_${field.id}`}
                                    value={opt.value}
                                    checked={formData[field.id] === opt.value}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {/* Help Text */}
                          {field.helpText && !hasError && (
                            <p className="text-xs text-slate-500">{field.helpText}</p>
                          )}

                          {/* Validation Error Message */}
                          {hasError && (
                            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors[field.id]}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${getThemeButtonClass()}`}
                      >
                        <Send className="w-4 h-4" />
                        <span>{formConfig.submitButtonText || 'Formu Gönder'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}

            {/* Signature in Preview Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Form Yapımcısı Engine</span>
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                İmza: Enes Öztürk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
