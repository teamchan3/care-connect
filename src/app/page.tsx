"use client";

import { useAuthStore } from "@/stores/authStore";
import { useGlobalLoadingStore } from "@/stores/globalLoadingStore";
import { signInWithGoogle, signOut } from "@/lib/auth";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const setLoading = useGlobalLoadingStore((state) => state.setLoading);

  const handleLogin = async () => {
    try {
      setLoading("auth", true, "ログイン中...");
      await signInWithGoogle();
      //ログインしたら、FirebaseProvider側でuseEffectが呼ばれて、結果的にsetLoading("auth", false)が呼ばれるので、ここではローディングを開始するだけでOK
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました");
    }
  };

  const handleLogout = async () => {
    try {
      setLoading("auth", true, "ログアウト中...");
      await signOut();
      //ログインしたら、FirebaseProvider側でuseEffectが呼ばれて、結果的にsetLoading("auth", false)が呼ばれるので、ここではローディングを開始するだけでOK
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {(() => {
        // ログインしていない場合
        if (!user) {
          return (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">未ログイン</h1>
              <p className="text-gray-600 mb-4">ログインしてください</p>
              <button className="btn btn-primary" onClick={handleLogin}>
                Googleでログイン
              </button>
            </div>
          );
        }

        // 管理者の場合
        if (user.email && user.email.includes("admin")) {
          return (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
              <p className="text-gray-600 mb-4">ようこそ、{user.email} さん</p>
              <button className="btn btn-secondary" onClick={handleLogout}>
                ログアウト
              </button>
            </div>
          );
        }

        // ケアマネジャーの場合
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">ケアマネジャーダッシュボード</h1>
            <p className="text-gray-600 mb-4">
              ようこそ、{user.email || user.uid} さん
            </p>
            <button className="btn btn-secondary" onClick={handleLogout}>
              ログアウト
            </button>
          </div>
        );
      })()}
    </div>
  );
}
