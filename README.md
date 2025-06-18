# Tetris Game - Next.js + TypeScript

モダンなNext.jsとTypeScriptで作られたテトリスゲーム

## 特徴

- **TypeScript**: 型安全なコード
- **Next.js 15**: 最新のReact機能
- **Tailwind CSS**: レスポンシブデザイン
- **フルゲーム機能**: 7種類のテトリミノ、ライン消去、スコア計算
- **キーボード操作**: 直感的なゲームコントロール

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてゲームをプレイできます。

## 操作方法

- **← →** または **A/D**: ブロックの左右移動
- **↓** または **S**: ソフトドロップ（高速落下）
- **↑** または **W**: ブロックの回転
- **スペース**: ハードドロップ（即座落下）
- **P**: ポーズ/再開
- **R**: ゲーム再開

## ゲームの仕様

- **ボードサイズ**: 10×20
- **テトリミノ**: I, O, T, S, Z, J, L の7種類
- **スコアシステム**: ライン数とレベルに基づく計算
- **レベルアップ**: 10ライン消去毎にレベルアップ
- **落下速度**: レベルに応じて高速化

## プロジェクト構造

```
src/
├── app/
│   ├── page.tsx          # メインゲームページ
│   └── globals.css       # グローバルスタイル
├── components/
│   ├── TetrisBoard.tsx   # ゲームボード表示
│   ├── NextPiece.tsx     # 次のピース表示
│   └── GameInfo.tsx      # スコア・コントロール表示
├── hooks/
│   ├── useTetris.ts      # ゲームロジック管理
│   └── useKeyboard.ts    # キーボード入力処理
├── types/
│   └── tetris.ts         # TypeScript型定義
└── utils/
    └── tetris.ts         # ゲームユーティリティ関数
```

## 技術スタック

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Build Tool**: Next.js built-in bundler

## ビルドとデプロイ

```bash
# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# 静的エクスポート（必要に応じて）
npm run build && npx next export
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
