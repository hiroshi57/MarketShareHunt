# NEXT_TASKS.md — MarketShareHunt

> **最終更新**: 2026-04-12

## 完了済み

### Phase A: ダッシュボードプロトタイプ ✅
- [x] 要件定義完成
- [x] GitHubリポジトリ作成（hiroshi57/MarketShareHunt）
- [x] Reactプロジェクトセットアップ（create-react-app）
- [x] recharts インストール
- [x] src/data/dummyData.js 作成（社員40名・案件20件・ニュース・イベント）
- [x] src/hooks/useCountUp.js 作成（カウントアップアニメーション）
- [x] App.js / App.css 実装（白背景テーマ・横並びレイアウト）
- [x] Header.js — Harness KPIバー（ARR/NRR/PLG Rate/CASH）
- [x] NewsTicker.js — ニュース流れるティッカー
- [x] PnLCard.js — ARR/NRR/損益カード（カウントアップアニメ付き）
- [x] PnLChart.js — 損益推移グラフ（recharts）
- [x] MarketSharePanel.js — 競合シェア円グラフ
- [x] PLGFunnelPanel.js — PLG→Self-Serve→Enterprise ファネル
- [x] EmployeeCard.js — アバター・スキル・プロフィール・採用インパクト表示
- [x] EmployeePanel.js — 採用可能/採用済みタブ
- [x] ProjectCard.js — 案件詳細・受注ボタン・残り期間
- [x] ProjectPanel.js — 5タブ（全/セルフ/ENT/PLG/受注済）+ 次ターンプレビュー
- [x] ModulePanel.js — 折りたたみ式・5モジュール・レベルアップ機能
- [x] TurnButton.js — 画面下部固定の大きな緑ボタン + 操作ガイド
- [x] Lobby.js — ソロ/マルチ選択画面
- [x] 白背景テーマ適用（全コンポーネント）
- [x] 社員・案件パネル横並びレイアウト（スクロールなしで両方表示）

### Phase B: マルチプレイヤーバックエンド ✅（実装済み・未接続）
- [x] server/index.js — Express + Socket.io サーバー（ポート3001）
- [x] server/db.js — SQLite（rooms/players/game_events テーブル）
- [x] server/gameLogic.js — ゲームロジック（採用/受注/ターン進行）
- [x] src/hooks/useSocket.js — Socket.ioクライアント Hookの作成

---

## 現在進行中 / 次にやること

### Priority 1: ゲームバランス・コンテンツ強化
- [x] 案件数を増やす（初期15件 → 20件）
- [x] 初期案件に「難易度1のself-serve」5件追加（即受注可能）
- [x] ターンイベントを10ターンまで拡張（6〜10ターンの案件・市場変動追加）
- [x] PLGモジュール解放後の自動流入案件動作確認・修正（全6モジュール対応・ニュース通知追加）

### Priority 2: UIポリッシュ
- [x] 採用済み社員カードに「担当中の案件」表示（実装済み）
- [x] 案件「全案件」タブに受注済みも表示（allProjects対応）
- [x] ShareImpactBar の白テーマ対応
- [ ] モバイル・小画面対応（最低1280px幅でレイアウト崩れないか確認）

### Priority 3: Phase B接続（マルチプレイヤー有効化）
- [x] useSocket hook を enabled フラグ対応に改修
- [x] Game コンポーネントに useSocket 接続（マルチ時のみ Socket.io 接続）
- [x] 起動時に joinRoom を自動送信
- [ ] マルチ時: 採用/受注/ターン進行をサーバー経由に変更
- [ ] ルーム一覧画面を Lobby に追加（既存ルームに参加できるよう）

### Priority 4: 長期
- [ ] NewsAPI / Perplexity API 連携（リアル市場ニュース）
- [ ] ローカルフォルダ名リネーム（test20251212 → MarketShareHunt）
- [ ] 将軍（CEO）→ 家老（CXO）→ 足軽（担当者）の組織階層をゲームに反映

---

## 起動コマンド

```bash
# フロントエンドのみ（ソロプレイ）
npm start

# バックエンド + フロントエンド（マルチプレイ）
npm run server   # ターミナル1
npm start        # ターミナル2
```
