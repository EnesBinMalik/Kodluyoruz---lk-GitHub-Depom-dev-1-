/**
 * @license
 * OOP Mimarisi - Model Katmanı: FriendshipRequest Sınıfı
 * Geliştirici: Enes Öztürk
 */

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface FriendshipRequestDTO {
  id: string;
  senderId: string;
  senderUsername: string;
  senderName: string;
  senderAvatarUrl: string;
  receiverId: string;
  receiverUsername: string;
  receiverName: string;
  receiverAvatarUrl: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * OOP FriendshipRequest Sınıfı:
 * Kullanıcılar arasındaki takip ve arkadaşlık isteği yaşam döngüsünü modeller.
 */
export class FriendshipRequest {
  private _id: string;
  private _senderId: string;
  private _senderUsername: string;
  private _senderName: string;
  private _senderAvatarUrl: string;
  private _receiverId: string;
  private _receiverUsername: string;
  private _receiverName: string;
  private _receiverAvatarUrl: string;
  private _status: RequestStatus;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    senderId: string,
    senderUsername: string,
    senderName: string,
    senderAvatarUrl: string,
    receiverId: string,
    receiverUsername: string,
    receiverName: string,
    receiverAvatarUrl: string,
    status: RequestStatus = 'pending',
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this._id = id;
    this._senderId = senderId;
    this._senderUsername = senderUsername;
    this._senderName = senderName;
    this._senderAvatarUrl = senderAvatarUrl;
    this._receiverId = receiverId;
    this._receiverUsername = receiverUsername;
    this._receiverName = receiverName;
    this._receiverAvatarUrl = receiverAvatarUrl;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // Getters
  public get id(): string { return this._id; }
  public get senderId(): string { return this._senderId; }
  public get senderUsername(): string { return this._senderUsername; }
  public get senderName(): string { return this._senderName; }
  public get senderAvatarUrl(): string { return this._senderAvatarUrl; }
  public get receiverId(): string { return this._receiverId; }
  public get receiverUsername(): string { return this._receiverUsername; }
  public get receiverName(): string { return this._receiverName; }
  public get receiverAvatarUrl(): string { return this._receiverAvatarUrl; }
  public get status(): RequestStatus { return this._status; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }

  public isPending(): boolean {
    return this._status === 'pending';
  }

  public accept(): void {
    if (this._status !== 'pending') {
      throw new Error('Yalnızca bekleyen istekler onaylanabilir.');
    }
    this._status = 'accepted';
    this._updatedAt = new Date();
  }

  public reject(): void {
    if (this._status !== 'pending') {
      throw new Error('Yalnızca bekleyen istekler reddedilebilir.');
    }
    this._status = 'rejected';
    this._updatedAt = new Date();
  }

  public cancel(): void {
    this._status = 'cancelled';
    this._updatedAt = new Date();
  }

  public toJSON(): FriendshipRequestDTO {
    return {
      id: this._id,
      senderId: this._senderId,
      senderUsername: this._senderUsername,
      senderName: this._senderName,
      senderAvatarUrl: this._senderAvatarUrl,
      receiverId: this._receiverId,
      receiverUsername: this._receiverUsername,
      receiverName: this._receiverName,
      receiverAvatarUrl: this._receiverAvatarUrl,
      status: this._status,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }

  public static fromJSON(dto: FriendshipRequestDTO): FriendshipRequest {
    return new FriendshipRequest(
      dto.id,
      dto.senderId,
      dto.senderUsername,
      dto.senderName,
      dto.senderAvatarUrl,
      dto.receiverId,
      dto.receiverUsername,
      dto.receiverName,
      dto.receiverAvatarUrl,
      dto.status,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }
}
