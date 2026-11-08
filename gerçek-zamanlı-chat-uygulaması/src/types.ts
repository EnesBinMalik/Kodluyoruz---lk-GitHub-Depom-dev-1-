export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  color: string;
  room: string;
}

export interface ChatUser {
  id: string;
  username: string;
  avatar: string;
  color: string;
  socketId?: string;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  id: string;
  roomId: string;
  text: string;
  sender: {
    id: string;
    username: string;
    avatar: string;
    color: string;
  };
  timestamp: number;
  replyTo?: {
    id: string;
    username: string;
    text: string;
  } | null;
  mediaUrl?: string | null;
  mediaType?: 'image' | null;
  reactions?: Record<string, string[]>; // emoji -> [usernames]
  isSystem?: boolean;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge?: string;
}
