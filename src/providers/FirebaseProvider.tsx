"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/loadingStore";

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    // Firebase認証の初期化開始
    setLoading("auth", true, "認証情報を確認中...");

    // Firebase認証状態の監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // 認証情報の確認完了
      setLoading("auth", false);
    });

    // クリーンアップ
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
