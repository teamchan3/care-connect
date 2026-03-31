"use client";

import { debugConfig } from "@/config/debug";
import { LoadingOverlay } from "@/components/ui/Loading/LoadingOverlay";
import { useAuthStore } from "@/stores/authStore";
import { useGlobalLoadingStore } from "@/stores/globalLoadingStore";
import { useModalLoadingStore } from "@/stores/modalLoadingStore";
import { FirebaseAuthProvider } from "./FirebaseAuthProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const isGlobalAnyLoading = useGlobalLoadingStore((state) =>
    state.isAnyLoading()
  );
  const globalLoadings = useGlobalLoadingStore((state) => state.loadings);
  const isModalAnyLoading = useModalLoadingStore((state) =>
    state.isAnyLoading()
  );
  // デバッグ用：常にローディング画面を表示
  const showGlobalLoading =
    debugConfig.loading.alwaysShow || isGlobalAnyLoading;

  return (
    <FirebaseAuthProvider>
      {(() => {
        if (isInitializing) {
          return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          );
        }
        if (showGlobalLoading) {
          return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
              <span className="loading loading-spinner loading-lg"></span>
              {Object.entries(globalLoadings)
                .filter(
                  ([, globalLoading]) =>
                    globalLoading.isLoading && globalLoading.message
                )
                .map(([type, loading]) => (
                  <p key={type} className="text-sm text-gray-600">
                    {loading.message}
                  </p>
                ))}
            </div>
          );
        }
        return (
          <>
            <LoadingOverlay isVisible={isModalAnyLoading} />
            {children}
          </>
        );
      })()}
    </FirebaseAuthProvider>
  );
}
