import React, { useState } from 'react';
import { GitFork, ExternalLink, Copy, Check, Terminal, BookOpen, Layers } from 'lucide-react';

interface ForkGuideProps {
  githubUsername: string;
}

export const ForkGuide: React.FC<ForkGuideProps> = ({ githubUsername }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const teacherRepoUrl = 'https://github.com/hakanyalcinkaya/kodluyoruz-frontend-101-egitimi';
  const myForkUrl = `https://github.com/${githubUsername}/kodluyoruz-frontend-101-egitimi`;

  const forkSteps = [
    {
      title: '1. Eğitmenin Reposunu Açın',
      desc: 'Hakan Yalçınkaya\'nın orijinal Kodluyoruz Frontend 101 eğitim deposunu ziyaret edin.',
      actionText: 'Depoyu GitHub\'da Aç',
      actionUrl: teacherRepoUrl,
      cmd: null,
    },
    {
      title: '2. "Fork" Butonuna Tıklayın',
      desc: 'Sağ üst köşedeki "Fork" butonuna basarak depoyu kendi GitHub hesabınıza kopyalayın ("Create a new fork").',
      actionText: null,
      actionUrl: null,
      cmd: null,
    },
    {
      title: '3. Forkladığınız Repoyu Bilgisayara Klonlayın',
      desc: 'Kendi hesabınıza geçen depoyu bilgisayarınıza klonlayın.',
      actionText: null,
      actionUrl: null,
      cmd: `git clone ${myForkUrl}.git`,
    },
    {
      title: '4. Dizinine Geçin ve Kaynak Kodları İnceleyin',
      desc: 'Klasöre girip eğitmenin hazırladığı HTML, CSS ve JavaScript örneklerini inceleyin.',
      actionText: null,
      actionUrl: null,
      cmd: `cd kodluyoruz-frontend-101-egitimi\nls -la`,
    },
    {
      title: '5. Upstream (Orijinal Depo) Senkronizasyonu Ekleyin',
      desc: 'Eğitmenin gelecekte yapacağı güncellemeleri kaçırmamak için upstream uzak dalını tanımlayın.',
      actionText: null,
      actionUrl: null,
      cmd: `git remote add upstream ${teacherRepoUrl}.git\ngit remote -v`,
    },
  ];

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span>Hakan Yalçınkaya</span>
              <span aria-hidden="true">&middot;</span>
              <span>Kodluyoruz Frontend 101</span>
              <span aria-hidden="true">&middot;</span>
              <span>Fork &amp; Upstream İşlemleri</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <GitFork className="w-6 h-6 text-purple-600" />
              Eğitmen Reposunu Forklama Rehberi
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Ödev metninde belirtilen <code className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded text-xs font-mono">kodluyoruz-frontend-101-egitimi</code> reposunu kendi hesabınıza kopyalama ve kaynak dosyaları inceleme adımları.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={teacherRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Eğitmenin Reposunu Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Concept callout */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-600" />
              Fork Nedir?
            </span>
            <p className="text-slate-600 leading-relaxed">
              Fork, başkasına ait bir açık kaynak projesinin tam bir kopyasını kendi GitHub hesabınıza aktarma işlemidir. Orijinal projeyi bozmadan üzerinde özgürce değişiklik yapmanızı sağlar.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              Clone vs Fork Farkı
            </span>
            <p className="text-slate-600 leading-relaxed">
              <strong>Clone:</strong> Bir depoyu GitHub'dan bilgisayarınıza indirir. <br />
              <strong>Fork:</strong> Bir depoyu GitHub üzerinde başka bir hesaptan kendi GitHub hesabınıza kopyalar.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step list */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Adım Adım Forklama Süreci
        </h3>

        <div className="space-y-4">
          {forkSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200/90 hover:border-slate-300 transition-colors bg-white flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-xl">
                <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                {step.cmd && (
                  <div className="pt-2">
                    <pre className="p-3 bg-slate-950 text-slate-200 rounded-lg font-mono text-xs overflow-x-auto flex items-center justify-between gap-2">
                      <code>{step.cmd}</code>
                      <button
                        type="button"
                        onClick={() => handleCopy(step.cmd!, idx)}
                        className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors shrink-0"
                        title="Kopyala"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </pre>
                  </div>
                )}
              </div>

              {step.actionUrl && (
                <div className="shrink-0 pt-1">
                  <a
                    href={step.actionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{step.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
