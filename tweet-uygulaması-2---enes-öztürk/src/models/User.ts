/**
 * @license
 * OOP Mimarisi - Model Katmanı: User Sınıfı
 * Geliştirici: Enes Öztürk
 */

export interface UserDTO {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  bio: string;
  avatarUrl: string;
  joinedAt: string;
  friends: string[]; // Arkadaş kullanıcıların ID listesi
  pendingIncomingRequests: string[]; // Bu kullanıcıya gelen takip istekleri
  pendingOutgoingRequests: string[]; // Bu kullanıcının gönderdiği takip istekleri
  role?: 'creator' | 'member';
}

/**
 * OOP User Sınıfı:
 * Kullanıcı kimliği, profil bilgileri, arkadaşlık ilişkileri ve yetkilendirme
 * metotlarını kapsüller (encapsulation).
 */
export class User {
  private _id: string;
  private _username: string;
  private _name: string;
  private _passwordHash: string;
  private _bio: string;
  private _avatarUrl: string;
  private _joinedAt: Date;
  private _friends: Set<string>;
  private _pendingIncomingRequests: Set<string>;
  private _pendingOutgoingRequests: Set<string>;
  private _role: 'creator' | 'member';

  constructor(
    id: string,
    username: string,
    name: string,
    passwordHash: string,
    bio: string = '',
    avatarUrl: string = '',
    joinedAt: Date = new Date(),
    friends: string[] = [],
    pendingIncomingRequests: string[] = [],
    pendingOutgoingRequests: string[] = [],
    role: 'creator' | 'member' = 'member'
  ) {
    this._id = id;
    this._username = username.toLowerCase().trim();
    this._name = name.trim();
    this._passwordHash = passwordHash;
    this._bio = bio;
    this._avatarUrl = avatarUrl || this.generateDefaultAvatar(username);
    this._joinedAt = joinedAt;
    this._friends = new Set(friends);
    this._pendingIncomingRequests = new Set(pendingIncomingRequests);
    this._pendingOutgoingRequests = new Set(pendingOutgoingRequests);
    this._role = role;
  }

  // --- Getters & Setters (Kapsülleme) ---

  public get id(): string {
    return this._id;
  }

  public get username(): string {
    return this._username;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    if (value.trim().length > 0) {
      this._name = value.trim();
    }
  }

  public get bio(): string {
    return this._bio;
  }

  public set bio(value: string) {
    this._bio = value.trim().slice(0, 200);
  }

  public get avatarUrl(): string {
    return this._avatarUrl;
  }

  public set avatarUrl(value: string) {
    this._avatarUrl = value;
  }

  public get joinedAt(): Date {
    return this._joinedAt;
  }

  public get friends(): string[] {
    return Array.from(this._friends);
  }

  public get pendingIncomingRequests(): string[] {
    return Array.from(this._pendingIncomingRequests);
  }

  public get pendingOutgoingRequests(): string[] {
    return Array.from(this._pendingOutgoingRequests);
  }

  public get role(): 'creator' | 'member' {
    return this._role;
  }

  // --- Domain Mantığı & OOP Metotları ---

  /**
   * Şifre doğrulaması
   */
  public validatePassword(plainPassword: string): boolean {
    return this._passwordHash === plainPassword;
  }

  /**
   * Belirtilen kullanıcı ile arkadaş olunup olunmadığını kontrol eder
   */
  public isFriendWith(userId: string): boolean {
    return this._friends.has(userId);
  }

  /**
   * Belirtilen kullanıcıya takip isteği gönderilip gönderilmediği
   */
  public hasPendingRequestTo(targetUserId: string): boolean {
    return this._pendingOutgoingRequests.has(targetUserId);
  }

  /**
   * Belirtilen kullanıcıdan bekleyen bir istek var mı
   */
  public hasPendingRequestFrom(sourceUserId: string): boolean {
    return this._pendingIncomingRequests.has(sourceUserId);
  }

  /**
   * Takip isteği gönderme kaydı
   */
  public addOutgoingRequest(targetUserId: string): void {
    if (targetUserId !== this._id && !this.isFriendWith(targetUserId)) {
      this._pendingOutgoingRequests.add(targetUserId);
    }
  }

  /**
   * Gelen takip isteği kaydı
   */
  public addIncomingRequest(fromUserId: string): void {
    if (fromUserId !== this._id && !this.isFriendWith(fromUserId)) {
      this._pendingIncomingRequests.add(fromUserId);
    }
  }

  /**
   * Gelen isteği kabul etme
   */
  public acceptIncomingRequest(fromUserId: string): void {
    this._pendingIncomingRequests.delete(fromUserId);
    this._friends.add(fromUserId);
  }

  /**
   * Gelen isteği reddetme
   */
  public rejectIncomingRequest(fromUserId: string): void {
    this._pendingIncomingRequests.delete(fromUserId);
  }

  /**
   * Gönderilen isteği iptal etme
   */
  public cancelOutgoingRequest(targetUserId: string): void {
    this._pendingOutgoingRequests.delete(targetUserId);
  }

  /**
   * Arkadaşlık bağını oluştur (karşılıklı onay durumunda)
   */
  public addFriend(friendId: string): void {
    this._pendingIncomingRequests.delete(friendId);
    this._pendingOutgoingRequests.delete(friendId);
    this._friends.add(friendId);
  }

  /**
   * Arkadaşlıktan çıkarma
   */
  public removeFriend(friendId: string): void {
    this._friends.delete(friendId);
  }

  /**
   * Tweetleri görebilme kuralı:
   * Proje şartı: Arkadaş olmuş kullanıcılar birbirlerinin tweetlerini okuyabilir.
   * Kullanıcı kendi tweetlerini her zaman okuyabilir.
   */
  public canViewTweetsOf(targetUser: User): boolean {
    if (this._id === targetUser.id) return true;
    return this.isFriendWith(targetUser.id);
  }

  private generateDefaultAvatar(seed: string): string {
    const colors = ['0ea5e9', '6366f1', 'ec4899', '10b981', 'f59e0b', '8b5cf6'];
    const charCode = seed.charCodeAt(0) || 0;
    const color = colors[charCode % colors.length];
    return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${color}`;
  }

  // --- Serileştirme & Deserileştirme ---

  public toJSON(): UserDTO {
    return {
      id: this._id,
      username: this._username,
      name: this._name,
      passwordHash: this._passwordHash,
      bio: this._bio,
      avatarUrl: this._avatarUrl,
      joinedAt: this._joinedAt.toISOString(),
      friends: this.friends,
      pendingIncomingRequests: this.pendingIncomingRequests,
      pendingOutgoingRequests: this.pendingOutgoingRequests,
      role: this._role,
    };
  }

  public static fromJSON(dto: UserDTO): User {
    return new User(
      dto.id,
      dto.username,
      dto.name,
      dto.passwordHash,
      dto.bio,
      dto.avatarUrl,
      new Date(dto.joinedAt),
      dto.friends || [],
      dto.pendingIncomingRequests || [],
      dto.pendingOutgoingRequests || [],
      dto.role || 'member'
    );
  }
}
