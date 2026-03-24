<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses a customized version of Next.js with breaking changes.
APIs, conventions, and file structure may differ from your training data.

## 必須：コードを書く前に必ずやること

1. `node_modules/next/dist/docs/` 内の関連ドキュメントを読む
2. deprecation notices を必ず確認する
3. 一般的なNext.jsの知識で判断せず、ドキュメントの記述を優先する

## 確認すべきドキュメント

作業内容に応じて `node_modules/next/dist/docs/` 配下の該当ドキュメントを確認：
- ルーティング（ページ、レイアウト、動的ルート）
- データ取得（fetch、キャッシュ、再検証）
- API Routes（Route Handlers）
- その他、実装する機能に関連するドキュメント

## ルール

- ドキュメントを確認する前にコードを書かない
- 不明点はドキュメントを参照してから実装方針を提示する
- 「一般的なNext.jsではこうですが、このプロジェクトでは〇〇です」
  という形で差異を明示してから実装する
<!-- END:nextjs-agent-rules -->
