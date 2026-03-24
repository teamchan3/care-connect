/**
 * ローディングの種類
 */
export type LoadingType = "auth" | "api" | "data" | "firestore";

/**
 * ローディング項目
 */
export type LoadingItem = {
  isLoading: boolean;
  message?: string;
};

/**
 * ローディング状態（Record型で管理）
 */
export type LoadingState = Record<LoadingType, LoadingItem>;
