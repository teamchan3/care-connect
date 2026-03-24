# CareConnect

介護事業者と介助を必要としている方をつなぐプラットフォーム

## 技術スタック

- **フレームワーク**: Next.js 16.2.1 (App Router)
- **言語**: TypeScript
- **UI**: daisyUI + Tailwind CSS v4
- **状態管理**: Zustand
- **バックエンド**: Firebase (Authentication, Firestore)

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/care-connect.git
cd care-connect
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、Firebaseの設定を追加：

```bash
cp .env.local.example .env.local
```

[Firebase Console](https://console.firebase.google.com/)でプロジェクトを作成し、`.env.local`に認証情報を設定してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## ローカル開発（Firebase Emulator）

Firebaseエミュレータを使用してローカル開発できます：

```bash
# エミュレータを起動
npm run firebase:emulators
```

- Firebase Emulator UI: http://localhost:20003
- Auth: http://localhost:20001
- Firestore: http://localhost:20002

エミュレータを使用する場合は、`.env.local`に以下を追加：

```env
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

詳しくは [FIREBASE.md](./FIREBASE.md) を参照してください。

## スクリプト

```bash
npm run dev                      # 開発サーバー起動
npm run build                    # プロダクションビルド
npm run start                    # プロダクションサーバー起動
npm run lint                     # ESLint実行
npm run firebase:emulators       # Firebaseエミュレータ起動
npm run firebase:deploy          # Firebaseデプロイ
npm run firebase:deploy:rules    # Firestoreルールのみデプロイ
```

## プロジェクト構造

```
care-connect/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reactコンポーネント
│   ├── lib/                 # ライブラリ（Firebase設定など）
│   ├── providers/           # Providerコンポーネント
│   └── stores/              # Zustand状態管理
├── firestore.rules          # Firestoreセキュリティルール
├── firebase.json            # Firebase設定
└── .firebaserc              # Firebaseプロジェクト設定
```

## ライセンス

MIT
