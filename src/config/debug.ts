/**
 * デバッグ設定
 * 開発環境でのみ有効。本番環境では全て無効化される
 *
 * 設定を変更したい場合はこのファイルを直接編集してください
 * .env.local では NEXT_PUBLIC_DEBUG_MODE=true のみ設定
 */
type DebugConfig = {
  // 全体のデバッグモード切り替え
  enabled: boolean;

  // ローディング関連
  loading: {
    alwaysShow: boolean; // 常にローディング画面を表示
    auth: {
      enabled: boolean;
      delayMs: number; // 認証処理の遅延時間
    };
    firestore: {
      enabled: boolean;
      delayMs: number;
    };
  };

  // Firebase関連
  firebase: {
    useEmulator: boolean;
    logAuthState: boolean; // 認証状態の変更をログ出力
  };

  // Zustand関連
  zustand: {
    devtools: boolean; // Zustand DevToolsの有効化
  };

  // データ関連
  data: {
    useMockData: boolean; // モックデータを使用する
  };
};

// デフォルト設定（本番環境用）
const defaultConfig: DebugConfig = {
  enabled: false,
  loading: {
    alwaysShow: false,
    auth: { enabled: false, delayMs: 0 },
    firestore: { enabled: false, delayMs: 0 },
  },
  firebase: {
    useEmulator: false,
    logAuthState: false,
  },
  zustand: {
    devtools: false,
  },
  data: {
    useMockData: false, // 本番環境では絶対にfalse
  },
};

// 開発環境用の設定（ここを編集してデバッグ設定を変更）
const developmentConfig: DebugConfig = {
  enabled: true,
  loading: {
    alwaysShow: false, // true にすると常にローディング画面が表示される
    auth: {
      enabled: true, // 認証ローディングをテストする場合 true
      delayMs: 2000, // 認証処理を遅延させる時間（ミリ秒）
    },
    firestore: {
      enabled: false, // Firestoreローディングをテストする場合 true
      delayMs: 1000,
    },
  },
  firebase: {
    useEmulator: true, // Firebase Emulatorを使用する場合 true
    logAuthState: true, // 認証状態の変更をコンソールに出力する場合 true
  },
  zustand: {
    devtools: true, // Zustand DevToolsを使用する場合 true
  },
  data: {
    useMockData: true, // モックデータを使用する場合 true
  },
};

// 環境変数から設定を決定
const getDebugConfig = (): DebugConfig => {
  // 本番環境では常にデバッグ無効
  if (process.env.NODE_ENV === "production") {
    return defaultConfig;
  }

  // NEXT_PUBLIC_DEBUG_MODE=trueの場合のみデバッグ有効
  if (process.env.NEXT_PUBLIC_DEBUG_MODE === "true") {
    return developmentConfig;
  }

  return defaultConfig;
};

export const debugConfig = getDebugConfig();
