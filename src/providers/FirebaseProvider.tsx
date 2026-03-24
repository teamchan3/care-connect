"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/stores/authStore";
import { useGlobalLoadingStore } from "@/stores/globalLoadingStore";
import { debugConfig } from "@/config/debug";

type FirebaseProviderProps = {
  children: React.ReactNode;
};

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useGlobalLoadingStore((state) => state.setLoading);

  useEffect(() => {
    // Firebase認証の初期化開始
    setLoading("auth", true, "認証情報を確認中...");

    // Firebase認証状態の監視
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // デバッグモード：認証処理を遅延させる
      if (debugConfig.loading.auth.enabled) {
        await new Promise((resolve) =>
          setTimeout(resolve, debugConfig.loading.auth.delayMs)
        );
      }

      // デバッグモード：認証状態の変更をログ出力
      if (debugConfig.firebase.logAuthState) {
        console.log("[Debug] Auth state changed:", user);
      }

      setUser(user);
      // 認証情報の確認完了
      setLoading("auth", false);
    });

    // クリーンアップ
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
