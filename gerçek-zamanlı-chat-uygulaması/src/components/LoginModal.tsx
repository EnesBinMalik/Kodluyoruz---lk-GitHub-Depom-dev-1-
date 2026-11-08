import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Shuffle } from 'lucide-react';
import { AVATAR_OPTIONS, COLOR_OPTIONS, DEFAULT_ROOMS } from '../constants';
import { UserProfile } from '../types';

interface LoginModalProps {
  initialUser: UserProfile;
  isOpen: boolean;
  onSave: (user: UserProfile) => void;
  onClose?: () => void;
  isFirstTime?: boolean;
}

const RANDOM_NAMES = [
  'Gezgin', 'Yazılımcı', 'Pikselli', 'Astronot', 
  'KodAvcısı', 'Nova', 'SiberKedi', 'Fırtına', 'Kaptan'
];

export const LoginModal: React.FC<LoginModalProps> = ({
  initialUser,
  isOpen,
  onSave,
  onClose,
  isFirstTime = false,
}) => {
  const [username, setUsername] = useState(initialUser.username || '');
  const [avatar, setAvatar] = useState(initialUser.avatar || '⚡');
  const [color, setColor] = useState(initialUser.color || '#6366f1');
  const [room, setRoom] = useState(initialUser.room || 'Genel Sohbet');

  if (!isOpen) return null;

  const handleRandomize = () => {
    const randomName = `${RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]}#${Math.floor(10 + Math.random() * 89)}`;
    const randomAvatar = AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)];
    const randomColor = COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)].value;
    setUsername(randomName);
    setAvatar(randomAvatar);
    setColor(randomColor);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = username.trim() || `Kullanıcı#${Math.floor(100 + Math.random() * 899)}`;
    onSave({
      ...initialUser,
      username: finalName,
      avatar,
      color,
      room,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border-b border-slate-800 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-indigo-600/30">
                💬
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <span>{isFirstTime ? 'Sohbete Katıl' : 'Profili Düzenle'}</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Gerçek Zamanlı Chat | Enes Öztürk
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRandomize}
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1.5 rounded-lg border border-indigo-500/20 transition"
              title="Rastgele profil oluştur"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Rastgele</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Avatar Preview & Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Avatarınızı Seçin
            </label>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/20 shrink-0"
                style={{ backgroundColor: `${color}30` }}
              >
                {avatar}
              </div>
              <div className="grid grid-cols-8 gap-1.5 flex-1">
                {AVATAR_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setAvatar(item)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-base hover:scale-110 transition ${
                      avatar === item
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Kullanıcı Adınız
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Örn: Enes, Melis, Yazılımcı#42..."
              maxLength={24}
              className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              İsim Rengi
            </label>
            <div className="flex items-center gap-3">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c.value ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Starting Room Selection (only if first time) */}
          {isFirstTime && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Başlangıç Odası
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full bg-slate-800 text-white text-sm px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 transition"
              >
                {DEFAULT_ROOMS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.icon} {r.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            {!isFirstTime && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Vazgeç
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition hover:shadow-indigo-600/50"
            >
              <span>{isFirstTime ? 'Sohbete Başla' : 'Değişiklikleri Kaydet'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
