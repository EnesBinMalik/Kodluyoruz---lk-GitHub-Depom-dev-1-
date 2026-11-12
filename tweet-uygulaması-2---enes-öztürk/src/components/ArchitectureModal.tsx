/**
 * @license
 * Mimari Açıklayıcı Modal: OOP & MVC Mimarisi Görselleştirme
 * Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { X, Layers, Box, Cpu, CheckCircle2, Shield, GitCommit, FileCode } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'oop' | 'mvc' | 'code'>('oop');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Başlığı */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                OOP ve MVC Mimari Raporu
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tweet Uygulaması 2 · Tasarımcı & Geliştirici: Enes Öztürk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Seçicileri */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 dark:border-slate-800 text-sm">
          <button
            onClick={() => setActiveTab('oop')}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'oop'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>OOP (Nesne Yönelimli Programlama)</span>
          </button>

          <button
            onClick={() => setActiveTab('mvc')}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'mvc'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>MVC (Model-View-Controller)</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'code'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Kod Haritası & Sınıflar</span>
          </button>
        </div>

        {/* İçerik */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 dark:text-slate-300">
          {activeTab === 'oop' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                <h4 className="font-bold text-sky-900 dark:text-sky-200 mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sky-600" />
                  OOP Prensipleri Nasıl Uygulandı?
                </h4>
                <p className="text-xs text-sky-800/90 dark:text-sky-300/90 leading-relaxed">
                  Proje doğrudan sade nesneler (plain objects) yerine gerçek TypeScript sınıfları
                  ve domain mantığı ile inşa edilmiştir. Veri saklama alanları özel (private) tutularak
                  kapsülleme sağlanmıştır.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    1. Kapsülleme (Encapsulation)
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <code className="text-sky-600 dark:text-sky-400 font-mono">User</code> ve{' '}
                    <code className="text-sky-600 dark:text-sky-400 font-mono">Tweet</code> sınıflarında
                    tüm kritik alanlar (şifreler, arkadaşlar, içerik) <span className="font-semibold text-slate-700 dark:text-slate-300">private</span> tanımlanmıştır.
                    Erişim getter ve setter metotlarıyla denetlenir.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    2. Domain Doğrulaması (Validation)
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <code className="text-sky-600 dark:text-sky-400 font-mono">Tweet.validateContent()</code>{' '}
                    statik metodu ile 180 karakter sınırının aşılması nesne düzeyinde engellenir.
                    Boş veya geçersiz içerikler nesne oluşturulmadan reddedilir.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    3. Durum & Yaşam Döngüsü (State Pattern)
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <code className="text-sky-600 dark:text-sky-400 font-mono">FriendshipRequest</code> sınıfı
                    'pending', 'accepted', 'rejected', 'cancelled' durum geçişlerini kendi iç metotları ile
                    güvenle yürütür.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                    4. Singleton & Repository Deseni
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <code className="text-sky-600 dark:text-sky-400 font-mono">Database.getInstance()</code>{' '}
                    ile tekil veri yöneticisi sağlanmış; kullanıcı ve tweet verilerinin LocalStorage senkronizasyonu
                    ve filtrelemeleri repository desenine bağlanmıştır.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mvc' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  Model - View - Controller Katmanları
                </h4>
                <p className="text-xs text-indigo-800/90 dark:text-indigo-300/90 leading-relaxed">
                  Uygulama tam anlamıyla 3 ana katmana ayrılmıştır. Görünüm (View) doğrudan veritabanı veya ham veriye
                  müdahale edemez; tüm istekler Controller katmanından geçer ve OOP Model nesneleri üzerinden işlenir.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center shrink-0">
                    M
                  </span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">MODEL KATMANI (src/models)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-mono text-sky-600 dark:text-sky-400">User</span>,{' '}
                      <span className="font-mono text-sky-600 dark:text-sky-400">Tweet</span>,{' '}
                      <span className="font-mono text-sky-600 dark:text-sky-400">FriendshipRequest</span>,{' '}
                      <span className="font-mono text-sky-600 dark:text-sky-400">Database</span> sınıfları.
                      Veri yapısını, kuralları ve veritabanı işlemlerini barındırır.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0">
                    V
                  </span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">VIEW KATMANI (src/views & components)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">HomeTimelineView</span>,{' '}
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">ProfileView</span>,{' '}
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">FriendRequestsView</span>,{' '}
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">AuthView</span>,{' '}
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">ComposeTweet</span>.
                      Kullanıcı arayüzünü çizer, kullanıcı etkileşimlerini Controller'a iletir.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center shrink-0">
                    C
                  </span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">CONTROLLER KATMANI (src/controllers)</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-mono text-purple-600 dark:text-purple-400">AuthController</span>,{' '}
                      <span className="font-mono text-purple-600 dark:text-purple-400">TweetController</span>,{' '}
                      <span className="font-mono text-purple-600 dark:text-purple-400">FriendshipController</span>,{' '}
                      <span className="font-mono text-purple-600 dark:text-purple-400">AppController</span> (Facade).
                      Tüm iş mantığını (gizlilik kontrolü, 180 karakter denetimi, arkadaşlık onayı/reddi) yürütür.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="font-mono text-xs p-4 rounded-xl bg-slate-950 text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
                <div className="text-sky-400 font-bold mb-2">// Proje Dosya ve Mimari Haritası (Enes Öztürk İmzalı)</div>
                <div>src/</div>
                <div>├── models/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># OOP Domain Sınıfları</span></div>
                <div>│ &nbsp; ├── User.ts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># User OOP sınıfı, yetki ve ilişkiler</span></div>
                <div>│ &nbsp; ├── Tweet.ts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="text-slate-500"># 180 karakter kuralı, beğeni metodları</span></div>
                <div>│ &nbsp; ├── FriendshipRequest.ts &nbsp;<span className="text-slate-500"># İstek durumları (pending/accepted/rejected)</span></div>
                <div>│ &nbsp; └── Database.ts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># Singleton repository & LocalStorage senkronu</span></div>
                <div>├── controllers/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="text-slate-500"># MVC Controller Katmanı</span></div>
                <div>│ &nbsp; ├── AuthController.ts &nbsp; &nbsp; <span className="text-slate-500"># Kayıt, giriş, aktif kullanıcı oturumu</span></div>
                <div>│ &nbsp; ├── TweetController.ts &nbsp; &nbsp;<span className="text-slate-500"># 180 karakter doğrulama, arkadaş akışı</span></div>
                <div>│ &nbsp; ├── FriendshipController.ts<span className="text-slate-500"># Takip istekleri, onay/red, arkadaşlık</span></div>
                <div>│ &nbsp; └── AppController.ts &nbsp; &nbsp; &nbsp; <span className="text-slate-500"># Facade / Mediator merkezi bağlantı</span></div>
                <div>├── views/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># MVC Görünüm Katmanı</span></div>
                <div>│ &nbsp; ├── HomeTimelineView.tsx &nbsp; <span className="text-slate-500"># Arkadaş tweet akışı (kronolojik azalan)</span></div>
                <div>│ &nbsp; ├── ProfileView.tsx &nbsp; &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># Profil sayfası & arkadaş korumalı tweetler</span></div>
                <div>│ &nbsp; ├── FriendRequestsView.tsx <span className="text-slate-500"># Takip isteklerini onaylama/reddetme</span></div>
                <div>│ &nbsp; ├── MembersDirectoryView.tsx<span className="text-slate-500"># Üye keşfi & istek gönderme</span></div>
                <div>│ &nbsp; └── AuthView.tsx &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># Kayıtsız kullanıcı giriş engeli / form</span></div>
                <div>└── components/ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="text-slate-500"># Arayüz Bileşenleri</span></div>
                <div>&nbsp; &nbsp; ├── ComposeTweet.tsx &nbsp; &nbsp; &nbsp; <span className="text-slate-500"># 180 karakter dinamik sayacı</span></div>
                <div>&nbsp; &nbsp; ├── TweetCard.tsx &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># Tweet kartı, beğeni ve aksiyonlar</span></div>
                <div>&nbsp; &nbsp; ├── Navbar.tsx &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className="text-slate-500"># 3 bölgeli navigasyon kontratı</span></div>
                <div>&nbsp; &nbsp; └── EnesSignature.tsx &nbsp; &nbsp; &nbsp;<span className="text-slate-500"># Enes Öztürk imza ve sertifika bileşeni</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Altlığı */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Tüm proje şartları OOP ve MVC mimarisi ile karşılandı.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Anladım, Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
