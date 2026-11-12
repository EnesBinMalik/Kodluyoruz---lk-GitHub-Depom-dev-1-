/**
 * @license
 * MVC Mimarisi - Controller Katmanı: AppController (Facade / Mediator)
 * Geliştirici: Enes Öztürk
 */

import { Database } from '../models/Database';
import { AuthController } from './AuthController';
import { TweetController } from './TweetController';
import { FriendshipController } from './FriendshipController';
import { User } from '../models/User';
import { Tweet } from '../models/Tweet';
import { FriendshipRequest } from '../models/FriendshipRequest';

export class AppController {
  private static instance: AppController | null = null;

  public readonly db: Database;
  public readonly auth: AuthController;
  public readonly tweets: TweetController;
  public readonly friends: FriendshipController;

  private stateChangeListeners: Array<() => void> = [];

  private constructor() {
    this.db = Database.getInstance();
    this.auth = new AuthController(this.db);
    this.tweets = new TweetController(this.db);
    this.friends = new FriendshipController(this.db);

    // Tüm alt controller değişikliklerinde genel uygulama dinleyicilerini tetikle
    this.auth.subscribe(() => this.triggerUpdate());
    this.tweets.subscribe(() => this.triggerUpdate());
    this.friends.subscribe(() => this.triggerUpdate());
  }

  public static getInstance(): AppController {
    if (!AppController.instance) {
      AppController.instance = new AppController();
    }
    return AppController.instance;
  }

  // --- Genel Veri Getiriciler (Views için kolaylaştırılmış arabirim) ---

  public getCurrentUser(): User | null {
    return this.auth.getCurrentUser();
  }

  public getAllMembers(): User[] {
    return this.db.getAllUsers();
  }

  public getMemberById(id: string): User | undefined {
    return this.db.getUserById(id);
  }

  public getMemberByUsername(username: string): User | undefined {
    return this.db.getUserByUsername(username);
  }

  public getHomeFeed(): Tweet[] {
    const user = this.getCurrentUser();
    const result = this.tweets.getHomeTimeline(user);
    return result.tweets;
  }

  public getProfileTweets(userId: string): { canView: boolean; tweets: Tweet[]; reason?: string } {
    const user = this.getCurrentUser();
    return this.tweets.getProfileTweets(userId, user);
  }

  public getPendingIncomingCount(): number {
    const user = this.getCurrentUser();
    if (!user) return 0;
    return this.friends.getIncomingRequests(user.id).length;
  }

  public updateProfile(name: string, bio: string, avatarUrl?: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    user.name = name;
    user.bio = bio;
    if (avatarUrl) {
      user.avatarUrl = avatarUrl;
    }

    this.db.saveUser(user);
    this.triggerUpdate();
    return true;
  }

  public resetAllData(): void {
    this.db.resetToFactory();
    this.auth.switchUser('usr_enes_ozturk'); // Enes Öztürk varsayılan aktif
    this.triggerUpdate();
  }

  public subscribe(listener: () => void): () => void {
    this.stateChangeListeners.push(listener);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter(l => l !== listener);
    };
  }

  private triggerUpdate(): void {
    this.stateChangeListeners.forEach(fn => fn());
  }
}
