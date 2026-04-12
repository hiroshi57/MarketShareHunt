import React, { useState } from 'react';
import styles from './EmployeeCard.module.css';
import AvatarFace from './AvatarFace';

// 部署ごとのカラーとアイコン
const DEPT_CONFIG = {
  '経営企画部':   { color: '#4A90E2', icon: '◈', bg: 'rgba(74,144,226,0.15)' },
  '事業開発部':   { color: '#3FB950', icon: '◉', bg: 'rgba(63,185,80,0.15)' },
  'コンテンツ制作部': { color: '#BC8CFF', icon: '◎', bg: 'rgba(188,140,255,0.15)' },
  'マーケティング部': { color: '#F0883E', icon: '◆', bg: 'rgba(240,136,62,0.15)' },
  '人事部':       { color: '#FF7B72', icon: '◐', bg: 'rgba(255,123,114,0.15)' },
  '経営管理部':   { color: '#E3B341', icon: '◇', bg: 'rgba(227,179,65,0.15)' },
  'リサーチ部':   { color: '#58A6FF', icon: '◑', bg: 'rgba(88,166,255,0.15)' },
  'データ分析部': { color: '#39D353', icon: '◒', bg: 'rgba(57,211,83,0.15)' },
  '営業部':       { color: '#F85149', icon: '◓', bg: 'rgba(248,81,73,0.15)' },
  'MA評価部':     { color: '#D2A8FF', icon: '◔', bg: 'rgba(210,168,255,0.15)' },
};

// 役職レベル判定
function getSeniorityLabel(role) {
  if (role.includes('シニア') || role.includes('リーダー') || role.includes('マネージャー') || role.includes('ディレクター')) return 'SENIOR';
  if (role.includes('スペシャリスト') || role.includes('アナリスト') || role.includes('ストラテジスト')) return 'MID';
  return 'JUNIOR';
}

const SENIORITY_COLOR = { SENIOR: '#E3B341', MID: '#58A6FF', JUNIOR: '#8B949E' };

const SKILL_DESCRIPTIONS = {
  '事業ポートフォリオ分析': 'PPM・SWOTを用いた複数事業の評価と優先順位付け',
  'OKR戦略実行管理': '目標と主要結果（OKR）を使った戦略の実行管理',
  '新規事業評価': 'NPV・IRRを用いた新規事業の財務評価',
  '競合戦略分析': '競合の戦略・財務・製品を多角的に分析',
  'ポジショニング': '差別化軸の設計とポジショニングマップ作成',
  '業界レポート読解': '英語対応の業界レポート読解・要約',
  'ガントチャート管理': 'WBSとガントチャートで進捗を管理',
  'WBS作成管理': '作業分解構造（WBS）の設計と管理',
  'ステークホルダー管理': '利害関係者の特定・調整・コミュニケーション設計',
  'NPS設計': '顧客推奨度（NPS）を活用した満足度改善施策の立案',
  'カスタマージャーニー作成': '顧客体験の可視化とペインポイント特定',
  '解約要因分析': 'チャーン要因を特定し対策を立案',
  'BPO選定': '業務委託先の選定・要件定義・契約設計',
  'アライアンス交渉': 'パートナー企業との提携交渉と契約設計',
  'SLA設定管理': 'サービスレベル合意（SLA）の設定・管理',
  'サブスク設計': 'サブスクリプション・課金モデルの設計',
  'プライシング戦略': '浸透価格・スキミング・バリューベース価格設計',
  'LTV/CAC管理': '顧客生涯価値とCAC（獲得コスト）の設計・管理',
  'MVPプロトタイプ': '最小限のプロダクトを設計・検証するフロー構築',
  'ジョブ理論': 'JTBD（ジョブ理論）を用いたユーザーニーズの特定',
  'ユーザーインタビュー設計': '深掘りができるインタビュー設計と分析',
  'バズ企画タイトル生成': 'CTRが高いYouTubeタイトルの企画・生成',
  '動画構成設計': 'フック→本編→CTAの構成設計',
  'シリーズ企画': '継続視聴を促すシリーズコンテンツの設計',
  '編集指示書作成': 'カット・BGM・テロップ・エフェクトの指示書作成',
  'エンコード設定標準化': '書き出し設定の標準化とワークフロー設計',
  '字幕設計': '字幕・テキストデザインの指示',
  'サムネイル設計': 'CTRを高めるサムネイル設計',
  'CTR向上ビジュアル設計': 'A/Bテスト用サムネイル複数案の設計',
  'ブランドガイドライン': 'ブランドに沿ったデザインディレクション',
  '学習目標設計': 'インストラクショナルデザイン（ADDIE）に基づく目標設計',
  'カリキュラムマップ': '学習の流れ・ユニット構成のマッピング',
  'クイズ設計': '知識定着を促すクイズ・課題・プロジェクト設計',
  'プレスリリース作成': 'メディア向けプレスリリースの作成・配信設計',
  'メディアリスト作成': '掲載を狙うメディア・記者リストの作成',
  '広報カレンダー管理': '広報スケジュールの設計・管理',
  'Meta広告設計': 'FacebookおよびInstagram広告のクリエイティブ設計',
  'Google広告設計': 'Google検索・ディスプレイ広告の設計',
  'クリエイティブA/Bテスト': '複数クリエイティブのテスト設計と評価',
  'Xアルゴリズム分析': 'Xのアルゴリズムを理解した投稿設計',
  'バズ投稿設計': 'エンゲージメントが高い投稿の構造分析と再現',
  'ハッシュタグ戦略': '業界・ターゲット別のハッシュタグ設計',
  'セールスレター作成': '購買を促すセールスレター・LPのコピーライティング',
  'LP構成設計': 'AIDCA・PASONAを活用したLP構成設計',
  'CTA最適化': 'クリック率・CVRを最大化するCTA設計',
  'メールマーケティング': 'ステップメール・セグメント配信の設計',
  'LINEアカウント運用設計': 'LINEオフィシャルアカウントの運用・施策設計',
  'リテンション施策': 'リテンション・再エンゲージメントの施策設計',
  'VOCアナリスト': 'NPS・VOCデータをもとに顧客体験の改善策を立案',
  '採用KPI設計': '応募数・内定率・定着率などの採用KPI設計',
  '採用チャネル選定': '媒体・エージェント・リファラルの最適化',
  '採用ターゲットペルソナ設計': 'ターゲット人材のペルソナ設計',
  '構造化面接設計': '行動面接・仮説面接の設計',
  '評価シート作成': '面接評価シート・スコアリングルーブリック作成',
  'コンピテンシーモデル構築': '役職・職種別コンピテンシーモデルの構築',
  '組織図設計': '組織図設計と役割定義（RACI）',
  'オンボーディングプログラム設計': '入社後の定着を高めるプログラム設計',
  'エンゲージメントサーベイ設計': 'エンゲージメントサーベイの設計と改善策立案',
  '月次財務諸表レビュー': '月次P/L・B/Sのレビューと仕訳確認',
  '予算実績差異分析': 'P/L・B/S・C/Fの予実差異分析',
  '内部統制管理': '内部統制・コンプライアンス管理',
  '年間予算策定': '年間予算の策定と部門別割当',
  '月次予算管理': '月次P&L・キャッシュフローの予算管理',
  '事業計画財務モデリング': '3〜5年の財務モデリングと感度分析',
  '契約書作成・レビュー': '業務委託・NDA・利用規約の作成・レビュー',
  '法的リスク管理': '法的リスクの洗い出しと対応策提案',
  '知的財産管理': '著作権・商標の基礎管理',
  'AI/LLM調査': '最新AI・LLMツールの調査と評価',
  '技術トレンド影響評価': '技術トレンドが事業に与える影響評価',
  'PoC提案': '新技術のPoC（概念実証）提案',
  'アンケート設計・分析': 'アンケート・インタビューの設計と分析',
  'テキストマイニング': 'テキストマイニング・感情分析（定性→定量化）',
  'NPSアナリスト': 'NPSの分析と改善策立案',
  '市場規模推計': '市場規模・成長率の調査・推計',
  'EdTech業界プレイヤーマップ': 'EdTech業界のプレイヤーマップ作成',
  '一次情報収集': '一次情報収集（インタビュー設計・調査票）',
  '補助金・助成金情報収集': '中小企業・IT・教育分野の補助金情報収集',
  '政策影響分析': '政策動向が事業に与える影響分析',
  '行政機関調整': '行政機関との調整窓口設計',
  'ABテスト設計': 'A/Bテスト・多変量テストの設計',
  '統計的仮説検定': 't検定・カイ二乗・ANOVAなどの統計的仮説検定',
  'サンプルサイズ計算': '検出力分析によるサンプルサイズ計算',
  'コホート分析': 'コホート分析・LTV分析',
  'RFM分析': 'RFM分析・顧客セグメンテーション',
  'SQL活用データ抽出': 'SQLを使ったデータ抽出・加工',
  'KPIツリー設計・管理': 'KPIツリーの設計と管理',
  '異常値検知': '異常値の検知とアラート設計',
  'ダッシュボード設計': 'ダッシュボードのレイアウト・指標設計',
  'Looker Studio設計': 'Looker Studioでのダッシュボード設計',
  'Tableau設計': 'Tableauでのダッシュボード設計',
  'Power BI設計': 'Power BIでのダッシュボード設計',
  '工数見積もり': 'WBS分解・バッファ設計に基づく工数見積もり',
  '見積書フォーマット管理': '見積書フォーマットの作成と管理',
  '原価計算': '変動費・固定費の分類と価格設定',
  '課題解決提案書設計': '課題→解決策→実績→コスト→次ステップの流れ',
  '業界別カスタマイズ提案書': '業種・顧客別にカスタマイズした提案書',
  'プレゼンスライド設計': 'プレゼン用スライドのデザインディレクション',
  '前提契約書作成・確認': '発注前提契約書・NDAの作成・確認',
  '契約条件評価': '契約条件の有利・不利の評価',
  '電子契約管理': '電子契約（クラウドサイン等）の管理',
  '法人向け提案・クロージング': '法人向け提案条件の提案・クロージング',
  '商談プロセス設計': '商談プロセスの設計と管理（SFA活用）',
  '顧客ヒアリング': '顧客ニーズのヒアリングと要件定義',
  '財務DD': '財務諸表の精査・会計リスク分析',
  'ビジネスDD': '市場・競合・事業モデルの検証',
  'DDレポート作成': 'DDレポート（レッドフラグ含む）の作成',
  'シナジー試算': '収益・コスト・ケイパビリティシナジーの試算',
  'PMI計画設計': 'Day1・100日・1年のPMI計画設計',
  '組織統合設計': '組織統合・カルチャー統合の設計',
  'M&A案件ソーシング': 'M&A案件のソーシング（仲介・直接アプローチ）',
  '案件評価スクリーニング': '案件評価の初期スクリーニング（ディーザー分析）',
  '業界別売却案件調査': '業界別の売却案件傾向調査',
  'DCF法': 'DCF法による企業価値算定',
  'マルチプル法': 'マルチプル法による企業価値算定',
  '財務モデリング': '3〜5年の事業計画財務モデリング',
};

// 部署ごとの市場シェア貢献カテゴリ（採用でどのシェア要因に効くか）
const DEPT_SHARE_IMPACT = {
  '経営企画部':    { label: '戦略競争力', color: '#4A90E2', value: 2.5, desc: '競合差別化と中長期戦略の質を高め、受注単価を向上' },
  '事業開発部':    { label: '新規市場開拓', color: '#3FB950', value: 3.0, desc: '新規顧客・パートナーを獲得し市場シェアを直接拡大' },
  'コンテンツ制作部': { label: 'ブランド認知', color: '#BC8CFF', value: 1.5, desc: 'コンテンツ拡散で認知度を向上、PLG流入を増加' },
  'マーケティング部': { label: '顧客獲得効率', color: '#F0883E', value: 2.0, desc: 'CAC削減・CVR向上でコスト効率よくシェアを拡大' },
  '人事部':        { label: '組織スケール', color: '#FF7B72', value: 1.0, desc: '採用力強化で組織拡大を支援、間接的にシェア向上' },
  '経営管理部':    { label: '財務健全性', color: '#E3B341', value: 1.5, desc: 'コスト管理と財務精度向上でROIを最大化' },
  'リサーチ部':    { label: '市場インサイト', color: '#58A6FF', value: 2.0, desc: '競合・トレンド分析で先手を打ち優位性を確保' },
  'データ分析部':  { label: 'データ優位性', color: '#39D353', value: 2.5, desc: 'KPI管理・実験設計で意思決定の質を向上' },
  '営業部':        { label: '直接受注力', color: '#F85149', value: 3.5, desc: '大型案件の直接受注でシェアを最速拡大' },
  'MA評価部':      { label: 'M&A競争力', color: '#D2A8FF', value: 3.0, desc: '高単価M&A案件の受注で売上・シェアを急拡大' },
};

// 社員プロフィール詳細（強み・弱み・経歴）
const EMPLOYEE_PROFILES = {
  'emp_001': { strength: '複数事業の優先順位付けと経営資源配分が得意。C-suiteとの会話も臆さない', weakness: 'オペレーション実務は他メンバーに委ねる必要あり', career: '総合商社→外資コンサルファーム10年。戦略部門を歴任' },
  'emp_002': { strength: '競合の動向をリアルタイムで把握。英語文献の読解速度が圧倒的に速い', weakness: '社内調整・根回しは不得意。アウトプット偏重', career: 'シンクタンク→IT企業経営企画。競合分析専門歴7年' },
  'emp_003': { strength: 'ガントチャートとWBS設計が精緻。複数プロジェクト並走管理が得意', weakness: '戦略的判断よりも管理業務に特化しているため上流設計は薄い', career: 'PMO専門会社→事業会社PMマネージャー歴8年' },
  'emp_004': { strength: '会議設計と議事録作成の速度・精度が高い。コミュニケーション調整力あり', weakness: '戦略立案・分析業務は対応外。サポート業務に特化', career: '秘書・アシスタント職5年。複数役員同時サポート経験あり' },
  'emp_005': { strength: 'NPS設計と顧客体験マッピングの実務経験豊富。チャーン分析も高精度', weakness: 'B2B大型案件よりもB2C・SMB向けのノウハウが中心', career: 'BtoC SaaS→コンサルCX部門。NPS改善で解約率-30%実績' },
  'emp_006': { strength: 'パートナーとのWin-Win設計が得意。BPO・アライアンス交渉の実績多数', weakness: '契約後のオペレーション引き継ぎは法務・PMに依存', career: '事業会社アライアンス部→独立。パートナー契約50件以上締結実績' },
  'emp_007': { strength: 'LTV/CAC分析と価格最適化で収益性改善。サブスク設計の型を持っている', weakness: 'プロダクト開発・技術サイドとの連携経験が浅い', career: 'SaaS事業会社Revenue部門→コンサル。サブスクARR3倍成長に貢献' },
  'emp_008': { strength: 'JTBD・ユーザーインタビューでペインを素早く特定。MVPの設計が速い', weakness: 'エンジニアリングの実装経験はなく、技術的フィジビリティ判断は別途必要', career: 'デザイン会社→プロダクトマネージャー歴6年。新規事業MVP3社立ち上げ' },
  'emp_009': { strength: 'バズるYouTubeタイトルの生成力と企画力が高い。再生数UP実績多数', weakness: '編集作業自体は行わない。企画・ディレクション特化', career: 'YouTube専業チャンネル運営→メディア企業コンテンツ責任者。登録者100万達成' },
  'emp_010': { strength: '編集ワークフロー標準化と品質管理が得意。納期管理も高精度', weakness: 'コンテンツ企画・クリエイティブ判断よりも制作管理が専門', career: '映像制作プロダクション→事業会社ポスプロリーダー歴7年' },
  'emp_011': { strength: 'CTRを高めるサムネイルのA/B設計が得意。ブランドガイドラインの策定も担当可', weakness: 'データ分析よりもビジュアル設計が中心。CVRとの紐付けは別途必要', career: 'グラフィックデザイン→デジタルメディアArtDirector。CTR平均+40%改善実績' },
  'emp_012': { strength: 'ADDIEに基づいた学習目標設計と評価設計が得意。研修効果測定も可', weakness: 'コンテンツの収益化・マーケティング視点は限定的', career: '教育機関→EdTechカリキュラム責任者歴5年。受講完了率+25%実績' },
  'emp_013': { strength: 'フック→本編→CTAの台本構造が優秀。SEO対応の説明文も高品質', weakness: '映像編集や制作工程の技術的知識は持たない。純粋な文章専門', career: 'コピーライター→YouTube専門スクリプター。台本提供チャンネル再生数500万+' },
  'emp_014': { strength: 'プレスリリース配信とメディア関係構築が得意。露出量が多い', weakness: 'SNS・デジタル広告の運用は専門外。オフラインPR寄り', career: 'PR代理店→事業会社広報責任者。プレスリリース掲載率70%以上' },
  'emp_015': { strength: 'Meta・Google広告のクリエイティブA/Bテスト設計と最適化が得意', weakness: 'オーガニックコンテンツ・SEOは専門外。有料広告に特化', career: '広告代理店クリエイティブ部門→事業会社CMO直下。ROAS3倍達成実績' },
  'emp_016': { strength: 'Xのアルゴリズムを熟知。バズ構造の再現性が高い投稿設計ができる', weakness: '他SNS（Instagram・TikTok）は専門外。X特化', career: 'SNSマーケター独立→複数社SNS代行。フォロワー10万超アカウント複数育成' },
  'emp_017': { strength: 'セールスレターとLP構成のコンバージョン設計が得意。言葉の力で購買を促進', weakness: 'デザイン実装・コーディングは対応外。ライティング専門', career: 'ダイレクトマーケティング代理店→LP専門コピーライター。CVR業界平均3倍実績' },
  'emp_018': { strength: 'メール・LINE施策の自動化設計とセグメント設計が得意。リテンション率改善実績多数', weakness: '新規顧客獲得（アウトバウンド）は専門外。既存顧客のリテンションに特化', career: 'CRM専業コンサル→SaaS事業会社CRMリーダー。解約率-20%達成' },
  'emp_019': { strength: '採用KPI設計と媒体最適化で採用コストを削減できる。ターゲットペルソナ設計が精緻', weakness: 'オペレーション系・製造系の採用ノウハウは限定的。ホワイトカラー採用特化', career: '人材エージェント→事業会社採用マネージャー歴8年。年間採用コスト40%削減実績' },
  'emp_020': { strength: '構造化面接設計とコンピテンシーモデル構築で採用ミスマッチを削減', weakness: '採用広告・媒体運用よりも面接・評価フェーズが専門', career: '組織人事コンサル→人材開発マネージャー。ミスマッチ離職率-35%実績' },
  'emp_021': { strength: '組織設計とオンボーディングで早期戦力化を加速。エンゲージメント改善実績あり', weakness: '採用活動（ソーシング・スクリーニング）は専門外。組織内部の設計に特化', career: 'OD（組織開発）コンサル→事業会社CHRO補佐。1年以内離職率-40%達成' },
  'emp_022': { strength: '月次財務レビューと予実差異分析の精度が高い。内部統制の整備経験も豊富', weakness: '事業戦略の立案よりも管理・モニタリング側に特化', career: '監査法人→事業会社経理部長歴10年。上場準備3社経験' },
  'emp_023': { strength: '財務モデリングと年間予算策定で経営の意思決定を支援。感度分析も得意', weakness: 'M&Aの実務（DD・バリュエーション）は専門外', career: '外資系投資銀行→事業会社FP&A責任者。3ヵ年計画の財務設計を一手に担当' },
  'emp_024': { strength: '契約書の作成・レビューと法的リスク管理が得意。知財管理も対応可', weakness: '訴訟対応・裁判所対応は弁護士に委任が必要', career: '法律事務所→事業会社法務部長歴8年。契約トラブル件数ゼロ実績' },
  'emp_025': { strength: 'AI/LLMの最新動向を素早くキャッチアップし事業への影響評価ができる', weakness: 'エンジニアリング実装は対応外。調査・評価・提言に特化', career: '研究機関→テクノロジーアナリスト。生成AI黎明期からPoC提案を主導' },
  'emp_026': { strength: 'アンケート設計とテキストマイニングで定性情報を定量化するのが得意', weakness: '大規模データのSQL・BI活用は専門外。小〜中規模調査が中心', career: 'マーケットリサーチ会社→事業会社VOCアナリスト。NPS改善施策を多数立案' },
  'emp_027': { strength: '市場規模推計と業界プレイヤーマップ作成が得意。一次情報収集力が高い', weakness: '計量経済学的分析・統計モデリングは専門外', career: 'シンクタンク研究員→独立コンサルタント。EdTech市場調査レポート多数執筆' },
  'emp_028': { strength: '補助金・助成金の情報収集と申請支援が得意。行政機関との調整経験も豊富', weakness: '民間マーケットの調査・分析は専門外。公共領域に特化', career: '行政機関→補助金コンサル専門会社。申請採択率85%実績' },
  'emp_029': { strength: 'A/Bテスト設計と統計的仮説検定で確実な効果測定ができる。サンプルサイズ計算も精緻', weakness: '定性調査・ユーザーインタビューは専門外。定量分析に特化', career: 'Webサービス会社実験チーム→データサイエンティスト。年間実験数200件超運用' },
  'emp_030': { strength: 'コホート分析・RFM分析で顧客セグメントの優先順位を可視化するのが得意', weakness: '実験設計・因果推論は専門外。記述統計・KPI管理が中心', career: 'ECプラットフォーム分析チーム→BIアナリスト歴7年。売上改善提言多数' },
  'emp_031': { strength: 'KPIツリー設計と異常値検知で事業の問題を素早く発見する', weakness: '機械学習・予測モデリングは専門外。現状把握・モニタリングに特化', career: '事業会社データチーム→KPI設計コンサル。指標設計で意思決定速度3倍化実績' },
  'emp_032': { strength: 'Looker Studio・Tableau・Power BIの3ツール対応可能。ダッシュボード設計の速度が高い', weakness: 'データ分析・モデリングよりも可視化・レポーティングが専門', career: 'BIツールベンダー→事業会社BI担当。経営ダッシュボード10社以上構築実績' },
  'emp_033': { strength: '工数見積もりの精度が高く、原価計算から価格設定まで一貫対応できる', weakness: '新規顧客開拓・提案活動は専門外。受注後の工程管理が得意', career: '建設会社積算部→コンサルプロジェクト管理歴7年' },
  'emp_034': { strength: '業界別の提案書カスタマイズと説得力のあるプレゼン設計が得意', weakness: '技術的な実装内容の説明や、詳細要件定義は専門外', career: '広告代理店営業→コンサル提案特化ポジション歴6年。提案勝率60%以上' },
  'emp_035': { strength: '契約条件の評価と電子契約管理で受注リスクを最小化できる', weakness: '法律の高度な解釈や裁判対応は法務・弁護士に委任が必要', career: '法律事務所パラリーガル→事業会社法務コーディネーター歴5年' },
  'emp_036': { strength: '法人向けのクロージングと商談プロセス設計が得意。大型案件の実績多数', weakness: 'インサイドセールス・マーケティング連携の設計は別途必要', career: '外資系コンサル営業→独立。年間受注額3億円超の実績を持つ' },
  'emp_037': { strength: '財務DD・ビジネスDDを一人で広範囲カバー。レッドフラグ発見力が高い', weakness: 'PMI（統合後）のオペレーション設計は専門外', career: '監査法人→M&Aアドバイザリー歴10年。DD案件100件超経験' },
  'emp_038': { strength: 'シナジー試算からPMI計画まで統合設計の全体を見渡せる', weakness: 'DD（デューデリジェンス）よりも統合フェーズが専門', career: '戦略コンサル→PMI専門会社パートナー歴8年' },
  'emp_039': { strength: 'M&A案件のソーシングと初期スクリーニングの速度・精度が高い', weakness: 'バリュエーション・財務モデリングは他メンバーと連携が必要', career: 'M&A仲介会社→独立ディールソーサー。年間紹介案件50件超' },
  'emp_040': { strength: 'DCF・マルチプル法の両面から企業価値を精緻に算定できる', weakness: 'M&Aのビジネス面（PMI・シナジー設計）は専門外', career: '外資系投資銀行バリュエーション部門→独立。バリュエーション案件200件超' },
};

// 部署ごとの市場シェア貢献度バー（0〜5スケール）
function ShareImpactBar({ department, seniority }) {
  const impact = DEPT_SHARE_IMPACT[department];
  if (!impact) return null;
  const seniorityMult = seniority === 'SENIOR' ? 1.4 : seniority === 'MID' ? 1.0 : 0.6;
  const displayValue = Math.min(impact.value * seniorityMult, 5);
  const pct = (displayValue / 5) * 100;

  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <span style={{ fontSize: 9, color: '#57606A', letterSpacing: '0.06em' }}>市場シェア貢献</span>
        <span style={{ fontSize: 9, color: impact.color, fontWeight: 700 }}>{impact.label}</span>
      </div>
      <div style={{ background: '#EAEEF2', borderRadius: 3, height: 5, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${impact.color}88, ${impact.color})`,
          borderRadius: 3,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <div style={{ fontSize: 9, color: '#57606A', marginTop: 3, lineHeight: 1.4 }}>{impact.desc}</div>
    </div>
  );
}

function SkillTag({ skill, isMatchingProject = false }) {
  const [showTip, setShowTip] = useState(false);
  const desc = SKILL_DESCRIPTIONS[skill];

  return (
    <span
      className={`${styles.skill} ${isMatchingProject ? styles.skillMatch : ''}`}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {skill}
      {showTip && desc && (
        <span className={styles.tooltip}>{desc}</span>
      )}
    </span>
  );
}

function EmployeeCard({ employee, onHire, currentTotalCost = 0, availableProjects = [] }) {
  const [flash, setFlash] = useState(false);
  const isHired = employee.status === 'hired';
  const isTaken = employee.status === 'taken';

  const handleHire = () => {
    if (isHired || isTaken) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
    onHire(employee.id);
  };

  const newTotalCost = currentTotalCost + employee.monthlyCost;
  const deptConf = DEPT_CONFIG[employee.department] || { color: '#8B949E', icon: '○', bg: 'rgba(139,148,158,0.15)' };
  const seniority = getSeniorityLabel(employee.role);

  // この社員を採用すると受注可能になるenterprise案件
  const unlockableProjects = availableProjects.filter(p =>
    p.status === 'available' &&
    p.tier === 'enterprise' &&
    p.requiredSkills.some(s => employee.skills.includes(s))
  );

  // スキルと案件のマッチングマップ
  const matchingSkills = new Set(
    unlockableProjects.flatMap(p => p.requiredSkills.filter(s => employee.skills.includes(s)))
  );

  // 採用後の月次収益ポテンシャル
  const revenuePotential = unlockableProjects.reduce((sum, p) => sum + Math.round(p.revenue / p.duration), 0);

  return (
    <div className={`${styles.card} ${flash ? styles.flash : ''} ${isHired ? styles.hired : ''} ${isTaken ? styles.taken : ''}`}>
      {/* ヘッダー */}
      <div className={styles.top}>
        {/* SVGアバター（AI生成風顔写真） */}
        <div className={styles.avatarWrap} style={{ border: `2px solid ${deptConf.color}` }}>
          <AvatarFace name={employee.name} department={employee.department} size={48} />
          {isHired && <div className={styles.avatarHiredBadge}>✓</div>}
        </div>

        {/* 名前・役職 */}
        <div className={styles.nameBlock}>
          <div className={styles.nameRow}>
            <span className={styles.name}>{employee.name}</span>
            <span className={styles.seniority} style={{ color: SENIORITY_COLOR[seniority] }}>{seniority}</span>
          </div>
          <div className={styles.role}>{employee.role}</div>
          <div className={styles.dept} style={{ color: deptConf.color }}>{employee.department}</div>
        </div>

        <div className={styles.costBlock}>
          <div className={styles.costLabel}>月次コスト</div>
          <div className={styles.cost}>¥{(employee.monthlyCost / 10000).toFixed(0)}万</div>
          <div className={styles.costSub}>/ 月</div>
        </div>
      </div>

      {/* スキルタグ（案件マッチングをハイライト） */}
      <div className={styles.skills}>
        {employee.skills.map((s, i) => (
          <SkillTag key={i} skill={s} isMatchingProject={matchingSkills.has(s)} />
        ))}
      </div>

      {/* プロフィール詳細（強み・弱み・経歴） */}
      {(() => {
        const prof = EMPLOYEE_PROFILES[employee.id];
        if (!prof) return null;
        return (
          <div className={styles.profile}>
            <div className={styles.profileRow}>
              <span className={styles.profileIcon} style={{ color: '#3FB950' }}>◎</span>
              <span className={styles.profileText}><span className={styles.profileLabel}>強み</span>{prof.strength}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileIcon} style={{ color: '#F85149' }}>△</span>
              <span className={styles.profileText}><span className={styles.profileLabel}>注意</span>{prof.weakness}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileIcon} style={{ color: '#8B949E' }}>◷</span>
              <span className={styles.profileText}><span className={styles.profileLabel}>経歴</span>{prof.career}</span>
            </div>
          </div>
        );
      })()}

      {/* 市場シェア貢献度 */}
      <ShareImpactBar department={employee.department} seniority={seniority} />

      {/* 採用前: 影響プレビュー */}
      {!isHired && !isTaken && (
        <>
          <div className={styles.impact}>
            <div className={styles.impactRow}>
              <span className={styles.impactLabel}>採用コスト</span>
              <span className={styles.impactCost}>
                ¥{(currentTotalCost / 10000).toFixed(0)}万 → <strong>¥{(newTotalCost / 10000).toFixed(0)}万/月</strong>
              </span>
            </div>
            <div className={styles.impactRow}>
              <span className={styles.impactLabel}>固定費増加</span>
              <span className={styles.impactNeg}>+¥{(employee.monthlyCost / 10000).toFixed(0)}万/月</span>
            </div>

            {unlockableProjects.length > 0 ? (
              <>
                <div className={styles.impactDivider} />
                <div className={styles.impactRow}>
                  <span className={styles.impactLabel}>解放できる案件</span>
                  <span className={styles.impactPos}>{unlockableProjects.length}件 受注可能に</span>
                </div>
                <div className={styles.impactRow}>
                  <span className={styles.impactLabel}>収益ポテンシャル</span>
                  <span className={styles.impactPos}>最大 +¥{(revenuePotential / 10000).toFixed(0)}万/月</span>
                </div>
                <div className={styles.unlockProjects}>
                  {unlockableProjects.slice(0, 3).map(p => (
                    <div key={p.id} className={styles.unlockProject}>
                      <span className={styles.unlockProjectName}>{p.name}</span>
                      <span className={styles.unlockProjectRev}>¥{(Math.round(p.revenue / p.duration) / 10000).toFixed(0)}万/月</span>
                    </div>
                  ))}
                  {unlockableProjects.length > 3 && (
                    <div className={styles.unlockMore}>+他{unlockableProjects.length - 3}件</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={styles.impactDivider} />
                <div className={styles.impactNote}>現在の案件にスキルが直結しません<br/>スキル強化・将来案件への布石として検討してください</div>
              </>
            )}
          </div>

          <button className={styles.btn} onClick={handleHire}>
            採用する — ¥{(employee.monthlyCost / 10000).toFixed(0)}万/月
          </button>
        </>
      )}

      {isHired && (() => {
        const assignedProjects = availableProjects.filter(p =>
          p.status === 'contracted' &&
          p.requiredSkills.some(s => employee.skills.includes(s))
        );
        return (
          <>
            {assignedProjects.length > 0 && (
              <div className={styles.impact}>
                <div className={styles.impactRow}>
                  <span className={styles.impactLabel}>担当中の案件</span>
                  <span className={styles.impactPos}>{assignedProjects.length}件</span>
                </div>
                <div className={styles.unlockProjects}>
                  {assignedProjects.map(p => (
                    <div key={p.id} className={styles.unlockProject}>
                      <span className={styles.unlockProjectName}>{p.name}</span>
                      <span className={styles.unlockProjectRev}>¥{(Math.round(p.revenue / p.duration) / 10000).toFixed(0)}万/月</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.statusBadge}>✓ 採用済み — ¥{(employee.monthlyCost / 10000).toFixed(0)}万/月</div>
          </>
        );
      })()}
      {isTaken && (
        <div className={styles.statusBadgeTaken}>他社が採用済み</div>
      )}
    </div>
  );
}

export default EmployeeCard;
