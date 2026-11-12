import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Layers,
  Code2,
  Cpu,
  FileJson,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { Router, DispatchResult } from '../router/Router';

interface Preset {
  name: string;
  category: 'Class@Method' | 'Regex Parametre' | 'Callback' | 'Hata Testi';
  method: 'GET' | 'POST';
  uri: string;
  body?: any;
  desc: string;
}

const PRESETS: Preset[] = [
  {
    name: 'Müşteri Detayı (Regex ID)',
    category: 'Regex Parametre',
    method: 'GET',
    uri: '/musteri/detay/2',
    desc: 'Regex ([0-9]+) ile ID yakalar ve MusteriController@detay metodunu çağırır.',
  },
  {
    name: 'Müşteri Listesi',
    category: 'Class@Method',
    method: 'GET',
    uri: '/musteri',
    desc: 'MusteriController@index sınıf ve metodunu çalıştırır.',
  },
  {
    name: 'Yeni Müşteri Ekle (POST Body)',
    category: 'Class@Method',
    method: 'POST',
    uri: '/musteri/ekle',
    body: {
      ad: 'Selin Varol',
      sirket: 'Varol Mimarlık Danışmanlık',
      email: 'selin@varol.com',
      telefon: '+90 530 444 8899',
      sehir: 'İzmir',
      bakiye: 34500,
      durum: 'Aktif',
    },
    desc: 'POST isteği ile JSON gövdesini MusteriController@ekle metoduna aktarır.',
  },
  {
    name: 'Müşteri Güncelle (Regex ID + POST)',
    category: 'Regex Parametre',
    method: 'POST',
    uri: '/musteri/guncelle/1',
    body: {
      bakiye: 68500,
      notlar: 'Sözleşme yenilendi, bakiye güncellendi.',
    },
    desc: 'URL üzerinden ID regex ile alınır, POST verisiyle birlikte güncellenir.',
  },
  {
    name: 'Regex Metin Arama ([a-zA-Z0-9_-]+)',
    category: 'Regex Parametre',
    method: 'GET',
    uri: '/musteri/ara/demir',
    desc: 'Dinamik slug parametresi ile MusteriController@ara çağrılır.',
  },
  {
    name: 'Çoklu Regex Parametresi',
    category: 'Regex Parametre',
    method: 'GET',
    uri: '/musteri/1/fatura/101',
    desc: 'İki ayrı regex parametresi yakalar: musteriId=1 ve faturaId=101.',
  },
  {
    name: 'Sistem Durumu (Callback GET)',
    category: 'Callback',
    method: 'GET',
    uri: '/sistem/durum',
    desc: 'Doğrudan anonim bir closure (callback) fonksiyonunu çalıştırır.',
  },
  {
    name: 'Sistem Log Kaydı (Callback POST)',
    category: 'Callback',
    method: 'POST',
    uri: '/sistem/log',
    body: {
      seviye: 'BILGI',
      eylem: 'KullaniciGirisDenemesi',
      ip: '192.168.1.45',
    },
    desc: 'POST ile gelen veriyi Callback fonksiyonuna yönlendirir.',
  },
  {
    name: '405 Method Not Allowed Testi',
    category: 'Hata Testi',
    method: 'POST',
    uri: '/musteri/detay/1',
    desc: 'Bu rota sadece GET için tanımlıdır; POST yapıldığında 405 fırlatır.',
  },
  {
    name: '404 Route Not Found Testi',
    category: 'Hata Testi',
    method: 'GET',
    uri: '/sistem/bilinmeyen/kaynak',
    desc: 'Kayıtlı olmayan bir URL çağrıldığında 404 yanıtı üretir.',
  },
];

export const DispatcherConsole: React.FC = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [uri, setUri] = useState<string>('/musteri/detay/2');
  const [requestBody, setRequestBody] = useState<string>(
    JSON.stringify(
      {
        ad: 'Selin Varol',
        sirket: 'Varol Mimarlık Danışmanlık',
        bakiye: 34500,
        durum: 'Aktif',
      },
      null,
      2
    )
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [dispatchResult, setDispatchResult] = useState<DispatchResult | null>(() => {
    // İlk render'da başlangıç isteğini çalıştır
    return Router.dispatch('GET', '/musteri/detay/2');
  });
  const [copied, setCopied] = useState(false);

  const handleDispatch = () => {
    setJsonError(null);
    let parsedBody: any = undefined;

    if (method === 'POST' || method === 'PUT') {
      try {
        if (requestBody.trim()) {
          parsedBody = JSON.parse(requestBody);
        }
      } catch (err: any) {
        setJsonError(`JSON Sözdizimi Hatası: ${err.message}`);
        return;
      }
    }

    const result = Router.dispatch(method, uri, parsedBody);
    setDispatchResult(result);
  };

  const handleApplyPreset = (preset: Preset) => {
    setMethod(preset.method);
    setUri(preset.uri);
    if (preset.body) {
      setRequestBody(JSON.stringify(preset.body, null, 2));
    }
    const result = Router.dispatch(preset.method, preset.uri, preset.body);
    setDispatchResult(result);
  };

  const copyResult = () => {
    if (!dispatchResult) return;
    navigator.clipboard.writeText(JSON.stringify(dispatchResult.response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Router Test Konsolu
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              GET ve POST isteklerini ayrı ayrı değerlendiren, dinamik regex parametrelerini
              çözümleyen ve Class@Method çağrılarını yöneten etkileşimli deneme ortamı.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto text-xs text-slate-500 dark:text-slate-400">
            <span>Yazar: <strong>Enes Öztürk</strong></span>
            <span aria-hidden="true">·</span>
            <span>Sürüm: <strong>v{Router.VERSION}</strong></span>
          </div>
        </div>

        {/* Quick Presets Pills */}
        <div className="mt-6">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
            Hızlı Test Şablonları (Senaryolar)
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors cursor-pointer text-left"
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    p.method === 'GET'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {p.method}
                </span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Request Builder */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
          <span>HTTP İstek Tanımlayıcı</span>
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
            Router::dispatch($method, $uri)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Method selector */}
          <div className="shrink-0">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
              className="w-full sm:w-32 px-3 py-2.5 text-sm font-mono font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 cursor-pointer"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* URI input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              placeholder="/musteri/detay/1 veya /musteri"
              className="w-full px-4 py-2.5 font-mono text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
          </div>

          {/* Dispatch button */}
          <button
            onClick={handleDispatch}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>İsteği Gönder (Dispatch)</span>
          </button>
        </div>

        {/* JSON Request Body (for POST/PUT) */}
        {(method === 'POST' || method === 'PUT') && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <FileJson className="w-3.5 h-3.5" />
                <span>İstek Gövdesi (JSON Payload - php://input veya $_POST)</span>
              </label>
              {jsonError && (
                <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {jsonError}
                </span>
              )}
            </div>
            <textarea
              rows={4}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
          </div>
        )}
      </div>

      {/* Execution Results & Pipeline Visualizer */}
      {dispatchResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Router Pipeline Step-by-Step */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>Router Çalışma Hattı (Pipeline)</span>
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{dispatchResult.executionTimeMs} ms</span>
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {dispatchResult.pipelineSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border text-xs bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-700/60"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {step.status === 'success' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {step.status === 'info' && (
                        <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      )}
                      {step.status === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      )}
                      {step.status === 'error' && (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                      {step.description}
                    </p>
                    {step.detail && (
                      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {step.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted Parameters Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>Yakalanan Regex Parametreleri</span>
              </h3>

              {Object.keys(dispatchResult.params).length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  Bu istek için URL üzerinden herhangi bir dinamik regex parametresi yakalanmadı.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                        <th className="pb-2 font-medium">Parametre Adı</th>
                        <th className="pb-2 font-medium">Değeri</th>
                        <th className="pb-2 font-medium">Tür</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                      {Object.entries(dispatchResult.params).map(([key, val]) => (
                        <tr key={key}>
                          <td className="py-2 text-indigo-600 dark:text-indigo-400 font-semibold">
                            ${key}
                          </td>
                          <td className="py-2 text-slate-900 dark:text-white font-medium">
                            "{val}"
                          </td>
                          <td className="py-2 text-slate-500 dark:text-slate-400">
                            {/^[0-9]+$/.test(val) ? 'integer' : 'string'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Matched Route Details & Response Body */}
          <div className="lg:col-span-7 space-y-4">
            {/* Target Resolution Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      dispatchResult.statusCode >= 200 && dispatchResult.statusCode < 300
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : dispatchResult.statusCode === 405
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {dispatchResult.statusCode} {dispatchResult.statusText}
                  </span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                    {dispatchResult.handlerName}
                  </span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  İmza: <span className="font-semibold text-slate-700 dark:text-slate-200">{dispatchResult.authorSignature}</span>
                </div>
              </div>

              {/* Matched Route details */}
              {dispatchResult.matchedRoute && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5">
                      Kayıtlı Rota Deseni:
                    </span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">
                      {dispatchResult.matchedRoute.pattern}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5">
                      Çağrım Tipi:
                    </span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">
                      {dispatchResult.matchedRoute.handlerType === 'class_method'
                        ? `Class@Method ➔ ${dispatchResult.matchedRoute.controllerName}@${dispatchResult.matchedRoute.methodName}`
                        : 'Anonim Fonksiyon (Callback Closure)'}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5">
                      Derlenen RegExp:
                    </span>
                    <code className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1 rounded block overflow-x-auto font-mono">
                      {dispatchResult.matchedRoute.compiledRegex.toString()}
                    </code>
                  </div>
                </div>
              )}
            </div>

            {/* Response JSON Viewer */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>Dönen Yanıt (Response Output)</span>
                </span>
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>JSON Kopyala</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-slate-950 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto max-h-[460px] leading-relaxed">
                {JSON.stringify(dispatchResult.response, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
