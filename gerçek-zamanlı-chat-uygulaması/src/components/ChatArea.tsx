import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Smile, 
  Image as ImageIcon, 
  X, 
  Reply, 
  Search, 
  CornerDownRight, 
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Message, UserProfile } from '../types';
import { QUICK_EMOJIS } from '../constants';

interface ChatAreaProps {
  currentRoom: string;
  messages: Message[];
  currentUser: UserProfile;
  typingUsers: string[];
  onSendMessage: (text: string, mediaUrl?: string | null, replyTo?: Message | null) => void;
  onTyping: () => void;
  onAddReaction: (messageId: string, emoji: string) => void;
  onClearMessages: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  currentRoom,
  messages,
  currentUser,
  typingUsers,
  onSendMessage,
  onTyping,
  onAddReaction,
  onClearMessages,
}) => {
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages using useEffect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  // Handle typing debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    onTyping();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    onSendMessage(inputText.trim(), selectedImage, replyingTo);
    setInputText('');
    setSelectedImage(null);
    setReplyingTo(null);
    setShowEmojiPicker(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Lütfen 3MB altındaki bir görsel seçin.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredMessages = searchQuery.trim()
    ? messages.filter((m) =>
        m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.sender.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative overflow-hidden">
      {/* Top Banner / Notification & Search */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-slate-300">Önemli Kural:</strong> Ekran yenilendiğinde (F5) eski mesajlar silinir (Geçici canlı oturum).
          </span>
        </div>

        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="flex items-center bg-slate-800/80 rounded-lg px-2 py-1 border border-slate-700">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <input
                type="text"
                placeholder="Mesajlarda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none w-32 sm:w-44"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                className="text-slate-400 hover:text-white ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              title="Mesaj Ara"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClearMessages}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 px-2 py-1 rounded hover:bg-slate-800 transition"
            title="Sohbeti Temizle"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Temizle</span>
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl mb-3 shadow-inner">
              💬
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {currentRoom} Odasına Hoş Geldiniz!
            </h3>
            <p className="text-xs max-w-sm text-slate-400 mb-4">
              Henüz mesaj bulunmuyor. Bir mesaj yazarak veya alttaki hızlı emojileri kullanarak sohbeti başlatın!
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Selam herkese! 👋', 'Burada kimler var? 🚀', 'Socket.io çalışıyor! ⚡'].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => onSendMessage(phrase)}
                  className="px-3 py-1.5 bg-slate-800/80 hover:bg-indigo-600/30 text-xs text-slate-300 hover:text-white rounded-full border border-slate-700/60 transition"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            if (msg.isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="bg-slate-900/80 border border-slate-800/80 text-slate-400 text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>{msg.text}</span>
                    <span className="text-[10px] text-slate-400">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              );
            }

            const isMe = msg.sender.id === currentUser.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 group relative ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 border border-white/10 mt-1 shadow-sm"
                    style={{ backgroundColor: `${msg.sender.color}20` }}
                  >
                    {msg.sender.avatar || '👤'}
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  {/* Sender Name & Timestamp */}
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: msg.sender.color || '#cbd5e1' }}
                    >
                      {msg.sender.username}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>

                  {/* Reply Reference if replying */}
                  {msg.replyTo && (
                    <div className="mb-1 text-xs bg-slate-900/90 border-l-2 border-indigo-500 rounded-r-md px-2.5 py-1 text-slate-300 flex items-center gap-1.5">
                      <CornerDownRight className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span className="font-semibold text-indigo-300">
                        {msg.replyTo.username}:
                      </span>
                      <span className="truncate max-w-xs text-slate-400">
                        {msg.replyTo.text}
                      </span>
                    </div>
                  )}

                  {/* Main Bubble */}
                  <div
                    className={`relative rounded-2xl px-4 py-2.5 text-sm shadow-md transition-all ${
                      isMe
                        ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-tr-none'
                        : 'bg-slate-900 text-slate-100 border border-slate-800/80 rounded-tl-none'
                    }`}
                  >
                    {/* Media if image was shared */}
                    {msg.mediaUrl && (
                      <div className="mb-2 rounded-lg overflow-hidden border border-white/10 max-w-xs">
                        <img
                          src={msg.mediaUrl}
                          alt="Paylaşılan Görsel"
                          className="max-h-60 w-auto object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Text Message */}
                    {msg.text && (
                      <p className="whitespace-pre-wrap break-words leading-relaxed">
                        {msg.text}
                      </p>
                    )}

                    {/* Reactions Toolbar on Hover */}
                    <div
                      className={`absolute -top-3 ${
                        isMe ? 'left-2' : 'right-2'
                      } hidden group-hover:flex items-center gap-1 bg-slate-900/95 border border-slate-700/80 rounded-full px-2 py-0.5 shadow-xl z-10 backdrop-blur-sm`}
                    >
                      {QUICK_EMOJIS.slice(0, 5).map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => onAddReaction(msg.id, emoji)}
                          className="hover:scale-125 transition-transform text-xs p-0.5"
                          title={`${emoji} tepkisi ekle`}
                        >
                          {emoji}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setReplyingTo(msg);
                          inputRef.current?.focus();
                        }}
                        className="p-1 text-slate-400 hover:text-white transition"
                        title="Yanıtla"
                      >
                        <Reply className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Reactions List Below Message */}
                  {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1 px-1">
                      {Object.entries(msg.reactions).map(([emoji, users]) => {
                        const hasReacted = users.includes(currentUser.username);
                        return (
                          <button
                            key={emoji}
                            onClick={() => onAddReaction(msg.id, emoji)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border transition ${
                              hasReacted
                                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                            title={users.join(', ')}
                          >
                            <span>{emoji}</span>
                            <span>{users.length}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {isMe && (
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 border border-white/10 mt-1 shadow-sm"
                    style={{ backgroundColor: `${currentUser.color}25` }}
                  >
                    {currentUser.avatar || '👤'}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 bg-slate-900/60 px-3 py-1.5 rounded-full w-fit border border-indigo-500/20">
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
            </div>
            <span>
              {typingUsers.join(', ')} yazıyor...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Reply Banner */}
      {replyingTo && (
        <div className="bg-slate-900 border-t border-indigo-500/30 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <CornerDownRight className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="font-semibold text-indigo-400">
              {replyingTo.sender.username}&apos;a yanıt:
            </span>
            <span className="truncate text-slate-400 max-w-md">
              {replyingTo.text}
            </span>
          </div>
          <button
            onClick={() => setReplyingTo(null)}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={selectedImage}
              alt="Seçilen görsel"
              className="w-12 h-12 object-cover rounded-lg border border-slate-700"
            />
            <span className="text-xs text-slate-300">Görsel eklendi (gönderilmeye hazır)</span>
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Emojis Drawer */}
      {showEmojiPicker && (
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-500 font-medium">Emojiler:</span>
          {['😀', '😂', '😍', '🔥', '🚀', '🎉', '👍', '❤️', '👏', '🥳', '😎', '💡', '✨', '⚡'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setInputText((prev) => prev + emoji);
                inputRef.current?.focus();
              }}
              className="text-lg hover:scale-125 transition-transform p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />

        {/* Attachment button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          title="Görsel Ekle"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Emoji toggle */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`p-2 rounded-xl transition ${
            showEmojiPicker ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Emoji Seç"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder={`${currentRoom} odasına bir mesaj yaz...`}
            className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 transition shadow-inner"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() && !selectedImage}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm flex items-center gap-1.5 transition disabled:opacity-40 disabled:hover:bg-indigo-600 shadow-lg shadow-indigo-600/30"
          title="Gönder (Enter)"
        >
          <span className="hidden sm:inline">Gönder</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
