import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, UserPlus, ShieldAlert, Sparkles, Check, KeyRound, User as UserIcon } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authModalTab,
    authModalMessage,
    closeAuthModal,
    login,
    register,
    users,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authModalTab);

  // Sync tab with context when modal opens
  React.useEffect(() => {
    setActiveTab(authModalTab);
  }, [authModalTab, authModalOpen]);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBio, setRegBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('/src/assets/images/avatar_enes_ozturk_1794247644235.jpg');
  const [regError, setRegError] = useState('');

  if (!authModalOpen) return null;

  const avatarOptions = [
    { id: '1', url: '/src/assets/images/avatar_enes_ozturk_1794247644235.jpg', label: 'Enes Stili' },
    { id: '2', url: '/src/assets/images/avatar_tech_designer_1794247644519.jpg', label: 'Tasarımcı' },
    { id: '3', url: '/src/assets/images/avatar_tech_dev_1794247644112.jpg', label: 'Geliştirici' },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginUsername.trim()) {
      setLoginError('Lütfen kullanıcı adınızı girin.');
      return;
    }
    const res = login(loginUsername, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Giriş yapılamadı.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    const res = register({
      username: regUsername,
      name: regName,
      password: regPassword,
      avatar: selectedAvatar,
      bio: regBio,
    });
    if (!res.success) {
      setRegError(res.error || 'Kayıt başarısız oldu.');
    }
  };

  const handleQuickLogin = (username: string) => {
    setLoginUsername(username);
    setLoginPassword('password123');
    login(username, 'password123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {activeTab === 'login' ? 'Uygulamaya Giriş Yap' : 'Yeni Hesap Oluştur'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tweet Uygulaması · Enes Öztürk
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Trigger Message (If prompted by guest attempt) */}
        {authModalMessage && (
          <div className="px-6 py-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/60 dark:border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-200">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <span>{authModalMessage}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 p-1.5 bg-slate-50 dark:bg-slate-800/50 m-4 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setLoginError('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setRegError('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Kayıt Ol
          </button>
        </div>

        {/* Body */}
        <div className="p-6 pt-2">
          {activeTab === 'login' ? (
            <div>
              {loginError && (
                <div className="mb-4 p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs rounded-xl">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Kullanıcı Adı
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">
                      @
                    </span>
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={e => setLoginUsername(e.target.value)}
                      placeholder="enesozturk veya kullanıcı adınız"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-7 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Şifre
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Giriş Yap
                </button>
              </form>

              {/* Quick Demo Login Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                  Hızlı Demo Hesapları (1-Tıkla Giriş)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {users.slice(0, 4).map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickLogin(u.username)}
                      className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all text-left cursor-pointer"
                    >
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {u.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          @{u.username}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {regError && (
                <div className="mb-4 p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs rounded-xl">
                  {regError}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Ad ve Soyad
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="Örn: Enes Öztürk"
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Kullanıcı Adı (Benzersiz)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">
                      @
                    </span>
                    <input
                      type="text"
                      value={regUsername}
                      onChange={e => setRegUsername(e.target.value)}
                      placeholder="kullaniciadi"
                      required
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-7 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Şifre (En az 4 karakter)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={4}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Profil Fotoğrafı Seçin
                  </label>
                  <div className="flex items-center gap-3">
                    {avatarOptions.map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedAvatar(opt.url)}
                        className={`relative rounded-full p-0.5 transition-all cursor-pointer ${
                          selectedAvatar === opt.url
                            ? 'ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-900'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={opt.url}
                          alt={opt.label}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        {selectedAvatar === opt.url && (
                          <span className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-0.5">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Biyografi (İsteğe bağlı)
                  </label>
                  <input
                    type="text"
                    value={regBio}
                    onChange={e => setRegBio(e.target.value)}
                    placeholder="Kendinizi kısaca tanıtın..."
                    maxLength={100}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Kayıt Ol ve Tweet Atmaya Başla
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
