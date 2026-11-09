import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Sparkles,
  Type,
  AlignLeft,
  ChevronDownSquare,
  ArrowDown,
  Palette,
} from 'lucide-react';
import { FormConfig, FormField, FieldType } from '../types/form';
import { FormItemCard } from './FormItemCard';

interface CanvasProps {
  formConfig: FormConfig;
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
  onUpdateFormConfig: (updated: Partial<FormConfig>) => void;
  onDeleteField: (id: string) => void;
  onDuplicateField: (id: string) => void;
  onMoveField: (fromIndex: number, toIndex: number) => void;
  onAddField: (type: FieldType, targetIndex?: number) => void;
  onClearFields: () => void;
  onDropFromToolbox: (type: FieldType, targetIndex?: number) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  formConfig,
  selectedFieldId,
  onSelectField,
  onUpdateFormConfig,
  onDeleteField,
  onDuplicateField,
  onMoveField,
  onAddField,
  onClearFields,
  onDropFromToolbox,
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingOverBottom, setIsDraggingOverBottom] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const themeColors = [
    { name: 'Indigo', value: 'indigo', hex: 'bg-indigo-600' },
    { name: 'Blue', value: 'blue', hex: 'bg-blue-600' },
    { name: 'Emerald', value: 'emerald', hex: 'bg-emerald-600' },
    { name: 'Violet', value: 'violet', hex: 'bg-violet-600' },
    { name: 'Rose', value: 'rose', hex: 'bg-rose-600' },
    { name: 'Amber', value: 'amber', hex: 'bg-amber-600' },
  ];

  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (typeof index === 'number') {
      setDragOverIndex(index);
      setIsDraggingOverBottom(false);
    } else {
      setIsDraggingOverBottom(true);
      setDragOverIndex(null);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
    setIsDraggingOverBottom(false);
  };

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    setIsDraggingOverBottom(false);

    const toolboxType = e.dataTransfer.getData('application/x-form-field-type') as FieldType;
    const existingIndexStr = e.dataTransfer.getData('application/x-canvas-item-index');

    if (toolboxType) {
      onDropFromToolbox(toolboxType, targetIndex);
      return;
    }

    if (existingIndexStr !== '') {
      const fromIdx = parseInt(existingIndexStr, 10);
      if (!isNaN(fromIdx) && typeof targetIndex === 'number' && fromIdx !== targetIndex) {
        onMoveField(fromIdx, targetIndex);
      }
    }
  };

  const handleDragStartExisting = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.setData('application/x-canvas-item-index', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-100/70 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Canvas Toolbar Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Form Tuvali (Content Alanı)</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
              {formConfig.fields.length} Adet Bileşen
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Color Picker */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <div className="flex items-center gap-1">
                {themeColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    title={`Tema: ${color.name}`}
                    onClick={() => onUpdateFormConfig({ themeColor: color.value })}
                    className={`w-5 h-5 rounded-full ${color.hex} transition-transform ${
                      formConfig.themeColor === color.value
                        ? 'scale-110 ring-2 ring-slate-400 ring-offset-1'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {formConfig.fields.length > 0 && (
              <button
                type="button"
                onClick={onClearFields}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-medium bg-white hover:bg-rose-50 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-rose-200 transition-colors"
                title="Tüm form alanlarını temizle"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Tuvali Temizle
              </button>
            )}
          </div>
        </div>

        {/* Main Form Sheet */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 transition-all">
          {/* Form Header Customization */}
          <div className="border-b border-slate-100 pb-6 mb-8 group">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                Canlı Form Başlığı & Açıklaması
              </span>
            </div>

            <input
              type="text"
              value={formConfig.title}
              onChange={(e) => onUpdateFormConfig({ title: e.target.value })}
              placeholder="Form Başlığını Giriniz..."
              className="w-full text-2xl sm:text-3xl font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none transition-colors py-1"
            />

            <textarea
              rows={2}
              value={formConfig.description}
              onChange={(e) => onUpdateFormConfig({ description: e.target.value })}
              placeholder="Form hakkında kullanıcıları yönlendirecek kısa bir açıklama yazınız..."
              className="w-full text-sm text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none transition-colors mt-2 resize-none"
            />
          </div>

          {/* Form Fields Droppable List */}
          {formConfig.fields.length === 0 ? (
            /* Empty State */
            <div
              onDragOver={(e) => handleDragOver(e, 0)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 0)}
              className={`rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
                dragOverIndex === 0
                  ? 'border-indigo-500 bg-indigo-50/70 scale-[1.01]'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>

              <h3 className="text-base font-bold text-slate-800">Form Tuvali Boş</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6 leading-relaxed">
                Soldaki <strong>Toolbox</strong> panelinden <strong>Text Input</strong>,{' '}
                <strong>Textarea</strong> veya <strong>Dropdown</strong> bileşenlerini sürükleyip buraya bırakın veya aşağıdaki hızlı butonları kullanın.
              </p>

              {/* Quick Add Buttons for Core Requirements */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onAddField('text')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-semibold text-blue-700 flex items-center gap-2 shadow-xs transition-all"
                >
                  <Type className="w-4 h-4 text-blue-600" />
                  + Text Input Ekle
                </button>

                <button
                  type="button"
                  onClick={() => onAddField('textarea')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-xs font-semibold text-purple-700 flex items-center gap-2 shadow-xs transition-all"
                >
                  <AlignLeft className="w-4 h-4 text-purple-600" />
                  + Textarea Ekle
                </button>

                <button
                  type="button"
                  onClick={() => onAddField('select')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-semibold text-emerald-700 flex items-center gap-2 shadow-xs transition-all"
                >
                  <ChevronDownSquare className="w-4 h-4 text-emerald-600" />
                  + Dropdown Ekle
                </button>
              </div>
            </div>
          ) : (
            /* Populated Form Fields List */
            <div className="space-y-4">
              {formConfig.fields.map((field, index) => (
                <React.Fragment key={field.id}>
                  {/* Drop zone indicator above item */}
                  <div
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`h-2.5 -my-1 rounded-full transition-all duration-150 flex items-center justify-center ${
                      dragOverIndex === index
                        ? 'bg-indigo-500 scale-y-150 opacity-100 shadow-sm'
                        : 'opacity-0 hover:opacity-20'
                    }`}
                  >
                    {dragOverIndex === index && (
                      <span className="text-[10px] text-white font-bold bg-indigo-700 px-2 rounded-full pointer-events-none">
                        Buraya Bırak
                      </span>
                    )}
                  </div>

                  <FormItemCard
                    field={field}
                    index={index}
                    totalCount={formConfig.fields.length}
                    isSelected={selectedFieldId === field.id}
                    onSelect={() => onSelectField(field.id)}
                    onDelete={() => onDeleteField(field.id)}
                    onDuplicate={() => onDuplicateField(field.id)}
                    onMoveUp={() => onMoveField(index, Math.max(0, index - 1))}
                    onMoveDown={() =>
                      onMoveField(index, Math.min(formConfig.fields.length - 1, index + 1))
                    }
                    onDragStart={(e) => handleDragStartExisting(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                  />
                </React.Fragment>
              ))}

              {/* Bottom drop zone */}
              <div
                onDragOver={(e) => handleDragOver(e, formConfig.fields.length)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, formConfig.fields.length)}
                className={`py-4 rounded-2xl border-2 border-dashed transition-all duration-200 text-center flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  dragOverIndex === formConfig.fields.length || isDraggingOverBottom
                    ? 'border-indigo-500 bg-indigo-50/70 text-indigo-700 scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-400 bg-slate-50/30'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Yeni bileşen eklemek için buraya sürükleyin</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button Customizer */}
          {formConfig.fields.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Gönder Buton Metni
                </label>
                <input
                  type="text"
                  value={formConfig.submitButtonText}
                  onChange={(e) => onUpdateFormConfig({ submitButtonText: e.target.value })}
                  placeholder="Formu Gönder"
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 focus:border-indigo-500 outline-none w-full sm:w-48"
                />
              </div>

              <div className="w-full sm:w-auto">
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-md shadow-indigo-200 opacity-90 cursor-not-allowed"
                >
                  {formConfig.submitButtonText || 'Formu Gönder'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
