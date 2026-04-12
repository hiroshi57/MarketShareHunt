# HOOK.md — セッション開始時ルール

> このファイルは Claude Code がセッション開始時に必ず参照するルールです。

## セッション開始時に必ず行うこと

1. **NEXT_TASKS.md を確認する**
   - 現在どのフェーズのどのタスクが未完了かを把握する
   - 前回の作業の続きから始める

2. **memory/ を確認する**
   - プロジェクトの背景・確定事項を把握する

3. **ユーザーの最初のメッセージに答える前に上記を完了する**

---

## プロジェクト固有ルール

- コミットは作業の区切りごとに行う
- `src/data/dummyData.js` はデータの唯一の真実源（single source of truth）
- Phase A 完了まではバックエンドは作らない
- スタイルは CSS Modules を使用する（styled-components は使わない）

---

## ディレクトリ構成

```
C:/Users/takiz/git_taki57/test20251212/  ← ローカル（フォルダ名は後でリネーム予定）
GitHub: hiroshi57/MarketShareHunt
```
