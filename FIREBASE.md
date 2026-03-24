# Firebase セットアップガイド

## プロジェクト情報
- **プロジェクトID**: `care-connect-kittoi`
- **プロジェクト番号**: `387258489561`

## 作成されたファイル

```
care-connect/
├── .firebaserc              # Firebaseプロジェクト設定
├── firebase.json            # Firebase設定（エミュレータ、デプロイ設定）
├── firestore.rules          # Firestoreセキュリティルール
├── firestore.indexes.json   # Firestoreインデックス設定
└── firestore-seed/          # 初期データ（サンプル）
    └── users.json
```

## 利用可能なコマンド

### ローカル開発（エミュレータ）
```bash
npm run firebase:emulators
```
- Firebase Emulator UIが起動します（http://localhost:20003）
- Auth: http://localhost:20001
- Firestore: http://localhost:20002

### セキュリティルールのデプロイ
```bash
npm run firebase:deploy:rules
```

### 全てデプロイ（本番環境）
```bash
npm run firebase:deploy
```

## エミュレータでの開発

### 1. エミュレータを起動
```bash
npm run firebase:emulators
```

### 2. アプリの環境変数を設定
`.env.local`に以下を追加：

```env
# ローカル開発用（エミュレータ接続）
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

### 3. firebase.tsでエミュレータに接続
[src/lib/firebase.ts](src/lib/firebase.ts)で、開発環境ではエミュレータに接続するように設定できます：

```typescript
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

// 開発環境でエミュレータに接続
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:20001');
  connectFirestoreEmulator(db, 'localhost', 20002);
}
```

## Firestoreセキュリティルール

[firestore.rules](firestore.rules)でセキュリティルールを管理しています。

### 現在のルール
- **users/{userId}**: 認証済みユーザーは自分のドキュメントのみ読み書き可能
- **posts/{postId}**: 誰でも読み取り可能、認証済みユーザーのみ作成・更新・削除可能

### ルールの変更方法
1. `firestore.rules`を編集
2. `npm run firebase:deploy:rules`でデプロイ

## 初期データのインポート（開発用）

エミュレータにサンプルデータをインポートできます：

```bash
firebase emulators:exec --import=./firestore-seed "npm run dev"
```

または、エミュレータ起動時にインポート：

```bash
firebase emulators:start --import=./firestore-seed
```

## トラブルシューティング

### エミュレータが起動しない
```bash
# ポートが使用中の場合
lsof -ti:20001 | xargs kill -9
lsof -ti:20002 | xargs kill -9
lsof -ti:20003 | xargs kill -9
```

### 本番環境との切り替え
- エミュレータ使用: `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true`
- 本番環境使用: `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false`（または削除）

## 参考リンク
- [Firebase Console](https://console.firebase.google.com/project/care-connect-kittoi)
- [Firestore セキュリティルール](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
