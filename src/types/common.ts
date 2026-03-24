import { Timestamp } from "firebase/firestore";

// Firestoreのドキュメント基本型
export type FirestoreDocument = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Firestoreから取得した生データ（TimestampがFirebaseのTimestamp型）
export type WithFirestoreTimestamp<T extends FirestoreDocument> = Omit<
  T,
  "createdAt" | "updatedAt"
> & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// Firestore書き込み時の型（IDと日時は自動生成）
export type FirestoreCreate<T extends FirestoreDocument> = Omit<
  T,
  "id" | "createdAt" | "updatedAt"
>;

// Firestore更新時の型（部分的な更新を許可）
export type FirestoreUpdate<T extends FirestoreDocument> = Partial<
  Omit<T, "id" | "createdAt" | "updatedAt">
> & {
  updatedAt: Date;
};
