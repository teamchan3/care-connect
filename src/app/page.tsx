"use client";

import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/stores/authStore";
// import { useGlobalLoadingStore } from "@/stores/globalLoadingStore";
// import { signInWithGoogle, signOut } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, isInitializing, handleLogin } = useAuth();

  useEffect(() => {
    if (!isInitializing && user) {
      router.push("/dashboard");
    }
  }, [isInitializing, user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {(() => {
        if (isInitializing) {
          return null;
        }
        // ログインしていない場合
        if (!user) {
          return (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">介護事業書管理アプリ</h1>
              <button className="btn btn-primary" onClick={handleLogin}>
                Googleでログイン
              </button>
            </div>
          );
        }

        // ケアマネジャーの場合
        // ログインしている場合はuseEffectでリダイレクトされるので、ここでは何も表示しない
        return null;
      })()}
    </div>
  );
}
