import { FirestoreDocument } from "./common";

/**
 * ユーザーの役割
 * ログインできるのはケアマネジャーと管理者のみ
 */
export type UserRole = "care_manager" | "admin";

/**
 * Firestoreに保存するアプリ独自のユーザー情報
 * Firebase Authの認証情報とは別に管理
 */
export type UserProfile = FirestoreDocument & {
  uid: string; // Firebase AuthのUIDで紐付け
  email: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
  isActive: boolean;
};

/**
 * ユーザープロフィール作成時の型
 */
export type CreateUserProfileInput = {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
};
