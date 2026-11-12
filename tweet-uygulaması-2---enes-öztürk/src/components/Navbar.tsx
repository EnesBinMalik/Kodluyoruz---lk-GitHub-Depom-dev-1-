/**
 * @license
 * Navigasyon Çubuğu Bileşeni (Top Bar Contract: 3 Bölge)
 * Geliştirici: Enes Öztürk
 */

import React, { useState } from 'react';
import {
  Home,
  Users,
  Bell,
  Code2,
  User as UserIcon,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { AppController } from '../controllers/AppController';
import { User } from '../models/User';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenArchitecture: () => void;
  onNavigateToProfile: (userId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenArchitecture,
  onNavigateToProfile,
  isDark,
  onToggleTheme,
}) => {
  const app = AppController.getInstance();
  const currentUser = app.getCurrentUser();
  const incomingCount = app.getPendingIncomingCount();
  const allMembers = app.getAllMembers();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSwitchUser = (userId: string) => {
    app.auth.switchUser(userId);
    setShowUserDropdown(false);
  };

  const handleLogout = () => {
    app.auth.logout();
    setShowUserDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-8">
        {/* Bölge 1: Marka & Başlık (Single line wordmark) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('feed')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              T2
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
                Tweet 2
              </span>
              <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Enes Öztürk İmzalı
              </span>
            </div>
          </button>
        </div>

        {/* Bölge 2: 4-5 Temiz Tek Satırlı Link */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onSelectTab('feed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Akış</span>
          </button>

          <button
            onClick={() => onSelectTab('members')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'members'
                ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Üyeler</span>
          </button>

          {currentUser && (
            <button
              onClick={() => onSelectTab('requests')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'requests'
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>İstekler</span>
              {incomingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                  {incomingCount}
                </span>
              )}
            </button>
          )}

          {currentUser && (
            <button
              onClick={() => onNavigateToProfile(currentUser.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profilim</span>
            </button>
          )}

          <button
            onClick={onOpenArchitecture}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>OOP & MVC</span>
          </button>
        </nav>

        {/* Bölge 3: Birincil Aksiyon & Kullanıcı Paneli */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Karanlık/Aydınlık Tema Butonu */}
          <button
            onClick={onToggleTheme}
            aria-label="Temayı Değiştir"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {currentUser ? (
            <div className="relative">
              {/* Aktif Kullanıcı Kartı & Hesap Değiştirici */}
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-sky-500"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[100px]">
                      {currentUser.name}
                    </span>
                    {currentUser.username === 'enes' && (
                      <ShieldCheck className="w-3 h-3 text-sky-500" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">@{currentUser.username}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Açılır Hesap Değiştirici Menüsü (Demo ve Gerçek Kullanım için) */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Aktif Hesap
                    </div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                      {currentUser.name} (@{currentUser.username})
                    </div>
                  </div>

                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                    Hesap Değiştir (Demo Test)
                  </div>

                  <div className="max-h-48 overflow-y-auto py-1">
                    {allMembers.map(member => (
                      <button
                        key={member.id}
                        onClick={() => handleSwitchUser(member.id)}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                          member.id === currentUser.id ? 'bg-sky-50/50 dark:bg-sky-950/30' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover shrink-0"
                          />
                          <span className="truncate text-slate-700 dark:text-slate-300">
                            {member.name}
                          </span>
                        </div>
                        {member.id === currentUser.id ? (
                          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
                            Aktif
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">@{member.username}</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Oturumu Kapat</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onSelectTab('auth')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              Giriş / Kayıt Ol
            </button>
          )}
        </div>
      </div>

      {/* Mobil Alt Çubuk Navigasyonu */}
      <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => onSelectTab('feed')}
          className={`p-2 rounded-lg ${
            activeTab === 'feed' ? 'text-sky-600' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
        </button>
        <button
          onClick={() => onSelectTab('members')}
          className={`p-2 rounded-lg ${
            activeTab === 'members' ? 'text-sky-600' : 'text-slate-500'
          }`}
        >
          <Users className="w-5 h-5" />
        </button>
        {currentUser && (
          <button
            onClick={() => onSelectTab('requests')}
            className={`p-2 rounded-lg relative ${
              activeTab === 'requests' ? 'text-sky-600' : 'text-slate-500'
            }`}
          >
            <Bell className="w-5 h-5" />
            {incomingCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        )}
        {currentUser && (
          <button
            onClick={() => onNavigateToProfile(currentUser.id)}
            className={`p-2 rounded-lg ${
              activeTab === 'profile' ? 'text-sky-600' : 'text-slate-500'
            }`}
          >
            <UserIcon className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onOpenArchitecture}
          className="p-2 rounded-lg text-indigo-600"
        >
          <Code2 className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
