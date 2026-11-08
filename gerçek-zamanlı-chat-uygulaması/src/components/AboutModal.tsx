import React from 'react';
import { X, Sparkles, ExternalLink, Code2, Globe, Cpu, CheckCircle2, Copy, Check } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewUrl: string;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  previewUrl,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const copyPreview = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-indigo-600/30">
              💬
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>EchoChat • Gerçek Zamanlı Chat</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  v1.0
                </span>
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-indigo-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-slate-300">İmza: Enes Öztürk</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Live Preview URL Banner */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Uygulama Canlı Önizleme Bağlantısı
              </span>
              <button
                onClick={copyPreview}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg font-mono text-xs text-slate-200 border border-slate-800">
              <span className="truncate">{previewUrl}</span>
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 p-1"
                title="Yeni Sekmede Aç"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Project Requirements & Features checklist */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Karşılanan Proje Gereksinimleri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Front-end:</strong> React 19 + TypeScript + Tailwind CSS</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Back-end:</strong> Node.js (Express) + Socket.io Server</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>İki Yönlü Mesajlaşma:</strong> Canlı mesaj iletimi ve alımı</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Mesajların Silinmesi:</strong> Ekran yenilenince eski mesajlar silinir (Ephemeral)</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>React Hooks:</strong> useState ve useEffect kapsamlı kullanımı</span>
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Özel İmza:</strong> Enes Öztürk imzalı özel tasarım</span>
              </div>
            </div>
          </div>

          {/* Netlify Deployment Guide */}
          <div>
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              Netlify Dağıtım (Deployment) Kılavuzu
            </h3>
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
              <p>
                Projenin Netlify üzerinde dağıtılması için gerekli yapılandırmalar (<code>netlify.toml</code>, build scriptleri) hazırlanmıştır:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400 ml-1">
                <li>Proje reposunu GitHub / GitLab hesabınıza aktarın.</li>
                <li>Netlify dashboard üzerinden <strong>&quot;Import from Git&quot;</strong> seçin.</li>
                <li>
                  Build Command: <code className="text-indigo-300">npm run build</code>
                </li>
                <li>
                  Publish directory: <code className="text-indigo-300">dist</code>
                </li>
                <li>
                  Gerçek zamanlı WebSocket sunucusunu kesintisiz çalıştırmak için Render, Railway veya Heroku üzerine tek tıkla backend bağlanabilir veya Netlify Functions / Edge kullanılabilir.
                </li>
              </ol>
            </div>
          </div>

          {/* React Hooks Structure */}
          <div>
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              Kullanılan React Hook Yapıları
            </h3>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p>
                • <strong className="text-slate-200">useState:</strong> Kullanıcı profili, aktif oda, mesaj listesi (sayfa yenilendiğinde sıfırlanır), yazıyor durumu, tepkiler ve arama filtresi durumlarının anlık yönetimi.
              </p>
              <p>
                • <strong className="text-slate-200">useEffect:</strong> Socket.io bağlantı döngüsü, olay dinleyicileri (new_message, user_joined, room_users vb.), otomatik kaydırma ve yazıyor zaman aşımı (debounce) mekanizmaları.
              </p>
            </div>
          </div>

          {/* Author Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Geliştirici & Tasarım</span>
            <span className="font-bold text-indigo-400">Enes Öztürk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
