import { ProjectItem } from '../types';

export interface LevelGroup {
  level: 1 | 2 | 3;
  title: string;
  badge: string;
  projects: ProjectItem[];
}

export const COURSE_LEVELS: LevelGroup[] = [
  {
    level: 1,
    title: "1'nci Seviye Projeler",
    badge: 'Temel Seviye',
    projects: [
      {
        id: 'bmi',
        title: 'Vücut Kitle Endeksi Hesaplama',
        level: 1,
        status: 'completed',
        description: 'Kullanıcı boy ve kilo girdilerine göre vücut kitle endeksini hesaplayan interaktif araç.',
      },
      {
        id: 'ecommerce',
        title: 'E-ticaret (Kıyafetler)',
        level: 1,
        status: 'completed',
        description: 'Ürün listeleme, sepet yönetimi ve filtreleme özellikli giyim mağazası arayüzü.',
      },
      {
        id: 'notes',
        title: 'Not Tutma Uygulaması',
        level: 1,
        status: 'completed',
        description: 'CRUD operasyonları ve yerel depolama destekli minimalist not alma uygulaması.',
      },
      {
        id: 'portfolio',
        title: 'Portföy Sitesi',
        level: 1,
        status: 'completed',
        description: 'Modern tasarımlı, duyarlı ve etkileşimli kişisel geliştirici portföy web sitesi.',
      },
    ],
  },
  {
    level: 2,
    title: "2'nci Seviye Projeler",
    badge: 'Orta Seviye',
    projects: [
      {
        id: 'chat',
        title: 'Chat Uygulaması',
        level: 2,
        status: 'completed',
        description: 'Gerçek zamanlı mesajlaşma, oda yönetimi ve durum göstergeli sohbet arayüzü.',
      },
      {
        id: 'crypto',
        title: 'Kripto Para',
        level: 2,
        status: 'completed',
        description: 'Canlı fiyat verileri, piyasa grafikleri ve para birimi dönüştürücülü kripto paneli.',
      },
      {
        id: 'memory-game',
        title: 'Proje 3 - Hafıza Oyunu',
        level: 2,
        status: 'active',
        description: '4x3 matris üzerinde 12 kartlık hafıza oyunu. Hamle takibi, en iyi skor (localStorage) ve Enes Öztürk imzası.',
      },
      {
        id: 'book-search',
        title: 'Kitap Arama Uygulaması',
        level: 2,
        status: 'completed',
        description: 'API entegrasyonlu, favorilere ekleme ve detay sayfalı dinamik kütüphane arama motoru.',
      },
    ],
  },
  {
    level: 3,
    title: "3'üncü Seviye Projeler",
    badge: 'İleri Seviye',
    projects: [
      {
        id: 'rps',
        title: 'Taş Kağıt Makas Oyunu',
        level: 3,
        status: 'completed',
        description: 'Yapay zeka rakibine karşı animasyonlu ve skor tablolu klasik el oyunu.',
      },
      {
        id: 'form-builder',
        title: 'Form Oluşturucu',
        level: 3,
        status: 'completed',
        description: 'Sürükle-bırak destekli, özel doğrulama kurallı dinamik form mimarisi.',
      },
    ],
  },
];
