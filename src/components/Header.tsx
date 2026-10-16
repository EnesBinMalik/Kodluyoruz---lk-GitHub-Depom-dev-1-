import React from 'react';
import { Download, GitBranch } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onDownloadZip: () => void;
  isDownloadingZip?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onDownloadZip,
  isDownloadingZip,
}) => {
  const navItems = [
    { id: 'submission', label: 'Ödev Teslim Formu' },
    { id: 'repo', label: 'Depo Dosyaları' },
    { id: 'terminal', label: 'Git Terminal Simülatörü' },
    { id: 'fork', label: 'Fork Rehberi' },
    { id: 'checklist', label: 'Ödev Kontrol Listesi' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
              <GitBranch className="w-4 h-4" />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              kodluyoruzilkrepo
            </span>
          </div>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-orange-600 font-semibold border-b-2 border-orange-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onDownloadZip}
              disabled={isDownloadingZip}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloadingZip ? 'Paketleniyor...' : 'Repoyu İndir (.ZIP)'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`text-xs px-3 py-1.5 rounded-md whitespace-nowrap font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
