import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = parseInt(process.env.PORT || '3000', 10);

// Setup Socket.io with permissive CORS for development and cross-tab/cross-origin access
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 5e6, // 5MB for base64 image uploads if needed
});

app.use(express.json({ limit: '10mb' }));

// In-memory connected user tracker (ephemeral, no persistent DB)
interface ConnectedUser {
  socketId: string;
  id: string;
  username: string;
  avatar: string;
  color: string;
  room: string;
  joinedAt: number;
}

const activeUsers = new Map<string, ConnectedUser>();

// Helper to get all users in a specific room
function getUsersInRoom(room: string) {
  const users: Array<{ id: string; username: string; avatar: string; color: string; socketId: string }> = [];
  activeUsers.forEach((user) => {
    if (user.room === room) {
      users.push({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        color: user.color,
        socketId: user.socketId,
      });
    }
  });
  return users;
}

// Helper to get room statistics
function getRoomStats() {
  const stats: Record<string, number> = {};
  activeUsers.forEach((user) => {
    stats[user.room] = (stats[user.room] || 0) + 1;
  });
  return stats;
}

io.on('connection', (socket) => {
  // Join Room Event
  socket.on('join_room', (data: { id: string; username: string; avatar: string; color: string; room: string }) => {
    const { id, username, avatar, color, room } = data;
    const cleanRoom = (room || 'Genel Sohbet').trim();

    // If user was already in another room, leave it
    const existing = activeUsers.get(socket.id);
    if (existing && existing.room && existing.room !== cleanRoom) {
      socket.leave(existing.room);
      io.to(existing.room).emit('user_left', {
        username: existing.username,
        room: existing.room,
        timestamp: Date.now(),
      });
      io.to(existing.room).emit('room_users', getUsersInRoom(existing.room));
    }

    // Join new room
    socket.join(cleanRoom);

    activeUsers.set(socket.id, {
      socketId: socket.id,
      id: id || socket.id,
      username: username || 'Anonim',
      avatar: avatar || '👤',
      color: color || '#6366f1',
      room: cleanRoom,
      joinedAt: Date.now(),
    });

    // Notify room of user join
    io.to(cleanRoom).emit('user_joined', {
      username: username || 'Anonim',
      room: cleanRoom,
      timestamp: Date.now(),
    });

    // Send updated user list to everyone in this room
    io.to(cleanRoom).emit('room_users', getUsersInRoom(cleanRoom));

    // Send global room user counts to all clients
    io.emit('rooms_stats', getRoomStats());
  });

  // Message Send Event
  socket.on('send_message', (messageData: {
    id: string;
    roomId: string;
    text: string;
    sender: {
      id: string;
      username: string;
      avatar: string;
      color: string;
    };
    replyTo?: {
      id: string;
      username: string;
      text: string;
    } | null;
    mediaUrl?: string | null;
    mediaType?: 'image' | null;
    timestamp: number;
  }) => {
    const roomId = messageData.roomId || 'Genel Sohbet';
    // Broadcast message to everyone in the room (including sender)
    io.to(roomId).emit('new_message', {
      ...messageData,
      timestamp: messageData.timestamp || Date.now(),
    });
  });

  // Typing status
  socket.on('typing_start', (data: { roomId: string; username: string }) => {
    socket.to(data.roomId).emit('user_typing', {
      username: data.username,
      isTyping: true,
    });
  });

  socket.on('typing_stop', (data: { roomId: string; username: string }) => {
    socket.to(data.roomId).emit('user_typing', {
      username: data.username,
      isTyping: false,
    });
  });

  // Message reaction
  socket.on('add_reaction', (data: { roomId: string; messageId: string; emoji: string; username: string }) => {
    io.to(data.roomId).emit('message_reaction', {
      messageId: data.messageId,
      emoji: data.emoji,
      username: data.username,
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      activeUsers.delete(socket.id);
      io.to(user.room).emit('user_left', {
        username: user.username,
        room: user.room,
        timestamp: Date.now(),
      });
      io.to(user.room).emit('room_users', getUsersInRoom(user.room));
      io.emit('rooms_stats', getRoomStats());
    }
  });
});

// Status & Info API
app.get('/api/status', (_req, res) => {
  res.json({
    status: 'online',
    appName: 'Gerçek Zamanlı Chat Uygulaması',
    author: 'Enes Öztürk',
    activeConnections: activeUsers.size,
    roomStats: getRoomStats(),
    uptime: process.uptime(),
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Chat sunucusu port ${port} üzerinde çalışıyor.`);
    console.log(`✨ Enes Öztürk İmzalı Gerçek Zamanlı Chat Projesi`);
  });
}

startServer().catch((err) => {
  console.error('Sunucu başlatılırken hata oluştu:', err);
});
