import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DispatcherConsole } from './components/DispatcherConsole';
import { CustomerSystemApp } from './components/CustomerSystemApp';
import { RouteTableView } from './components/RouteTableView';
import { UnitTestRunner } from './components/UnitTestRunner';
import { CodeExportView } from './components/CodeExportView';
import { initializeSystemRoutes } from './data/mockSystem';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('console');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Başlangıç rotalarını ve kontrolcüleri kaydet
  useEffect(() => {
    initializeSystemRoutes();
  }, []);

  // Dark mode sınıfını HTML root'a uygula
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleQuickTestFromTable = (method: 'GET' | 'POST', pattern: string) => {
    setActiveTab('console');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Header (Top Bar Contract: 3 Zones) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onQuickTest={() => setActiveTab('console')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Architecture Spec Highlights Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-white">Müşteri Yönetim Sistemi (MYS)</span>
                <span aria-hidden="true">·</span>
                <span>Özel Router Mimarisi</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Enes Öztürk İmzalı
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Dinamik Regex Parametreli, GET/POST Ayrımı ve Class@Method Destekli Router Sınıfı
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bu uygulama; Müşteri Yönetim Sistemi için tasarlanmış Router sınıfının hem çalışan
                etkileşimli bir simülasyonunu, hem canlı birim testlerini, hem de PHP 8.x üretim
                kodlarını sunar.
              </p>
            </div>

            {/* Core Capability Checklist */}
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-200 shrink-0">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Route Oluşturabilme</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GET & POST Ayrımı</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Regex ile Parametre Yakalama</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Class@Method & Callback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'console' && <DispatcherConsole />}
        {activeTab === 'mys' && <CustomerSystemApp />}
        {activeTab === 'routes' && (
          <RouteTableView onSelectRouteForTest={handleQuickTestFromTable} />
        )}
        {activeTab === 'tests' && <UnitTestRunner />}
        {activeTab === 'code' && <CodeExportView />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Router Sınıfı Mimarisi
            </span>
            <span aria-hidden="true">·</span>
            <span>Müşteri Yönetim Sistemi (MYS)</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Enes Öztürk İmzalı
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('tests')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              10/10 Birim Testi Başarılı
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              PHP 8.2+ Standartları
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
