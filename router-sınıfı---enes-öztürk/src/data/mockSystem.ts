/**
 * ============================================================================
 * Müşteri Yönetim Sistemi (MYS) - Mock Veritabanı ve Kontrolcüler
 * Router Sınıfı ile Tam Entegre Çalışan Canlı Simülasyon Motoru
 * @author Enes Öztürk
 * ============================================================================
 */

import { Router, RequestContext } from '../router/Router';

export interface Customer {
  id: number;
  ad: string;
  sirket: string;
  email: string;
  telefon: string;
  sehir: string;
  bakiye: number;
  durum: 'Aktif' | 'Pasif' | 'Beklemede';
  kayitTarihi: string;
  notlar: string;
}

export interface Invoice {
  id: number;
  musteriId: number;
  faturaNo: string;
  tutar: number;
  tarih: string;
  durum: 'Ödendi' | 'Bekliyor' | 'Gecikmiş';
}

// Başlangıç Verileri
const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 1,
    ad: 'Ahmet Yılmaz',
    sirket: 'Yılmaz Lojistik A.Ş.',
    email: 'ahmet@yilmazlojistik.com',
    telefon: '+90 532 555 1010',
    sehir: 'İstanbul',
    bakiye: 45200.0,
    durum: 'Aktif',
    kayitTarihi: '2026-01-15',
    notlar: 'Düzenli lojistik sevkiyatı yapılıyor. VIP müşteri.',
  },
  {
    id: 2,
    ad: 'Ayşe Kaya',
    sirket: 'Kaya Teknoloji Yazılım',
    email: 'ayse@kayatech.io',
    telefon: '+90 544 333 2020',
    sehir: 'Ankara',
    bakiye: 18750.5,
    durum: 'Aktif',
    kayitTarihi: '2026-02-04',
    notlar: 'Bulut altyapı hizmeti satın alındı.',
  },
  {
    id: 3,
    ad: 'Mehmet Demir',
    sirket: 'Demir İnşaat & Taahhüt',
    email: 'mehmet@demirinsaat.com.tr',
    telefon: '+90 505 888 3030',
    sehir: 'İzmir',
    bakiye: 92000.0,
    durum: 'Aktif',
    kayitTarihi: '2026-02-20',
    notlar: 'Şantiye proje sözleşmesi devam ediyor.',
  },
  {
    id: 4,
    ad: 'Zeynep Çelik',
    sirket: 'Çelik Mimarlık Ofisi',
    email: 'zeynep@celikmimarlik.com',
    telefon: '+90 533 777 4040',
    sehir: 'Bursa',
    bakiye: 8400.0,
    durum: 'Beklemede',
    kayitTarihi: '2026-03-01',
    notlar: 'Fatura ödeme vadesi bekleniyor.',
  },
  {
    id: 5,
    ad: 'Caner Öz',
    sirket: 'Öz Medya & Pazarlama',
    email: 'caner@ozmedya.com',
    telefon: '+90 542 999 5050',
    sehir: 'Antalya',
    bakiye: 0.0,
    durum: 'Pasif',
    kayitTarihi: '2026-03-10',
    notlar: 'Sezonluk kampanya sonlandı.',
  },
];

const INITIAL_INVOICES: Invoice[] = [
  { id: 101, musteriId: 1, faturaNo: 'FTR-2026-001', tutar: 22000, tarih: '2026-02-01', durum: 'Ödendi' },
  { id: 102, musteriId: 1, faturaNo: 'FTR-2026-042', tutar: 23200, tarih: '2026-03-01', durum: 'Bekliyor' },
  { id: 103, musteriId: 2, faturaNo: 'FTR-2026-018', tutar: 18750.5, tarih: '2026-02-15', durum: 'Ödendi' },
  { id: 104, musteriId: 3, faturaNo: 'FTR-2026-089', tutar: 92000, tarih: '2026-03-05', durum: 'Bekliyor' },
];

export class SystemStore {
  public static customers: Customer[] = [...INITIAL_CUSTOMERS];
  public static invoices: Invoice[] = [...INITIAL_INVOICES];
  public static listeners: (() => void)[] = [];

  public static subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  public static notify(): void {
    this.listeners.forEach((fn) => fn());
  }

  public static reset(): void {
    this.customers = [...INITIAL_CUSTOMERS];
    this.invoices = [...INITIAL_INVOICES];
    this.notify();
  }
}

/**
 * MusteriController
 * Class@Method çağrımları için Müşteri Yönetim Sistemi Denetleyicisi
 */
export class MusteriController {
  /**
   * Tüm müşterileri listeler
   * GET /musteri
   */
  public index(_req?: RequestContext) {
    return {
      status: 'success',
      action: 'MusteriController@index',
      total: SystemStore.customers.length,
      customers: [...SystemStore.customers],
      author: Router.AUTHOR,
    };
  }

  /**
   * Müşteri detayını gösterir
   * GET /musteri/detay/([0-9]+)
   */
  public detay(idStr: string, _req?: RequestContext) {
    const id = parseInt(idStr, 10);
    const customer = SystemStore.customers.find((c) => c.id === id);
    if (!customer) {
      return {
        status: 'error',
        message: `ID ${id} numaralı müşteri bulunamadı.`,
        action: 'MusteriController@detay',
        id,
      };
    }
    const customerInvoices = SystemStore.invoices.filter((inv) => inv.musteriId === id);
    return {
      status: 'success',
      action: 'MusteriController@detay',
      customer,
      invoices: customerInvoices,
      author: Router.AUTHOR,
    };
  }

  /**
   * Yeni müşteri ekler (POST isteği)
   * POST /musteri/ekle
   */
  public ekle(req?: RequestContext) {
    const data = req?.body || {};
    const newId = SystemStore.customers.reduce((max, c) => Math.max(max, c.id), 0) + 1;
    const newCustomer: Customer = {
      id: newId,
      ad: data.ad || 'İsimsiz Müşteri',
      sirket: data.sirket || 'Bilinmeyen Şirket',
      email: data.email || `musteri${newId}@mys.com`,
      telefon: data.telefon || '+90 555 000 0000',
      sehir: data.sehir || 'İstanbul',
      bakiye: Number(data.bakiye) || 0,
      durum: data.durum || 'Aktif',
      kayitTarihi: new Date().toISOString().split('T')[0],
      notlar: data.notlar || 'Router POST isteği ile kaydedildi.',
    };

    SystemStore.customers.unshift(newCustomer);
    SystemStore.notify();

    return {
      status: 'created',
      statusCode: 201,
      message: 'Yeni müşteri başarıyla eklendi.',
      action: 'MusteriController@ekle',
      createdCustomer: newCustomer,
      author: Router.AUTHOR,
    };
  }

  /**
   * Müşteri günceller (Regex ID + POST isteği)
   * POST /musteri/guncelle/([0-9]+)
   */
  public guncelle(idStr: string, req?: RequestContext) {
    const id = parseInt(idStr, 10);
    const index = SystemStore.customers.findIndex((c) => c.id === id);
    if (index === -1) {
      return {
        status: 'error',
        message: `ID ${id} numaralı müşteri güncellenemedi, kayıt yok.`,
      };
    }

    const updates = req?.body || {};
    SystemStore.customers[index] = {
      ...SystemStore.customers[index],
      ...updates,
      id, // koru
    };
    SystemStore.notify();

    return {
      status: 'success',
      message: `ID ${id} nolu müşteri başarıyla güncellendi.`,
      action: 'MusteriController@guncelle',
      updatedCustomer: SystemStore.customers[index],
      author: Router.AUTHOR,
    };
  }

  /**
   * Müşteri siler
   * POST /musteri/sil/([0-9]+)
   */
  public sil(idStr: string, _req?: RequestContext) {
    const id = parseInt(idStr, 10);
    const exists = SystemStore.customers.some((c) => c.id === id);
    if (!exists) {
      return { status: 'error', message: 'Müşteri bulunamadı.' };
    }
    SystemStore.customers = SystemStore.customers.filter((c) => c.id !== id);
    SystemStore.notify();
    return {
      status: 'success',
      message: `ID ${id} nolu müşteri kaydı silindi.`,
      action: 'MusteriController@sil',
      author: Router.AUTHOR,
    };
  }

  /**
   * Regex ile arama yapar: GET /musteri/ara/([a-zA-Z0-9_-]+)
   */
  public ara(slug: string, _req?: RequestContext) {
    const query = decodeURIComponent(slug).toLowerCase();
    const results = SystemStore.customers.filter(
      (c) =>
        c.ad.toLowerCase().includes(query) ||
        c.sirket.toLowerCase().includes(query) ||
        c.sehir.toLowerCase().includes(query)
    );
    return {
      status: 'success',
      action: 'MusteriController@ara',
      searchTerm: slug,
      matchCount: results.length,
      results,
      author: Router.AUTHOR,
    };
  }
}

/**
 * FaturaController
 */
export class FaturaController {
  /**
   * Çoklu regex parametresi: GET /musteri/{id:[0-9]+}/fatura/{faturaId:[0-9]+}
   */
  public detay(musteriIdStr: string, faturaIdStr: string, _req?: RequestContext) {
    const musteriId = parseInt(musteriIdStr, 10);
    const faturaId = parseInt(faturaIdStr, 10);
    const customer = SystemStore.customers.find((c) => c.id === musteriId);
    const invoice = SystemStore.invoices.find((i) => i.id === faturaId && i.musteriId === musteriId);

    return {
      status: invoice ? 'success' : 'warning',
      action: 'FaturaController@detay',
      musteriId,
      faturaId,
      customer: customer || null,
      invoice: invoice || { message: 'Bu müşteriye ait belirtilen ID ile fatura bulunamadı.' },
      author: Router.AUTHOR,
    };
  }

  /**
   * POST /musteri/{id:[0-9]+}/fatura-kes
   */
  public kes(musteriIdStr: string, req?: RequestContext) {
    const musteriId = parseInt(musteriIdStr, 10);
    const data = req?.body || {};
    const newId = SystemStore.invoices.reduce((max, i) => Math.max(max, i.id), 0) + 1;
    const newInvoice: Invoice = {
      id: newId,
      musteriId,
      faturaNo: `FTR-2026-0${newId}`,
      tutar: Number(data.tutar) || 5000,
      tarih: new Date().toISOString().split('T')[0],
      durum: data.durum || 'Bekliyor',
    };
    SystemStore.invoices.push(newInvoice);
    SystemStore.notify();

    return {
      status: 'created',
      message: `ID ${musteriId} nolu müşteriye fatura düzenlendi.`,
      action: 'FaturaController@kes',
      invoice: newInvoice,
      author: Router.AUTHOR,
    };
  }
}

/**
 * Router'ı başlangıç rotaları ve controller'lar ile hazırlar
 */
export function initializeSystemRoutes(): void {
  Router.clear();

  // Controller'ları kaydet
  const musteriController = new MusteriController();
  const faturaController = new FaturaController();

  Router.registerController('MusteriController', musteriController);
  Router.registerController('FaturaController', faturaController);

  // 1. GET Rotaları - Class@Method
  Router.get('/musteri', 'MusteriController@index', 'Müşteri listesini getirir');
  Router.get('/musteri/detay/([0-9]+)', 'MusteriController@detay', 'Regex ile ID parametreli müşteri detayı');
  Router.get('/musteri/ara/([a-zA-Z0-9_-]+)', 'MusteriController@ara', 'Regex arama terimi ile müşteri filtreleme');
  Router.get(
    '/musteri/{id:[0-9]+}/fatura/{faturaId:[0-9]+}',
    'FaturaController@detay',
    'Çoklu regex parametresiyle müşteri faturası detayı'
  );

  // 2. POST Rotaları - Class@Method
  Router.post('/musteri/ekle', 'MusteriController@ekle', 'Yeni müşteri ekler (JSON body kabul eder)');
  Router.post(
    '/musteri/guncelle/([0-9]+)',
    'MusteriController@guncelle',
    'Müşteri bilgilerini günceller (Regex ID + POST)'
  );
  Router.post('/musteri/sil/([0-9]+)', 'MusteriController@sil', 'Müşteri kaydını siler');
  Router.post(
    '/musteri/{id:[0-9]+}/fatura-kes',
    'FaturaController@kes',
    'Müşteriye yeni fatura düzenler'
  );

  // 3. GET Callback Rotaları
  Router.get('/sistem/durum', (params, req) => {
    return {
      status: 'online',
      system: 'Müşteri Yönetim Sistemi (MYS)',
      routerVersion: Router.VERSION,
      author: Router.AUTHOR,
      uptime: '99.98%',
      requestTime: req.timestamp,
      registeredRoutesCount: Router.getAllRoutesFlat().length,
      activeCustomers: SystemStore.customers.length,
      description: 'Callback fonksiyonu ile üretilen sistem durum yanıtı.',
    };
  }, 'Callback ile sistem sağlık ve durum bilgisi');

  Router.get('/api/v1/versiyon', () => {
    return {
      name: 'Müşteri Yönetim Sistemi API',
      version: 'v2.4.0',
      engine: 'Custom Regex Router Engine',
      author: Router.AUTHOR,
      copyright: '© 2026 Enes Öztürk',
    };
  }, 'Callback ile API versiyon bilgisi');

  // 4. POST Callback Rotaları
  Router.post('/sistem/log', (params, req) => {
    return {
      status: 'logged',
      message: 'Sistem log kaydı oluşturuldu.',
      receivedPayload: req.body,
      processedBy: 'Anonim Callback Handler',
      author: Router.AUTHOR,
      timestamp: new Date().toISOString(),
    };
  }, 'Callback ile log kaydetme rotası');
}
