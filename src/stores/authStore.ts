import { create } from "zustand";
import { User } from "firebase/auth";

type AuthStore = {
  user: User | null;
  isInitializing: boolean; // 認証状態の初期化中かどうか
  setUser: (user: User | null) => void;
  setInitialized: () => void; // 初期化完了を通知
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isInitializing: true, // 初期状態は初期化中
  setUser: (user) => {
    set({ user, isInitializing: false }); // ユーザー設定時に初期化完了
  },
  setInitialized: () => {
    set({ isInitializing: false }); // 初期化完了のみ通知
  },
  logout: () => {
    set({ user: null });
  },
}));
