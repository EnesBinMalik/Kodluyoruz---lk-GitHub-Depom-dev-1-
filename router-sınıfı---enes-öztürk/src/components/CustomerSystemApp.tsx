import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Eye,
  Edit2,
  Trash2,
  Receipt,
  CheckCircle,
  FileText,
  AlertCircle,
  X,
  Phone,
  Mail,
  MapPin,
  Building,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { Router } from '../router/Router';
import { Customer, SystemStore } from '../data/mockSystem';

export const CustomerSystemApp: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customerDetailData, setCustomerDetailData] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRouterTrace, setLastRouterTrace] = useState<{
    method: string;
    uri: string;
    handler: string;
    params: Record<string, string>;
    status: number;
    time: string;
  } | null>(null);

  // Form State for Adding
  const [newFormData, setNewFormData] = useState({
    ad: '',
    sirket: '',
    email: '',
    telefon: '',
    sehir: 'İstanbul',
    bakiye: 15000,
    durum: 'Aktif' as const,
    notlar: '',
  });

  // Müşterileri Router GET /musteri üzerinden yükle
  const loadCustomers = () => {
    const result = Router.dispatch('GET', '/musteri');
    if (result.success && result.response.customers) {
      setCustomers(result.response.customers);
      setLastRouterTrace({
        method: 'GET',
        uri: '/musteri',
        handler: result.handlerName,
        params: result.params,
        status: result.statusCode,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
    }
  };

  useEffect(() => {
    loadCustomers();
    const unsubscribe = SystemStore.subscribe(() => {
      loadCustomers();
    });
    return () => unsubscribe();
  }, []);

  // Müşteri Detayı Aç (GET /musteri/detay/([0-9]+))
  const handleViewDetail = (id: number) => {
    setSelectedCustomerId(id);
    const result = Router.dispatch('GET', `/musteri/detay/${id}`);
    if (result.success) {
      setCustomerDetailData(result.response);
      setLastRouterTrace({
        method: 'GET',
        uri: `/musteri/detay/${id}`,
        handler: result.handlerName,
        params: result.params,
        status: result.statusCode,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
    }
  };

  // Müşteri Arama (GET /musteri/ara/([a-zA-Z0-9_-]+))
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadCustomers();
      return;
    }
    const cleanTerm = searchQuery.trim().replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ_-]/g, '');
    const result = Router.dispatch('GET', `/musteri/ara/${encodeURIComponent(cleanTerm)}`);
    if (result.success && result.response.results) {
      setCustomers(result.response.results);
      setLastRouterTrace({
        method: 'GET',
        uri: `/musteri/ara/${cleanTerm}`,
        handler: result.handlerName,
        params: result.params,
        status: result.statusCode,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
    }
  };

  // Yeni Müşteri Ekle (POST /musteri/ekle)
  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const result = Router.dispatch('POST', '/musteri/ekle', newFormData);
    if (result.success) {
      setIsAddModalOpen(false);
      setNewFormData({
        ad: '',
        sirket: '',
        email: '',
        telefon: '',
        sehir: 'İstanbul',
        bakiye: 15000,
        durum: 'Aktif',
        notlar: '',
      });
      setLastRouterTrace({
        method: 'POST',
        uri: '/musteri/ekle',
        handler: result.handlerName,
        params: result.params,
        status: result.statusCode,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
      loadCustomers();
    }
  };

  // Müşteri Güncelle (POST /musteri/guncelle/([0-9]+))
  const handleUpdateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCustomer) return;

    const result = Router.dispatch('POST', `/musteri/guncelle/${editCustomer.id}`, {
      ad: editCustomer.ad,
      sirket: editCustomer.sirket,
      email: editCustomer.email,
      telefon: editCustomer.telefon,
      sehir: editCustomer.sehir,
      bakiye: editCustomer.bakiye,
      durum: editCustomer.durum,
      notlar: editCustomer.notlar,
    });

    if (result.success) {
      setIsEditModalOpen(false);
      setEditCustomer(null);
      setLastRouterTrace({
        method: 'POST',
        uri: `/musteri/guncelle/${editCustomer.id}`,
        handler: result.handlerName,
        params: result.params,
        status: result.statusCode,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
      loadCustomers();
    }
  };

  // Müşteri Sil (POST /musteri/sil/([0-9]+))
  const handleDeleteCustomer = (id: number) => {
    if (!confirm(`ID ${id} numaralı müşteriyi silmek istediğinize emin misiniz?`)) return;

    const result = Router.dispatch('POST', `/musteri/sil/${id}`);
    if (result.success) {
      setLastRouterTrace({
        method: 'POST',
        uri: `/musteri/sil/${id}`,
        handler: result.handlerName,
        params: result.params,
        status: result.statusCode,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
      if (selectedCustomerId === id) {
        setSelectedCustomerId(null);
        setCustomerDetailData(null);
      }
      loadCustomers();
    }
  };

  // Fatura Kes (POST /musteri/{id}/fatura-kes)
  const handleIssueInvoice = (customerId: number) => {
    const tutar = prompt('Düzenlenecek Fatura Tutarını Giriniz (TL):', '25000');
    if (!tutar) return;

    const result = Router.dispatch('POST', `/musteri/${customerId}/fatura-kes`, {
      tutar: parseFloat(tutar),
      durum: 'Bekliyor',
    });

    if (result.success) {
      setLastRouterTrace({
        method: 'POST',
        uri: `/musteri/${customerId}/fatura-kes`,
        handler: result.handlerName,
        params: result.params,
        status: result.statusCode,
        time: new Date().toLocaleTimeString('tr-TR'),
      });
      handleViewDetail(customerId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Router Trace Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              Router Canlı İzleme (Müşteri Yönetim Sistemi Entegrasyonu):
            </span>
          </div>
          <div className="text-slate-400">
            Mimari: <strong className="text-slate-200">Enes Öztürk</strong> Router Sınıfı
          </div>
        </div>

        {lastRouterTrace ? (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2 pt-3 border-t border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">İstek:</span>
              <span className="font-bold text-emerald-400">{lastRouterTrace.method}</span>{' '}
              <span className="text-slate-200">{lastRouterTrace.uri}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Çalışan Hedef:</span>
              <span className="text-sky-300 font-semibold">{lastRouterTrace.handler}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Regex Parametreleri:</span>
              <span className="text-amber-300">
                {Object.keys(lastRouterTrace.params).length > 0
                  ? JSON.stringify(lastRouterTrace.params)
                  : 'Yok'}
              </span>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                HTTP {lastRouterTrace.status} OK
              </span>
              <span className="text-slate-400 text-[11px]">{lastRouterTrace.time}</span>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-400">
            Herhangi bir müşteri işlemine tıkladığınızda istek Router tarafından işlenir.
          </p>
        )}
      </div>

      {/* Main CRM Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Customer List */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <span>Müşteri Kayıtları</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toplam {customers.length} kayıt listeleniyor (Route: GET /musteri)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadCustomers}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                title="Listeyi Yenile (GET /musteri)"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white cursor-pointer transition-colors shadow-xs"
              >
                <UserPlus className="w-4 h-4" />
                <span>Yeni Müşteri Ekle (POST)</span>
              </button>
            </div>
          </div>

          {/* Search Bar (Regex Route) */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Regex ile ara (örn: lojistik, demir, ankara) - GET /musteri/ara/([a-zA-Z0-9_-]+)"
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg cursor-pointer"
            >
              Filtrele
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  loadCustomers();
                }}
                className="px-3 py-2 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Temizle
              </button>
            )}
          </form>

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Müşteri / Şirket</th>
                  <th className="pb-3 font-semibold">Şehir</th>
                  <th className="pb-3 font-semibold">Bakiye</th>
                  <th className="pb-3 font-semibold">Durum</th>
                  <th className="pb-3 font-semibold text-right">Router Aksiyonları</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                      selectedCustomerId === c.id ? 'bg-slate-50 dark:bg-slate-800/70' : ''
                    }`}
                  >
                    <td className="py-3 font-mono text-slate-500 dark:text-slate-400">#{c.id}</td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{c.ad}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.sirket}</div>
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">{c.sehir}</td>
                    <td className="py-3 font-mono font-medium text-slate-900 dark:text-slate-100">
                      ₺{c.bakiye.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                          c.durum === 'Aktif'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : c.durum === 'Beklemede'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {c.durum}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleViewDetail(c.id)}
                          title="Detay (GET /musteri/detay/:id)"
                          className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditCustomer(c);
                            setIsEditModalOpen(true);
                          }}
                          title="Güncelle (POST /musteri/guncelle/:id)"
                          className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(c.id)}
                          title="Sil (POST /musteri/sil/:id)"
                          className="p-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Customer Details & Invoices Drawer */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <span>Müşteri Detayı & Faturalar</span>
            </h3>
            {customerDetailData && (
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                GET /musteri/detay/{customerDetailData.customer.id}
              </span>
            )}
          </div>

          {customerDetailData ? (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {customerDetailData.customer.ad}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {customerDetailData.customer.sirket}
                    </p>
                  </div>
                  <span className="font-mono text-slate-400">
                    ID: #{customerDetailData.customer.id}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{customerDetailData.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{customerDetailData.customer.telefon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{customerDetailData.customer.sehir}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      ₺{customerDetailData.customer.bakiye.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>

                {customerDetailData.customer.notlar && (
                  <p className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-slate-500 italic text-[11px]">
                    "{customerDetailData.customer.notlar}"
                  </p>
                )}
              </div>

              {/* Invoices List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5 text-slate-500" />
                    <span>Düzenlenen Faturalar</span>
                  </span>
                  <button
                    onClick={() => handleIssueInvoice(customerDetailData.customer.id)}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    + Fatura Kes (POST)
                  </button>
                </div>

                {customerDetailData.invoices && customerDetailData.invoices.length > 0 ? (
                  <div className="space-y-2">
                    {customerDetailData.invoices.map((inv: any) => (
                      <div
                        key={inv.id}
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono text-[11px]"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {inv.faturaNo}
                          </div>
                          <div className="text-slate-400 text-[10px]">{inv.tarih}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            ₺{inv.tutar.toLocaleString('tr-TR')}
                          </div>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded ${
                              inv.durum === 'Ödendi'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {inv.durum}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">
                    Bu müşteriye henüz kesilmiş fatura bulunmuyor.
                  </p>
                )}
              </div>

              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-[11px] rounded text-slate-600 dark:text-slate-400 font-mono">
                Router Hedefi: <strong>MusteriController@detay</strong>
                <br />
                Parametre: <code>id = {customerDetailData.customer.id}</code>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">
                Tablodan bir müşterinin "Göz" ikonuna tıklayarak regex ID parametreli detay rotasını
                çalıştırın.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Yeni Müşteri Ekle (POST /musteri/ekle) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Yeni Müşteri Ekle
                </h3>
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  POST /musteri/ekle ➔ MusteriController@ekle
                </span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Müşteri Ad Soyad
                </label>
                <input
                  required
                  type="text"
                  value={newFormData.ad}
                  onChange={(e) => setNewFormData({ ...newFormData, ad: e.target.value })}
                  placeholder="Örn: Burak Tan"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Şirket / Firma Adı
                </label>
                <input
                  required
                  type="text"
                  value={newFormData.sirket}
                  onChange={(e) => setNewFormData({ ...newFormData, sirket: e.target.value })}
                  placeholder="Örn: Tan Bilişim Sanayi"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    value={newFormData.email}
                    onChange={(e) => setNewFormData({ ...newFormData, email: e.target.value })}
                    placeholder="burak@tanbilisim.com"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Telefon
                  </label>
                  <input
                    type="text"
                    value={newFormData.telefon}
                    onChange={(e) => setNewFormData({ ...newFormData, telefon: e.target.value })}
                    placeholder="+90 532 000 0000"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={newFormData.sehir}
                    onChange={(e) => setNewFormData({ ...newFormData, sehir: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Başlangıç Bakiyesi (TL)
                  </label>
                  <input
                    type="number"
                    value={newFormData.bakiye}
                    onChange={(e) =>
                      setNewFormData({ ...newFormData, bakiye: Number(e.target.value) })
                    }
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Özel Not
                </label>
                <textarea
                  rows={2}
                  value={newFormData.notlar}
                  onChange={(e) => setNewFormData({ ...newFormData, notlar: e.target.value })}
                  placeholder="Müşteri ilişkileri notu..."
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Kaydet (POST İsteği Gönder)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Müşteri Güncelle (POST /musteri/guncelle/([0-9]+)) */}
      {isEditModalOpen && editCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Müşteri Güncelle #{editCustomer.id}
                </h3>
                <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  POST /musteri/guncelle/{editCustomer.id} ➔ MusteriController@guncelle
                </span>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Müşteri Adı
                </label>
                <input
                  type="text"
                  value={editCustomer.ad}
                  onChange={(e) => setEditCustomer({ ...editCustomer, ad: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Şirket Adı
                </label>
                <input
                  type="text"
                  value={editCustomer.sirket}
                  onChange={(e) => setEditCustomer({ ...editCustomer, sirket: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Bakiye (TL)
                  </label>
                  <input
                    type="number"
                    value={editCustomer.bakiye}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, bakiye: Number(e.target.value) })
                    }
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Durum
                  </label>
                  <select
                    value={editCustomer.durum}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, durum: e.target.value as any })
                    }
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Beklemede">Beklemede</option>
                    <option value="Pasif">Pasif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Notlar
                </label>
                <textarea
                  rows={2}
                  value={editCustomer.notlar}
                  onChange={(e) => setEditCustomer({ ...editCustomer, notlar: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Güncelle (POST Gönder)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
