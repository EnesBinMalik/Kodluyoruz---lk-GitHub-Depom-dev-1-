import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Globe, CheckCircle2, FileText, User, Github } from 'lucide-react';
import { SubmissionDetails } from '../types/homework';
import { PreviewBannerGenerator } from './PreviewBannerGenerator';

interface SubmissionFormCardProps {
  details: SubmissionDetails;
  onDetailsChange: (details: Partial<SubmissionDetails>) => void;
  onPreviewBlobReady: (blob: Blob) => void;
}

export const SubmissionFormCard: React.FC<SubmissionFormCardProps> = ({
  details,
  onDetailsChange,
  onPreviewBlobReady,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyAll = async () => {
    const fullSummary = `PROJE TESLİM BİLGİLERİ (Kodluyoruz - Ödev 1)
----------------------------------------
Öğrenci: ${details.studentName} (${details.studentEmail})
Proje Adı: ${details.projectName}
Proje Bağlantısı: ${details.projectUrl}
Proje Tanımı: ${details.projectDescription}
Görünürlük: Kamuya Açık (Public)
GitHub Kullanıcı Adı: ${details.githubUsername}
Eğitmen: Hakan Yalçınkaya (Frontend 101)
`;
    await navigator.clipboard.writeText(fullSummary);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span>Kodluyoruz Frontend 101</span>
              <span aria-hidden="true">&middot;</span>
              <span>Git &amp; GitHub Modülü</span>
              <span aria-hidden="true">&middot;</span>
              <span>Ödev 1 Teslim Asistanı</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Proje Detayları ve Teslim Formu
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Ödevinizi Patika.dev / Kodluyoruz platformuna göndermek için aşağıdaki hazır bilgileri kullanabilir, tek tıkla kopyalayabilir veya önizleme görselini indirebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyAll}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              {allCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{allCopied ? 'Tüm Bilgiler Kopyalandı!' : 'Tüm Bilgileri Kopyala'}</span>
            </button>
            <a
              href="https://app.patika.dev"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Patika Paneline Git</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* User Identity Banner */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <User className="w-4 h-4 text-orange-600 shrink-0" />
            <div className="flex-1">
              <label className="text-slate-500 font-medium block">Öğrenci Adı Soyadı</label>
              <input
                type="text"
                value={details.studentName}
                onChange={(e) => onDetailsChange({ studentName: e.target.value })}
                className="w-full text-slate-900 font-semibold bg-white border border-slate-300 rounded px-2 py-0.5 mt-0.5 text-xs focus:outline-hidden focus:border-orange-500"
                placeholder="Örn: Enes Öztürk"
              />
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <Github className="w-4 h-4 text-slate-700 shrink-0" />
            <div className="flex-1">
              <label className="text-slate-500 font-medium block">GitHub Kullanıcı Adı</label>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-slate-400 font-mono text-xs">@</span>
                <input
                  type="text"
                  value={details.githubUsername}
                  onChange={(e) => {
                    const newUsername = e.target.value;
                    onDetailsChange({
                      githubUsername: newUsername,
                      projectUrl: `https://github.com/${newUsername}/${details.projectName}`,
                    });
                  }}
                  className="w-full font-mono text-slate-900 font-semibold bg-white border border-slate-300 rounded px-2 py-0.5 text-xs focus:outline-hidden focus:border-orange-500"
                  placeholder="enesozturk"
                />
              </div>
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p className="text-slate-500 font-medium">Depo Görünürlüğü</p>
              <p className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Public (Kamuya Açık)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Submission Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Ödev Gönderim Formu Alanları
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Bu alanlar Patika.dev ödev teslim arayüzündeki form kutucuklarına birebir karşılık gelir.
          </p>
        </div>

        {/* 1. Proje Adı */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Proje Adı
            </label>
            <span className="text-xs text-slate-400">Gereksinim: "kodluyoruzilkrepo"</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={details.projectName}
              onChange={(e) => onDetailsChange({ projectName: e.target.value })}
              className="flex-1 px-4 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500 focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => copyToClipboard(details.projectName, 'projectName')}
              className="px-3.5 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shrink-0"
              title="Kopyala"
            >
              {copiedField === 'projectName' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. Proje Bağlantısı */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Proje Bağlantısı (URL)
            </label>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>GitHub adınızı düzenleyin:</span>
              <input
                type="text"
                value={details.githubUsername}
                onChange={(e) => {
                  const newUsername = e.target.value;
                  onDetailsChange({
                    githubUsername: newUsername,
                    projectUrl: `https://github.com/${newUsername}/${details.projectName}`,
                  });
                }}
                className="w-36 px-2 py-0.5 text-xs font-mono border border-slate-300 rounded bg-white text-slate-800"
                placeholder="github kullanıcı adı"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={details.projectUrl}
              onChange={(e) => onDetailsChange({ projectUrl: e.target.value })}
              className="flex-1 px-4 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500 focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => copyToClipboard(details.projectUrl, 'projectUrl')}
              className="px-3.5 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 shrink-0"
              title="Kopyala"
            >
              {copiedField === 'projectUrl' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
            <a
              href={details.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
              title="GitHub'da Yeni Sekmede Aç"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3. Proje Tanımı */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Proje Tanımı (Description)
            </label>
            <span className="text-xs text-slate-400">
              {details.projectDescription.length} karakter
            </span>
          </div>
          <div className="relative">
            <textarea
              rows={3}
              value={details.projectDescription}
              onChange={(e) => onDetailsChange({ projectDescription: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500 focus:bg-white transition-colors resize-none"
            />
            <div className="absolute right-3 bottom-3">
              <button
                type="button"
                onClick={() => copyToClipboard(details.projectDescription, 'projectDescription')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                {copiedField === 'projectDescription' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Tanımı Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4. Kamuya Açık Hale Getirmek (Public) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">
              Projeyi kamuya açık hale getirmek
            </p>
            <p className="text-xs text-slate-500">
              Kamu projeleri diğer öğrenenler ve eğitmen Hakan Yalçınkaya tarafından görünürdür.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={details.isPublic}
              onChange={(e) => onDetailsChange({ isPublic: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>

        {/* 5. Yükleme Önizlemesi */}
        <div className="pt-2">
          <PreviewBannerGenerator
            repoName={details.projectName}
            studentName={details.studentName}
            githubUsername={details.githubUsername}
            onBlobReady={onPreviewBlobReady}
          />
        </div>
      </div>

      {/* Instruciton Card for Student */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          Ödevi Gönderirken İzlenecek Son 3 Adım
        </div>
        <ol className="space-y-3 text-sm text-slate-300 list-decimal list-inside leading-relaxed">
          <li>
            <strong className="text-white">Formu Doldurun:</strong> Yukarıdaki "Tüm Bilgileri Kopyala" butonuna tıklayarak veya tek tek ilgili alanları kopyalayarak Patika / Kodluyoruz ödev formuna yapıştırın.
          </li>
          <li>
            <strong className="text-white">Görseli Yükleyin:</strong> "Görseli İndir (.PNG)" butonuna tıklayın. İndirilen <code className="text-orange-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs">kodluyoruzilkrepo-preview.png</code> dosyasını ödev teslim ekranındaki "Yükleme önizlemesi" alanına sürükleyin veya seçin.
          </li>
          <li>
            <strong className="text-white">Gönder Butonuna Basın:</strong> "Projeyi kamuya açık hale getirmek" kutucuğunun işaretli olduğundan emin olup ödevinizi teslim edin!
          </li>
        </ol>
      </div>
    </div>
  );
};
