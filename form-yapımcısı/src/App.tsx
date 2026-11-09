import React, { useState, useEffect, useRef } from 'react';
import { FormConfig, FormField, FieldType } from './types/form';
import { INITIAL_FORM_CONFIG, createDefaultField } from './data/defaultForm';
import { Header } from './components/Header';
import { Toolbox } from './components/Toolbox';
import { Canvas } from './components/Canvas';
import { FieldEditor } from './components/FieldEditor';
import { PreviewModal } from './components/PreviewModal';
import { ExportModal } from './components/ExportModal';
import { SignatureFooter } from './components/SignatureFooter';

const STORAGE_KEY = 'form_builder_state_v1';

export default function App() {
  // Initialize from LocalStorage or default
  const [formConfig, setFormConfig] = useState<FormConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fields && Array.isArray(parsed.fields)) {
          return parsed;
        }
      }
    } catch (e) {
      // Ignore
    }
    return INITIAL_FORM_CONFIG;
  });

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Undo / Redo history management
  const [history, setHistory] = useState<FormConfig[]>([formConfig]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isUndoRedoAction = useRef(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formConfig));
    } catch (e) {
      // Ignore
    }

    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    // Push new state to history if different
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      return [...upToCurrent, formConfig];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [formConfig]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setFormConfig(history[targetIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setFormConfig(history[targetIndex]);
    }
  };

  // Add field to canvas
  const handleAddField = (type: FieldType, targetIndex?: number) => {
    const newField = createDefaultField(type);
    setFormConfig((prev) => {
      const updatedFields = [...prev.fields];
      if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= updatedFields.length) {
        updatedFields.splice(targetIndex, 0, newField);
      } else {
        updatedFields.push(newField);
      }
      return {
        ...prev,
        fields: updatedFields,
      };
    });
    setSelectedFieldId(newField.id);
  };

  // Handle Drag Start from Toolbox
  const handleDragStartFromToolbox = (e: React.DragEvent, type: FieldType) => {
    e.dataTransfer.setData('application/x-form-field-type', type);
    e.dataTransfer.setData('field-type', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Handle Drop on Canvas
  const handleDropFromToolbox = (type: FieldType, targetIndex?: number) => {
    handleAddField(type, targetIndex);
  };

  // Update Field
  const handleUpdateField = (updatedField: FormField) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === updatedField.id ? updatedField : f)),
    }));
  };

  // Delete Field
  const handleDeleteField = (id: string) => {
    setFormConfig((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== id),
    }));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  };

  // Duplicate Field
  const handleDuplicateField = (id: string) => {
    const sourceField = formConfig.fields.find((f) => f.id === id);
    if (!sourceField) return;

    const sourceIndex = formConfig.fields.findIndex((f) => f.id === id);
    const duplicated: FormField = {
      ...JSON.parse(JSON.stringify(sourceField)),
      id: `field_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      label: `${sourceField.label} (Kopya)`,
    };

    setFormConfig((prev) => {
      const updatedFields = [...prev.fields];
      updatedFields.splice(sourceIndex + 1, 0, duplicated);
      return {
        ...prev,
        fields: updatedFields,
      };
    });
    setSelectedFieldId(duplicated.id);
  };

  // Move Field (Reorder)
  const handleMoveField = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setFormConfig((prev) => {
      const updatedFields = [...prev.fields];
      const [movedItem] = updatedFields.splice(fromIndex, 1);
      updatedFields.splice(toIndex, 0, movedItem);
      return {
        ...prev,
        fields: updatedFields,
      };
    });
  };

  // Clear Canvas
  const handleClearFields = () => {
    if (window.confirm('Tüm form bileşenlerini silmek istediğinize emin misiniz?')) {
      setFormConfig((prev) => ({
        ...prev,
        fields: [],
      }));
      setSelectedFieldId(null);
    }
  };

  // Select Preset Template
  const handleSelectTemplate = (newConfig: FormConfig) => {
    setFormConfig(newConfig);
    setSelectedFieldId(null);
  };

  // Currently selected field object
  const activeSelectedField = formConfig.fields.find((f) => f.id === selectedFieldId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header with Preview Button & Signature Badge */}
      <Header
        onOpenPreview={() => setIsPreviewOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSelectTemplate={handleSelectTemplate}
        fieldCount={formConfig.fields.length}
      />

      {/* Main Studio Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left: Toolbox */}
        <Toolbox
          onAddField={handleAddField}
          onDragStartFromToolbox={handleDragStartFromToolbox}
        />

        {/* Center: Canvas Content Area */}
        <Canvas
          formConfig={formConfig}
          selectedFieldId={selectedFieldId}
          onSelectField={(id) => setSelectedFieldId(id)}
          onUpdateFormConfig={(partial) =>
            setFormConfig((prev) => ({ ...prev, ...partial }))
          }
          onDeleteField={handleDeleteField}
          onDuplicateField={handleDuplicateField}
          onMoveField={handleMoveField}
          onAddField={handleAddField}
          onClearFields={handleClearFields}
          onDropFromToolbox={handleDropFromToolbox}
        />

        {/* Right: Field Editor Inspector */}
        <FieldEditor
          field={activeSelectedField}
          onUpdateField={handleUpdateField}
          onDeleteField={handleDeleteField}
          onDuplicateField={handleDuplicateField}
          onClose={() => setSelectedFieldId(null)}
        />
      </main>

      {/* Footer with Signature */}
      <SignatureFooter fieldCount={formConfig.fields.length} />

      {/* Preview Form Modal */}
      <PreviewModal
        formConfig={formConfig}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Export / Import Modal */}
      <ExportModal
        formConfig={formConfig}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onImport={(importedConfig) => {
          setFormConfig(importedConfig);
          setSelectedFieldId(null);
        }}
      />
    </div>
  );
}
