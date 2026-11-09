import React from 'react';
import { COURSE_LEVELS } from '../data/projects';
import { ProjectItem } from '../types';
import { CheckCircle2, PlayCircle, Lock, ChevronRight, Layers } from 'lucide-react';

interface ProjectHierarchyProps {
  activeProjectId: string;
  onSelectProject: (project: ProjectItem) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectHierarchy: React.FC<ProjectHierarchyProps> = ({
  activeProjectId,
  onSelectProject,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Frontend Projeleri Müfredatı
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Frontend Web Development Path
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Kapat"
        >
          ✕
        </button>
      </div>

      {/* Curriculum list */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {COURSE_LEVELS.map((levelGroup) => (
          <div key={levelGroup.level} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide uppercase">
                {levelGroup.title}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {levelGroup.badge}
              </span>
            </div>

            <div className="space-y-1.5">
              {levelGroup.projects.map((project) => {
                const isActive = project.id === activeProjectId;
                const isCompleted = project.status === 'completed';

                return (
                  <button
                    key={project.id}
                    onClick={() => {
                      onSelectProject(project);
                      if (window.innerWidth < 640) {
                        onClose();
                      }
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-xs'
                        : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isActive ? (
                        <PlayCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-xs font-semibold truncate ${
                            isActive
                              ? 'text-indigo-900 dark:text-indigo-200'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {project.title}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {project.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer attribution */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Geliştirici &middot;{' '}
          <span className="font-semibold text-slate-900 dark:text-white">
            Enes Öztürk
          </span>
        </p>
      </div>
    </div>
  );
};
