import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  FileCode,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import {
  PHP_ROUTER_CODE,
  PHP_CONTROLLER_EXAMPLE,
  PHP_ROUTES_EXAMPLE,
} from '../router/phpRouterCode';

export const CodeExportView: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'router_php' | 'routes_php' | 'controller_php'>('router_php');
  const [copied, setCopied] = useState(false);

  const files = {
    router_php: {
      name: 'Router.php',
      badge: 'Core Router Sınıfı (PHP 8.x)',
      language: 'php',
      code: PHP_ROUTER_CODE,
      description:
        'GET/POST ayrımı, regex parametre yakalama ve Class@Method desteği içeren ana yönlendirici sınıfı. Enes Öztürk imzalı.',
    },
    routes_php: {
      name: 'routes.php',
      badge: 'Rota Tanımları (MYS)',
      language: 'php',
      code: PHP_ROUTES_EXAMPLE,
      description:
        'Müşteri Yönetim Sistemi için GET, POST, regex ve callback rotalarının tanımlandığı örnek dosya.',
    },
    controller_php: {
      name: 'MusteriController.php',
      badge: 'Controller Sınıfı',
      language: 'php',
      code: PHP_CONTROLLER_EXAMPLE,
      description:
        'Class@Method çağrımıyla çalışan Müşteri Yönetim Sistemi denetleyici sınıfı.',
    },
  };

  const currentFile = files[activeFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header and Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span>Üretime Hazır Kaynak Kodlar (PHP & TypeScript)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Müşteri Yönetim Sistemi projenizde doğrudan kullanabileceğiniz eksiksiz, bağımsız dosyalar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white cursor-pointer transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Dosyayı İndir ({currentFile.name})</span>
          </button>
        </div>
      </div>

      {/* File Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {(Object.keys(files) as (keyof typeof files)[]).map((key) => {
          const file = files[key];
          const isActive = activeFile === key;
          return (
            <button
              key={key}
              onClick={() => setActiveFile(key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>{file.name}</span>
            </button>
          );
        })}
      </div>

      {/* Description banner */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-300">
          {currentFile.description}
        </span>
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 shrink-0 ml-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>İmza: Enes Öztürk</span>
        </span>
      </div>

      {/* Code Editor Preview */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-700" />
            <span className="text-slate-200 font-semibold">{currentFile.name}</span>
            <span className="text-slate-500">· {currentFile.badge}</span>
          </div>
          <span>PHP 8.2+ Standart</span>
        </div>

        <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-[560px]">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
};
