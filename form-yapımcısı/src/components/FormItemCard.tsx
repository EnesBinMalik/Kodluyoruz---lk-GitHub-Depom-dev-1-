import React from 'react';
import {
  GripVertical,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Edit3,
  Asterisk,
  ChevronDown as ChevronDownIcon,
} from 'lucide-react';
import { FormField } from '../types/form';

interface FormItemCardProps {
  field: FormField;
  isSelected: boolean;
  index: number;
  totalCount: number;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const FormItemCard: React.FC<FormItemCardProps> = ({
  field,
  isSelected,
  index,
  totalCount,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const getFieldTypeBadge = () => {
    switch (field.type) {
      case 'text':
        return { label: 'Text Input', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'textarea':
        return { label: 'Textarea', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'select':
        return { label: 'Dropdown', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'email':
        return { label: 'Email', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'number':
        return { label: 'Number', bg: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 'checkbox':
        return { label: 'Checkbox', bg: 'bg-teal-50 text-teal-700 border-teal-200' };
      case 'radio':
        return { label: 'Radio', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'date':
        return { label: 'Date', bg: 'bg-orange-50 text-orange-700 border-orange-200' };
      default:
        return { label: field.type, bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const badge = getFieldTypeBadge();

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onSelect}
      className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Top Bar with Handles & Actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          {/* Drag Handle */}
          <div
            className="p-1 -ml-1 text-slate-400 hover:text-indigo-600 cursor-grab active:cursor-grabbing rounded"
            title="Sürükleyip Sırasını Değiştir"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border tracking-wide uppercase ${badge.bg}`}
          >
            {badge.label}
          </span>

          <span className="text-xs text-slate-400 font-mono">#{index + 1}</span>
        </div>

        {/* Action Controls */}
        <div
          className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Move Up */}
          <button
            type="button"
            disabled={index === 0}
            onClick={onMoveUp}
            title="Yukarı Taşı"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Move Down */}
          <button
            type="button"
            disabled={index === totalCount - 1}
            onClick={onMoveDown}
            title="Aşağı Taşı"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Duplicate */}
          <button
            type="button"
            onClick={onDuplicate}
            title="Alanı Çoğalt"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          {/* Edit / Select */}
          <button
            type="button"
            onClick={onSelect}
            title="Alanı Düzenle"
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
              isSelected
                ? 'bg-indigo-600 text-white'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={onDelete}
            title="Alanı Sil"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Field Content Preview */}
      <div className="p-5">
        {/* Label & Required Indicator */}
        <div className="flex items-center gap-1.5 mb-2">
          <label className="text-sm font-semibold text-slate-800 cursor-pointer">
            {field.label || 'İsimsiz Alan'}
          </label>
          {field.required && (
            <span
              className="text-rose-500 text-xs font-bold flex items-center"
              title="Zorunlu Alan"
            >
              <Asterisk className="w-3.5 h-3.5" />
              <span className="text-[10px] tracking-tight bg-rose-50 text-rose-600 px-1 py-0.2 rounded border border-rose-200/50">
                Zorunlu
              </span>
            </span>
          )}
        </div>

        {/* Mock Component Display */}
        <div className="mt-1 pointer-events-none select-none">
          {field.type === 'text' && (
            <input
              type="text"
              readOnly
              placeholder={field.placeholder || 'Metin giriniz...'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-400 cursor-pointer"
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              readOnly
              rows={field.rows || 3}
              placeholder={field.placeholder || 'Çok satırlı metin giriniz...'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-400 resize-none cursor-pointer"
            />
          )}

          {field.type === 'select' && (
            <div className="relative">
              <select
                disabled
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-400 cursor-pointer pr-10"
              >
                <option>{field.placeholder || '-- Bir Seçenek Belirleyin --'}</option>
                {field.options?.map((opt) => (
                  <option key={opt.id} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
            </div>
          )}

          {field.type === 'email' && (
            <input
              type="email"
              readOnly
              placeholder={field.placeholder || 'ornek@alanadi.com'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-400 cursor-pointer"
            />
          )}

          {field.type === 'number' && (
            <input
              type="number"
              readOnly
              placeholder={field.placeholder || '0'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-400 cursor-pointer"
            />
          )}

          {field.type === 'checkbox' && (
            <div className="flex items-center gap-3 py-1">
              <div className="w-5 h-5 rounded-md border border-slate-300 bg-slate-50 flex items-center justify-center" />
              <span className="text-sm text-slate-600">
                {field.placeholder || 'Bu seçeneği onaylayın'}
              </span>
            </div>
          )}

          {field.type === 'radio' && (
            <div className="space-y-2 py-1">
              {field.options?.map((opt, i) => (
                <div key={opt.id || i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center">
                    {i === 0 && <div className="w-2 h-2 rounded-full bg-slate-300" />}
                  </div>
                  <span className="text-sm text-slate-600">{opt.label}</span>
                </div>
              ))}
            </div>
          )}

          {field.type === 'date' && (
            <input
              type="text"
              readOnly
              placeholder="GG/AA/YYYY"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-400 cursor-pointer"
            />
          )}
        </div>

        {/* Help Text */}
        {field.helpText && (
          <p className="mt-2 text-xs text-slate-500 italic flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-slate-400" />
            {field.helpText}
          </p>
        )}
      </div>

      {/* Selected Indicator Ribbon */}
      {isSelected && (
        <div className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
          Düzenleniyor
        </div>
      )}
    </div>
  );
};
