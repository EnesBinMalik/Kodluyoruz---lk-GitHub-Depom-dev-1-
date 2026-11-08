import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0E121B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-all"
      >
        {/* Header Actions */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#0E121B]/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Visual */}
        <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-800">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 id="project-modal-title" className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Temel Yetenekler & Mimari
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Kullanılan Teknolojiler
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
              {project.tags.map((tag, idx) => (
                <span key={idx}>
                  {tag}
                  {idx < project.tags.length - 1 && <span className="text-slate-400 ml-3">/</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Enes Öztürk İmzalı Çalışma
            </div>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Kaynak Kodu</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Canlı Önizleme</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
