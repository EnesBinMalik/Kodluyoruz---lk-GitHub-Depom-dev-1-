import React, { useState } from 'react';
import {
  Type,
  AlignLeft,
  ChevronDownSquare,
  Mail,
  Hash,
  CheckSquare,
  CircleDot,
  Calendar,
  Plus,
  GripVertical,
  HelpCircle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { TOOLBOX_ITEMS } from '../data/defaultForm';
import { FieldType, ToolboxItemDefinition } from '../types/form';

interface ToolboxProps {
  onAddField: (type: FieldType) => void;
  onDragStartFromToolbox: (e: React.DragEvent, type: FieldType) => void;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Type':
      return <Type className="w-5 h-5 text-blue-600" />;
    case 'AlignLeft':
      return <AlignLeft className="w-5 h-5 text-purple-600" />;
    case 'ChevronDownSquare':
      return <ChevronDownSquare className="w-5 h-5 text-emerald-600" />;
    case 'Mail':
      return <Mail className="w-5 h-5 text-amber-600" />;
    case 'Hash':
      return <Hash className="w-5 h-5 text-pink-600" />;
    case 'CheckSquare':
      return <CheckSquare className="w-5 h-5 text-teal-600" />;
    case 'CircleDot':
      return <CircleDot className="w-5 h-5 text-indigo-600" />;
    case 'Calendar':
      return <Calendar className="w-5 h-5 text-orange-600" />;
    default:
      return <Type className="w-5 h-5 text-slate-600" />;
  }
};

export const Toolbox: React.FC<ToolboxProps> = ({ onAddField, onDragStartFromToolbox }) => {
  const [filter, setFilter] = useState<'all' | 'core' | 'advanced'>('all');

  const coreItems = TOOLBOX_ITEMS.filter((item) => item.category === 'core');
  const advancedItems = TOOLBOX_ITEMS.filter((item) => item.category === 'advanced');

  const renderItemCard = (item: ToolboxItemDefinition, isCore: boolean = false) => {
    return (
      <div
        key={item.type}
        draggable
        onDragStart={(e) => onDragStartFromToolbox(e, item.type)}
        className={`group relative flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
          isCore
            ? 'bg-white border-indigo-100/80 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50/60'
            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
            <GripVertical className="w-4 h-4" />
          </div>

          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
              isCore ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-700'
            }`}
          >
            {getIconComponent(item.icon)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-800 tracking-tight truncate">
                {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
              </span>
              {isCore && (
                <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Temel
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate max-w-[170px] mt-0.5">
              {item.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAddField(item.type)}
          title="Forma Ekle"
          className="opacity-80 group-hover:opacity-100 ml-2 w-8 h-8 rounded-lg bg-slate-50 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 border border-slate-200 hover:border-indigo-600 hover:shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <aside className="w-80 bg-slate-50/70 border-r border-slate-200 flex flex-col h-full shrink-0">
      {/* Toolbox Header */}
      <div className="p-4 border-b border-slate-200 bg-white/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-bold text-slate-900 text-sm tracking-tight">Araç Kutusu (Toolbox)</h2>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {TOOLBOX_ITEMS.length} Öğe
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Bileşenleri sürükleyip tuvale bırakın veya <span className="font-semibold text-indigo-600">+</span> butonuna basarak ekleyin.
        </p>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 mt-3 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex-1 py-1 px-2 rounded-md font-medium transition-all ${
              filter === 'all'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tümü
          </button>
          <button
            type="button"
            onClick={() => setFilter('core')}
            className={`flex-1 py-1 px-2 rounded-md font-medium transition-all ${
              filter === 'core'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Temel (3)
          </button>
          <button
            type="button"
            onClick={() => setFilter('advanced')}
            className={`flex-1 py-1 px-2 rounded-md font-medium transition-all ${
              filter === 'advanced'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ekstra (5)
          </button>
        </div>
      </div>

      {/* Toolbox Items Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {(filter === 'all' || filter === 'core') && (
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 px-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                Gereksinim Bileşenleri
              </h3>
            </div>
            <div className="space-y-2.5">
              {coreItems.map((item) => renderItemCard(item, true))}
            </div>
          </div>
        )}

        {(filter === 'all' || filter === 'advanced') && (
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 px-1">
              <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                Gelişmiş Form Elemanları
              </h3>
            </div>
            <div className="space-y-2.5">
              {advancedItems.map((item) => renderItemCard(item, false))}
            </div>
          </div>
        )}

        <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold">İpucu:</span> Formdaki elemanları sağ panelden anında düzenleyebilir, yukarı/aşağı taşıyabilir ve silebilirsiniz.
          </p>
        </div>
      </div>
    </aside>
  );
};
