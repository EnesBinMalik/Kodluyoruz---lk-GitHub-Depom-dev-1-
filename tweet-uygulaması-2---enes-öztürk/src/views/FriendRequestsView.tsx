/**
 * @license
 * Takip & Arkadaşlık İstekleri Görünümü (FriendRequestsView)
 * Proje şartı:
 * - Üyeler bir birlerine takip isteği gönderebilir.
 * - Takip isteği alan kişi kabul/ret edebilir.
 * Geliştirici: Enes Öztürk
 */

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Check,
  X,
  UserCheck,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserX,
  Users,
} from 'lucide-react';
import { AppController } from '../controllers/AppController';
import { FriendshipRequest } from '../models/FriendshipRequest';
import { User } from '../models/User';
import { EnesSignature } from '../components/EnesSignature';

interface FriendRequestsViewProps {
  onNavigateToProfile: (userId: string) => void;
  onOpenArchitecture: () => void;
}

export const FriendRequestsView: React.FC<FriendRequestsViewProps> = ({
  onNavigateToProfile,
  onOpenArchitecture,
}) => {
  const app = AppController.getInstance();
  const currentUser = app.getCurrentUser();

  const [incoming, setIncoming] = useState<FriendshipRequest[]>([]);
  const [outgoing, setOutgoing] = useState<FriendshipRequest[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadRequests = () => {
    if (!currentUser) return;
    setIncoming(app.friends.getIncomingRequests(currentUser.id));
    setOutgoing(app.friends.getOutgoingRequests(currentUser.id));
    setFriends(app.friends.getFriends(currentUser.id));
  };

  useEffect(() => {
    loadRequests();
    const unsub = app.subscribe(() => {
      loadRequests();
    });
    return () => unsub();
  }, [currentUser]);

  if (!currentUser) return null;

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleAccept = (requestId: string) => {
    const res = app.friends.acceptFriendRequest(requestId, currentUser);
    if (res.message) showFeedback(res.message);
  };

  const handleReject = (requestId: string) => {
    const res = app.friends.rejectFriendRequest(requestId, currentUser);
    if (res.message) showFeedback(res.message);
  };

  const handleCancel = (requestId: string) => {
    const res = app.friends.cancelFriendRequest(requestId, currentUser);
    if (res.message) showFeedback(res.message);
  };

  const handleRemoveFriend = (friendId: string, friendName: string) => {
    if (window.confirm(`${friendName} arkadaşınızdan çıkarılsın mı?`)) {
      const res = app.friends.removeFriend(currentUser, friendId);
      if (res.message) showFeedback(res.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Başlık Kartı */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
              Takip & Arkadaşlık İstekleri
            </h2>
            <p className="text-xs text-slate-500">
              İstekleri kabul ettiğinizde karşılıklı olarak birbirinizin tweetlerini okuyabilirsiniz.
            </p>
          </div>
        </div>

        {feedback && (
          <div className="mt-4 p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 font-semibold animate-in fade-in">
            {feedback}
          </div>
        )}
      </div>

      {/* 1. GELEN İSTEKLER (KABUL / RET) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Gelen Takip İstekleri</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono text-xs">
              {incoming.length}
            </span>
          </h3>
        </div>

        {incoming.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {incoming.map(req => (
              <div key={req.id} className="py-3 flex items-center justify-between gap-3">
                <div
                  onClick={() => onNavigateToProfile(req.senderId)}
                  className="flex items-center gap-3 cursor-pointer group min-w-0"
                >
                  <img
                    src={req.senderAvatarUrl}
                    alt={req.senderName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-sky-500 transition-all shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate group-hover:underline">
                      {req.senderName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      @{req.senderUsername}
                    </div>
                  </div>
                </div>

                {/* Kabul / Ret Butonları (Proje kuralı) */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Kabul Et</span>
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reddet</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400">
            Bekleyen bir takip isteğiniz bulunmuyor.
          </div>
        )}
      </div>

      {/* 2. GÖNDERİLEN İSTEKLER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Gönderilen Bekleyen İstekler</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs">
              {outgoing.length}
            </span>
          </h3>
        </div>

        {outgoing.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {outgoing.map(req => (
              <div key={req.id} className="py-3 flex items-center justify-between gap-3">
                <div
                  onClick={() => onNavigateToProfile(req.receiverId)}
                  className="flex items-center gap-3 cursor-pointer group min-w-0"
                >
                  <img
                    src={req.receiverAvatarUrl}
                    alt={req.receiverName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-sky-500 transition-all shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate group-hover:underline">
                      {req.receiverName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      @{req.receiverUsername}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCancel(req.id)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  İsteği İptal Et
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400">
            Henüz bekleyen giden bir isteğiniz yok.
          </div>
        )}
      </div>

      {/* 3. MEVCUT ARKADAŞLAR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-500" />
            <span>Mevcut Arkadaşlarım ({friends.length})</span>
          </h3>
        </div>

        {friends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {friends.map(friend => (
              <div
                key={friend.id}
                className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-sky-500/40 bg-slate-50/50 dark:bg-slate-800/40 transition-colors flex items-center justify-between gap-2"
              >
                <div
                  onClick={() => onNavigateToProfile(friend.id)}
                  className="flex items-center gap-2.5 cursor-pointer min-w-0"
                >
                  <img
                    src={friend.avatarUrl}
                    alt={friend.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                      {friend.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      @{friend.username}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onNavigateToProfile(friend.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Profile Git"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveFriend(friend.id, friend.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Arkadaşlıktan Çıkar"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400">
            Henüz onaylanmış bir arkadaşınız yok. Üyeler sekmesinden kişileri ekleyebilirsiniz!
          </div>
        )}
      </div>

      {/* Enes Öztürk Footer */}
      <EnesSignature variant="footer" onOpenArchitecture={onOpenArchitecture} />
    </div>
  );
};
