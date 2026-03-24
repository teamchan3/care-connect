"use client";

import { FirebaseProvider } from "./FirebaseProvider";
import { useGlobalLoadingStore } from "@/stores/globalLoadingStore";
import { debugConfig } from "@/config/debug";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const isAnyLoading = useGlobalLoadingStore((state) => state.isAnyLoading());
  const loadings = useGlobalLoadingStore((state) => state.loadings);

  // デバッグ用：常にローディング画面を表示
  const showLoading = debugConfig.loading.alwaysShow || isAnyLoading;

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
