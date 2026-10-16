import React, { useState } from 'react';
import { 
  FileCode, 
  FileText, 
  Shield, 
  GitBranch, 
  GitCommit as GitCommitIcon, 
  Copy, 
  Check, 
  Eye, 
  Code, 
  Download, 
  CheckCircle2, 
  Terminal
} from 'lucide-react';
import { GitCommit, ProjectFile } from '../types/homework';

interface RepoExplorerProps {
  files: ProjectFile[];
  commits: GitCommit[];
  githubUsername: string;
  repoName: string;
  studentName?: string;
}

export const RepoExplorer: React.FC<RepoExplorerProps> = ({
  files,
  commits,
  githubUsername,
  repoName,
  studentName = 'Enes Öztürk',
}) => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(files[0]);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [activeSubTab, setActiveSubTab] = useState<'files' | 'commits'>('files');
  const [copiedClone, setCopiedClone] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);

  const cloneUrl = `https://github.com/${githubUsername}/${repoName}.git`;

  const handleCopyClone = async () => {
    await navigator.clipboard.writeText(cloneUrl);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleCopyFileContent = async () => {
    await navigator.clipboard.writeText(selectedFile.content);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.html')) return <FileCode className="w-4 h-4 text-orange-500" />;
    if (fileName.endsWith('.md')) return <FileText className="w-4 h-4 text-blue-500" />;
    if (fileName === 'LICENSE') return <Shield className="w-4 h-4 text-emerald-500" />;
    return <FileText className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="space-y-6">
      {/* GitHub Repo Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">
                {githubUsername}
              </span>
              <span className="text-slate-400">/</span>
              <h1 className="text-lg font-bold text-slate-900 font-mono">
                {repoName}
              </h1>
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Public
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Kodluyoruz Eğitimi kapsamında açtığım ilk repo &bull; MIT License
            </p>
          </div>

          {/* Quick Clone Bar */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-700">
              <Terminal className="w-3.5 h-3.5 mr-2 text-slate-400 shrink-0" />
              <span className="truncate max-w-[200px] sm:max-w-[260px]">{cloneUrl}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyClone}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shrink-0"
              title="Klonlama Bağlantısını Kopyala"
            >
              {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedClone ? 'Kopyalandı' : 'Clone URL'}</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation (Code vs Commits) */}
        <div className="flex items-center gap-4 pt-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveSubTab('files')}
            className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer ${
              activeSubTab === 'files'
                ? 'text-orange-600 font-bold border-b-2 border-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Dosyalar ({files.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('commits')}
            className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer ${
              activeSubTab === 'commits'
                ? 'text-orange-600 font-bold border-b-2 border-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitCommitIcon className="w-3.5 h-3.5" />
            <span>Commit Geçmişi ({commits.length})</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'files' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* File Directory Sidebar */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono">main</span> dalı
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {files.length} dosya
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {files.map((file) => {
                const isSelected = selectedFile.name === file.name;
                return (
                  <button
                    key={file.name}
                    type="button"
                    onClick={() => {
                      setSelectedFile(file);
                      // default to preview for markdown or html
                      if (file.name.endsWith('.md') || file.name.endsWith('.html')) {
                        setViewMode('preview');
                      } else {
                        setViewMode('code');
                      }
                    }}
                    className={`w-full text-left p-3.5 transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-orange-50/70 border-l-2 border-orange-600 text-orange-950 font-semibold'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {getFileIcon(file.name)}
                      <span className="text-xs font-mono truncate">{file.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono ml-2 shrink-0">
                      {file.size}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <p className="font-medium text-slate-700">Son Commit:</p>
              <p className="font-mono text-[11px] text-slate-600 truncate">
                {selectedFile.lastCommitMessage}
              </p>
              <p className="text-[10px] text-slate-400">{selectedFile.lastCommitTime}</p>
            </div>
          </div>

          {/* File Content / Preview Stage */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            {/* File Viewer Toolbar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {getFileIcon(selectedFile.name)}
                <span className="text-xs font-mono font-bold text-slate-900">
                  {selectedFile.name}
                </span>
                <span className="text-slate-400 text-xs">&middot;</span>
                <span className="text-xs text-slate-500 font-mono">{selectedFile.size}</span>
              </div>

              <div className="flex items-center gap-2">
                {(selectedFile.name.endsWith('.md') || selectedFile.name.endsWith('.html')) && (
                  <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setViewMode('preview')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                        viewMode === 'preview'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{selectedFile.name.endsWith('.html') ? 'Web Önizleme' : 'Markdown'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('code')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                        viewMode === 'code'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Kaynak Kod</span>
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCopyFileContent}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
                  title="Dosya İçeriğini Kopyala"
                >
                  {copiedContent ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedContent ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  title="Dosyayı İndir"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Viewer Body */}
            <div>
              {viewMode === 'preview' && selectedFile.name.endsWith('.html') ? (
                <div className="p-4 bg-slate-100">
                  <div className="bg-white rounded-lg shadow-xs border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 border-b border-slate-200 px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      <span className="ml-2">http://localhost:3000/index.html (Tarayıcı Önizlemesi)</span>
                    </div>
                    <iframe
                      title="HTML Preview"
                      srcDoc={selectedFile.content}
                      className="w-full h-[520px] border-none"
                    />
                  </div>
                </div>
              ) : viewMode === 'preview' && selectedFile.name.endsWith('.md') ? (
                <div className="p-6 sm:p-8 prose prose-slate max-w-none prose-headings:font-bold prose-a:text-orange-600 prose-pre:bg-slate-900 prose-pre:text-slate-100">
                  <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
                    <h1 className="text-2xl font-bold text-slate-900 pb-2 border-b border-slate-200">
                      Kodluyoruz İlk Repo
                    </h1>
                    <p>
                      Bu repo{' '}
                      <a href="https://www.kodluyoruz.org" target="_blank" rel="noreferrer" className="text-orange-600 underline">
                        Kodluyoruz
                      </a>{' '}
                      Front-End 101 Eğitimi kapsamında açtığım ilk repodur. İçerisinde bir adet <code className="text-orange-700 bg-orange-50 px-1 py-0.5 rounded">index.html</code> ve bir adet <code className="text-orange-700 bg-orange-50 px-1 py-0.5 rounded">README.md</code> dosyası barındırmaktadır.
                    </p>

                    <div className="my-6 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                      <div>
                        <span className="text-xs text-orange-400 font-mono uppercase tracking-wider">Proje Görseli</span>
                        <p className="text-base font-bold text-white mt-1">kodluyoruzilkrepo &bull; Önizleme</p>
                      </div>
                      <span className="text-xs bg-orange-600 text-white px-2.5 py-1 rounded font-medium">MIT Lisansı</span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 pt-2 border-b border-slate-100">
                      Proje Hakkında
                    </h2>
                    <p>
                      Bu proje, Git ve GitHub temellerini öğrenmek, terminal üzerinden sürüm kontrol sistemlerini yönetmek ve açık kaynak ekosistemine ilk adımı atmak amacıyla hazırlanmıştır.
                    </p>

                    <h2 className="text-lg font-bold text-slate-900 pt-2 border-b border-slate-100">
                      İçerik Listesi
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>index.html:</strong> Temel HTML5 yapısı ve başlangıç içeriklerini barındıran web sayfası.</li>
                      <li><strong>README.md:</strong> Proje tanıtımı ve kurulum adımlarını içeren dokümantasyon dosyası.</li>
                      <li><strong>LICENSE:</strong> Projenin açık kaynak MIT Lisansı.</li>
                    </ul>

                    <h2 className="text-lg font-bold text-slate-900 pt-2 border-b border-slate-100">
                      Kurulum ve Kullanım
                    </h2>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
{`git clone ${cloneUrl}
cd ${repoName}
start index.html`}
                    </pre>

                    <h2 className="text-lg font-bold text-slate-900 pt-2 border-b border-slate-100">
                      Eğitmen &amp; Katkıda Bulunanlar
                    </h2>
                    <p>
                      Eğitmen: <strong>Hakan Yalçınkaya</strong> &bull; Öğrenci: <strong>{studentName}</strong>
                    </p>

                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-4 overflow-x-auto max-h-[580px]">
                  <pre className="font-mono text-xs text-slate-200 leading-relaxed">
                    {selectedFile.content.split('\n').map((line, idx) => (
                      <div key={idx} className="table-row">
                        <span className="table-cell select-none text-slate-600 pr-4 text-right tabular-nums w-10">
                          {idx + 1}
                        </span>
                        <span className="table-cell whitespace-pre">{line}</span>
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Commits Timeline */
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Commit Geçmişi (Git Log)
            </h3>
            <p className="text-xs text-slate-500">
              Ödev kapsamında tamamlanan tüm commit kayıtları ve hash kodları.
            </p>
          </div>

          <div className="space-y-4">
            {commits.map((c, idx) => (
              <div
                key={c.hash}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                      {c.hash}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {c.message}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{c.author}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{c.email}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{c.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500 font-mono">
                    {c.filesChanged} dosya değişti
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
