import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { INITIAL_USERS } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  isGuest: boolean;
  login: (username: string, password?: string) => { success: boolean; error?: string };
  register: (data: { username: string; name: string; password?: string; avatar?: string; bio?: string }) => { success: boolean; error?: string };
  logout: () => void;
  switchUser: (username: string) => void;
  setGuestMode: () => void;
  authModalOpen: boolean;
  authModalTab: 'login' | 'register';
  authModalMessage: string;
  openAuthModal: (tab?: 'login' | 'register', message?: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'tweet_app_users_v1';
const CURRENT_USER_STORAGE_KEY = 'tweet_app_current_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading users from localStorage', e);
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (saved === 'guest') {
        return null;
      }
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading current user from localStorage', e);
    }
    // Default to Enes Öztürk so tester immediately has a high quality experience
    return INITIAL_USERS[0];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [authModalMessage, setAuthModalMessage] = useState('');

  // Persist users
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to localStorage', e);
    }
  }, [users]);

  // Persist current user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, 'guest');
      }
    } catch (e) {
      console.error('Error saving current user to localStorage', e);
    }
  }, [currentUser]);

  const login = (username: string, password?: string) => {
    const cleanUsername = username.trim().toLowerCase().replace(/^@/, '');
    const found = users.find(u => u.username.toLowerCase() === cleanUsername);

    if (!found) {
      return { success: false, error: 'Bu kullanıcı adına sahip bir hesap bulunamadı.' };
    }

    if (password && found.password && found.password !== password) {
      return { success: false, error: 'Girilen şifre hatalı, lütfen tekrar deneyin.' };
    }

    setCurrentUser(found);
    setAuthModalOpen(false);
    return { success: true };
  };

  const register = (data: { username: string; name: string; password?: string; avatar?: string; bio?: string }) => {
    const cleanUsername = data.username.trim().toLowerCase().replace(/^@/, '');
    const cleanName = data.name.trim();

    if (!cleanUsername) {
      return { success: false, error: 'Lütfen bir kullanıcı adı girin.' };
    }
    if (!cleanName) {
      return { success: false, error: 'Lütfen adınızı ve soyadınızı girin.' };
    }
    if (!data.password || data.password.length < 4) {
      return { success: false, error: 'Şifreniz en az 4 karakter olmalıdır.' };
    }

    const existing = users.find(u => u.username.toLowerCase() === cleanUsername);
    if (existing) {
      return { success: false, error: 'Bu kullanıcı adı zaten alınmış. Farklı bir ad deneyin.' };
    }

    const defaultAvatars = [
      '/src/assets/images/avatar_enes_ozturk_1794247644235.jpg',
      '/src/assets/images/avatar_tech_designer_1794247644519.jpg',
      '/src/assets/images/avatar_tech_dev_1794247644112.jpg',
    ];
    const chosenAvatar = data.avatar || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const newUser: User = {
      id: `user_${Date.now()}`,
      username: cleanUsername,
      name: cleanName,
      password: data.password,
      avatar: chosenAvatar,
      bio: data.bio || 'Tweet Uygulaması kullanıcısı ✨',
      joinedDate: 'Şimdi',
      isVerified: false,
      followingCount: 0,
      followersCount: 0,
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const setGuestMode = () => {
    setCurrentUser(null);
  };

  const switchUser = (username: string) => {
    const clean = username.trim().toLowerCase().replace(/^@/, '');
    const found = users.find(u => u.username.toLowerCase() === clean);
    if (found) {
      setCurrentUser(found);
    }
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login', message: string = '') => {
    setAuthModalTab(tab);
    setAuthModalMessage(message);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthModalMessage('');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isGuest: currentUser === null,
        login,
        register,
        logout,
        switchUser,
        setGuestMode,
        authModalOpen,
        authModalTab,
        authModalMessage,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
