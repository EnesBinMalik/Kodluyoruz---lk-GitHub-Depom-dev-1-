/**
 * @license
 * Anasayfa Akış Görünümü (HomeTimelineView)
 * Proje şartı:
 * - Son gönderilen tweet sayfanın başında gösterilir.
 * - Anasayfada arkadaşlarının tweetlerini son gönderilen en üstte olacak şekilde görür.
 * Geliştirici: Enes Öztürk
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Users, UserPlus, RefreshCw, Layers } from 'lucide-react';
import { AppController } from '../controllers/AppController';
import { Tweet } from '../models/Tweet';
import { TweetCard } from '../components/TweetCard';
import { ComposeTweet } from '../components/ComposeTweet';
import { EnesSignature } from '../components/EnesSignature';

interface HomeTimelineViewProps {
  onNavigateToProfile: (userId: string) => void;
  onNavigateToMembers: () => void;
  onOpenArchitecture: () => void;
}

export const HomeTimelineView: React.FC<HomeTimelineViewProps> = ({
  onNavigateToProfile,
  onNavigateToMembers,
  onOpenArchitecture,
}) => {
  const app = AppController.getInstance();
  const currentUser = app.getCurrentUser();

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadFeed = () => {
    if (!currentUser) return;
    const feed = app.getHomeFeed();
    setTweets(feed);
  };

  useEffect(() => {
    loadFeed();
    const unsubscribe = app.subscribe(() => {
      loadFeed();
    });
    return () => unsubscribe();
  }, [currentUser, refreshKey]);

  if (!currentUser) return null;

  const friendsCount = currentUser.friends.length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Enes Öztürk Özel Tasarım Bannerı */}
      <EnesSignature variant="banner" onOpenArchitecture={onOpenArchitecture} />

      {/* Tweet Oluşturma Kutusu (180 Karakter Korumalı) */}
      <ComposeTweet
        onTweetPosted={() => {
          loadFeed();
          setRefreshKey(prev => prev + 1);
        }}
      />

      {/* Akış Başlığı ve Bilgilendirme */}
      <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
          <Sparkles className="w-4 h-4 text-sky-500" />
          <span>Arkadaş Akışı (Son Paylaşılanlar En Üstte)</span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span>{friendsCount} Arkadaş</span>
          <span>·</span>
          <span>{tweets.length} Tweet</span>
          <button
            onClick={() => loadFeed()}
            title="Akışı Yenile"
            className="p-1 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tweet Listesi - Kronolojik Olarak En Yeni En Üstte */}
      {tweets.length > 0 ? (
        <div className="space-y-3.5">
          {tweets.map(tweet => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onNavigateToProfile={onNavigateToProfile}
              onTweetDeleted={() => loadFeed()}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Henüz Akışınızda Tweet Yok
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Kural gereği anasayfanızda yalnızca <span className="font-semibold text-slate-700 dark:text-slate-300">arkadaşlarınızın</span> ve kendi paylaştığınız en yeni tweetler gösterilir.
          </p>
          <button
            onClick={onNavigateToMembers}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Yeni Arkadaşlar Keşfet</span>
          </button>
        </div>
      )}

      {/* Enes Öztürk Footer */}
      <EnesSignature variant="footer" onOpenArchitecture={onOpenArchitecture} />
    </div>
  );
};
