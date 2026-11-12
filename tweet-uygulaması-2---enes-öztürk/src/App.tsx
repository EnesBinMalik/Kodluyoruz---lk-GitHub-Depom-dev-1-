/**
 * @license
 * Tweet Uygulaması 2 - Ana Uygulama (Root Component)
 * OOP ve MVC Mimarisi İle Geliştirilmiştir.
 * Geliştirici: Enes Öztürk
 */

import React, { useState, useEffect } from 'react';
import { AppController } from './controllers/AppController';
import { Navbar } from './components/Navbar';
import { ArchitectureModal } from './components/ArchitectureModal';
import { HomeTimelineView } from './views/HomeTimelineView';
import { ProfileView } from './views/ProfileView';
import { FriendRequestsView } from './views/FriendRequestsView';
import { MembersDirectoryView } from './views/MembersDirectoryView';
import { AuthView } from './views/AuthView';
import { User } from './models/User';

export default function App() {
  const app = AppController.getInstance();

  const [currentUser, setCurrentUser] = useState<User | null>(app.getCurrentUser());
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    currentUser ? currentUser.id : 'usr_enes_ozturk'
  );
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      localStorage.getItem('tweet_app2_theme') === 'dark' ||
      (!('tweet_app2_theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  // Tema Senkronizasyonu
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tweet_app2_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tweet_app2_theme', 'light');
    }
  }, [isDark]);

  // Oturum ve Model Durumu Dinleyicisi
  useEffect(() => {
    const unsub = app.subscribe(() => {
      const user = app.getCurrentUser();
      setCurrentUser(user);
      if (user && activeTab === 'auth') {
        setActiveTab('feed');
      }
    });
    return () => unsub();
  }, [activeTab]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleNavigateToProfile = (userId: string) => {
    setSelectedProfileId(userId);
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* 3 Bölgeli Top Bar Navigasyonu */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onNavigateToProfile={handleNavigateToProfile}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Ana Gövde */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {!currentUser || activeTab === 'auth' ? (
          /* Proje Şartı: Kayıtlı olmayan kullanıcılar tweet okuyamaz (Auth Wall) */
          <AuthView
            onSuccessAuth={() => {
              setActiveTab('feed');
              const usr = app.getCurrentUser();
              if (usr) setSelectedProfileId(usr.id);
            }}
            onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
          />
        ) : (
          /* Kayıtlı Kullanıcı Görünümleri */
          <>
            {activeTab === 'feed' && (
              <HomeTimelineView
                onNavigateToProfile={handleNavigateToProfile}
                onNavigateToMembers={() => setActiveTab('members')}
                onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
              />
            )}

            {activeTab === 'members' && (
              <MembersDirectoryView
                onNavigateToProfile={handleNavigateToProfile}
                onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
              />
            )}

            {activeTab === 'requests' && (
              <FriendRequestsView
                onNavigateToProfile={handleNavigateToProfile}
                onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                userId={selectedProfileId}
                onNavigateToProfile={handleNavigateToProfile}
                onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* OOP ve MVC Mimari Rapor Modalı */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}
