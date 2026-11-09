import React, { useState } from 'react';
import {
  Eye,
  Undo2,
  Redo2,
  FileCode,
  LayoutTemplate,
  Sparkles,
  UserCheck,
  ChevronDown,
  Layers,
  Wand2,
} from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/defaultForm';
import { FormConfig } from '../types/form';

interface HeaderProps {
  onOpenPreview: () => void;
  onOpenExport: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSelectTemplate: (config: FormConfig) => void;
  fieldCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPreview,
  onOpenExport,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSelectTemplate,
  fieldCount,
}) => {
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30 sticky top-0 shadow-xs">
      {/* Left: Branding & Signature Badge */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
          <Layers className="w-5 h-5" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
              Form Yapımcısı
            </h1>
            {/* Signature badge */}
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              Enes Öztürk
              <UserCheck className="w-3 h-3 text-indigo-600" />
            </span>
          </div>
          <p className="hidden md:block text-[11px] text-slate-400 font-medium">
            Sürükle & Bırak Form Oluşturucu • Proje 6
          </p>
        </div>
      </div>

      {/* Middle: History & Templates Controls */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          <button
            type="button"
            disabled={!canUndo}
            onClick={onUndo}
            title="Geri Al (Undo)"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={!canRedo}
            onClick={onRedo}
            title="İleri Al (Redo)"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all"
          >
            <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Şablonlar</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showTemplates && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowTemplates(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase">
                  Hazır Form Şablonları
                </div>
                <div className="py-1 space-y-1">
                  {PRESET_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.name}
                      type="button"
                      onClick={() => {
                        onSelectTemplate(tmpl.config);
                        setShowTemplates(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-900">
                        {tmpl.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {tmpl.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Export / JSON */}
        <button
          type="button"
          onClick={onOpenExport}
          title="Şemayı Görüntüle ve Dışa Aktar"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all"
        >
          <FileCode className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden md:inline">JSON / Kod</span>
        </button>
      </div>

      {/* Right: The Prominent "Preview Form" Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenPreview}
          className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Preview Form</span>
          <span className="hidden lg:inline-block text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono">
            Canlı
          </span>
        </button>
      </div>
    </header>
  );
};
