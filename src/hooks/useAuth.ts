import { useAuthStore } from "@/stores/authStore";
import { signInWithGoogle, signOut } from "@/lib/auth";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };

  return { user, isInitializing, handleLogin, handleLogout };
};