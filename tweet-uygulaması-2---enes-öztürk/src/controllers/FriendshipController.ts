/**
 * @license
 * MVC Mimarisi - Controller Katmanı: FriendshipController
 * Geliştirici: Enes Öztürk
 */

import { Database } from '../models/Database';
import { FriendshipRequest } from '../models/FriendshipRequest';
import { User } from '../models/User';

export type RelationshipStatus =
  | 'self' // Kendi hesabı
  | 'friends' // Arkadaş olmuşlar
  | 'pending_sent' // Karşı tarafa takip isteği gönderildi
  | 'pending_received' // Karşı taraftan takip isteği alındı (Kabul/Ret bekliyor)
  | 'none'; // Herhangi bir bağ yok, takip isteği gönderilebilir

export interface FriendshipActionResult {
  success: boolean;
  message?: string;
  errorMessage?: string;
}

/**
 * FriendshipController:
 * Takip isteği gönderme, kabul etme, reddetme, istek iptali ve arkadaşlık bağını yönetir.
 */
export class FriendshipController {
  private db: Database;
  private changeListeners: Array<() => void> = [];

  constructor(database: Database = Database.getInstance()) {
    this.db = database;
  }

  /**
   * İki kullanıcı arasındaki arkadaşlık durumunu tespit eder
   */
  public getRelationshipStatus(currentUserId: string, targetUserId: string): RelationshipStatus {
    if (currentUserId === targetUserId) return 'self';

    const currentUser = this.db.getUserById(currentUserId);
    if (!currentUser) return 'none';

    // 1. Zaten arkadaşlar mı?
    if (currentUser.isFriendWith(targetUserId)) {
      return 'friends';
    }

    // 2. Bekleyen istek kontrolü
    const activeReq = this.db.findActiveRequestBetween(currentUserId, targetUserId);
    if (activeReq) {
      if (activeReq.senderId === currentUserId) {
        return 'pending_sent';
      } else if (activeReq.receiverId === currentUserId) {
        return 'pending_received';
      }
    }

    return 'none';
  }

  /**
   * Takip/Arkadaşlık isteği gönderme
   */
  public sendFriendRequest(sender: User, targetUserId: string): FriendshipActionResult {
    if (sender.id === targetUserId) {
      return { success: false, errorMessage: 'Kendinize takip isteği gönderemezsiniz.' };
    }

    const targetUser = this.db.getUserById(targetUserId);
    if (!targetUser) {
      return { success: false, errorMessage: 'Hedef kullanıcı bulunamadı.' };
    }

    if (sender.isFriendWith(targetUserId)) {
      return { success: false, errorMessage: 'Bu kullanıcıyla zaten arkadaşsınız.' };
    }

    const existingReq = this.db.findActiveRequestBetween(sender.id, targetUserId);
    if (existingReq) {
      if (existingReq.senderId === sender.id) {
        return { success: false, errorMessage: 'Zaten bekleyen bir takip isteğiniz var.' };
      } else {
        // Karşı taraf zaten istek göndermişse doğrudan kabul etme akışına yönlendirebiliriz
        return this.acceptFriendRequest(existingReq.id, sender);
      }
    }

    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const request = new FriendshipRequest(
      requestId,
      sender.id,
      sender.username,
      sender.name,
      sender.avatarUrl,
      targetUser.id,
      targetUser.username,
      targetUser.name,
      targetUser.avatarUrl,
      'pending',
      new Date()
    );

    // OOP nesne durumlarını güncelle
    sender.addOutgoingRequest(targetUser.id);
    targetUser.addIncomingRequest(sender.id);

    this.db.saveRequest(request);
    this.db.saveUser(sender);
    this.db.saveUser(targetUser);

    this.notifyChanges();
    return { success: true, message: `${targetUser.name} kullanıcısına takip isteği gönderildi.` };
  }

  /**
   * Takip isteğini kabul etme
   * Her iki kullanıcıyı da karşılıklı arkadaş yapar.
   */
  public acceptFriendRequest(requestId: string, currentUser: User): FriendshipActionResult {
    const request = this.db.getRequestById(requestId);
    if (!request || !request.isPending()) {
      return { success: false, errorMessage: 'Geçersiz veya süresi dolmuş istek.' };
    }

    if (request.receiverId !== currentUser.id) {
      return { success: false, errorMessage: 'Bu isteği onaylama yetkiniz yok.' };
    }

    const sender = this.db.getUserById(request.senderId);
    if (!sender) {
      return { success: false, errorMessage: 'İsteği gönderen kullanıcı bulunamadı.' };
    }

    // OOP İstek nesnesini onayla
    request.accept();

    // OOP Karşılıklı arkadaşlık bağı oluşturma
    currentUser.addFriend(sender.id);
    sender.addFriend(currentUser.id);

    this.db.saveRequest(request);
    this.db.saveUser(currentUser);
    this.db.saveUser(sender);

    this.notifyChanges();
    return {
      success: true,
      message: `${sender.name} ile artık arkadaşsınız! Birbirinizin tweetlerini okuyabilirsiniz.`,
    };
  }

  /**
   * Takip isteğini reddetme
   */
  public rejectFriendRequest(requestId: string, currentUser: User): FriendshipActionResult {
    const request = this.db.getRequestById(requestId);
    if (!request || !request.isPending()) {
      return { success: false, errorMessage: 'Geçersiz istek.' };
    }

    if (request.receiverId !== currentUser.id) {
      return { success: false, errorMessage: 'Bu isteği reddetme yetkiniz yok.' };
    }

    const sender = this.db.getUserById(request.senderId);
    request.reject();

    currentUser.rejectIncomingRequest(request.senderId);
    if (sender) {
      sender.cancelOutgoingRequest(currentUser.id);
      this.db.saveUser(sender);
    }

    this.db.saveRequest(request);
    this.db.saveUser(currentUser);

    this.notifyChanges();
    return { success: true, message: 'Takip isteği reddedildi.' };
  }

  /**
   * Gönderilen takip isteğini geri çekme / iptal etme
   */
  public cancelFriendRequest(requestId: string, currentUser: User): FriendshipActionResult {
    const request = this.db.getRequestById(requestId);
    if (!request || !request.isPending()) {
      return { success: false, errorMessage: 'Geçersiz istek.' };
    }

    if (request.senderId !== currentUser.id) {
      return { success: false, errorMessage: 'Bu isteği iptal etme yetkiniz yok.' };
    }

    const receiver = this.db.getUserById(request.receiverId);
    request.cancel();

    currentUser.cancelOutgoingRequest(request.receiverId);
    if (receiver) {
      receiver.rejectIncomingRequest(currentUser.id);
      this.db.saveUser(receiver);
    }

    this.db.saveRequest(request);
    this.db.saveUser(currentUser);

    this.notifyChanges();
    return { success: true, message: 'Takip isteği geri çekildi.' };
  }

  /**
   * Arkadaşlıktan çıkarma
   */
  public removeFriend(currentUser: User, friendUserId: string): FriendshipActionResult {
    const friend = this.db.getUserById(friendUserId);
    if (!friend) {
      return { success: false, errorMessage: 'Kullanıcı bulunamadı.' };
    }

    currentUser.removeFriend(friend.id);
    friend.removeFriend(currentUser.id);

    this.db.saveUser(currentUser);
    this.db.saveUser(friend);

    this.notifyChanges();
    return { success: true, message: `${friend.name} arkadaş listenizden çıkarıldı.` };
  }

  /**
   * Kullanıcının bekleyen gelen istekleri
   */
  public getIncomingRequests(userId: string): FriendshipRequest[] {
    return this.db.getPendingRequestsForUser(userId);
  }

  /**
   * Kullanıcının gönderdiği bekleyen istekler
   */
  public getOutgoingRequests(userId: string): FriendshipRequest[] {
    return this.db.getSentRequestsByUser(userId);
  }

  /**
   * Kullanıcının arkadaşlarını User nesneleri olarak getirir
   */
  public getFriends(userId: string): User[] {
    const user = this.db.getUserById(userId);
    if (!user) return [];
    return user.friends
      .map(fId => this.db.getUserById(fId))
      .filter((u): u is User => u !== undefined);
  }

  public subscribe(listener: () => void): () => void {
    this.changeListeners.push(listener);
    return () => {
      this.changeListeners = this.changeListeners.filter(l => l !== listener);
    };
  }

  private notifyChanges(): void {
    this.changeListeners.forEach(fn => fn());
  }
}
