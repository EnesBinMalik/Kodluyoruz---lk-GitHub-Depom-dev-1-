import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SubmissionFormCard } from './components/SubmissionFormCard';
import { RepoExplorer } from './components/RepoExplorer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ForkGuide } from './components/ForkGuide';
import { Checklist } from './components/Checklist';
import { 
  DEFAULT_STUDENT_INFO, 
  getReadmeContent, 
  getIndexHtmlContent, 
  getLicenseContent, 
  getGitignoreContent,
  INITIAL_COMMITS, 
  INITIAL_CHECKLIST 
} from './data/homeworkData';
import { ProjectFile, SubmissionDetails, ChecklistItem } from './types/homework';
import { downloadRepoZip } from './utils/zipGenerator';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('submission');
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  const [submissionDetails, setSubmissionDetails] = useState<SubmissionDetails>({
    projectName: DEFAULT_STUDENT_INFO.repoName,
    projectUrl: `https://github.com/${DEFAULT_STUDENT_INFO.githubUsername}/${DEFAULT_STUDENT_INFO.repoName}`,
    projectDescription: 'Kodluyoruz Frontend 101 Eğitimi kapsamında açtığım ilk repo. README.md, index.html ve MIT Lisansı içermektedir. Git komutları (clone, add, commit, push) eksiksiz uygulanmış ve Hakan Yalçınkaya\'nın reposu forklanmıştır.',
    isPublic: true,
    githubUsername: DEFAULT_STUDENT_INFO.githubUsername,
    studentName: DEFAULT_STUDENT_INFO.name,
    studentEmail: DEFAULT_STUDENT_INFO.email,
  });

  const files: ProjectFile[] = useMemo(() => {
    const readme = getReadmeContent(submissionDetails.githubUsername, submissionDetails.studentName);
    const html = getIndexHtmlContent(submissionDetails.studentName);
    const license = getLicenseContent(submissionDetails.studentName);
    const gitignore = getGitignoreContent();

    return [
      {
        name: 'README.md',
        path: '/README.md',
        content: readme,
        language: 'markdown',
        size: `${(new Blob([readme]).size / 1024).toFixed(1)} KB`,
        lastCommitMessage: 'docs: Add project preview screenshot and final README details',
        lastCommitTime: '10 dakika önce',
      },
      {
        name: 'index.html',
        path: '/index.html',
        content: html,
        language: 'html',
        size: `${(new Blob([html]).size / 1024).toFixed(1)} KB`,
        lastCommitMessage: 'feat: Add index.html starter web page for Kodluyoruz homework',
        lastCommitTime: '25 dakika önce',
      },
      {
        name: 'LICENSE',
        path: '/LICENSE',
        content: license,
        language: 'text',
        size: `${(new Blob([license]).size / 1024).toFixed(1)} KB`,
        lastCommitMessage: 'Initial commit with README.md and MIT License',
        lastCommitTime: '45 dakika önce',
      },
      {
        name: '.gitignore',
        path: '/.gitignore',
        content: gitignore,
        language: 'gitignore',
        size: `${(new Blob([gitignore]).size / 1024).toFixed(1)} KB`,
        lastCommitMessage: 'Initial commit with README.md and MIT License',
        lastCommitTime: '45 dakika önce',
      },
    ];
  }, [submissionDetails.githubUsername, submissionDetails.studentName]);

  const handleDetailsChange = (updated: Partial<SubmissionDetails>) => {
    setSubmissionDetails((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleToggleChecklist = (id: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      await downloadRepoZip(
        files.map((f) => ({ name: f.name, content: f.content })),
        previewBlob,
        submissionDetails.projectName
      );
    } catch (err) {
      console.error('Zip download error:', err);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDownloadZip={handleDownloadZip}
        isDownloadingZip={isDownloadingZip}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'submission' && (
          <SubmissionFormCard
            details={submissionDetails}
            onDetailsChange={handleDetailsChange}
            onPreviewBlobReady={setPreviewBlob}
          />
        )}

        {activeTab === 'repo' && (
          <RepoExplorer
            files={files}
            commits={INITIAL_COMMITS}
            githubUsername={submissionDetails.githubUsername}
            repoName={submissionDetails.projectName}
            studentName={submissionDetails.studentName}
          />
        )}


        {activeTab === 'terminal' && (
          <TerminalSimulator
            githubUsername={submissionDetails.githubUsername}
            repoName={submissionDetails.projectName}
          />
        )}

        {activeTab === 'fork' && (
          <ForkGuide githubUsername={submissionDetails.githubUsername} />
        )}

        {activeTab === 'checklist' && (
          <Checklist
            items={checklistItems}
            onToggleItem={handleToggleChecklist}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Kodluyoruz Frontend 101</span>
            <span aria-hidden="true">&middot;</span>
            <span>Eğitmen: Hakan Yalçınkaya</span>
            <span aria-hidden="true">&middot;</span>
            <span>Öğrenci: {submissionDetails.studentName}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Hazırlayan: AI Studio Assistant</span>
            <span aria-hidden="true">&middot;</span>
            <span>MIT Lisansı 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
