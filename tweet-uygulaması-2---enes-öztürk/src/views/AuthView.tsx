/**
 * @license
 * Kimlik Doğrulama Görünümü (AuthView)
 * Proje şartı: Kayıtlı olmayan kullanıcılar tweet okuyamaz.
 * Kullanıcılar bir kullanıcı adı ve şifresi ile uygulamaya kayıt olabilir.
 * Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import { Lock, UserPlus, LogIn, ShieldAlert, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { AppController } from '../controllers/AppController';
import { EnesSignature } from '../components/EnesSignature';

interface AuthViewProps {
  onSuccessAuth: () => void;
  onOpenArchitecture: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccessAuth, onOpenArchitecture }) => {
  const app = AppController.getInstance();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = app.auth.login(username, password);
    setLoading(false);

    if (result.success) {
      onSuccessAuth();
    } else {
      setError(result.errorMessage || 'Giriş yapılamadı.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = app.auth.register(username, name, password, bio);
    setLoading(false);

    if (result.success) {
      onSuccessAuth();
    } else {
      setError(result.errorMessage || 'Kayıt oluşturulamadı.');
    }
  };

  const handleQuickDemoLogin = (userId: string) => {
    const result = app.auth.switchUser(userId);
    if (result.success) {
      onSuccessAuth();
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      {/* Gizlilik & Korumalı Akış Bilgilendirme Kartı */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <p className="font-bold">Korumalı İçerik Kuralı:</p>
          <p className="mt-0.5 text-amber-800 dark:text-amber-300">
            Kayıtlı olmayan kullanıcılar tweetleri okuyamaz. Arkadaşlarınızın tweetlerini görmek ve
            180 karakterlik paylaşımlar yapmak için lütfen giriş yapın veya kayıt olun.
          </p>
        </div>
      </div>

      {/* Ana Kart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md mb-3">
            T2
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Tweet Uygulaması 2
          </h2>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enes Öztürk İmzalı</span>
          </div>
        </div>

        {/* Giriş / Kayıt Segment Değiştirici */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Kayıt Ol
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Örn: enes, zeynep"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Şifre
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Şifrenizi girin (Demo şifre: 123456)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kullanıcı Adı (Benzersiz)
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="örn: murat_kaya"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Adınız ve Soyadınız"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Şifre
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="En az 4 karakter"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kısa Biyografi (İsteğe bağlı)
              </label>
              <input
                type="text"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Kendinizi tanıtın"
                maxLength={200}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Kayıt Yapılıyor...' : 'Hesap Oluştur'}</span>
            </button>
          </form>
        )}

        {/* Hızlı Demo Girişi (Öğretim ve Değerlendirme için) */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
            Hızlı Demo Hesapları İle Giriş
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('usr_enes_ozturk')}
              className="p-2.5 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50/60 dark:bg-sky-950/40 text-left hover:bg-sky-100 transition-colors cursor-pointer group"
            >
              <div className="font-bold text-xs text-sky-950 dark:text-sky-200 group-hover:text-sky-600">
                Enes Öztürk
              </div>
              <div className="text-[10px] text-sky-700 dark:text-sky-400">@enes (Geliştirici)</div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('usr_zeynep_demir')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
            >
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-sky-600">
                Zeynep Demir
              </div>
              <div className="text-[10px] text-slate-400">@zeynep (Arkadaş)</div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('usr_ayse_kaya')}
              className="p-2.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/40 text-left hover:bg-amber-100 transition-colors cursor-pointer group"
            >
              <div className="font-bold text-xs text-amber-950 dark:text-amber-200 group-hover:text-amber-600">
                Ayşe Kaya
              </div>
              <div className="text-[10px] text-amber-700 dark:text-amber-400">@ayse (İstek Yolladı)</div>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('usr_can_ozkan')}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
            >
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-sky-600">
                Can Özkan
              </div>
              <div className="text-[10px] text-slate-400">@can (Yeni Üye)</div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <EnesSignature variant="footer" onOpenArchitecture={onOpenArchitecture} />
      </div>
    </div>
  );
};
