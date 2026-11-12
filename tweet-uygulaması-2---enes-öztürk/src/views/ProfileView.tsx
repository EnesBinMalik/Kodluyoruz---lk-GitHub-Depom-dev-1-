/**
 * @license
 * Profil Görünümü (ProfileView)
 * Proje şartı:
 * - Kayıtlı kullanıcıların bir profil sayfası olur.
 * - Arkadaş olmuş kullanıcılar bir birlerinin sayfasına girerek tweetlerini okuyabilir.
 * - Kayıtlı olmayan ya da arkadaş olmayanlar tweetleri okuyamaz.
 * Geliştirici: Enes Öztürk
 */

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Lock,
  UserPlus,
  UserCheck,
  UserX,
  Check,
  X,
  Clock,
  ShieldCheck,
  Edit3,
  Users,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { AppController } from '../controllers/AppController';
import { User } from '../models/User';
import { Tweet } from '../models/Tweet';
import { TweetCard } from '../components/TweetCard';
import { RelationshipStatus } from '../controllers/FriendshipController';
import { EnesSignature } from '../components/EnesSignature';

interface ProfileViewProps {
  userId: string;
  onNavigateToProfile: (userId: string) => void;
  onOpenArchitecture: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userId,
  onNavigateToProfile,
  onOpenArchitecture,
}) => {
  const app = AppController.getInstance();
  const currentUser = app.getCurrentUser();

  const [profileUser, setProfileUser] = useState<User | undefined>(undefined);
  const [relationship, setRelationship] = useState<RelationshipStatus>('none');
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [canViewTweets, setCanViewTweets] = useState(false);
  const [activeTab, setActiveTab] = useState<'tweets' | 'friends' | 'about'>('tweets');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadProfile = () => {
    const user = app.getMemberById(userId);
    setProfileUser(user);

    if (user && currentUser) {
      const rel = app.friends.getRelationshipStatus(currentUser.id, user.id);
      setRelationship(rel);

      const tweetResult = app.getProfileTweets(user.id);
      setCanViewTweets(tweetResult.canView);
      setTweets(tweetResult.tweets);

      setEditName(user.name);
      setEditBio(user.bio);
    }
  };

  useEffect(() => {
    loadProfile();
    const unsub = app.subscribe(() => {
      loadProfile();
    });
    return () => unsub();
  }, [userId, currentUser]);

  if (!profileUser || !currentUser) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center text-sm text-slate-500">
        Kullanıcı profili bulunamadı veya oturumunuz kapalı.
      </div>
    );
  }

  const isSelf = currentUser.id === profileUser.id;
  const isEnes = profileUser.username === 'enes';
  const friendsList = app.friends.getFriends(profileUser.id);

  // İlişki aksiyonları
  const handleSendRequest = () => {
    const res = app.friends.sendFriendRequest(currentUser, profileUser.id);
    if (res.message) setActionMessage(res.message);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleCancelRequest = () => {
    const activeReq = app.db.findActiveRequestBetween(currentUser.id, profileUser.id);
    if (activeReq) {
      const res = app.friends.cancelFriendRequest(activeReq.id, currentUser);
      if (res.message) setActionMessage(res.message);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleAcceptRequest = () => {
    const activeReq = app.db.findActiveRequestBetween(profileUser.id, currentUser.id);
    if (activeReq) {
      const res = app.friends.acceptFriendRequest(activeReq.id, currentUser);
      if (res.message) setActionMessage(res.message);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleRejectRequest = () => {
    const activeReq = app.db.findActiveRequestBetween(profileUser.id, currentUser.id);
    if (activeReq) {
      const res = app.friends.rejectFriendRequest(activeReq.id, currentUser);
      if (res.message) setActionMessage(res.message);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleRemoveFriend = () => {
    if (window.confirm(`${profileUser.name} kullanıcısını arkadaş listenizden çıkarmak istiyor musunuz? Artık birbirinizin tweetlerini göremeyeceksiniz.`)) {
      const res = app.friends.removeFriend(currentUser, profileUser.id);
      if (res.message) setActionMessage(res.message);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    app.updateProfile(editName, editBio);
    setIsEditing(false);
    setActionMessage('Profil başarıyla güncellendi.');
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profil Başlık Kartı */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 relative">
          {isEnes && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>Sistem Mimarı</span>
            </div>
          )}
        </div>

        {/* Profil Bilgi Alanı */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 mb-4 gap-4">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileUser.avatarUrl}
                alt={profileUser.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md bg-white"
              />
            </div>

            {/* İlişki Aksiyon Butonları */}
            <div className="flex items-center gap-2">
              {isSelf ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Profili Düzenle</span>
                </button>
              ) : relationship === 'friends' ? (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" />
                    <span>Arkadaşsınız</span>
                  </span>
                  <button
                    onClick={handleRemoveFriend}
                    title="Arkadaşlıktan Çıkar"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                </div>
              ) : relationship === 'pending_sent' ? (
                <button
                  onClick={handleCancelRequest}
                  className="px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>İstek Gönderildi (İptal Et)</span>
                </button>
              ) : relationship === 'pending_received' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAcceptRequest}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>İsteği Kabul Et</span>
                  </button>
                  <button
                    onClick={handleRejectRequest}
                    className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reddet</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSendRequest}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Takip İsteği Gönder</span>
                </button>
              )}
            </div>
          </div>

          {actionMessage && (
            <div className="mb-4 p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 font-medium">
              {actionMessage}
            </div>
          )}

          {/* İsim ve Kullanıcı Adı */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {profileUser.name}
              </h1>
              {isEnes && (
                <span title="Tweet Uygulaması 2 Mimarı (Enes Öztürk)">
                  <ShieldCheck className="w-5 h-5 text-sky-500" />
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400 font-mono">@{profileUser.username}</div>
          </div>

          {/* Biyografi */}
          {profileUser.bio && (
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profileUser.bio}
            </p>
          )}

          {/* Meta Detaylar: Katılım Tarihi & İstatistikler */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                Katıldı:{' '}
                {profileUser.joinedAt.toLocaleDateString('tr-TR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-3 font-medium">
              <span>
                <strong className="text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                  {friendsList.length}
                </strong>{' '}
                Arkadaş
              </span>
              <span>·</span>
              <span>
                <strong className="text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                  {canViewTweets ? tweets.length : '?'}
                </strong>{' '}
                Tweet
              </span>
            </div>
          </div>
        </div>

        {/* Tab Seçimi */}
        <div className="flex border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
          <button
            onClick={() => setActiveTab('tweets')}
            className={`flex-1 py-3 font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'tweets'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tweetler {canViewTweets && `(${tweets.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-3 font-bold transition-colors flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'friends'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Arkadaşlar ({friendsList.length})</span>
          </button>
        </div>
      </div>

      {/* Tab İçerikleri */}
      {activeTab === 'tweets' && (
        <div className="space-y-4">
          {canViewTweets ? (
            tweets.length > 0 ? (
              <div className="space-y-3.5">
                {tweets.map(t => (
                  <TweetCard
                    key={t.id}
                    tweet={t}
                    onNavigateToProfile={onNavigateToProfile}
                    onTweetDeleted={() => loadProfile()}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500">
                Bu kullanıcının henüz paylaşılmış bir tweeti bulunmuyor.
              </div>
            )
          ) : (
            /* Arkadaş Olmayanlar İçin Gizlilik Uyarısı */
            <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6 text-slate-500" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                  Bu Kullanıcının Tweetleri Korumalı
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Proje kuralı gereğince: <br />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    "Arkadaş olmuş kullanıcılar birbirlerinin sayfasına girerek tweetlerini okuyabilir."
                  </span>
                  <br />
                  Bu kullanıcının paylaşımlarını görebilmek için takip isteği göndermelisiniz.
                </p>
              </div>

              {relationship === 'none' && (
                <button
                  onClick={handleSendRequest}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Takip İsteği Gönder</span>
                </button>
              )}

              {relationship === 'pending_sent' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Takip isteğiniz onay bekliyor</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="space-y-3">
          {friendsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {friendsList.map(f => (
                <div
                  key={f.id}
                  onClick={() => onNavigateToProfile(f.id)}
                  className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-sky-500 transition-colors shadow-xs"
                >
                  <img
                    src={f.avatarUrl}
                    alt={f.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                      {f.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      @{f.username}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500">
              Henüz onaylanmış bir arkadaşı bulunmuyor.
            </div>
          )}
        </div>
      )}

      {/* Profil Düzenleme Modalı */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Profili Düzenle
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Biyografi
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  placeholder="Kendinizden bahsedin..."
                  maxLength={200}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enes Öztürk Footer */}
      <EnesSignature variant="footer" onOpenArchitecture={onOpenArchitecture} />
    </div>
  );
};
