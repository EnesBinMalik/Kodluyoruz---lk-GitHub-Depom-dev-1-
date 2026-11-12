import React, { useState } from 'react';
import {
  ListFilter,
  PlusCircle,
  Play,
  CheckCircle2,
  Code,
  X,
  FileCode,
  Regex as RegexIcon,
} from 'lucide-react';
import { Router, HttpMethod, RouteDefinition } from '../router/Router';

interface RouteTableViewProps {
  onSelectRouteForTest: (method: 'GET' | 'POST', pattern: string) => void;
}

export const RouteTableView: React.FC<RouteTableViewProps> = ({ onSelectRouteForTest }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // New Route Form
  const [newMethod, setNewMethod] = useState<HttpMethod>('GET');
  const [newPattern, setNewPattern] = useState('');
  const [newHandlerType, setNewHandlerType] = useState<'class_method' | 'callback'>('class_method');
  const [newClassMethod, setNewClassMethod] = useState('MusteriController@detay');
  const [newDescription, setNewDescription] = useState('');
  const [addError, setAddError] = useState<string | null>(null);

  const allRoutes = Router.getAllRoutesFlat();

  const filteredRoutes = allRoutes.filter((r) => {
    const matchesMethod = selectedMethod === 'ALL' || r.method === selectedMethod;
    const matchesSearch =
      r.pattern.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (typeof r.handler === 'string' &&
        r.handler.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (r.description && r.description.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesMethod && matchesSearch;
  });

  const handleAddCustomRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newPattern.trim()) {
      setAddError('Lütfen geçerli bir rota deseni girin (örn: /musteri/detay/([0-9]+))');
      return;
    }

    try {
      if (newHandlerType === 'class_method') {
        if (!newClassMethod.includes('@')) {
          setAddError('Class@Method formatında "@" işareti bulunmalıdır. Örn: SinifAdi@metotAdi');
          return;
        }
        Router.add(newMethod, newPattern.trim(), newClassMethod.trim(), newDescription);
      } else {
        // Callback handler
        Router.add(
          newMethod,
          newPattern.trim(),
          (params, req) => {
            return {
              mesaj: 'Özel dinamik callback rotası çalıştırıldı!',
              metot: req.method,
              uri: req.uri,
              yakalananParametreler: params,
              yazar: Router.AUTHOR,
            };
          },
          newDescription || 'Kullanıcı tarafından eklenen özel Callback rotası'
        );
      }

      setIsAddModalOpen(false);
      setNewPattern('');
      setNewDescription('');
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      setAddError(err.message || 'Rota eklenirken bir hata oluştu.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ListFilter className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span>Kayıtlı Rotalar ve Regex Analizi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Router havuzundaki tüm GET, POST rotaları ve derlenmiş Regex desenleri
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white cursor-pointer transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni Rota Ekle</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Method filter tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold w-full sm:w-auto overflow-x-auto">
          {['ALL', 'GET', 'POST', 'PUT', 'DELETE'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMethod(m)}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedMethod === m
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m === 'ALL' ? 'Tüm Metotlar' : m}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Rota veya denetleyici ara..."
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4 font-semibold">Metot</th>
                <th className="py-3 px-4 font-semibold">Rota Deseni (Pattern)</th>
                <th className="py-3 px-4 font-semibold">Derlenen Regex (Compiled)</th>
                <th className="py-3 px-4 font-semibold">Parametreler</th>
                <th className="py-3 px-4 font-semibold">Hedef Çağrım (Handler)</th>
                <th className="py-3 px-4 font-semibold text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {filteredRoutes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-sans">
                    Aranan kriterlere uygun rota bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredRoutes.map((route) => (
                  <tr
                    key={route.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          route.method === 'GET'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : route.method === 'POST'
                            ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                            : route.method === 'PUT'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {route.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {route.pattern}
                      {route.description && (
                        <div className="font-sans font-normal text-[11px] text-slate-500 dark:text-slate-400">
                          {route.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      <code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                        {route.compiledRegex.source}
                      </code>
                    </td>
                    <td className="py-3 px-4">
                      {route.paramNames.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {route.paramNames.map((name, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                            >
                              ${name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 font-sans text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {route.handlerType === 'class_method' ? (
                        <div className="flex items-center gap-1 text-slate-900 dark:text-white font-medium">
                          <Code className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                          <span>{route.controllerName}</span>
                          <span className="text-slate-400">@</span>
                          <span className="text-indigo-600 dark:text-indigo-400">
                            {route.methodName}()
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                          <FileCode className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>Closure / Callback</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() =>
                          onSelectRouteForTest(
                            route.method === 'ANY' ? 'GET' : (route.method as any),
                            // Eğer rotada parametre varsa örnek bir değer koy
                            route.pattern
                              .replace(/\{[a-zA-Z0-9_]+:[^}]+\}/g, '1')
                              .replace(/\([0-9]+\+?\)/g, '1')
                              .replace(/\([a-zA-Z0-9_+-]+\)/g, 'ornek')
                              .replace(/:[a-zA-Z0-9_]+/g, '1')
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Konsolda Dene</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Yeni Özel Rota Ekle */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-600" />
                <span>Yeni Rota Tanımla</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomRoute} className="mt-4 space-y-4 text-xs">
              {addError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-lg">
                  {addError}
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    HTTP Metodu
                  </label>
                  <select
                    value={newMethod}
                    onChange={(e) => setNewMethod(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Rota Deseni (Regex Destekli)
                  </label>
                  <input
                    type="text"
                    value={newPattern}
                    onChange={(e) => setNewPattern(e.target.value)}
                    placeholder="/siparis/detay/([0-9]+) veya /urun/:id"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Çağrım Türü
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewHandlerType('class_method')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      newHandlerType === 'class_method'
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold">Class@Method</div>
                    <div className="text-[10px] opacity-80">MusteriController@detay</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewHandlerType('callback')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      newHandlerType === 'callback'
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold">Callback / Closure</div>
                    <div className="text-[10px] opacity-80">Anonim Fonksiyon</div>
                  </button>
                </div>
              </div>

              {newHandlerType === 'class_method' && (
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Sınıf ve Metot (Class@Method)
                  </label>
                  <input
                    type="text"
                    value={newClassMethod}
                    onChange={(e) => setNewClassMethod(e.target.value)}
                    placeholder="MusteriController@detay"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Açıklama (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Bu rotanın işlevi hakkında kısa bilgi"
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
                  Rotayı Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
