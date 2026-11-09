import React, { useState } from 'react';
import { X, Copy, Check, Download, Upload, Code2 } from 'lucide-react';
import { FormConfig } from '../types/form';

interface ExportModalProps {
  formConfig: FormConfig;
  isOpen: boolean;
  onClose: () => void;
  onImport: (config: FormConfig) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  formConfig,
  isOpen,
  onClose,
  onImport,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'html'>('export');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(formConfig, null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formConfig.title.toLowerCase().replace(/\s+/g, '_') || 'form'}_schema.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExecuteImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importText);
      if (!parsed.fields || !Array.isArray(parsed.fields)) {
        throw new Error("Geçerli bir 'fields' dizisi bulunamadı.");
      }
      onImport(parsed);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'JSON ayrıştırma hatası.');
    }
  };

  const generateHtmlSnippet = () => {
    return `<!-- Form Yapımcısı - Enes Öztürk -->
<form class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-slate-200 space-y-4">
  <h2 class="text-2xl font-bold text-slate-900">${formConfig.title}</h2>
  <p class="text-sm text-slate-500">${formConfig.description}</p>
  
${formConfig.fields
  .map((f) => {
    if (f.type === 'text') {
      return `  <div>
    <label class="block text-sm font-semibold mb-1 text-slate-700">${f.label}${f.required ? ' *' : ''}</label>
    <input type="text" placeholder="${f.placeholder || ''}" ${f.required ? 'required ' : ''}class="w-full px-3 py-2 border rounded-xl" />
  </div>`;
    }
    if (f.type === 'textarea') {
      return `  <div>
    <label class="block text-sm font-semibold mb-1 text-slate-700">${f.label}${f.required ? ' *' : ''}</label>
    <textarea rows="${f.rows || 3}" placeholder="${f.placeholder || ''}" ${f.required ? 'required ' : ''}class="w-full px-3 py-2 border rounded-xl"></textarea>
  </div>`;
    }
    if (f.type === 'select') {
      return `  <div>
    <label class="block text-sm font-semibold mb-1 text-slate-700">${f.label}${f.required ? ' *' : ''}</label>
    <select ${f.required ? 'required ' : ''}class="w-full px-3 py-2 border rounded-xl">
      <option value="">${f.placeholder || '-- Seçiniz --'}</option>
      ${f.options?.map((opt) => `<option value="${opt.value}">${opt.label}</option>`).join('\n      ')}
    </select>
  </div>`;
    }
    return `  <!-- ${f.label} (${f.type}) -->`;
  })
  .join('\n\n')}

  <button type="submit" class="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-xl">
    ${formConfig.submitButtonText || 'Gönder'}
  </button>
</form>`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Şema & Dışa Aktarma</h3>
              <p className="text-xs text-slate-500">JSON ve HTML formatında form verisi</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/30 gap-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'export'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            JSON Şeması (Export)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'import'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            JSON Yükle (Import)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'html'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            HTML Kodu
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Aşağıdaki JSON şemasını kaydedebilir veya başka bir projeye aktarabilirsiniz:
              </p>
              <pre className="text-xs font-mono bg-slate-900 text-emerald-400 p-4 rounded-2xl max-h-80 overflow-y-auto">
                {jsonString}
              </pre>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(jsonString)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Kopyalandı!' : 'JSON Kopyala'}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  JSON İndir
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Daha önce dışa aktardığınız geçerli bir form JSON şemasını buraya yapıştırın:
              </p>
              <textarea
                rows={10}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder='{"title": "Örnek Form", "fields": [...] }'
                className="w-full p-3 rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 outline-none focus:border-indigo-500"
              />
              {importError && (
                <p className="text-xs text-rose-600 font-medium">{importError}</p>
              )}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleExecuteImport}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Şemayı İçe Aktar ve Uygula
                </button>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Bu formu doğrudan web sitenize eklemek için kullanabileceğiniz HTML + Tailwind kodu:
              </p>
              <pre className="text-xs font-mono bg-slate-900 text-blue-300 p-4 rounded-2xl max-h-80 overflow-y-auto">
                {generateHtmlSnippet()}
              </pre>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleCopy(generateHtmlSnippet())}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Kopyalandı!' : 'HTML Kodunu Kopyala'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
