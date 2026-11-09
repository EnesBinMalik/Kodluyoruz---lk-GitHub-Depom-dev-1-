import React from 'react';
import {
  X,
  Trash2,
  Copy,
  Plus,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Hash,
  Type,
  ListPlus,
} from 'lucide-react';
import { FormField, SelectOption } from '../types/form';

interface FieldEditorProps {
  field: FormField | null;
  onUpdateField: (updated: FormField) => void;
  onDeleteField: (id: string) => void;
  onDuplicateField: (id: string) => void;
  onClose: () => void;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({
  field,
  onUpdateField,
  onDeleteField,
  onDuplicateField,
  onClose,
}) => {
  if (!field) {
    return (
      <aside className="w-80 bg-white border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
          <Sliders className="w-6 h-6 text-slate-300" />
        </div>
        <h3 className="font-semibold text-slate-700 text-sm">Bileşen Seçilmedi</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
          Düzenlemek istediğiniz bileşene tuval üzerinden tıklayın.
        </p>
      </aside>
    );
  }

  const handleTextChange = (key: keyof FormField, value: any) => {
    onUpdateField({
      ...field,
      [key]: value,
    });
  };

  const handleValidationChange = (key: string, value: any) => {
    onUpdateField({
      ...field,
      validation: {
        ...(field.validation || {}),
        [key]: value === '' ? undefined : Number(value),
      },
    });
  };

  // Option handlers for select & radio
  const handleAddOption = () => {
    const currentOptions = field.options || [];
    const newIndex = currentOptions.length + 1;
    const newOption: SelectOption = {
      id: `opt_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      label: `Seçenek ${newIndex}`,
      value: `secenek_${newIndex}`,
    };
    onUpdateField({
      ...field,
      options: [...currentOptions, newOption],
    });
  };

  const handleUpdateOption = (index: number, key: 'label' | 'value', val: string) => {
    if (!field.options) return;
    const nextOptions = [...field.options];
    nextOptions[index] = {
      ...nextOptions[index],
      [key]: val,
    };
    onUpdateField({
      ...field,
      options: nextOptions,
    });
  };

  const handleDeleteOption = (index: number) => {
    if (!field.options || field.options.length <= 1) return;
    const nextOptions = field.options.filter((_, i) => i !== index);
    onUpdateField({
      ...field,
      options: nextOptions,
    });
  };

  return (
    <aside className="w-84 bg-white border-l border-slate-200 flex flex-col h-full shrink-0 shadow-lg lg:shadow-none z-20">
      {/* Editor Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm leading-none">Bileşen Ayarları</h2>
            <span className="text-[11px] font-mono text-indigo-600 uppercase font-semibold">
              {field.type.toUpperCase()}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors"
          title="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Field Label */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
            Alan Başlığı (Label) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => handleTextChange('label', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-800 outline-none transition-all"
            placeholder="Örn: Adınız Soyadınız"
          />
        </div>

        {/* Placeholder (Not applicable to checkbox) */}
        {field.type !== 'checkbox' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              İpucu Metni (Placeholder)
            </label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => handleTextChange('placeholder', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-800 outline-none transition-all"
              placeholder="Giriş alanı içinde görünecek silik metin"
            />
          </div>
        )}

        {/* Help Text */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
            Yardımcı Açıklama (Help Text)
          </label>
          <input
            type="text"
            value={field.helpText || ''}
            onChange={(e) => handleTextChange('helpText', e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-slate-800 outline-none transition-all"
            placeholder="Kullanıcıya gösterilecek ek rehber metin"
          />
        </div>

        {/* Required Switch */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Zorunlu Alan</span>
            <span className="text-[11px] text-slate-500">Kullanıcı boş bırakamaz</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => handleTextChange('required', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Textarea Specific: Rows & MaxLength */}
        {field.type === 'textarea' && (
          <div className="space-y-3 p-3.5 rounded-xl bg-purple-50/50 border border-purple-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 uppercase">
              <Type className="w-3.5 h-3.5" />
              <span>Textarea Özellikleri</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Görünür Satır Sayısı ({field.rows || 3})
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={field.rows || 3}
                onChange={(e) => handleTextChange('rows', Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Maksimum Karakter Limiti
              </label>
              <input
                type="number"
                value={field.validation?.maxLength || ''}
                onChange={(e) => handleValidationChange('maxLength', e.target.value)}
                placeholder="Örn: 500"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 outline-none"
              />
            </div>
          </div>
        )}

        {/* Text Specific: Min & Max Length */}
        {field.type === 'text' && (
          <div className="space-y-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase">
              <Hash className="w-3.5 h-3.5" />
              <span>Metin Uzunluk Kuralları</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Min Karakter
                </label>
                <input
                  type="number"
                  value={field.validation?.minLength || ''}
                  onChange={(e) => handleValidationChange('minLength', e.target.value)}
                  placeholder="Örn: 2"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Maks Karakter
                </label>
                <input
                  type="number"
                  value={field.validation?.maxLength || ''}
                  onChange={(e) => handleValidationChange('maxLength', e.target.value)}
                  placeholder="Örn: 100"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Dropdown (Select) & Radio Options Management */}
        {(field.type === 'select' || field.type === 'radio') && (
          <div className="space-y-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase">
                <ListPlus className="w-3.5 h-3.5" />
                <span>Seçenek Yönetimi</span>
              </div>
              <span className="text-[11px] font-medium text-emerald-700">
                {field.options?.length || 0} Seçenek
              </span>
            </div>

            <div className="space-y-2">
              {field.options?.map((opt, idx) => (
                <div key={opt.id || idx} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => handleUpdateOption(idx, 'label', e.target.value)}
                    placeholder={`Seçenek ${idx + 1}`}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteOption(idx)}
                    disabled={(field.options?.length || 0) <= 1}
                    title="Seçeneği Sil"
                    className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddOption}
              className="w-full py-2 px-3 rounded-xl border border-dashed border-emerald-300 bg-white hover:bg-emerald-50 text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Yeni Seçenek Ekle
            </button>
          </div>
        )}
      </div>

      {/* Editor Footer Actions */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-2">
        <button
          type="button"
          onClick={() => onDuplicateField(field.id)}
          className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 hover:shadow-xs transition-all"
        >
          <Copy className="w-3.5 h-3.5 text-indigo-600" />
          Bu Bileşeni Çoğalt (Duplicate)
        </button>

        <button
          type="button"
          onClick={() => onDeleteField(field.id)}
          className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center justify-center gap-2 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
          Bileşeni Sil
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Tamamla
        </button>
      </div>
    </aside>
  );
};
