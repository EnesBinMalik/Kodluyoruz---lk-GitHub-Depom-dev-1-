import React, { useState } from 'react';
import { 
  Hash, 
  Plus, 
  Users, 
  Circle, 
  Settings2, 
  X, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Room, ChatUser, UserProfile } from '../types';

interface SidebarProps {
  rooms: Room[];
  currentRoom: string;
  onSelectRoom: (roomId: string) => void;
  onCreateRoom: (name: string) => void;
  onlineUsers: ChatUser[];
  currentUser: UserProfile;
  roomStats: Record<string, number>;
  onEditProfile: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  rooms,
  currentRoom,
  onSelectRoom,
  onCreateRoom,
  onlineUsers,
  currentUser,
  roomStats,
  onEditProfile,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const [showNewRoomInput, setShowNewRoomInput] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      onCreateRoom(newRoomName.trim());
      setNewRoomName('');
      setShowNewRoomInput(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:static top-0 bottom-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base">Sohbet Kanalları</span>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rooms Section */}
        <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Odalar ({rooms.length})</span>
          </div>
          <button
            onClick={() => setShowNewRoomInput(!showNewRoomInput)}
            className="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded transition"
            title="Yeni Oda Aç"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {showNewRoomInput && (
          <form onSubmit={handleAddRoom} className="p-3 bg-slate-950/60 border-b border-slate-800">
            <input
              type="text"
              placeholder="Oda adı girin..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full bg-slate-800 text-sm text-slate-100 px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 mb-2"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewRoomInput(false)}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={!newRoomName.trim()}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium disabled:opacity-50 transition"
              >
                Oluştur
              </button>
            </div>
          </form>
        )}

        {/* Room List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {rooms.map((room) => {
            const isActive = currentRoom === room.id;
            const count = roomStats[room.id] || 0;

            return (
              <button
                key={room.id}
                onClick={() => {
                  onSelectRoom(room.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition group ${
                  isActive
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/30 font-medium'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg shrink-0">{room.icon || '💬'}</span>
                  <div className="truncate">
                    <div className="text-sm truncate font-medium flex items-center gap-1.5">
                      <span>{room.name}</span>
                      {room.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-normal">
                          {room.badge}
                        </span>
                      )}
                    </div>
                    {room.description && (
                      <p className="text-[11px] text-slate-500 truncate">
                        {room.description}
                      </p>
                    )}
                  </div>
                </div>

                {count > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      isActive
                        ? 'bg-indigo-500 text-white font-semibold'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Active Members in current room */}
          <div className="pt-4 pb-2 px-2 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Odadakiler ({onlineUsers.length})</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 animate-pulse" />
              CANLI
            </span>
          </div>

          <div className="space-y-1">
            {onlineUsers.length === 0 ? (
              <div className="px-3 py-3 text-xs text-slate-500 text-center italic bg-slate-950/30 rounded-lg">
                Bağlanılıyor...
              </div>
            ) : (
              onlineUsers.map((user) => {
                const isMe = user.id === currentUser.id;
                return (
                  <div
                    key={user.socketId || user.id}
                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition ${
                      isMe ? 'bg-slate-800/40 border border-slate-700/40' : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="relative shrink-0 text-base">
                      <span>{user.avatar || '👤'}</span>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
                    </div>
                    <div className="truncate flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-medium truncate text-xs"
                          style={{ color: user.color || '#cbd5e1' }}
                        >
                          {user.username}
                        </span>
                        {isMe && (
                          <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1 rounded uppercase font-bold">
                            Sen
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Current User Profile Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow border border-white/10"
                style={{ backgroundColor: `${currentUser.color}25` }}
              >
                {currentUser.avatar}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1">
                  <span
                    className="font-bold text-xs truncate"
                    style={{ color: currentUser.color }}
                  >
                    {currentUser.username}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Çevrimiçi</span>
                </div>
              </div>
            </div>

            <button
              onClick={onEditProfile}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Profili ve Rengi Değiştir"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>İmza: Enes Öztürk</span>
            </div>
            <span className="text-[10px] text-slate-400">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
