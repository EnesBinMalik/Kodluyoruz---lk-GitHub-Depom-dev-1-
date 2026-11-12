/**
 * @license
 * MVC Mimarisi - Controller Katmanı: AuthController
 * Geliştirici: Enes Öztürk
 */

import { Database } from '../models/Database';
import { User } from '../models/User';

export interface AuthResult {
  success: boolean;
  user?: User;
  errorMessage?: string;
}

/**
 * AuthController:
 * Kullanıcı kaydı, girişi, oturum takibi ve hesap değiştirme operasyonlarını yürütür.
 */
export class AuthController {
  private db: Database;
  private currentUser: User | null = null;
  private listeners: Array<(user: User | null) => void> = [];

  constructor(database: Database = Database.getInstance()) {
    this.db = database;
    this.restoreSession();
  }

  private restoreSession(): void {
    const savedId = this.db.getSavedCurrentUserId();
    if (savedId) {
      const user = this.db.getUserById(savedId);
      if (user) {
        this.currentUser = user;
      }
    }
  }

  public getCurrentUser(): User | null {
    // Veritabanındaki en güncel örneği al
    if (this.currentUser) {
      const updated = this.db.getUserById(this.currentUser.id);
      if (updated) {
        this.currentUser = updated;
      }
    }
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Yeni kullanıcı kaydı
   */
  public register(
    username: string,
    name: string,
    password: string,
    bio: string = '',
    avatarUrl: string = ''
  ): AuthResult {
    const cleanUsername = username.toLowerCase().trim();
    const cleanName = name.trim();

    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, errorMessage: 'Kullanıcı adı en az 3 karakter olmalıdır.' };
    }

    if (!cleanName) {
      return { success: false, errorMessage: 'Ad Soyad alanı boş bırakılamaz.' };
    }

    if (!password || password.length < 4) {
      return { success: false, errorMessage: 'Şifre en az 4 karakter olmalıdır.' };
    }

    // Kullanıcı adı benzersizlik kontrolü
    const existing = this.db.getUserByUsername(cleanUsername);
    if (existing) {
      return { success: false, errorMessage: 'Bu kullanıcı adı zaten kullanımda.' };
    }

    const newId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newUser = new User(
      newId,
      cleanUsername,
      cleanName,
      password,
      bio,
      avatarUrl,
      new Date(),
      [],
      [],
      [],
      'member'
    );

    this.db.saveUser(newUser);
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  /**
   * Kullanıcı girişi
   */
  public login(username: string, password: string): AuthResult {
    const cleanUsername = username.toLowerCase().trim();
    if (!cleanUsername || !password) {
      return { success: false, errorMessage: 'Lütfen kullanıcı adı ve şifrenizi girin.' };
    }

    const user = this.db.getUserByUsername(cleanUsername);
    if (!user) {
      return { success: false, errorMessage: 'Kullanıcı bulunamadı.' };
    }

    if (!user.validatePassword(password)) {
      return { success: false, errorMessage: 'Hatalı şifre girdiniz.' };
    }

    this.setCurrentUser(user);
    return { success: true, user };
  }

  /**
   * Çıkış yapma
   */
  public logout(): void {
    this.currentUser = null;
    this.db.setSavedCurrentUserId(null);
    this.notifyListeners();
  }

  /**
   * Hızlı hesap değiştirme (Demo ve test amaçlı)
   */
  public switchUser(userId: string): AuthResult {
    const user = this.db.getUserById(userId);
    if (!user) {
      return { success: false, errorMessage: 'Kullanıcı bulunamadı.' };
    }
    this.setCurrentUser(user);
    return { success: true, user };
  }

  private setCurrentUser(user: User): void {
    this.currentUser = user;
    this.db.setSavedCurrentUserId(user.id);
    this.notifyListeners();
  }

  public subscribe(listener: (user: User | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.getCurrentUser());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    const user = this.getCurrentUser();
    this.listeners.forEach(fn => fn(user));
  }
}
