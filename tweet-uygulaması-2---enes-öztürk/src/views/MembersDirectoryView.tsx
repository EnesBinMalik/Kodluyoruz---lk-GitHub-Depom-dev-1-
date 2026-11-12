/**
 * @license
 * Üyeler Dizini Görünümü (MembersDirectoryView)
 * Geliştirici: Enes Öztürk
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  UserPlus,
  UserCheck,
  Clock,
  ShieldCheck,
  Users,
  Sparkles,
} from 'lucide-react';
import { AppController } from '../controllers/AppController';
import { User } from '../models/User';
import { RelationshipStatus } from '../controllers/FriendshipController';
import { EnesSignature } from '../components/EnesSignature';

interface MembersDirectoryViewProps {
  onNavigateToProfile: (userId: string) => void;
  onOpenArchitecture: () => void;
}

export const MembersDirectoryView: React.FC<MembersDirectoryViewProps> = ({
  onNavigateToProfile,
  onOpenArchitecture,
}) => {
  const app = AppController.getInstance();
  const currentUser = app.getCurrentUser();

  const [members, setMembers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadMembers = () => {
    setMembers(app.getAllMembers());
  };

  useEffect(() => {
    loadMembers();
    const unsub = app.subscribe(() => {
      loadMembers();
    });
    return () => unsub();
  }, []);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSendRequest = (targetUserId: string) => {
    if (!currentUser) return;
    const res = app.friends.sendFriendRequest(currentUser, targetUserId);
    if (res.message) showFeedback(res.message);
  };

  const handleCancelRequest = (targetUserId: string) => {
    if (!currentUser) return;
    const activeReq = app.db.findActiveRequestBetween(currentUser.id, targetUserId);
    if (activeReq) {
      const res = app.friends.cancelFriendRequest(activeReq.id, currentUser);
      if (res.message) showFeedback(res.message);
    }
  };

  const handleAcceptRequest = (senderId: string) => {
    if (!currentUser) return;
    const activeReq = app.db.findActiveRequestBetween(senderId, currentUser.id);
    if (activeReq) {
      const res = app.friends.acceptFriendRequest(activeReq.id, currentUser);
      if (res.message) showFeedback(res.message);
    }
  };

  const filteredMembers = members.filter(m => {
    const q = search.toLowerCase().trim();
    return (
      m.name.toLowerCase().includes(q) ||
      m.username.toLowerCase().includes(q) ||
      m.bio.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Başlık ve Arama */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-500" />
              <span>Üyeler Dizini</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Diğer üyeleri bulun, takip isteği göndererek tweetlerini okumaya başlayın.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold">
            {members.length} Üye
          </span>
        </div>

        {/* Arama Girişi */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="İsim, kullanıcı adı veya biyografi ile ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {feedback && (
          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 font-semibold animate-in fade-in">
            {feedback}
          </div>
        )}
      </div>

      {/* Üye Kartları Listesi */}
      <div className="grid grid-cols-1 gap-3">
        {filteredMembers.map(member => {
          const isEnes = member.username === 'enes';
          let relStatus: RelationshipStatus = 'none';
          if (currentUser) {
            relStatus = app.friends.getRelationshipStatus(currentUser.id, member.id);
          }

          return (
            <div
              key={member.id}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div
                onClick={() => onNavigateToProfile(member.id)}
                className="flex items-start gap-3 cursor-pointer group min-w-0 flex-1"
              >
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-sky-500 transition-all shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:underline truncate">
                      {member.name}
                    </span>
                    {isEnes && (
                      <span title="Geliştirici & Mimar">
                        <ShieldCheck className="w-4 h-4 text-sky-500" />
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono">@{member.username}</span>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                    <span>{member.friends.length} Arkadaş</span>
                    <span>·</span>
                    <span>
                      {relStatus === 'friends' || relStatus === 'self'
                        ? 'Tweetler Erişilebilir'
                        : 'Korumalı Profil'}
                    </span>
                  </div>
                </div>
              </div>

              {/* İlişki Aksiyonu */}
              <div className="shrink-0 flex items-center gap-2">
                {relStatus === 'self' ? (
                  <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-semibold">
                    Kendi Profiliniz
                  </span>
                ) : relStatus === 'friends' ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Arkadaşsınız</span>
                  </span>
                ) : relStatus === 'pending_sent' ? (
                  <button
                    onClick={() => handleCancelRequest(member.id)}
                    className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>İsteği İptal Et</span>
                  </button>
                ) : relStatus === 'pending_received' ? (
                  <button
                    onClick={() => handleAcceptRequest(member.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>İsteği Kabul Et</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleSendRequest(member.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Takip İsteği Gönder</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enes Öztürk Footer */}
      <EnesSignature variant="footer" onOpenArchitecture={onOpenArchitecture} />
    </div>
  );
};
