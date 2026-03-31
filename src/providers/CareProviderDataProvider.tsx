"use client";

import { useEffect } from "react";
import { fetchCareProviders } from "@/services/careProviderService";
import { useCareProviderStore } from "@/stores/careProviderStore";
import { useModalLoadingStore } from "@/stores/modalLoadingStore";

type CareProviderDataProviderProps = {
  children: React.ReactNode;
};

/**
 * 事業所データを初期ロードするプロバイダー
 * 責務: Firestoreから事業所データを取得してStoreに保存
 */
export function CareProviderDataProvider({
  children,
}: CareProviderDataProviderProps) {
  const setCareProviders = useCareProviderStore(
    (state) => state.setCareProviders
  );
  const setModalLoading = useModalLoadingStore((state) => state.setLoading);
  useEffect(() => {
    setModalLoading("firestore", true);
    //wait for debug
    const loadCareProviders = async () => {
      try {
        const careProvidersData = await fetchCareProviders();
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        setCareProviders(careProvidersData);
        console.log(
          "[CareProviderDataProvider] データをロードしました:",
          careProvidersData.length,
          "件"
        );
      } catch (error) {
        console.error("事業所データの読み込みに失敗しました:", error);
      } finally {
        setModalLoading("firestore", false);
      }
    };

    loadCareProviders();
  }, [setCareProviders, setModalLoading]);

  return <>{children}</>;
}
