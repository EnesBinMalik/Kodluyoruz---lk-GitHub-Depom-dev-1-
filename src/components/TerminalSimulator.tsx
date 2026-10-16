import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, ChevronRight, HelpCircle } from 'lucide-react';

interface TerminalSimulatorProps {
  githubUsername: string;
  repoName: string;
}

interface CommandStep {
  cmd: string;
  output: string;
  explanation: string;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  githubUsername,
  repoName,
}) => {
  const steps: CommandStep[] = [
    {
      cmd: `git clone https://github.com/${githubUsername}/${repoName}.git`,
      output: `Cloning into '${repoName}'...\nremote: Enumerating objects: 5, done.\nremote: Counting objects: 100% (5/5), done.\nremote: Compressing objects: 100% (4/4), done.\nremote: Total 5 (delta 0), reused 0 (delta 0)\nReceiving objects: 100% (5/5), done.`,
      explanation: 'GitHub üzerindeki uzak depoyu yerel bilgisayarınıza indirir.',
    },
    {
      cmd: `cd ${repoName}`,
      output: `~/projects/${repoName} (main)`,
      explanation: 'Yeni oluşturulan ve klonlanan projenin dizinine geçiş yapar.',
    },
    {
      cmd: `touch index.html`,
      output: `Dosya oluşturuldu: index.html`,
      explanation: 'Ödev kapsamında istenen ilk web sayfası dosyasını yaratır.',
    },
    {
      cmd: `git status`,
      output: `On branch main\nYour branch is up to date with 'origin/main'.\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\t\x1b[31mindex.html\x1b[0m\n\nnothing added to commit but untracked files present (use "git add" to track)`,
      explanation: 'Depodaki mevcut dosya durumlarını ve henüz takibe alınmamış değişiklikleri listeler.',
    },
    {
      cmd: `git add .`,
      output: `Tüm değişiklikler staging alanına (geçici hazırlık alanı) eklendi.`,
      explanation: 'Dizindeki tüm yeni ve güncellenmiş dosyaları commite hazırlar.',
    },
    {
      cmd: `git commit -m "feat: Add index.html starter template and update README"`,
      output: `[main a39f1c2] feat: Add index.html starter template and update README\n 2 files changed, 52 insertions(+)\n create mode 100644 index.html`,
      explanation: 'Hazırlık alanındaki dosyaları anlamlı bir mesajla yerel Git geçmişine kaydeder.',
    },
    {
      cmd: `git push origin main`,
      output: `Enumerating objects: 7, done.\nCounting objects: 100% (7/7), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (5/5), done.\nWriting objects: 100% (5/5), 1.24 KiB | 1.24 MiB/s, done.\nTotal 5 (delta 1), reused 0 (delta 0)\nTo https://github.com/${githubUsername}/${repoName}.git\n   1c49b09..a39f1c2  main -> main`,
      explanation: 'Yereldeki commitleri GitHub üzerindeki uzak (origin) main dalına yükler.',
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: steps[0].cmd, output: steps[0].output },
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setHistory((prev) => [...prev, { cmd: steps[nextIdx].cmd, output: steps[nextIdx].output }]);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setHistory([{ cmd: steps[0].cmd, output: steps[0].output }]);
  };

  const handlePlayAll = () => {
    setCurrentStepIndex(steps.length - 1);
    setHistory(steps.map((s) => ({ cmd: s.cmd, output: s.output })));
  };

  const copyCommand = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-orange-600" />
              İnteraktif Git Terminal Simülatörü
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Ödevde yapılması gereken tüm terminal komutlarını adım adım çalıştırın veya terminalinize kopyalayın.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNextStep}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Sonraki Komutu Çalıştır ({currentStepIndex + 1}/{steps.length})</span>
            </button>
            <button
              type="button"
              onClick={handlePlayAll}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Hepsini Çalıştır
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              title="Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Command Highlight */}
        <div className="mt-4 p-4 rounded-xl bg-orange-50/70 border border-orange-200/60 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-orange-800 uppercase tracking-wider flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
              Adım {currentStepIndex + 1}: {steps[currentStepIndex].explanation}
            </span>
            <p className="text-sm font-mono text-slate-900 font-bold">
              $ {steps[currentStepIndex].cmd}
            </p>
          </div>
          <button
            type="button"
            onClick={() => copyCommand(steps[currentStepIndex].cmd, currentStepIndex)}
            className="px-3 py-1.5 text-xs font-medium bg-white text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1 shrink-0"
          >
            {copiedIndex === currentStepIndex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedIndex === currentStepIndex ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200 shadow-lg">
        {/* Terminal Header */}
        <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            <span className="text-xs font-mono text-slate-400 ml-2">
              bash — {githubUsername}@{repoName}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">zsh / git-cli</span>
        </div>

        {/* Terminal Output */}
        <div className="p-5 font-mono text-xs leading-relaxed max-h-[460px] overflow-y-auto space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="text-orange-400 font-semibold">{repoName} (main)</span>
                <span className="text-white font-bold">{item.cmd}</span>
              </div>
              <pre className="text-slate-300 pl-5 whitespace-pre-wrap font-mono text-[11.5px]">
                {item.output}
              </pre>
            </div>
          ))}

          {/* Active prompt line */}
          <div className="flex items-center gap-2 text-emerald-400 pt-1">
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span className="text-orange-400 font-semibold">{repoName} (main)</span>
            <span className="w-2 h-4 bg-slate-400 inline-block animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Cheat Sheet Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h4 className="text-sm font-bold text-slate-900 mb-3">
          Ödevde Kullanılan Tüm Git Komutları Listesi (Cheat Sheet)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2.5 font-semibold">Komut</th>
                <th className="py-2.5 font-semibold">Açıklama</th>
                <th className="py-2.5 font-semibold text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {steps.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 font-mono text-slate-900 font-medium">{s.cmd}</td>
                  <td className="py-2.5 text-slate-600">{s.explanation}</td>
                  <td className="py-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => copyCommand(s.cmd, idx + 100)}
                      className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded hover:bg-white"
                    >
                      {copiedIndex === idx + 100 ? 'Kopyalandı' : 'Kopyala'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
