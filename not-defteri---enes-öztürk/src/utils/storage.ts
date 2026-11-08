import { Note } from '../types/note';

const STORAGE_KEY = 'enes_ozturk_notlar_v1';
const THEME_KEY = 'enes_ozturk_theme_v1';

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    title: '📌 Proje 1 - Not Tutma Uygulaması Tamamlandı',
    content: 'Tüm isterler eksiksiz yerine getirildi:\n• Yeni not oluşturma\n• Mevcut notu düzenleme\n• Not silme (ve geri alma)\n• Sayfa/tarayıcı kapansa bile LocalStorage ile kalıcı veri koruma\n• Enes Öztürk imzası eklendi.',
    category: 'İş & Proje',
    color: 'amber',
    isPinned: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    tags: ['proje', 'react', 'ödev']
  },
  {
    id: 'note-2',
    title: '💡 Gelecek Özellik Fikirleri',
    content: '1. Notları JSON yedeği olarak dışa/içe aktarma\n2. Renk paletine göre filtreleme\n3. Hızlı Markdown veya kontrol listesi desteği\n4. Gece/Gündüz (Karanlık mod) geçişi',
    category: 'Fikirler',
    color: 'sky',
    isPinned: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    tags: ['fikir', 'roadmap']
  },
  {
    id: 'note-3',
    title: '🛒 Haftalık Alışveriş Listesi',
    content: '- Organik kahve çekirdeği\n- Yulaf ezmesi ve badem sütü\n- Taze mevsim meyveleri\n- Not defteri ve 0.5mm siyah jel kalem',
    category: 'Alışveriş',
    color: 'emerald',
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    tags: ['market', 'ev']
  },
  {
    id: 'note-4',
    title: '📚 Haftalık Okuma & Araştırma',
    content: 'JavaScript Clean Code prensipleri ve React 19 mimarisi üzerine teknik makaleleri incele. LocalStorage kota yönetimi ve veri serileştirme pratiklerini gözden geçir.',
    category: 'Ders & Eğitim',
    color: 'purple',
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    tags: ['eğitim', 'okuma']
  }
];

export function getStoredNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveStoredNotes(INITIAL_NOTES);
      return INITIAL_NOTES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_NOTES;
  } catch (error) {
    console.error('LocalStorage notları okurken hata oluştu:', error);
    return INITIAL_NOTES;
  }
}

export function saveStoredNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('LocalStorage notları kaydederken hata oluştu:', error);
  }
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Tema kaydedilemedi:', error);
  }
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch {
    return isoString;
  }
}
