"use client";

// import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Map from "@/components/ui/Map";

export default function Dashboard() {
  // const user = useAuthStore((state) => state.user);
  const { user, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 初期化完了後、未認証の場合のみリダイレクト
    if (!isInitializing && !user) {
      router.push("/");
    }
  }, [user, isInitializing, router]);

  return (
    <div className="h-full w-full">
      <Map />
    </div>
  );
}