import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import { ContactFormData } from '../types';
import { StyledPrimaryButton, StyledBackButton } from './styled/Buttons';
import { useNavigate } from 'react-router-dom';

export const Contact: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Sipariş & Beden Danışmanlığı',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Kıyafetlerin kalıpları nasıldır ve doğru bedeni nasıl seçebilirim?',
      a: 'Enes Öztürk Atelier koleksiyonlarında modern relaxed ve oversized silüetler ön plandadır. Ürün detay sayfalarında her parça için ayrıntılı beden ölçü tablosu bulunmaktadır. Standart bedeninizi seçebilirsiniz.'
    },
    {
      q: 'Kargo süresi ve teslimat koşulları nelerdir?',
      a: 'Saat 15:00\'e kadar verilen siparişler aynı gün hazırlanır. 1.500 TL üzeri tüm alışverişlerde Türkiye geneli sigortalı ekspres kargo ücretsizdir. Teslimat süresi ortalama 1-3 iş günüdür.'
    },
    {
      q: 'İade ve değişim sürecini nasıl başlatabilirim?',
      a: 'Siparişinizi teslim aldığınız tarihten itibaren 14 gün içerisinde faturası ve etiketi zarar görmemiş ürünleri ücretsiz iade veya değişim için gönderebilirsiniz.'
    },
    {
      q: 'MockAPI.io servisini kendi hesabımla nasıl entegre edebilirim?',
      a: 'Sağ üst menüdeki veritabanı ikonuna tıklayarak kendi MockAPI.io endpoint URL adresinizi girebilirsiniz. Uygulama anında Axios üzerinden endpointinizi bağlayacaktır.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.submitContact(formData);
      setSuccessResponse(res.message);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Sipariş & Beden Danışmanlığı',
        message: ''
      });
    } catch (err) {
      console.warn('Axios contact form error', err);
    } finally {
      setSubmitting(false);
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
                Müşteri Deneyimi & Showroom
              </div>
              <h1 className="text-3xl font-serif-brand font-semibold text-stone-900 mt-1">
                İletişim & Danışmanlık
              </h1>
            </div>
            <StyledBackButton onClick={() => navigate('/')}>
              ← Kataloğa Dön
            </StyledBackButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Details & Showroom */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-serif-brand font-semibold text-stone-900 mb-2">
                Enes Öztürk Atelier Showroom
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Koleksiyon parçalarımızı yakından incelemek, özel terzilik randevusu almak veya siparişiniz hakkında destek almak için bizimle iletişime geçebilirsiniz.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-stone-200">
                <MapPin className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600">
                  <strong className="block text-stone-900 text-sm font-semibold mb-0.5">Adres</strong>
                  Abdi İpekçi Caddesi, No:42/B, Nişantaşı, Şişli / İstanbul
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-stone-200">
                <Mail className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600">
                  <strong className="block text-stone-900 text-sm font-semibold mb-0.5">E-Posta</strong>
                  info@enesozturk.com · atelier@enesozturk.com
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-stone-200">
                <Phone className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600">
                  <strong className="block text-stone-900 text-sm font-semibold mb-0.5">Telefon & WhatsApp</strong>
                  +90 (212) 345 67 89 / +90 (532) 100 20 26
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-stone-200">
                <Clock className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600">
                  <strong className="block text-stone-900 text-sm font-semibold mb-0.5">Çalışma Saatleri</strong>
                  Pazartesi – Cumartesi: 10:00 – 19:30 · Pazar: 12:00 – 18:00
                </div>
              </div>
            </div>

            {/* Atelier Note */}
            <div className="p-4 bg-stone-100 rounded border border-stone-200 text-xs text-stone-600">
              <span className="font-semibold text-stone-900">Enes Öztürk Özel Dikim:</span> Kaban ve takım elbiseler için kişiye özel prova randevusu oluşturabilirsiniz.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm space-y-6">
              
              <div>
                <h3 className="text-xl font-serif-brand font-semibold text-stone-900">
                  Bize Mesaj Gönderin
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Form verileri Axios istemcisi ile anında işlenmektedir.
                </p>
              </div>

              {successResponse && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{successResponse}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enes Öztürk"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                      E-Posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ornek@alanadi.com"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0532 000 00 00"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                      Konu *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900 bg-white"
                    >
                      <option value="Sipariş & Beden Danışmanlığı">Sipariş & Beden Danışmanlığı</option>
                      <option value="İade & Değişim Talebi">İade & Değişim Talebi</option>
                      <option value="Toptan & Butik Satış">Toptan & Butik Satış</option>
                      <option value="Özel Terzilik Randevusu">Özel Terzilik Randevusu</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">
                    Mesajınız *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Merhabalar, ürün bedeni ve teslimat hakkında..."
                    className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="pt-2">
                  <StyledPrimaryButton
                    type="submit"
                    $size="md"
                    disabled={submitting}
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    {submitting ? 'Axios ile Gönderiliyor...' : 'Mesajı Gönder'}
                  </StyledPrimaryButton>
                </div>
              </form>

            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 pt-12 border-t border-stone-200 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500">Sıkça Sorulan Sorular</span>
            <h3 className="text-2xl font-serif-brand font-semibold text-stone-900 mt-1">
              Merak Edilenler
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-stone-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-stone-900 hover:text-stone-700"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
