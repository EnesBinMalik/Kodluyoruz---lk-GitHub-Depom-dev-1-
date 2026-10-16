import React, { useEffect, useRef, useState } from 'react';
import { Download, RefreshCw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

interface PreviewBannerGeneratorProps {
  repoName: string;
  studentName: string;
  githubUsername: string;
  onBlobReady?: (blob: Blob) => void;
}

export const PreviewBannerGenerator: React.FC<PreviewBannerGeneratorProps> = ({
  repoName,
  studentName,
  githubUsername,
  onBlobReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const drawBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // Background gradient: sleek dark developer theme with warm Kodluyoruz glow
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0F172A');
    bgGrad.addColorStop(0.5, '#1E293B');
    bgGrad.addColorStop(1, '#090D16');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle ambient glow
    const radialGlow = ctx.createRadialGradient(900, 150, 10, 900, 150, 450);
    radialGlow.addColorStop(0, 'rgba(255, 90, 54, 0.25)');
    radialGlow.addColorStop(1, 'rgba(255, 90, 54, 0)');
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, width, height);

    // Subtle grid dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 40; x < width; x += 40) {
      for (let y = 40; y < height; y += 40) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Outer subtle border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    // Header badge
    ctx.fillStyle = 'rgba(255, 90, 54, 0.15)';
    ctx.strokeStyle = 'rgba(255, 90, 54, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(70, 70, 240, 38, 8);
    ctx.fill();
    ctx.stroke();

    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FF7A59';
    ctx.fillText('KODLUYORUZ • ÖDEV 1', 86, 94);

    // Repo Name Title
    ctx.font = '700 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(repoName, 70, 175);

    // Subtitle / Description
    ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Kodluyoruz Frontend 101 Eğitimi Kapsamında Açtığım İlk Repo', 70, 218);

    // Student & Mentor Card
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(70, 260, 450, 150, 12);
    ctx.fill();
    ctx.stroke();

    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('ÖĞRENCİ BİLGİLERİ', 95, 292);

    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#F8FAFC';
    ctx.fillText(studentName, 95, 325);

    ctx.font = '400 15px "JetBrains Mono", monospace';
    ctx.fillStyle = '#38BDF8';
    ctx.fillText(`github.com/${githubUsername}`, 95, 355);

    ctx.font = '400 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Eğitmen: Hakan Yalçınkaya (Frontend 101)', 95, 388);

    // Terminal / Code box preview on the right
    const boxX = 560;
    const boxY = 120;
    const boxW = 570;
    const boxH = 430;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 12);
    ctx.fill();
    ctx.stroke();

    // Mac window dots
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(boxX + 25, boxY + 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(boxX + 45, boxY + 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.arc(boxX + 65, boxY + 22, 6, 0, Math.PI * 2);
    ctx.fill();

    // Terminal tab title
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748B';
    ctx.fillText('terminal — git workflow & files', boxX + 90, boxY + 27);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(boxX, boxY + 44);
    ctx.lineTo(boxX + boxW, boxY + 44);
    ctx.stroke();

    // Code lines
    ctx.font = '400 14.5px "JetBrains Mono", monospace';
    const lines = [
      { text: `$ git clone https://github.com/${githubUsername}/${repoName}.git`, color: '#38BDF8' },
      { text: `Cloning into '${repoName}'...`, color: '#64748B' },
      { text: `remote: Total 3 (delta 0), reused 3 (delta 0)`, color: '#64748B' },
      { text: `$ cd ${repoName}`, color: '#38BDF8' },
      { text: `$ ls -la`, color: '#38BDF8' },
      { text: `  README.md     index.html     LICENSE     .gitignore`, color: '#F1F5F9' },
      { text: `$ git status`, color: '#38BDF8' },
      { text: `On branch main: Your branch is up to date with 'origin/main'.`, color: '#10B981' },
      { text: `$ git commit -m "feat: Add index.html starter template"`, color: '#38BDF8' },
      { text: `[main a39f1c2] 2 files changed, 48 insertions(+)`, color: '#F59E0B' },
      { text: `$ git push origin main`, color: '#38BDF8' },
      { text: `To https://github.com/${githubUsername}/${repoName}.git -> main`, color: '#10B981' },
    ];

    let lineY = boxY + 75;
    lines.forEach((l) => {
      ctx.fillStyle = l.color;
      ctx.fillText(l.text, boxX + 24, lineY);
      lineY += 28;
    });

    // Bottom badges
    const badges = [
      { label: 'Public Repo', bg: 'rgba(56, 189, 248, 0.15)', text: '#38BDF8' },
      { label: 'MIT License', bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399' },
      { label: 'HTML5 Starter', bg: 'rgba(249, 115, 22, 0.15)', text: '#FB923C' },
      { label: 'Forked: kodluyoruz-frontend-101', bg: 'rgba(168, 85, 247, 0.15)', text: '#C084FC' },
    ];

    let badgeX = 70;
    badges.forEach((b) => {
      ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
      const textWidth = ctx.measureText(b.label).width;
      const bW = textWidth + 24;

      ctx.fillStyle = b.bg;
      ctx.beginPath();
      ctx.roundRect(badgeX, 510, bW, 32, 6);
      ctx.fill();

      ctx.fillStyle = b.text;
      ctx.fillText(b.label, badgeX + 12, 531);

      badgeX += bW + 12;
    });

    // Notify parent about Blob
    canvas.toBlob((blob) => {
      if (blob && onBlobReady) {
        onBlobReady(blob);
      }
    }, 'image/png');
  };

  useEffect(() => {
    drawBanner();
  }, [repoName, studentName, githubUsername]);

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${repoName}-preview.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-orange-600" />
            Ödev Yükleme Önizleme Görseli (1200 x 630 px)
          </h4>
          <p className="text-xs text-slate-500">
            Patika / Kodluyoruz yükleme önizlemesi (PNG) ve README.md için özel olarak render edilmiştir.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={drawBanner}
            className="p-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Yeniden Çiz"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleCopyImage}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5 text-slate-500" />}
            {copied ? 'Kopyalandı' : 'Panoya Kopyala'}
          </button>
          <button
            type="button"
            onClick={handleDownloadImage}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            {downloaded ? 'İndirildi (.PNG)' : 'Görseli İndir (.PNG)'}
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 shadow-sm relative group">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block max-h-[380px] object-contain mx-auto"
        />
        <div className="absolute bottom-3 right-3 opacity-90 text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
          PNG • 1200x630 • Kodluyoruz Hazır
        </div>
      </div>
    </div>
  );
};
