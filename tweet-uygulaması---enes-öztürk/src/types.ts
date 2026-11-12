export interface User {
  id: string;
  username: string; // e.g., 'enesozturk'
  name: string; // e.g., 'Enes Öztürk'
  password?: string;
  avatar: string;
  bio?: string;
  joinedDate: string;
  isVerified?: boolean;
  followingCount: number;
  followersCount: number;
}

export interface TweetReply {
  id: string;
  tweetId: string;
  userId: string;
  username: string;
  userDisplayName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  timestamp: number;
}

export interface Tweet {
  id: string;
  userId: string;
  username: string;
  userDisplayName: string;
  userAvatar: string;
  isVerified?: boolean;
  content: string; // Max 180 chars
  createdAt: string;
  timestamp: number; // for reverse chrono sorting (newest first)
  likes: string[]; // array of userIds
  retweets: string[]; // array of userIds
  replies: TweetReply[];
  bookmarks: string[]; // array of userIds
  mediaUrl?: string;
  tags?: string[];
}

export type FeedFilter = 'all' | 'following' | 'popular' | 'media';
