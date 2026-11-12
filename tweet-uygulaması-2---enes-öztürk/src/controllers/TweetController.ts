/**
 * @license
 * MVC Mimarisi - Controller Katmanı: TweetController
 * Geliştirici: Enes Öztürk
 */

import { Database } from '../models/Database';
import { Tweet } from '../models/Tweet';
import { User } from '../models/User';

export interface TweetResult {
  success: boolean;
  tweet?: Tweet;
  errorMessage?: string;
}

export interface ProfileTweetsResult {
  canView: boolean;
  tweets: Tweet[];
  reason?: string;
}

/**
 * TweetController:
 * Tweet oluşturma, 180 karakter doğrulaması, anasayfa akışı (arkadaş odaklı)
 * ve profil gizlilik kurallarını yönetir.
 */
export class TweetController {
  private db: Database;
  private changeListeners: Array<() => void> = [];

  constructor(database: Database = Database.getInstance()) {
    this.db = database;
  }

  /**
   * Yeni bir tweet paylaşır.
   * Proje şartı: Kayıtlı kullanıcılar en fazla 180 karakterlik tweet paylaşabilir.
   */
  public postTweet(content: string, currentUser: User | null): TweetResult {
    if (!currentUser) {
      return {
        success: false,
        errorMessage: 'Tweet paylaşabilmek için oturum açmış olmanız gerekmektedir.',
      };
    }

    // 180 karakter OOP model kuralı doğrulaması
    const validation = Tweet.validateContent(content);
    if (!validation.isValid) {
      return {
        success: false,
        errorMessage: validation.errorMessage,
      };
    }

    try {
      const tweetId = `tw_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const newTweet = new Tweet(
        tweetId,
        currentUser.id,
        currentUser.username,
        currentUser.name,
        currentUser.avatarUrl,
        content,
        new Date() // Şu anki tarih (en yeni)
      );

      this.db.saveTweet(newTweet);
      this.notifyChanges();

      return {
        success: true,
        tweet: newTweet,
      };
    } catch (err: any) {
      return {
        success: false,
        errorMessage: err.message || 'Tweet oluşturulurken bir hata oluştu.',
      };
    }
  }

  /**
   * Anasayfa akışı:
   * Proje şartı:
   * 1. Kayıtlı olmayan kullanıcılar tweet okuyamaz.
   * 2. Anasayfada arkadaşlarının tweetlerini son gönderilen en üstte olacak şekilde görür.
   */
  public getHomeTimeline(currentUser: User | null): {
    canRead: boolean;
    tweets: Tweet[];
    errorMessage?: string;
  } {
    if (!currentUser) {
      return {
        canRead: false,
        tweets: [],
        errorMessage: 'Tweetleri okuyabilmek için lütfen giriş yapın veya kayıt olun.',
      };
    }

    // Database üzerinden sadece kendisi ve arkadaşlarının tweetleri, tarihe göre azalan (en yeni başta)
    const tweets = this.db.getHomeFeedForUser(currentUser);
    return {
      canRead: true,
      tweets,
    };
  }

  /**
   * Profil tweetlerini okuma:
   * Proje şartı:
   * "Arkadaş olmuş kullanıcılar bir birlerinin sayfasına girerek tweetlerini okuyabilir."
   * Eğer kullanıcılar arkadaş değilse (ve kendi profili değilse), tweetleri okuyamaz!
   */
  public getProfileTweets(targetUserId: string, currentUser: User | null): ProfileTweetsResult {
    if (!currentUser) {
      return {
        canView: false,
        tweets: [],
        reason: 'Tweetleri görebilmek için giriş yapmalısınız.',
      };
    }

    const targetUser = this.db.getUserById(targetUserId);
    if (!targetUser) {
      return {
        canView: false,
        tweets: [],
        reason: 'Kullanıcı bulunamadı.',
      };
    }

    // Kendi profili ise her zaman görebilir
    if (currentUser.id === targetUser.id) {
      return {
        canView: true,
        tweets: this.db.getTweetsByAuthor(targetUser.id),
      };
    }

    // Arkadaşlık kontrolü (OOP metodu üzerinden)
    const isFriend = currentUser.isFriendWith(targetUser.id);
    if (!isFriend) {
      return {
        canView: false,
        tweets: [],
        reason: 'Bu kullanıcının tweetlerini okuyabilmek için arkadaş olmanız gerekmektedir. Takip isteği göndererek arkadaş olabilirsiniz.',
      };
    }

    // Arkadaş ise tweetleri azalan sıra ile döndür
    return {
      canView: true,
      tweets: this.db.getTweetsByAuthor(targetUser.id),
    };
  }

  /**
   * Tweet beğen / beğeniyi geri al
   */
  public toggleLike(tweetId: string, currentUser: User | null): { success: boolean; isLiked?: boolean } {
    if (!currentUser) return { success: false };

    const tweet = this.db.getTweetById(tweetId);
    if (!tweet) return { success: false };

    const isLiked = tweet.toggleLike(currentUser.id);
    this.db.saveTweet(tweet);
    this.notifyChanges();

    return { success: true, isLiked };
  }

  /**
   * Tweet silme (yalnızca tweet sahibi veya sistem kurucusu silebilir)
   */
  public deleteTweet(tweetId: string, currentUser: User | null): boolean {
    if (!currentUser) return false;

    const tweet = this.db.getTweetById(tweetId);
    if (!tweet) return false;

    if (tweet.authorId === currentUser.id || currentUser.role === 'creator') {
      const deleted = this.db.deleteTweet(tweetId);
      if (deleted) this.notifyChanges();
      return deleted;
    }

    return false;
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
