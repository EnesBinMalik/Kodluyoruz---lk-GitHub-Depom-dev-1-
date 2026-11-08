import { Room } from './types';

export const DEFAULT_ROOMS: Room[] = [
  {
    id: 'Genel Sohbet',
    name: 'Genel Sohbet',
    description: 'Herkesin buluştuğu ana sohbet odası.',
    icon: '💬',
    badge: 'Popüler',
  },
  {
    id: 'Yazılım & Kodlama',
    name: 'Yazılım & Kodlama',
    description: 'React, Node.js, WebSockets ve güncel teknolojiler.',
    icon: '💻',
    badge: 'Aktif',
  },
  {
    id: 'Tasarım & UI/UX',
    name: 'Tasarım & UI/UX',
    description: 'Arayüz tasarımı, Tailwind, animasyonlar ve estetik.',
    icon: '🎨',
  },
  {
    id: 'Oyun & Eğlence',
    name: 'Oyun & Eğlence',
    description: 'Oyun dünyası, tavsiyeler ve keyifli sohbetler.',
    icon: '🎮',
  },
  {
    id: 'Müzik & Sinema',
    name: 'Müzik & Sinema',
    description: 'Şarkı paylaşımları, film ve dizi kritikleri.',
    icon: '🎵',
  },
];

export const AVATAR_OPTIONS = [
  '⚡', '🚀', '🔥', '🦁', '🦊', '🦉', '👾', '🌟', 
  '💎', '☕', '🎧', '🎯', '🌈', '🐺', '🐬', '🍀'
];

export const COLOR_OPTIONS = [
  { name: 'İndigo', value: '#6366f1' },
  { name: 'Mor', value: '#8b5cf6' },
  { name: 'Zümrüt', value: '#10b981' },
  { name: 'Gül', value: '#f43f5e' },
  { name: 'Kehribar', value: '#f59e0b' },
  { name: 'Cam Göbeği', value: '#06b6d4' },
];

export const QUICK_EMOJIS = ['👍', '❤️', '🔥', '😂', '🎉', '🚀', '👏', '👀'];
