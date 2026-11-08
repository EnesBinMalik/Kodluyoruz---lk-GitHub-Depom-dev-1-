import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Smile, CornerDownRight, X, Sparkles, RefreshCw, Radio } from 'lucide-react';
import { Message, UserProfile } from '../types';
import { QUICK_EMOJIS } from '../constants';

interface DualTestPaneProps {
  room: string;
  onClose: () => void;
  mainUsername: string;
}

export const DualTestPane: React.FC<DualTestPaneProps> = ({
  room,
  onClose,
  mainUsername,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const testUser: UserProfile = {
    id: 'test-user-secondary',
    username: 'Zeynep (Test Kullanıcı 2)',
    avatar: '🦊',
    color: '#f43f5e',
    room,
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize independent Socket.io connection for second test client
  useEffect(() => {
    const targetUrl = (import.meta.env.VITE_SOCKET_URL as string) || undefined;
    const s = io(targetUrl, {
      forceNew: true,
      transports: ['websocket', 'polling'],
    });

    s.on('connect', () => {
      setIsConnected(true);
      s.emit('join_room', {
        id: testUser.id,
        username: testUser.username,
        avatar: testUser.avatar,
        color: testUser.color,
        room,
      });
    });

    s.on('disconnect', () => {
      setIsConnected(false);
    });

    s.on('new_message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on('user_joined', (data: { username: string; timestamp: number }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}-${Math.random()}`,
          roomId: room,
          text: `${data.username} odaya katıldı!`,
          sender: { id: 'sys', username: 'Sistem', avatar: '⚡', color: '#6366f1' },
          timestamp: data.timestamp,
          isSystem: true,
        },
      ]);
    });

    s.on('user_typing', (data: { username: string; isTyping: boolean }) => {
      if (data.username === testUser.username) return;
      setTypingUsers((prev) => {
        if (data.isTyping) {
          return prev.includes(data.username) ? prev : [...prev, data.username];
        } else {
          return prev.filter((u) => u !== data.username);
        }
      });
    });

    s.on('message_reaction', (data: { messageId: string; emoji: string; username: string }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === data.messageId) {
            const currentReactions = { ...(msg.reactions || {}) };
            const users = currentReactions[data.emoji] || [];
            if (!users.includes(data.username)) {
              currentReactions[data.emoji] = [...users, data.username];
            }
            return { ...msg, reactions: currentReactions };
          }
          return msg;
        })
      );
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const handleTyping = () => {
    if (!socket) return;
    socket.emit('typing_start', { roomId: room, username: testUser.username });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing_stop', { roomId: room, username: testUser.username });
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      roomId: room,
      text: inputText.trim(),
      sender: {
        id: testUser.id,
        username: testUser.username,
        avatar: testUser.avatar,
        color: testUser.color,
      },
      replyTo: replyingTo
        ? {
            id: replyingTo.id,
            username: replyingTo.sender.username,
            text: replyingTo.text,
          }
        : null,
      timestamp: Date.now(),
    };

    socket.emit('send_message', newMsg);
    socket.emit('typing_stop', { roomId: room, username: testUser.username });
    setInputText('');
    setReplyingTo(null);
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!socket) return;
    socket.emit('add_reaction', {
      roomId: room,
      messageId,
      emoji,
      username: testUser.username,
    });
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col h-full bg-slate-950 border-l border-slate-800 relative">
      {/* Pane Header */}
      <div className="h-12 border-b border-slate-800 bg-slate-900/90 px-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-base">🦊</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-rose-400">{testUser.username}</span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded border border-rose-500/30">
                2. Kullanıcı
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>{isConnected ? 'Bağlı' : 'Bağlanıyor...'}</span>
          </div>

          <button
            onClick={() => setMessages([])}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            title="Mesajları Temizle"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            title="Çift Pencereyi Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pane Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs scrollbar-thin scrollbar-thumb-slate-800">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
            <Sparkles className="w-8 h-8 text-rose-400/60 mb-2" />
            <p className="font-semibold text-slate-300">İkinci Kullanıcı Paneli</p>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1">
              Soldaki <strong>{mainUsername}</strong> ile sağdaki <strong>Zeynep</strong> arasındaki anlık Socket.io mesajlaşmasını canlı olarak test edin!
            </p>
            <button
              onClick={() => {
                if (socket) {
                  socket.emit('send_message', {
                    id: `msg-${Date.now()}`,
                    roomId: room,
                    text: `Selam ${mainUsername}! Gerçek zamanlı socket bağlantısı harika çalışıyor 🚀`,
                    sender: {
                      id: testUser.id,
                      username: testUser.username,
                      avatar: testUser.avatar,
                      color: testUser.color,
                    },
                    timestamp: Date.now(),
                  });
                }
              }}
              className="mt-3 px-3 py-1.5 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/40 rounded-lg text-xs transition"
            >
              Hızlı Selam Gönder 👋
            </button>
          </div>
        ) : (
          messages.map((m) => {
            if (m.isSystem) {
              return (
                <div key={m.id} className="text-center text-[10px] text-slate-400 my-1">
                  {m.text}
                </div>
              );
            }

            const isMe = m.sender.id === testUser.id;

            return (
              <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-semibold text-[11px]" style={{ color: m.sender.color }}>
                    {m.sender.username}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-xl max-w-[85%] text-xs ${
                    isMe
                      ? 'bg-rose-600 text-white rounded-tr-none'
                      : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  {m.replyTo && (
                    <div className="text-[10px] text-slate-400 mb-1 border-l border-rose-400 pl-1.5">
                      {m.replyTo.username}: {m.replyTo.text}
                    </div>
                  )}
                  {m.mediaUrl && (
                    <img src={m.mediaUrl} alt="" className="max-h-36 rounded mb-1" />
                  )}
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>

                {/* Quick reaction button */}
                <div className="flex gap-1 mt-0.5">
                  {['👍', '❤️', '🔥'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleAddReaction(m.id, emoji)}
                      className="text-[10px] hover:scale-125 transition"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}

        {typingUsers.length > 0 && (
          <div className="text-[11px] text-rose-400 italic">
            {typingUsers.join(', ')} yazıyor...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Pane Input */}
      <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 bg-slate-900/90 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            handleTyping();
          }}
          placeholder="Zeynep olarak mesaj yaz..."
          className="flex-1 bg-slate-800 text-xs text-white px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-rose-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg disabled:opacity-40 transition flex items-center gap-1"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
