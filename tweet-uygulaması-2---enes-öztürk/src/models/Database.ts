/**
 * @license
 * OOP Mimarisi - Model Katmanı: Database Depolama ve Repository
 * Geliştirici: Enes Öztürk
 */

import { User, UserDTO } from './User';
import { Tweet, TweetDTO } from './Tweet';
import { FriendshipRequest, FriendshipRequestDTO } from './FriendshipRequest';

const STORAGE_KEY_USERS = 'tweet_app2_users';
const STORAGE_KEY_TWEETS = 'tweet_app2_tweets';
const STORAGE_KEY_REQUESTS = 'tweet_app2_requests';
const STORAGE_KEY_CURRENT_USER = 'tweet_app2_current_user_id';

/**
 * Singleton OOP Database Engine
 * Verileri bellekte ve LocalStorage üzerinde senkronize eder.
 */
export class Database {
  private static instance: Database | null = null;

  private users: Map<string, User> = new Map();
  private tweets: Map<string, Tweet> = new Map();
  private requests: Map<string, FriendshipRequest> = new Map();

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Başlangıç mock/tohum verilerini oluşturur
   */
  private seedInitialData(): void {
    const enesId = 'usr_enes_ozturk';
    const zeynepId = 'usr_zeynep_demir';
    const burakId = 'usr_burak_yilmaz';
    const ayseId = 'usr_ayse_kaya';
    const canId = 'usr_can_ozkan';

    // 1. Enes Öztürk (Sistem Yaratıcısı & Geliştirici)
    const enes = new User(
      enesId,
      'enes',
      'Enes Öztürk',
      '123456',
      'Tweet Uygulaması 2 mimarı ve yazılım geliştiricisi. OOP ve MVC prensipleriyle kodlandı.',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      new Date('2026-01-01T10:00:00Z'),
      [zeynepId, burakId], // Enes, Zeynep ve Burak ile arkadaş
      [ayseId], // Ayşe'den gelen bekleyen istek var! (Test için)
      [],
      'creator'
    );

    // 2. Zeynep Demir
    const zeynep = new User(
      zeynepId,
      'zeynep',
      'Zeynep Demir',
      '123456',
      'Kıdemli Frontend Mimarı. TypeScript ve React aşığı.',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
      new Date('2026-01-15T12:00:00Z'),
      [enesId],
      [],
      [],
      'member'
    );

    // 3. Burak Yılmaz
    const burak = new User(
      burakId,
      'burak',
      'Burak Yılmaz',
      '123456',
      'UI/UX Tasarımcısı. Sade, modern ve kullanıcı odaklı arayüzler.',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      new Date('2026-02-01T09:00:00Z'),
      [enesId],
      [],
      [],
      'member'
    );

    // 4. Ayşe Kaya (Enes'e takip isteği yollamış durumda)
    const ayse = new User(
      ayseId,
      'ayse',
      'Ayşe Kaya',
      '123456',
      'Yazılım mühendisliği öğrencisi. MVC & OOP yapılarını öğreniyorum.',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
      new Date('2026-02-10T14:30:00Z'),
      [],
      [],
      [enesId], // Enes'e giden bekleyen istek
      'member'
    );

    // 5. Can Özkan (Henüz kimseyle arkadaş değil, takip isteği gönderilmeye uygun)
    const can = new User(
      canId,
      'can',
      'Can Özkan',
      '123456',
      'Mobil & Web geliştirici. Açık kaynak tutkunu.',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      new Date('2026-02-20T16:00:00Z'),
      [],
      [],
      [],
      'member'
    );

    this.users.set(enes.id, enes);
    this.users.set(zeynep.id, zeynep);
    this.users.set(burak.id, burak);
    this.users.set(ayse.id, ayse);
    this.users.set(can.id, can);

    // Ayşe'nin Enes'e gönderdiği takip isteği nesnesi
    const req1 = new FriendshipRequest(
      'req_ayse_to_enes',
      ayseId,
      'ayse',
      'Ayşe Kaya',
      ayse.avatarUrl,
      enesId,
      'enes',
      'Enes Öztürk',
      enes.avatarUrl,
      'pending',
      new Date(Date.now() - 3600000 * 3)
    );
    this.requests.set(req1.id, req1);

    // Başlangıç Tweetleri (180 karakter sınırına uygun ve kronolojik)
    const now = Date.now();

    const t1 = new Tweet(
      'tw_1',
      enesId,
      'enes',
      'Enes Öztürk',
      enes.avatarUrl,
      'Tweet Uygulaması 2 yayında! 🚀 OOP ve MVC mimarisiyle, tam 180 karakter kontrolü ve güvenli arkadaşlık istekleriyle geliştirildi. Hoş geldiniz! #TweetApp #OOP #MVC',
      new Date(now - 1000 * 60 * 15), // 15 dk önce (en yeni)
      [zeynepId, burakId],
      ['TweetApp', 'OOP', 'MVC']
    );

    const t2 = new Tweet(
      'tw_2',
      zeynepId,
      'zeynep',
      'Zeynep Demir',
      zeynep.avatarUrl,
      'Model-View-Controller ayrımı harika olmuş. Controller katmanı iş kurallarını işletirken, OOP modellerimiz nesne durumunu mükemmel koruyor.',
      new Date(now - 1000 * 60 * 45), // 45 dk önce
      [enesId],
      []
    );

    const t3 = new Tweet(
      'tw_3',
      burakId,
      'burak',
      'Burak Yılmaz',
      burak.avatarUrl,
      'Sadece arkadaşların birbirlerinin tweetlerini okuyabilmesi harika bir gizlilik özelliği. Temiz ve modern bir kullanıcı deneyimi olmuş @enes!',
      new Date(now - 1000 * 60 * 120), // 2 saat önce
      [enesId],
      []
    );

    const t4 = new Tweet(
      'tw_4',
      enesId,
      'enes',
      'Enes Öztürk',
      enes.avatarUrl,
      'Karakter sayacı 180 karaktere yaklaştıkça renk değiştiriyor. Tam olarak Twitter/X kalitesinde mikro etkileşimler!',
      new Date(now - 1000 * 60 * 240), // 4 saat önce
      [zeynepId],
      []
    );

    this.tweets.set(t1.id, t1);
    this.tweets.set(t2.id, t2);
    this.tweets.set(t3.id, t3);
    this.tweets.set(t4.id, t4);

    this.persistAll();
  }

  private loadFromStorage(): void {
    try {
      const storedUsers = localStorage.getItem(STORAGE_KEY_USERS);
      const storedTweets = localStorage.getItem(STORAGE_KEY_TWEETS);
      const storedRequests = localStorage.getItem(STORAGE_KEY_REQUESTS);

      if (!storedUsers || !storedTweets) {
        this.seedInitialData();
        return;
      }

      const usersArray: UserDTO[] = JSON.parse(storedUsers);
      this.users.clear();
      for (const uDto of usersArray) {
        this.users.set(uDto.id, User.fromJSON(uDto));
      }

      const tweetsArray: TweetDTO[] = JSON.parse(storedTweets);
      this.tweets.clear();
      for (const tDto of tweetsArray) {
        this.tweets.set(tDto.id, Tweet.fromJSON(tDto));
      }

      if (storedRequests) {
        const reqArray: FriendshipRequestDTO[] = JSON.parse(storedRequests);
        this.requests.clear();
        for (const rDto of reqArray) {
          this.requests.set(rDto.id, FriendshipRequest.fromJSON(rDto));
        }
      }
    } catch {
      this.seedInitialData();
    }
  }

  private persistUsers(): void {
    try {
      const arr: UserDTO[] = Array.from(this.users.values()).map(u => u.toJSON());
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(arr));
    } catch (e) {
      console.error('Kullanıcılar kaydedilemedi:', e);
    }
  }

  private persistTweets(): void {
    try {
      const arr: TweetDTO[] = Array.from(this.tweets.values()).map(t => t.toJSON());
      localStorage.setItem(STORAGE_KEY_TWEETS, JSON.stringify(arr));
    } catch (e) {
      console.error('Tweetler kaydedilemedi:', e);
    }
  }

  private persistRequests(): void {
    try {
      const arr: FriendshipRequestDTO[] = Array.from(this.requests.values()).map(r => r.toJSON());
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(arr));
    } catch (e) {
      console.error('İstekler kaydedilemedi:', e);
    }
  }

  public persistAll(): void {
    this.persistUsers();
    this.persistTweets();
    this.persistRequests();
  }

  // --- User Repository Metotları ---

  public saveUser(user: User): void {
    this.users.set(user.id, user);
    this.persistUsers();
  }

  public getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  public getUserByUsername(username: string): User | undefined {
    const search = username.toLowerCase().trim();
    for (const user of this.users.values()) {
      if (user.username === search) return user;
    }
    return undefined;
  }

  public getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // --- Tweet Repository Metotları ---

  public saveTweet(tweet: Tweet): void {
    this.tweets.set(tweet.id, tweet);
    this.persistTweets();
  }

  public deleteTweet(tweetId: string): boolean {
    const deleted = this.tweets.delete(tweetId);
    if (deleted) this.persistTweets();
    return deleted;
  }

  public getTweetById(id: string): Tweet | undefined {
    return this.tweets.get(id);
  }

  public getAllTweetsSorted(): Tweet[] {
    // Son gönderilen tweet sayfanın başında (azalan tarih sırası)
    return Array.from(this.tweets.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  /**
   * Belirli bir yazarın tweetlerini getirir (en yeni en üstte)
   */
  public getTweetsByAuthor(authorId: string): Tweet[] {
    return this.getAllTweetsSorted().filter(t => t.authorId === authorId);
  }

  /**
   * Kullanıcının anasayfa akışı:
   * Kendisinin ve sadece ARKADAŞLARININ tweetlerini son gönderilen en üstte olacak şekilde getirir.
   */
  public getHomeFeedForUser(user: User): Tweet[] {
    const allowedAuthorIds = new Set([user.id, ...user.friends]);
    return this.getAllTweetsSorted().filter(t => allowedAuthorIds.has(t.authorId));
  }

  // --- Friendship Requests Repository Metotları ---

  public saveRequest(req: FriendshipRequest): void {
    this.requests.set(req.id, req);
    this.persistRequests();
  }

  public getRequestById(id: string): FriendshipRequest | undefined {
    return this.requests.get(id);
  }

  public getPendingRequestsForUser(userId: string): FriendshipRequest[] {
    return Array.from(this.requests.values()).filter(
      r => r.receiverId === userId && r.status === 'pending'
    );
  }

  public getSentRequestsByUser(userId: string): FriendshipRequest[] {
    return Array.from(this.requests.values()).filter(
      r => r.senderId === userId && r.status === 'pending'
    );
  }

  public findActiveRequestBetween(user1Id: string, user2Id: string): FriendshipRequest | undefined {
    for (const r of this.requests.values()) {
      if (
        r.status === 'pending' &&
        ((r.senderId === user1Id && r.receiverId === user2Id) ||
          (r.senderId === user2Id && r.receiverId === user1Id))
      ) {
        return r;
      }
    }
    return undefined;
  }

  // --- Oturum Yönetimi ---

  public getSavedCurrentUserId(): string | null {
    return localStorage.getItem(STORAGE_KEY_CURRENT_USER);
  }

  public setSavedCurrentUserId(userId: string | null): void {
    if (userId) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, userId);
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  }

  /**
   * Test veya sıfırlama durumunda tüm verileri başlangıç mocklarına döndürür
   */
  public resetToFactory(): void {
    localStorage.removeItem(STORAGE_KEY_USERS);
    localStorage.removeItem(STORAGE_KEY_TWEETS);
    localStorage.removeItem(STORAGE_KEY_REQUESTS);
    this.seedInitialData();
  }
}
