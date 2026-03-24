"use client";

import { FirebaseProvider } from "./FirebaseProvider";
import { useLoadingStore } from "@/stores/loadingStore";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const isAnyLoading = useLoadingStore((state) => state.isAnyLoading());
  const loadings = useLoadingStore((state) => state.loadings);

  // デバッグ用：環境変数でローディングを強制表示
  const debugLoading = process.env.NEXT_PUBLIC_DEBUG_LOADING === "true";
  const showLoading = debugLoading || isAnyLoading;

  return (
    <FirebaseProvider>
      {showLoading ? (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <span className="loading loading-spinner loading-lg"></span>
          {Object.entries(loadings)
            .filter(([, loading]) => loading.isLoading && loading.message)
            .map(([type, loading]) => (
              <p key={type} className="text-sm text-gray-600">
                {loading.message}
              </p>
            ))}
        </div>
      ) : (
        children
      )}
    </FirebaseProvider>
  );
}
