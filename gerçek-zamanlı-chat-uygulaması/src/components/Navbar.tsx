import React from 'react';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Users, 
  Info, 
  Trash2, 
  Sparkles,
  Columns,
  Square,
  Share2,
  Check
} from 'lucide-react';
import { Room } from '../types';

interface NavbarProps {
  currentRoom: string;
  rooms: Room[];
  onlineCount: number;
  isConnected: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClearMessages: () => void;
  onOpenAbout: () => void;
  isDualMode: boolean;
  onToggleDualMode: () => void;
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoom,
  rooms,
  onlineCount,
  isConnected,
  soundEnabled,
  onToggleSound,
  onClearMessages,
  onOpenAbout,
  isDualMode,
  onToggleDualMode,
  onOpenMobileMenu,
}) => {
  const [copied, setCopied] = React.useState(false);

  const activeRoomObj = rooms.find((r) => r.id === currentRoom) || {
    id: currentRoom,
    name: currentRoom,
    icon: '💬',
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between z-20 shrink-0 sticky top-0">
      {/* Left: Branding & Mobile Menu */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="Odaları Göster"
          >
            <Users className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
            💬
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                EchoChat
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Socket.io
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Gerçek Zamanlı Sohbet
            </p>
          </div>
        </div>

        {/* Current Room Pill */}
        <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-800">
          <span className="text-base">{activeRoomObj.icon}</span>
          <span className="text-sm font-semibold text-slate-200">
            {activeRoomObj.name}
          </span>
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{onlineCount} çevrimiçi</span>
          </div>
        </div>
      </div>

      {/* Middle: Connection Status & Author Tag */}
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            isConnected
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}
          title={isConnected ? 'Sunucuya bağlı' : 'Bağlantı kuruluyor...'}
        >
          <Radio className={`w-3.5 h-3.5 ${isConnected ? 'animate-pulse' : ''}`} />
          <span className="hidden sm:inline font-mono">
            {isConnected ? 'CANLI' : 'BAĞLANIYOR'}
          </span>
        </div>

        {/* Signature Badge */}
        <div className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 px-3 py-1 rounded-full text-xs shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-slate-400">Tasarım & Kod:</span>
          <span className="font-bold bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
            Enes Öztürk
          </span>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Dual Window Test Mode Toggle */}
        <button
          onClick={onToggleDualMode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition border ${
            isDualMode
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
          }`}
          title="Tek ekranda iki kullanıcıyı yan yana test et"
        >
          {isDualMode ? <Square className="w-3.5 h-3.5" /> : <Columns className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">
            {isDualMode ? 'Tek Pencere' : 'Çift Test'}
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-lg text-xs font-medium transition border ${
            soundEnabled
              ? 'bg-slate-800 text-indigo-400 border-indigo-500/30 hover:bg-slate-700'
              : 'bg-slate-800/40 text-slate-500 border-slate-800 hover:text-slate-300'
          }`}
          title={soundEnabled ? 'Sesleri Kapat' : 'Sesleri Aç'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Clear Messages */}
        <button
          onClick={onClearMessages}
          className="p-2 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/20 transition"
          title="Ekranı ve Eski Mesajları Temizle"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Share Link */}
        <button
          onClick={handleShare}
          className="p-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition relative"
          title="Sohbet Bağlantısını Kopyala (Diğer Sekmede Aç)"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        </button>

        {/* About & Netlify Modal */}
        <button
          onClick={onOpenAbout}
          className="p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
          title="Proje & Netlify Dağıtım Bilgisi"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
