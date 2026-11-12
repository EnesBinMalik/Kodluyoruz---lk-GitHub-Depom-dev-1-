import { Product } from '../types';

export const CATEGORIES = [
  'Tümü',
  'Ses & Müzik',
  'Akıllı Cihazlar',
  'Masa & Ofis',
  'Mutfak & Yaşam',
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Apex Pro ANC Kablosuz Kulaklık',
    brand: 'Apex Audio',
    category: 'Ses & Müzik',
    price: 4899,
    originalPrice: 5999,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Aktif gürültü engelleme (ANC), 40 saat pil ömrü, ultra konforlu hafızalı köpük kulak yastıkları ve stüdyo kalitesinde akustik sürücüler.',
    features: [
      'Gelişmiş Aktif Gürültü Engelleme (ANC)',
      '40 Saat Kesintisiz Çalma Süresi',
      'Yüksek Çözünürlüklü LDAC & AAC Kodek',
      'Hızlı Şarj: 10 dk şarj ile 4 saat dinleme'
    ],
    image: '/src/assets/images/product_headphones_1794247187353.jpg',
    inStock: true,
    badge: 'En Çok Satan'
  },
  {
    id: 'prod-2',
    name: 'Titanium Chrono Akıllı Saat & Nabız Takip',
    brand: 'Chrono Tech',
    category: 'Akıllı Cihazlar',
    price: 6450,
    originalPrice: 7200,
    rating: 4.8,
    reviewsCount: 89,
    description: 'Hafif titanyum kasa, safir kristal cam, EKG ve kandaki oksijen takibi, su geçirmezlik ve 14 günlük uzun pil ömrü.',
    features: [
      'Havacılık Sınıfı Titanyum Gövde',
      'AMOLED Her Zaman Açık Ekran',
      'Gelişmiş Kalp & Uyku Takip Sensörleri',
      '50 Metreye Kadar Suya Dayanıklı'
    ],
    image: '/src/assets/images/product_smartwatch_1794247188202.jpg',
    inStock: true,
    badge: 'Editörün Seçimi'
  },
  {
    id: 'prod-3',
    name: 'Barista Uno Paslanmaz Çelik Espresso Makinesi',
    brand: 'Firenze Craft',
    category: 'Mutfak & Yaşam',
    price: 12900,
    originalPrice: 14500,
    rating: 5.0,
    reviewsCount: 64,
    description: 'İtalyan tasarımı 15 bar profesyonel basınç pompası, entegre süt köpürtücü çubuk, hızlı termoblok ısıtma sistemi ve kompakt tezgah yapısı.',
    features: [
      '15 Bar Yüksek Basınçlı İtalyan Pompa',
      'Gıda Sınıfı Fırçalanmış Paslanmaz Çelik',
      'Mikro Köpük Profesyonel Buhar Çubuğu',
      '45 Saniyede Kullanıma Hazır Isınma'
    ],
    image: '/src/assets/images/product_espresso_1794247189334.jpg',
    inStock: true,
    badge: 'Premium Kalite'
  },
  {
    id: 'prod-4',
    name: 'Lumbar Custom Mekanik Klavye (Gateron Yellow)',
    brand: 'Lumbar Studio',
    category: 'Masa & Ofis',
    price: 3650,
    originalPrice: 4200,
    rating: 4.9,
    reviewsCount: 118,
    description: 'CNC alüminyum gövde, çalışırken değiştirilebilir (hot-swap) anahtarlar, PBT tuş kapakları ve çok katmanlı ses sönümleyici silikon conta tasarımı.',
    features: [
      'Hot-Swappable PCB Mekanizması',
      'Fabrika Yağlamalı Lineer Anahtarlar',
      'Çift Vuruşlu Dayanıklı PBT Tuşlar',
      'Bluetooth 5.2, 2.4Ghz ve Type-C Bağlantı'
    ],
    image: '/src/assets/images/product_keyboard_1794247189114.jpg',
    inStock: true,
    badge: 'Yeni Sezon'
  },
  {
    id: 'prod-5',
    name: 'Aura Çift Katmanlı Vakumlu Termos Matara (750ml)',
    brand: 'Aura Flask',
    category: 'Mutfak & Yaşam',
    price: 890,
    originalPrice: 1100,
    rating: 4.7,
    reviewsCount: 230,
    description: '18/8 paslanmaz çelik, içecekleri 24 saat soğuk ve 12 saat sıcak tutan çift duvarlı vakum yalıtımı, sızdırmaz emniyetli kapak.',
    features: [
      '24 Saat Soğuk / 12 Saat Sıcak Tutma',
      'BPA ve Ftalat İçermeyen Güvenli Malzeme',
      'Çizilmeye Karşı Mat Toz Boya Kaplama',
      'Kolay Taşınabilir Ergonomik Askı'
    ],
    image: '/src/assets/images/hero_store_banner_1794247187365.jpg',
    inStock: true,
    badge: 'Fırsat Ürünü'
  },
  {
    id: 'prod-6',
    name: 'Nordic Hakiki Deri Masa Matı & Pad (80x40cm)',
    brand: 'Nordic Craft',
    category: 'Masa & Ofis',
    price: 1450,
    originalPrice: 1750,
    rating: 4.8,
    reviewsCount: 75,
    description: 'Birinci sınıf dana derisi, suya ve lekeye dayanıklı koruyucu finisaj, optik fareler için kusursuz kayma yüzeyi ve dikişli kenarlar.',
    features: [
      'Hakiki Kaliteli Bitkisel Tabaklanmış Deri',
      'Kaymaz Süet Alt Taban',
      'Suya Karşı Dayanıklı Koruyucu Yüzey',
      'Geniş 80x40 cm Konfor Alanı'
    ],
    image: '/src/assets/images/product_keyboard_1794247189114.jpg',
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Nova 10.000 mAh MagSafe Hızlı Şarj Cihazı',
    brand: 'Nova Power',
    category: 'Akıllı Cihazlar',
    price: 1850,
    originalPrice: 2200,
    rating: 4.6,
    reviewsCount: 92,
    description: 'Güçlü manyetik tutuş, 15W kablosuz ve 20W PD Type-C hızlı şarj desteği, ultra ince alüminyum gövde.',
    features: [
      'Manyetik Güçlü MagSafe Uyumu',
      '20W Power Delivery Hızlı Şarj',
      'Akıllı Sıcaklık ve Aşırı Akım Koruması',
      'Cepte Kolay Taşınabilir İnce Profil'
    ],
    image: '/src/assets/images/product_smartwatch_1794247188202.jpg',
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Studio Hi-Fi Masaüstü Referans Hoparlör Çifti',
    brand: 'Apex Audio',
    category: 'Ses & Müzik',
    price: 7800,
    originalPrice: 9100,
    rating: 4.9,
    reviewsCount: 51,
    description: 'Doğal ahşap rezonans kabini, ipek kubbe tweeter, derin bas tepkisi ve optik + Bluetooth 5.0 çoklu giriş seçeneği.',
    features: [
      'Kevlar Sürücülü Güçlü Bas Üretimi',
      'Dahili D-Sınıfı 80W RMS Amfi',
      'Düşük Gecikmeli Kablosuz Bağlantı',
      'Akustik Ayarlı Ahşap Muhafaza'
    ],
    image: '/src/assets/images/product_headphones_1794247187353.jpg',
    inStock: true,
    badge: 'Stüdyo Sınıfı'
  }
];

export const HERO_IMAGE = '/src/assets/images/hero_store_banner_1794247187365.jpg';

// Format currency as Turkish Lira (₺)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0
  }).format(amount);
}
