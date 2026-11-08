import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { LoginModal } from './components/LoginModal';
import { AboutModal } from './components/AboutModal';
import { DualTestPane } from './components/DualTestPane';
import { Message, Room, ChatUser, UserProfile } from './types';
import { DEFAULT_ROOMS } from './constants';
import { playSendSound, playReceiveSound, playJoinSound } from './utils/sound';

const PREVIEW_URL = 'https://ais-pre-c2af63vttrxjnig2cshe5p-616305048780.europe-west3.run.app';

export default function App() {
  // 1. User State (React Hook: useState)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    // We only keep user handle in session, not messages, so refresh clears messages as requested
    const savedUser = sessionStorage.getItem('echo_chat_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // fallback
      }
    }
    const randId = Math.floor(100 + Math.random() * 899);
    return {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      username: `Enes#${randId}`,
      avatar: '⚡',
      color: '#6366f1',
      room: 'Genel Sohbet',
    };
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return Boolean(sessionStorage.getItem('echo_chat_user'));
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // 2. Chat & Room State (React Hook: useState)
  const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS);
  const [currentRoom, setCurrentRoom] = useState<string>(currentUser.room || 'Genel Sohbet');

  // CRITICAL REQUIREMENT: "Uygulama ekranı yenilenince eski mesajlar silinecek."
  // Messages are stored purely in memory in React useState. No localStorage, so refreshing (F5) wipes messages!
  const [messages, setMessages] = useState<Message[]>([]);

  // 3. Presence & Real-time State (React Hook: useState)
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([]);
  const [roomStats, setRoomStats] = useState<Record<string, number>>({});
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDualMode, setIsDualMode] = useState<boolean>(false);

  // Socket & Timers refs
  const socketRef = useRef<Socket | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef<boolean>(false);

  // 4. Socket Lifecycle & Event Listeners (React Hook: useEffect)
  useEffect(() => {
    // Connect to backend Socket.io server
    const targetUrl = (import.meta.env.VITE_SOCKET_URL as string) || undefined;
    const socket = io(targetUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      // Register current user into the active room
      socket.emit('join_room', {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        color: currentUser.color,
        room: currentRoom,
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Real-time incoming message
    socket.on('new_message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);

      // Sound feedback
      if (soundEnabled) {
        if (msg.sender.id === currentUser.id) {
          playSendSound();
        } else {
          playReceiveSound();
        }
      }
    });

    // User joined room notification
    socket.on('user_joined', (data: { username: string; room: string; timestamp: number }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-join-${Date.now()}-${Math.random()}`,
          roomId: data.room,
          text: `${data.username} odaya katıldı 👋`,
          sender: { id: 'system', username: 'Sistem', avatar: '⚡', color: '#6366f1' },
          timestamp: data.timestamp,
          isSystem: true,
        },
      ]);
      if (soundEnabled) {
        playJoinSound();
      }
    });

    // User left room notification
    socket.on('user_left', (data: { username: string; room: string; timestamp: number }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-leave-${Date.now()}-${Math.random()}`,
          roomId: data.room,
          text: `${data.username} odadan ayrıldı.`,
          sender: { id: 'system', username: 'Sistem', avatar: '⚡', color: '#64748b' },
          timestamp: data.timestamp,
          isSystem: true,
        },
      ]);
    });

    // Room members update
    socket.on('room_users', (users: ChatUser[]) => {
      setOnlineUsers(users);
    });

    // Global room counts
    socket.on('rooms_stats', (stats: Record<string, number>) => {
      setRoomStats(stats);
    });

    // Typing indicators
    socket.on('user_typing', (data: { username: string; isTyping: boolean }) => {
      if (data.username === currentUser.username) return;

      setTypingUsers((prev) => {
        if (data.isTyping) {
          return prev.includes(data.username) ? prev : [...prev, data.username];
        } else {
          return prev.filter((name) => name !== data.username);
        }
      });
    });

    // Message reactions
    socket.on('message_reaction', (data: { messageId: string; emoji: string; username: string }) => {
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === data.messageId) {
            const currentReactions = { ...(msg.reactions || {}) };
            const existingUsers = currentReactions[data.emoji] || [];
            if (!existingUsers.includes(data.username)) {
              currentReactions[data.emoji] = [...existingUsers, data.username];
            } else {
              // toggle off if clicked again by the same user
              currentReactions[data.emoji] = existingUsers.filter((u) => u !== data.username);
              if (currentReactions[data.emoji].length === 0) {
                delete currentReactions[data.emoji];
              }
            }
            return {
              ...msg,
              reactions: currentReactions,
            };
          }
          return msg;
        })
      );
    });

    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Run once on mount

  // 5. Room Change Handler (React Hook: useEffect)
  useEffect(() => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join_room', {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        color: currentUser.color,
        room: currentRoom,
      });
      // Clear typing indicator on room switch
      setTypingUsers([]);
    }
  }, [currentRoom, currentUser, isConnected]);

  // Actions
  const handleSendMessage = useCallback(
    (text: string, mediaUrl?: string | null, replyTo?: Message | null) => {
      if (!socketRef.current) return;

      const newMsg: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        roomId: currentRoom,
        text,
        sender: {
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar,
          color: currentUser.color,
        },
        mediaUrl: mediaUrl || null,
        mediaType: mediaUrl ? 'image' : null,
        replyTo: replyTo
          ? {
              id: replyTo.id,
              username: replyTo.sender.username,
              text: replyTo.text,
            }
          : null,
        timestamp: Date.now(),
      };

      // Emit to server
      socketRef.current.emit('send_message', newMsg);

      // Stop typing status immediately when sent
      if (isTypingRef.current) {
        isTypingRef.current = false;
        socketRef.current.emit('typing_stop', {
          roomId: currentRoom,
          username: currentUser.username,
        });
      }
    },
    [currentRoom, currentUser]
  );

  const handleTyping = useCallback(() => {
    if (!socketRef.current) return;

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socketRef.current.emit('typing_start', {
        roomId: currentRoom,
        username: currentUser.username,
      });
    }

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      if (socketRef.current && isTypingRef.current) {
        isTypingRef.current = false;
        socketRef.current.emit('typing_stop', {
          roomId: currentRoom,
          username: currentUser.username,
        });
      }
    }, 1600);
  }, [currentRoom, currentUser.username]);

  const handleAddReaction = useCallback(
    (messageId: string, emoji: string) => {
      if (!socketRef.current) return;
      socketRef.current.emit('add_reaction', {
        roomId: currentRoom,
        messageId,
        emoji,
        username: currentUser.username,
      });
    },
    [currentRoom, currentUser.username]
  );

  const handleClearMessages = () => {
    setMessages([]);
  };

  const handleSelectRoom = (roomId: string) => {
    setCurrentRoom(roomId);
  };

  const handleCreateRoom = (name: string) => {
    const newRoom: Room = {
      id: name,
      name,
      description: 'Özel topluluk odası',
      icon: '✨',
      badge: 'Yeni',
    };
    setRooms((prev) => [...prev, newRoom]);
    setCurrentRoom(name);
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setCurrentUser(updatedProfile);
    sessionStorage.setItem('echo_chat_user', JSON.stringify(updatedProfile));
    if (updatedProfile.room && updatedProfile.room !== currentRoom) {
      setCurrentRoom(updatedProfile.room);
    }
    setHasCompletedOnboarding(true);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar */}
      <Navbar
        currentRoom={currentRoom}
        rooms={rooms}
        onlineCount={onlineUsers.length}
        isConnected={isConnected}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onClearMessages={handleClearMessages}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        isDualMode={isDualMode}
        onToggleDualMode={() => setIsDualMode(!isDualMode)}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
      />

      {/* Main Content View */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Channels & Online Users */}
        <Sidebar
          rooms={rooms}
          currentRoom={currentRoom}
          onSelectRoom={handleSelectRoom}
          onCreateRoom={handleCreateRoom}
          onlineUsers={onlineUsers}
          currentUser={currentUser}
          roomStats={roomStats}
          onEditProfile={() => setIsProfileModalOpen(true)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Central Chat Area (Primary User) */}
        <ChatArea
          currentRoom={currentRoom}
          messages={messages}
          currentUser={currentUser}
          typingUsers={typingUsers}
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          onAddReaction={handleAddReaction}
          onClearMessages={handleClearMessages}
        />

        {/* Optional Dual Window Test Mode: Secondary User Panes */}
        {isDualMode && (
          <DualTestPane
            room={currentRoom}
            onClose={() => setIsDualMode(false)}
            mainUsername={currentUser.username}
          />
        )}
      </div>

      {/* Profile / Onboarding Modal */}
      {(!hasCompletedOnboarding || isProfileModalOpen) && (
        <LoginModal
          initialUser={currentUser}
          isOpen={!hasCompletedOnboarding || isProfileModalOpen}
          onSave={handleSaveProfile}
          onClose={() => setIsProfileModalOpen(false)}
          isFirstTime={!hasCompletedOnboarding}
        />
      )}

      {/* About & Netlify Documentation Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        previewUrl={PREVIEW_URL}
      />
    </div>
  );
}
