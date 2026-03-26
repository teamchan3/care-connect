"use client";

import { useEffect } from "react";
import { useCareProviderStore } from "@/stores/careProviderStore";
import { MOCK_CARE_PROVIDERS } from "@/data/mockCareProviders";
import { debugConfig } from "@/config/debug";

/**
 * ケアプロバイダーデータを初期化するカスタムフック
 * デバッグモードの設定に応じて、モックデータまたはFirebaseからデータを読み込む
 */
export const useInitializeCareProviders = () => {
  const setCareProviders = useCareProviderStore(
    (state) => state.setCareProviders
  );

  useEffect(() => {
    // デバッグモードでモックデータを使用する設定の場合
    if (debugConfig.data.useMockData) {
      console.log("モックデータを読み込んでいます...");
      setCareProviders(MOCK_CARE_PROVIDERS);
      console.log(`${MOCK_CARE_PROVIDERS.length}件のケアプロバイダーを読み込みました`);
    } else {
      // 本番環境またはFirebaseから取得する場合
      // TODO: Firestoreからデータを取得する処理を実装
      console.log("Firestoreからデータを取得します（未実装）");
    }
  }, [setCareProviders]);
};
