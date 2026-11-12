/**
 * @license
 * OOP Mimarisi - Model Katmanı: Tweet Sınıfı
 * Geliştirici: Enes Öztürk
 */

export interface TweetDTO {
  id: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  authorAvatarUrl: string;
  content: string;
  createdAt: string;
  likedBy: string[]; // Beğenen kullanıcı ID'leri
  tags?: string[];
}

/**
 * OOP Tweet Sınıfı:
 * 180 karakter sınırını kontrol eder, tweet içeriğini ve etkileşimlerini yönetir.
 */
export class Tweet {
  public static readonly MAX_LENGTH: number = 180;

  private _id: string;
  private _authorId: string;
  private _authorUsername: string;
  private _authorName: string;
  private _authorAvatarUrl: string;
  private _content: string;
  private _createdAt: Date;
  private _likedBy: Set<string>;
  private _tags: string[];

  constructor(
    id: string,
    authorId: string,
    authorUsername: string,
    authorName: string,
    authorAvatarUrl: string,
    content: string,
    createdAt: Date = new Date(),
    likedBy: string[] = [],
    tags: string[] = []
  ) {
    const validation = Tweet.validateContent(content);
    if (!validation.isValid) {
      throw new Error(validation.errorMessage || 'Geçersiz tweet içeriği');
    }

    this._id = id;
    this._authorId = authorId;
    this._authorUsername = authorUsername;
    this._authorName = authorName;
    this._authorAvatarUrl = authorAvatarUrl;
    this._content = content.trim();
    this._createdAt = createdAt;
    this._likedBy = new Set(likedBy);
    this._tags = tags.length > 0 ? tags : Tweet.extractHashtags(content);
  }

  // --- Getters ---

  public get id(): string {
    return this._id;
  }

  public get authorId(): string {
    return this._authorId;
  }

  public get authorUsername(): string {
    return this._authorUsername;
  }

  public get authorName(): string {
    return this._authorName;
  }

  public get authorAvatarUrl(): string {
    return this._authorAvatarUrl;
  }

  public get content(): string {
    return this._content;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get likesCount(): number {
    return this._likedBy.size;
  }

  public get likedBy(): string[] {
    return Array.from(this._likedBy);
  }

  public get tags(): string[] {
    return [...this._tags];
  }

  public get characterCount(): number {
    return this._content.length;
  }

  public get remainingCharacters(): number {
    return Tweet.MAX_LENGTH - this._content.length;
  }

  // --- Static Metotlar (Doğrulama ve Yardımcılar) ---

  /**
   * 180 karakter kuralını denetleyen statik OOP doğrulama metodu
   */
  public static validateContent(content: string): { isValid: boolean; errorMessage?: string } {
    if (!content || content.trim().length === 0) {
      return { isValid: false, errorMessage: 'Tweet içeriği boş olamaz.' };
    }
    if (content.length > Tweet.MAX_LENGTH) {
      return {
        isValid: false,
        errorMessage: `Tweet en fazla ${Tweet.MAX_LENGTH} karakter olabilir (Mevcut: ${content.length}).`,
      };
    }
    return { isValid: true };
  }

  public static extractHashtags(text: string): string[] {
    const matches = text.match(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g);
    return matches ? matches.map(tag => tag.slice(1)) : [];
  }

  // --- Domain Metotları ---

  /**
   * Kullanıcının beğenisini açar/kapatır
   */
  public toggleLike(userId: string): boolean {
    if (this._likedBy.has(userId)) {
      this._likedBy.delete(userId);
      return false; // Beğeni kaldırıldı
    } else {
      this._likedBy.add(userId);
      return true; // Beğenildi
    }
  }

  public isLikedBy(userId: string): boolean {
    return this._likedBy.has(userId);
  }

  public getFormattedTime(): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - this._createdAt.getTime()) / 1000);

    if (diffInSeconds < 60) return `${Math.max(1, diffInSeconds)}sn`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}dk`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}sa`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}g`;

    return this._createdAt.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
    });
  }

  // --- Serileştirme ---

  public toJSON(): TweetDTO {
    return {
      id: this._id,
      authorId: this._authorId,
      authorUsername: this._authorUsername,
      authorName: this._authorName,
      authorAvatarUrl: this._authorAvatarUrl,
      content: this._content,
      createdAt: this._createdAt.toISOString(),
      likedBy: this.likedBy,
      tags: this._tags,
    };
  }

  public static fromJSON(dto: TweetDTO): Tweet {
    return new Tweet(
      dto.id,
      dto.authorId,
      dto.authorUsername,
      dto.authorName,
      dto.authorAvatarUrl,
      dto.content,
      new Date(dto.createdAt),
      dto.likedBy || [],
      dto.tags || []
    );
  }
}
