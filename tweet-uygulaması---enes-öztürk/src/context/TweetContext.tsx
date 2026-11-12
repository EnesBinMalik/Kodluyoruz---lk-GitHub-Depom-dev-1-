import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tweet, TweetReply, FeedFilter } from '../types';
import { INITIAL_TWEETS } from '../data/initialData';
import { useAuth } from './AuthContext';

interface TweetContextType {
  tweets: Tweet[];
  filteredTweets: Tweet[];
  filter: FeedFilter;
  setFilter: (filter: FeedFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  addTweet: (content: string, mediaUrl?: string) => { success: boolean; error?: string };
  likeTweet: (tweetId: string) => void;
  retweetTweet: (tweetId: string) => void;
  replyTweet: (tweetId: string, content: string) => { success: boolean; error?: string };
  bookmarkTweet: (tweetId: string) => void;
  deleteTweet: (tweetId: string) => void;
  resetTweets: () => void;
}

const TweetContext = createContext<TweetContextType | undefined>(undefined);

const TWEETS_STORAGE_KEY = 'tweet_app_tweets_v1';

export const TweetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, openAuthModal } = useAuth();
  const [filter, setFilter] = useState<FeedFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [tweets, setTweets] = useState<Tweet[]>(() => {
    try {
      const saved = localStorage.getItem(TWEETS_STORAGE_KEY);
      if (saved) {
        const parsed: Tweet[] = JSON.parse(saved);
        // Ensure reverse chronological order: newest first
        return parsed.sort((a, b) => b.timestamp - a.timestamp);
      }
    } catch (e) {
      console.error('Error loading tweets from localStorage', e);
    }
    return INITIAL_TWEETS.sort((a, b) => b.timestamp - a.timestamp);
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TWEETS_STORAGE_KEY, JSON.stringify(tweets));
    } catch (e) {
      console.error('Error saving tweets to localStorage', e);
    }
  }, [tweets]);

  // Extract hashtags from content
  const extractHashtags = (text: string): string[] => {
    const matches = text.match(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g);
    return matches ? matches.map(tag => tag.toLowerCase()) : [];
  };

  const addTweet = (content: string, mediaUrl?: string) => {
    if (!currentUser) {
      openAuthModal('login', 'Tweet paylaşabilmek için lütfen giriş yapın veya kayıt olun.');
      return { success: false, error: 'Kayıtlı olmayan kullanıcılar tweet atamaz.' };
    }

    const trimmed = content.trim();
    if (!trimmed) {
      return { success: false, error: 'Tweet metni boş olamaz.' };
    }

    // Strict 180 character limit check
    if (trimmed.length > 180) {
      return { success: false, error: `Tweet 180 karakteri geçemez. (Şu an: ${trimmed.length} karakter)` };
    }

    const tags = extractHashtags(trimmed);

    const newTweet: Tweet = {
      id: `tweet_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userDisplayName: currentUser.name,
      userAvatar: currentUser.avatar,
      isVerified: currentUser.isVerified,
      content: trimmed,
      createdAt: 'Şimdi',
      timestamp: Date.now(),
      likes: [],
      retweets: [],
      replies: [],
      bookmarks: [],
      mediaUrl,
      tags,
    };

    // CRITICAL: Son gönderilen tweet sayfanın başında gösterilir (Prepend to top)
    setTweets(prev => [newTweet, ...prev]);

    return { success: true };
  };

  const likeTweet = (tweetId: string) => {
    if (!currentUser) {
      openAuthModal('login', 'Tweetleri beğenmek için lütfen giriş yapın veya kayıt olun.');
      return;
    }

    setTweets(prev =>
      prev.map(tweet => {
        if (tweet.id !== tweetId) return tweet;
        const hasLiked = tweet.likes.includes(currentUser.id);
        const updatedLikes = hasLiked
          ? tweet.likes.filter(id => id !== currentUser.id)
          : [...tweet.likes, currentUser.id];
        return { ...tweet, likes: updatedLikes };
      })
    );
  };

  const retweetTweet = (tweetId: string) => {
    if (!currentUser) {
      openAuthModal('login', 'Tweetleri yeniden paylaşmak için lütfen giriş yapın veya kayıt olun.');
      return;
    }

    setTweets(prev =>
      prev.map(tweet => {
        if (tweet.id !== tweetId) return tweet;
        const hasRetweeted = tweet.retweets.includes(currentUser.id);
        const updatedRetweets = hasRetweeted
          ? tweet.retweets.filter(id => id !== currentUser.id)
          : [...tweet.retweets, currentUser.id];
        return { ...tweet, retweets: updatedRetweets };
      })
    );
  };

  const replyTweet = (tweetId: string, replyContent: string) => {
    if (!currentUser) {
      openAuthModal('login', 'Yorum yapmak için lütfen giriş yapın veya kayıt olun.');
      return { success: false, error: 'Giriş yapmalısınız.' };
    }

    const trimmed = replyContent.trim();
    if (!trimmed) {
      return { success: false, error: 'Yorum metni boş olamaz.' };
    }

    if (trimmed.length > 180) {
      return { success: false, error: 'Yorumlar da 180 karakter ile sınırlıdır.' };
    }

    const newReply: TweetReply = {
      id: `reply_${Date.now()}`,
      tweetId,
      userId: currentUser.id,
      username: currentUser.username,
      userDisplayName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: trimmed,
      createdAt: 'Şimdi',
      timestamp: Date.now(),
    };

    setTweets(prev =>
      prev.map(tweet => {
        if (tweet.id !== tweetId) return tweet;
        return {
          ...tweet,
          replies: [...tweet.replies, newReply],
        };
      })
    );

    return { success: true };
  };

  const bookmarkTweet = (tweetId: string) => {
    if (!currentUser) {
      openAuthModal('login', 'Tweetleri kaydetmek için lütfen giriş yapın veya kayıt olun.');
      return;
    }

    setTweets(prev =>
      prev.map(tweet => {
        if (tweet.id !== tweetId) return tweet;
        const hasBookmarked = tweet.bookmarks.includes(currentUser.id);
        const updatedBookmarks = hasBookmarked
          ? tweet.bookmarks.filter(id => id !== currentUser.id)
          : [...tweet.bookmarks, currentUser.id];
        return { ...tweet, bookmarks: updatedBookmarks };
      })
    );
  };

  const deleteTweet = (tweetId: string) => {
    setTweets(prev => prev.filter(t => t.id !== tweetId));
  };

  const resetTweets = () => {
    setTweets(INITIAL_TWEETS.sort((a, b) => b.timestamp - a.timestamp));
  };

  // Filter and search
  const filteredTweets = tweets.filter(tweet => {
    // Tag filter
    if (activeTag) {
      const matchTag = tweet.tags?.some(t => t.toLowerCase() === activeTag.toLowerCase()) ||
        tweet.content.toLowerCase().includes(activeTag.toLowerCase());
      if (!matchTag) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQuery =
        tweet.content.toLowerCase().includes(q) ||
        tweet.username.toLowerCase().includes(q) ||
        tweet.userDisplayName.toLowerCase().includes(q);
      if (!matchQuery) return false;
    }

    // Feed tabs
    if (filter === 'following') {
      // In following tab, show tweets from people other than user or specific followed
      return tweet.userId !== currentUser?.id;
    } else if (filter === 'popular') {
      return (tweet.likes.length + tweet.retweets.length) > 0;
    }

    return true;
  });

  return (
    <TweetContext.Provider
      value={{
        tweets,
        filteredTweets,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        activeTag,
        setActiveTag,
        addTweet,
        likeTweet,
        retweetTweet,
        replyTweet,
        bookmarkTweet,
        deleteTweet,
        resetTweets,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export const useTweets = () => {
  const context = useContext(TweetContext);
  if (!context) {
    throw new Error('useTweets must be used within a TweetProvider');
  }
  return context;
};
