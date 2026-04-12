// ===== 社員プール（40名）=====
export const EMPLOYEE_POOL = [
  // 01-経営企画部
  { id: "emp_001", name: "Haruto", department: "経営企画部", role: "シニアストラテジスト", skills: ["事業ポートフォリオ分析", "OKR戦略実行管理", "新規事業評価"], monthlyCost: 950000, status: "available", hiredBy: null },
  { id: "emp_002", name: "Kaito", department: "経営企画部", role: "競合インテリジェンスアナリスト", skills: ["競合戦略分析", "ポジショニング", "業界レポート読解"], monthlyCost: 720000, status: "available", hiredBy: null },
  { id: "emp_003", name: "Mei", department: "経営企画部", role: "プランニングマネージャー", skills: ["ガントチャート管理", "WBS作成管理", "ステークホルダー管理"], monthlyCost: 680000, status: "available", hiredBy: null },
  { id: "emp_004", name: "Riko", department: "経営企画部", role: "コーポレートアシスタント", skills: ["会議アジェンダ設計", "議事録整理", "アクションアイテム抽出"], monthlyCost: 380000, status: "available", hiredBy: null },

  // 02-事業開発部
  { id: "emp_005", name: "Koharu", department: "事業開発部", role: "CXスペシャリスト", skills: ["NPS設計", "カスタマージャーニー作成", "解約要因分析"], monthlyCost: 700000, status: "available", hiredBy: null },
  { id: "emp_006", name: "Ren", department: "事業開発部", role: "パートナーシップマネージャー", skills: ["BPO選定", "アライアンス交渉", "SLA設定管理"], monthlyCost: 750000, status: "available", hiredBy: null },
  { id: "emp_007", name: "Risa", department: "事業開発部", role: "レベニューストラテジスト", skills: ["サブスク設計", "プライシング戦略", "LTV/CAC管理"], monthlyCost: 820000, status: "available", hiredBy: null },
  { id: "emp_008", name: "Sota", department: "事業開発部", role: "プロダクトストラテジスト", skills: ["ユーザーインタビュー設計", "MVPプロトタイプ", "ジョブ理論"], monthlyCost: 760000, status: "available", hiredBy: null },

  // 03-コンテンツ制作部
  { id: "emp_009", name: "Eito", department: "コンテンツ制作部", role: "YouTubeコンテンツプロデューサー", skills: ["バズ企画タイトル生成", "動画構成設計", "シリーズ企画"], monthlyCost: 620000, status: "available", hiredBy: null },
  { id: "emp_010", name: "Hayato", department: "コンテンツ制作部", role: "ポストプロダクションディレクター", skills: ["編集指示書作成", "エンコード設定標準化", "字幕設計"], monthlyCost: 580000, status: "available", hiredBy: null },
  { id: "emp_011", name: "Hikaru", department: "コンテンツ制作部", role: "ビジュアルディレクター", skills: ["サムネイル設計", "CTR向上ビジュアル設計", "ブランドガイドライン"], monthlyCost: 650000, status: "available", hiredBy: null },
  { id: "emp_012", name: "Itsuki", department: "コンテンツ制作部", role: "インストラクショナルデザイナー", skills: ["学習目標設計", "カリキュラムマップ", "クイズ設計"], monthlyCost: 600000, status: "available", hiredBy: null },
  { id: "emp_013", name: "Shiori", department: "コンテンツ制作部", role: "スクリプトライター", skills: ["動画台本作成", "フックモーメント作成", "SEO対応説明文"], monthlyCost: 490000, status: "available", hiredBy: null },

  // 04-マーケティング部
  { id: "emp_014", name: "Akari", department: "マーケティング部", role: "PRマネージャー", skills: ["プレスリリース作成", "メディアリスト作成", "広報カレンダー管理"], monthlyCost: 710000, status: "available", hiredBy: null },
  { id: "emp_015", name: "Hina", department: "マーケティング部", role: "広告クリエイティブディレクター", skills: ["Meta広告設計", "Google広告設計", "クリエイティブA/Bテスト"], monthlyCost: 780000, status: "available", hiredBy: null },
  { id: "emp_016", name: "Sho", department: "マーケティング部", role: "SNSマーケター", skills: ["Xアルゴリズム分析", "バズ投稿設計", "ハッシュタグ戦略"], monthlyCost: 550000, status: "available", hiredBy: null },
  { id: "emp_017", name: "Takumi", department: "マーケティング部", role: "コピーライター/LPディレクター", skills: ["セールスレター作成", "LP構成設計", "CTA最適化"], monthlyCost: 640000, status: "available", hiredBy: null },
  { id: "emp_018", name: "Yui", department: "マーケティング部", role: "CRMスペシャリスト", skills: ["メールマーケティング", "LINEアカウント運用設計", "リテンション施策"], monthlyCost: 590000, status: "available", hiredBy: null },

  // 05-人事部
  { id: "emp_019", name: "Minato", department: "人事部", role: "採用ストラテジスト", skills: ["採用ターゲットペルソナ設計", "採用KPI設計", "採用チャネル選定"], monthlyCost: 730000, status: "available", hiredBy: null },
  { id: "emp_020", name: "Sana", department: "人事部", role: "タレントアセスメントスペシャリスト", skills: ["構造化面接設計", "評価シート作成", "コンピテンシーモデル構築"], monthlyCost: 680000, status: "available", hiredBy: null },
  { id: "emp_021", name: "Yuto", department: "人事部", role: "組織開発マネージャー", skills: ["組織図設計", "オンボーディングプログラム設計", "エンゲージメントサーベイ設計"], monthlyCost: 790000, status: "available", hiredBy: null },

  // 06-経営管理部
  { id: "emp_022", name: "Kento", department: "経営管理部", role: "コーポレートコントローラー", skills: ["月次財務諸表レビュー", "予算実績差異分析", "内部統制管理"], monthlyCost: 870000, status: "available", hiredBy: null },
  { id: "emp_023", name: "Mio", department: "経営管理部", role: "FP&Aマネージャー", skills: ["年間予算策定", "月次予算管理", "事業計画財務モデリング"], monthlyCost: 850000, status: "available", hiredBy: null },
  { id: "emp_024", name: "Ritsu", department: "経営管理部", role: "リーガルアドバイザー", skills: ["契約書作成・レビュー", "法的リスク管理", "知的財産管理"], monthlyCost: 920000, status: "available", hiredBy: null },

  // 07-リサーチ部
  { id: "emp_025", name: "Asahi", department: "リサーチ部", role: "テクノロジートレンドアナリスト", skills: ["AI/LLM調査", "技術トレンド影響評価", "PoC提案"], monthlyCost: 760000, status: "available", hiredBy: null },
  { id: "emp_026", name: "Hinata", department: "リサーチ部", role: "VOCアナリスト", skills: ["アンケート設計・分析", "テキストマイニング", "NPSアナリスト"], monthlyCost: 650000, status: "available", hiredBy: null },
  { id: "emp_027", name: "Rui", department: "リサーチ部", role: "マーケットリサーチャー", skills: ["市場規模推計", "EdTech業界プレイヤーマップ", "一次情報収集"], monthlyCost: 620000, status: "available", hiredBy: null },
  { id: "emp_028", name: "Sosuke", department: "リサーチ部", role: "パブリックアフェアーズリサーチャー", skills: ["補助金・助成金情報収集", "政策影響分析", "行政機関調整"], monthlyCost: 590000, status: "available", hiredBy: null },

  // 08-データ分析部
  { id: "emp_029", name: "Io", department: "データ分析部", role: "実験設計スペシャリスト", skills: ["ABテスト設計", "統計的仮説検定", "サンプルサイズ計算"], monthlyCost: 810000, status: "available", hiredBy: null },
  { id: "emp_030", name: "Sakura", department: "データ分析部", role: "ビジネスインテリジェンスアナリスト", skills: ["コホート分析", "RFM分析", "SQL活用データ抽出"], monthlyCost: 770000, status: "available", hiredBy: null },
  { id: "emp_031", name: "Shun", department: "データ分析部", role: "KPIアナリスト", skills: ["KPIツリー設計・管理", "異常値検知", "ダッシュボード設計"], monthlyCost: 740000, status: "available", hiredBy: null },
  { id: "emp_032", name: "Tsumugi", department: "データ分析部", role: "データビジュアライザー", skills: ["Looker Studio設計", "Tableau設計", "Power BI設計"], monthlyCost: 700000, status: "available", hiredBy: null },

  // 09-営業部
  { id: "emp_033", name: "Daiki", department: "営業部", role: "見積・工数管理スペシャリスト", skills: ["工数見積もり", "見積書フォーマット管理", "原価計算"], monthlyCost: 650000, status: "available", hiredBy: null },
  { id: "emp_034", name: "Honoka", department: "営業部", role: "プロポーザルスペシャリスト", skills: ["課題解決提案書設計", "業界別カスタマイズ提案書", "プレゼンスライド設計"], monthlyCost: 680000, status: "available", hiredBy: null },
  { id: "emp_035", name: "Kai", department: "営業部", role: "契約・法務コーディネーター", skills: ["前提契約書作成・確認", "契約条件評価", "電子契約管理"], monthlyCost: 590000, status: "available", hiredBy: null },
  { id: "emp_036", name: "Ryota", department: "営業部", role: "法人営業リーダー", skills: ["法人向け提案・クロージング", "商談プロセス設計", "顧客ヒアリング"], monthlyCost: 850000, status: "available", hiredBy: null },

  // 10-MA評価部
  { id: "emp_037", name: "Akito", department: "MA評価部", role: "DDリードアナリスト", skills: ["財務DD", "ビジネスDD", "DDレポート作成"], monthlyCost: 960000, status: "available", hiredBy: null },
  { id: "emp_038", name: "Kakeru", department: "MA評価部", role: "PMIデザイナー", skills: ["シナジー試算", "PMI計画設計", "組織統合設計"], monthlyCost: 900000, status: "available", hiredBy: null },
  { id: "emp_039", name: "Koki", department: "MA評価部", role: "ディールソーサー", skills: ["M&A案件ソーシング", "案件評価スクリーニング", "業界別売却案件調査"], monthlyCost: 880000, status: "available", hiredBy: null },
  { id: "emp_040", name: "Nanami", department: "MA評価部", role: "バリュエーションアナリスト", skills: ["DCF法", "マルチプル法", "財務モデリング"], monthlyCost: 940000, status: "available", hiredBy: null },
];

// ===== 案件プール（初期20件）=====
// ※ difficulty 1 = self-serve（スキル不要・即受注可）、2〜5 = enterprise（スキル必要）
export const PROJECT_POOL = [
  // ── 難易度1: 初心者向け・スキル不要（ゲーム開始直後に受注できる）──
  { id: "proj_001", name: "スタートアップ 市場調査レポート", industry: "IT・ソフトウェア", requiredSkills: [], difficulty: 1, duration: 1, revenue: 500000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_002", name: "小売店 SNS運用サポート（スポット）", industry: "小売・EC", requiredSkills: [], difficulty: 1, duration: 1, revenue: 400000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_003", name: "スタートアップ 競合比較資料作成", industry: "スタートアップ支援", requiredSkills: [], difficulty: 1, duration: 2, revenue: 800000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_004", name: "飲食チェーン 基本マーケティング調査", industry: "飲食・フード", requiredSkills: [], difficulty: 1, duration: 1, revenue: 450000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_005", name: "中小EC企業 課題ヒアリング・整理", industry: "小売・EC", requiredSkills: [], difficulty: 1, duration: 1, revenue: 350000, origin: "seasonal", status: "available", contractedBy: null },

  // ── 難易度2〜3: 中級（特定スキルを持つ社員を採用すると受注できる）──
  { id: "proj_006", name: "EC企業 LPリニューアル", industry: "小売・EC", requiredSkills: ["LP構成設計", "CTA最適化"], difficulty: 2, duration: 2, revenue: 1600000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_007", name: "EdTech企業 カリキュラム設計", industry: "教育・EdTech", requiredSkills: ["カリキュラムマップ", "学習目標設計"], difficulty: 2, duration: 2, revenue: 1600000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_008", name: "広告代理店 SNSマーケティング支援", industry: "広告・PR", requiredSkills: ["Xアルゴリズム分析", "バズ投稿設計"], difficulty: 2, duration: 3, revenue: 2400000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_009", name: "飲食チェーン SNS戦略立案", industry: "飲食・フード", requiredSkills: ["ハッシュタグ戦略", "バズ投稿設計"], difficulty: 2, duration: 2, revenue: 1600000, origin: "news", status: "available", contractedBy: null },
  { id: "proj_010", name: "メディア企業 YouTube戦略支援", industry: "メディア・エンタメ", requiredSkills: ["バズ企画タイトル生成", "シリーズ企画"], difficulty: 2, duration: 3, revenue: 2400000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_011", name: "ITスタートアップ 競合分析レポート", industry: "IT・ソフトウェア", requiredSkills: ["競合戦略分析", "業界レポート読解"], difficulty: 3, duration: 1, revenue: 1200000, origin: "news", status: "available", contractedBy: null },
  { id: "proj_012", name: "保険会社 顧客満足度改善プロジェクト", industry: "保険", requiredSkills: ["NPS設計", "VOCアナリスト"], difficulty: 3, duration: 4, revenue: 4800000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_013", name: "HR企業 採用KPI設計", industry: "人材・HR", requiredSkills: ["採用KPI設計", "採用チャネル選定"], difficulty: 3, duration: 2, revenue: 2400000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_014", name: "物流企業 KPIダッシュボード構築", industry: "物流・運輸", requiredSkills: ["KPIツリー設計・管理", "Looker Studio設計"], difficulty: 3, duration: 2, revenue: 2400000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_015", name: "エネルギー企業 補助金調査", industry: "エネルギー", requiredSkills: ["補助金・助成金情報収集", "政策影響分析"], difficulty: 3, duration: 1, revenue: 1200000, origin: "news", status: "available", contractedBy: null },

  // ── 難易度4〜5: 大型Enterprise案件 ──
  { id: "proj_016", name: "大手製造業 経営戦略再設計", industry: "製造・メーカー", requiredSkills: ["OKR戦略実行管理", "事業ポートフォリオ分析"], difficulty: 4, duration: 3, revenue: 4800000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_017", name: "不動産ファンド M&Aスクリーニング", industry: "不動産", requiredSkills: ["M&A案件ソーシング", "案件評価スクリーニング"], difficulty: 4, duration: 2, revenue: 3200000, origin: "news", status: "available", contractedBy: null },
  { id: "proj_018", name: "建設会社 契約書整備プロジェクト", industry: "建設・インフラ", requiredSkills: ["契約書作成・レビュー", "前提契約書作成・確認"], difficulty: 3, duration: 2, revenue: 2400000, origin: "seasonal", status: "available", contractedBy: null },
  { id: "proj_019", name: "医療法人 財務モデリング支援", industry: "医療・ヘルスケア", requiredSkills: ["財務モデリング", "事業計画財務モデリング"], difficulty: 5, duration: 3, revenue: 7500000, origin: "news", status: "available", contractedBy: null },
  { id: "proj_020", name: "自動車メーカー M&A財務DD", industry: "自動車", requiredSkills: ["財務DD", "DCF法"], difficulty: 5, duration: 4, revenue: 10000000, origin: "news", status: "available", contractedBy: null },
];

// ===== 競合他社シェア =====
export const INITIAL_COMPETITOR_SHARES = [
  { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
  { name: "Beta社",         share: 23, color: "#E25C4A" },
  { name: "Gamma社",        share: 18, color: "#50E24A" },
  { name: "Delta社",        share: 15, color: "#E2C44A" },
  { name: "未参入領域",     share: 32, color: "#444C58" },
];

// ===== ニュースデータ =====
export const NEWS_ITEMS = [
  // ターン1
  { id: "news_001", text: "【IT】AIスタートアップへの投資が前年比180%増加。デジタル変革案件が急増の見通し。", impact: "positive", turn: 1 },
  { id: "news_002", text: "【金融】日銀が政策金利を据え置き。金融機関のコスト削減ニーズが継続。", impact: "neutral", turn: 1 },
  { id: "news_003", text: "【製造】大手製造業で経営戦略見直しの動き。コンサル需要が高まる。", impact: "positive", turn: 1 },
  // ターン2
  { id: "news_004", text: "【M&A】国内M&A件数が過去最高を更新。DD・バリュエーション案件が急増。", impact: "positive", turn: 2 },
  { id: "news_005", text: "【規制】個人情報保護法改正の動き。コンプライアンス対応案件が増加見込み。", impact: "positive", turn: 2 },
  { id: "news_006", text: "【景気】景況感指数が小幅悪化。企業のコスト削減志向が強まる。", impact: "negative", turn: 2 },
  // ターン3
  { id: "news_007", text: "【EdTech】オンライン学習市場が拡大。カリキュラム設計・コンテンツ案件が増加。", impact: "positive", turn: 3 },
  { id: "news_008", text: "【エネルギー】政府が再生可能エネルギー補助金を拡充。調査・申請支援需要が急増。", impact: "positive", turn: 3 },
  { id: "news_009", text: "【人材】人手不足が深刻化。採用戦略・HR案件の需要が拡大。", impact: "positive", turn: 3 },
  // ターン4
  { id: "news_010", text: "【EC】巣ごもり需要一巡。EC企業がCX改善・リテンション施策に注力。", impact: "positive", turn: 4 },
  { id: "news_011", text: "【不動産】商業不動産の売買が活発化。DD・バリュエーション案件が増加。", impact: "positive", turn: 4 },
  { id: "news_012", text: "【広告】SNS広告費が過去最高。マーケティング支援の需要が急増。", impact: "positive", turn: 4 },
  // ターン5以降
  { id: "news_013", text: "【自動車】EVシフトが加速。自動車メーカーの経営戦略見直しが相次ぐ。", impact: "positive", turn: 5 },
  { id: "news_014", text: "【医療】医療DXが加速。病院・医療法人向けIT・戦略案件が増加。", impact: "positive", turn: 5 },
  { id: "news_015", text: "【建設】インフラ老朽化対策で公共案件が増加。建設業向けコンサル需要が拡大。", impact: "positive", turn: 5 },
  { id: "news_016", text: "【景気悪化】景気後退懸念が強まる。企業が投資を抑制し案件数が減少傾向。", impact: "negative", turn: 6 },
  { id: "news_017", text: "【AI規制】AI利用に関する規制強化の議論が活発化。対応支援案件が増加。", impact: "positive", turn: 6 },
  { id: "news_018", text: "【スタートアップ】資金調達環境が改善。スタートアップ支援・事業計画案件が増加。", impact: "positive", turn: 7 },
  { id: "news_019", text: "【農業】農業DXへの補助金が拡充。農業・食品業界向けIT戦略案件が登場。", impact: "positive", turn: 7 },
  { id: "news_020", text: "【公共】デジタル庁主導の行政DXが加速。公共・行政向け案件が大幅増加。", impact: "positive", turn: 8 },
];

// ===== ターンイベント（ターン進行ごとの差分）=====
export const TURN_EVENTS = [
  {
    turn: 2,
    newProjects: [
      { id: "proj_021", name: "スタートアップ支援 事業計画策定", industry: "スタートアップ支援", requiredSkills: ["MVPプロトタイプ", "ジョブ理論"], difficulty: 3, duration: 2, revenue: 2400000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_022", name: "金融機関 コスト削減施策立案", industry: "金融・銀行", requiredSkills: ["予算実績差異分析", "月次予算管理"], difficulty: 4, duration: 3, revenue: 4800000, origin: "news", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.08,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 25, color: "#E25C4A" },
      { name: "Gamma社",        share: 17, color: "#50E24A" },
      { name: "Delta社",        share: 14, color: "#E2C44A" },
      { name: "未参入領域",     share: 32, color: "#444C58" },
    ],
  },
  {
    turn: 3,
    newProjects: [
      { id: "proj_023", name: "HR企業 オンボーディング設計", industry: "人材・HR", requiredSkills: ["オンボーディングプログラム設計", "カリキュラムマップ"], difficulty: 2, duration: 2, revenue: 1600000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_024", name: "エネルギー企業 補助金申請支援", industry: "エネルギー", requiredSkills: ["補助金・助成金情報収集", "行政機関調整"], difficulty: 3, duration: 3, revenue: 3600000, origin: "news", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.12,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 24, color: "#E25C4A" },
      { name: "Gamma社",        share: 19, color: "#50E24A" },
      { name: "Delta社",        share: 16, color: "#E2C44A" },
      { name: "未参入領域",     share: 29, color: "#444C58" },
    ],
  },
  {
    turn: 4,
    newProjects: [
      { id: "proj_025", name: "EC企業 リテンション施策立案", industry: "小売・EC", requiredSkills: ["リテンション施策", "コホート分析"], difficulty: 3, duration: 2, revenue: 2400000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_026_adv", name: "広告代理店 Meta広告クリエイティブ最適化", industry: "広告・PR", requiredSkills: ["Meta広告設計", "クリエイティブA/Bテスト"], difficulty: 3, duration: 2, revenue: 2400000, origin: "news", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.05,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 22, color: "#E25C4A" },
      { name: "Gamma社",        share: 20, color: "#50E24A" },
      { name: "Delta社",        share: 17, color: "#E2C44A" },
      { name: "未参入領域",     share: 29, color: "#444C58" },
    ],
  },
  {
    turn: 5,
    newProjects: [
      { id: "proj_026", name: "自動車メーカー EV戦略立案", industry: "自動車", requiredSkills: ["OKR戦略実行管理", "事業ポートフォリオ分析"], difficulty: 5, duration: 4, revenue: 10000000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_027", name: "医療法人 DX推進支援", industry: "医療・ヘルスケア", requiredSkills: ["AI/LLM調査", "PoC提案"], difficulty: 4, duration: 3, revenue: 4800000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_028", name: "IT企業 ABテスト設計支援", industry: "IT・ソフトウェア", requiredSkills: [], difficulty: 1, duration: 1, revenue: 500000, origin: "news", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.15,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 23, color: "#E25C4A" },
      { name: "Gamma社",        share: 20, color: "#50E24A" },
      { name: "Delta社",        share: 18, color: "#E2C44A" },
      { name: "未参入領域",     share: 27, color: "#444C58" },
    ],
  },
  {
    turn: 6,
    newProjects: [
      { id: "proj_029", name: "金融機関 DXロードマップ策定", industry: "金融・銀行", requiredSkills: ["事業ポートフォリオ分析", "PoC提案"], difficulty: 4, duration: 3, revenue: 5400000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_030", name: "アパレル企業 コンテンツSEO強化", industry: "小売・EC", requiredSkills: ["SEO対応説明文", "動画台本作成"], difficulty: 2, duration: 2, revenue: 1600000, origin: "seasonal", status: "available", contractedBy: null },
      { id: "proj_031", name: "ベンチャー 月次管理会計整備", industry: "スタートアップ支援", requiredSkills: [], difficulty: 1, duration: 1, revenue: 480000, origin: "seasonal", status: "available", contractedBy: null },
    ],
    marketSizeChange: -0.05,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 24, color: "#E25C4A" },
      { name: "Gamma社",        share: 21, color: "#50E24A" },
      { name: "Delta社",        share: 17, color: "#E2C44A" },
      { name: "未参入領域",     share: 26, color: "#444C58" },
    ],
  },
  {
    turn: 7,
    newProjects: [
      { id: "proj_032", name: "スタートアップ 資金調達ストーリー設計", industry: "スタートアップ支援", requiredSkills: ["MVPプロトタイプ", "LTV/CAC管理"], difficulty: 3, duration: 2, revenue: 2400000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_033", name: "農業法人 デジタル戦略支援", industry: "農業・食品", requiredSkills: ["AI/LLM調査", "補助金・助成金情報収集"], difficulty: 3, duration: 2, revenue: 2400000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_034", name: "中小企業 人事制度改革", industry: "人材・HR", requiredSkills: [], difficulty: 1, duration: 2, revenue: 900000, origin: "seasonal", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.10,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 23, color: "#E25C4A" },
      { name: "Gamma社",        share: 22, color: "#50E24A" },
      { name: "Delta社",        share: 17, color: "#E2C44A" },
      { name: "未参入領域",     share: 26, color: "#444C58" },
    ],
  },
  {
    turn: 8,
    newProjects: [
      { id: "proj_035", name: "行政機関 デジタル庁DX推進支援", industry: "公共・行政", requiredSkills: ["行政機関調整", "政策影響分析"], difficulty: 4, duration: 4, revenue: 8000000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_036", name: "メーカー グローバル戦略立案", industry: "製造・メーカー", requiredSkills: ["事業ポートフォリオ分析", "OKR戦略実行管理"], difficulty: 5, duration: 4, revenue: 12000000, origin: "seasonal", status: "available", contractedBy: null },
      { id: "proj_037", name: "SaaS企業 チャーン分析", industry: "IT・ソフトウェア", requiredSkills: [], difficulty: 1, duration: 1, revenue: 600000, origin: "news", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.12,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 22, color: "#E25C4A" },
      { name: "Gamma社",        share: 23, color: "#50E24A" },
      { name: "Delta社",        share: 18, color: "#E2C44A" },
      { name: "未参入領域",     share: 25, color: "#444C58" },
    ],
  },
  {
    turn: 9,
    newProjects: [
      { id: "proj_038", name: "証券会社 投資戦略レポート作成", industry: "金融・銀行", requiredSkills: ["財務モデリング", "市場規模推計"], difficulty: 4, duration: 2, revenue: 3600000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_039", name: "EC大手 全社KPI再設計", industry: "小売・EC", requiredSkills: ["KPIツリー設計・管理", "コホート分析"], difficulty: 4, duration: 3, revenue: 5400000, origin: "seasonal", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.08,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 21, color: "#E25C4A" },
      { name: "Gamma社",        share: 23, color: "#50E24A" },
      { name: "Delta社",        share: 19, color: "#E2C44A" },
      { name: "未参入領域",     share: 25, color: "#444C58" },
    ],
  },
  {
    turn: 10,
    newProjects: [
      { id: "proj_040", name: "IT大手 M&A PMI設計", industry: "IT・ソフトウェア", requiredSkills: ["PMI計画設計", "シナジー試算"], difficulty: 5, duration: 5, revenue: 15000000, origin: "news", status: "available", contractedBy: null },
      { id: "proj_041", name: "小売企業 年次予算策定支援", industry: "小売・EC", requiredSkills: ["年間予算策定", "月次予算管理"], difficulty: 3, duration: 2, revenue: 2400000, origin: "seasonal", status: "available", contractedBy: null },
    ],
    marketSizeChange: 0.20,
    newCompetitorShares: [
      { name: "Alpha社（自社）", share: 12, color: "#4A90E2" },
      { name: "Beta社",         share: 20, color: "#E25C4A" },
      { name: "Gamma社",        share: 24, color: "#50E24A" },
      { name: "Delta社",        share: 20, color: "#E2C44A" },
      { name: "未参入領域",     share: 24, color: "#444C58" },
    ],
  },
];

// ===== モジュール定義 =====
export const MODULE_DEFINITIONS = [
  {
    id: "strategy",
    name: "Strategy",
    description: "経営戦略・市場調査・競合分析",
    icon: "◈",
    color: "#4A90E2",
    departments: ["経営企画部", "リサーチ部"],
    initialLevel: 1, // 初期解放済み
    levels: [
      { lv: 1, name: "Starter",       upgradeCost: 0,        selfServeCap: 2,  enterpriseCap: 0, reputationBonus: 0,  autoInflow: 1 },
      { lv: 2, name: "Growth",        upgradeCost: 15000000, selfServeCap: 4,  enterpriseCap: 1, reputationBonus: 5,  autoInflow: 2 },
      { lv: 3, name: "Scale",         upgradeCost: 30000000, selfServeCap: 6,  enterpriseCap: 2, reputationBonus: 10, autoInflow: 3 },
      { lv: 4, name: "Expert",        upgradeCost: 60000000, selfServeCap: 8,  enterpriseCap: 3, reputationBonus: 15, autoInflow: 5 },
      { lv: 5, name: "Market Leader", upgradeCost: 120000000,selfServeCap: 10, enterpriseCap: 5, reputationBonus: 25, autoInflow: 8, marketShareBonus: 5 },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    description: "財務管理・M&A評価・バリュエーション",
    icon: "◆",
    color: "#E3B341",
    departments: ["経営管理部", "MA評価部"],
    initialLevel: 0, // 未解放
    levels: [
      { lv: 1, name: "Starter",       upgradeCost: 5000000,  selfServeCap: 2,  enterpriseCap: 0, reputationBonus: 0,  autoInflow: 1 },
      { lv: 2, name: "Growth",        upgradeCost: 15000000, selfServeCap: 4,  enterpriseCap: 1, reputationBonus: 5,  autoInflow: 2 },
      { lv: 3, name: "Scale",         upgradeCost: 30000000, selfServeCap: 6,  enterpriseCap: 2, reputationBonus: 10, autoInflow: 3 },
      { lv: 4, name: "Expert",        upgradeCost: 60000000, selfServeCap: 8,  enterpriseCap: 3, reputationBonus: 15, autoInflow: 5 },
      { lv: 5, name: "Market Leader", upgradeCost: 120000000,selfServeCap: 10, enterpriseCap: 5, reputationBonus: 25, autoInflow: 8, marketShareBonus: 5 },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "マーケティング・事業開発・PLG推進",
    icon: "◉",
    color: "#3FB950",
    departments: ["マーケティング部", "事業開発部"],
    initialLevel: 0,
    levels: [
      { lv: 1, name: "Starter",       upgradeCost: 5000000,  selfServeCap: 3,  enterpriseCap: 0, reputationBonus: 5,  autoInflow: 2 },
      { lv: 2, name: "Growth",        upgradeCost: 15000000, selfServeCap: 5,  enterpriseCap: 1, reputationBonus: 10, autoInflow: 3 },
      { lv: 3, name: "Scale",         upgradeCost: 30000000, selfServeCap: 7,  enterpriseCap: 2, reputationBonus: 15, autoInflow: 5 },
      { lv: 4, name: "Expert",        upgradeCost: 60000000, selfServeCap: 9,  enterpriseCap: 3, reputationBonus: 20, autoInflow: 7 },
      { lv: 5, name: "Market Leader", upgradeCost: 120000000,selfServeCap: 12, enterpriseCap: 5, reputationBonus: 30, autoInflow: 10, marketShareBonus: 5 },
    ],
  },
  {
    id: "people",
    name: "People",
    description: "人材採用・組織開発・タレントマネジメント",
    icon: "◎",
    color: "#BC8CFF",
    departments: ["人事部"],
    initialLevel: 0,
    levels: [
      { lv: 1, name: "Starter",       upgradeCost: 5000000,  selfServeCap: 2,  enterpriseCap: 0, reputationBonus: 0,  autoInflow: 1, hireDiscount: 0.05 },
      { lv: 2, name: "Growth",        upgradeCost: 15000000, selfServeCap: 3,  enterpriseCap: 1, reputationBonus: 5,  autoInflow: 2, hireDiscount: 0.10 },
      { lv: 3, name: "Scale",         upgradeCost: 30000000, selfServeCap: 5,  enterpriseCap: 2, reputationBonus: 10, autoInflow: 3, hireDiscount: 0.15 },
      { lv: 4, name: "Expert",        upgradeCost: 60000000, selfServeCap: 7,  enterpriseCap: 3, reputationBonus: 15, autoInflow: 4, hireDiscount: 0.20 },
      { lv: 5, name: "Market Leader", upgradeCost: 120000000,selfServeCap: 10, enterpriseCap: 5, reputationBonus: 20, autoInflow: 6, hireDiscount: 0.25, marketShareBonus: 3 },
    ],
  },
  {
    id: "data",
    name: "Data",
    description: "データ分析・KPI設計・実験設計",
    icon: "◇",
    color: "#58A6FF",
    departments: ["データ分析部"],
    initialLevel: 0,
    levels: [
      { lv: 1, name: "Starter",       upgradeCost: 5000000,  selfServeCap: 2,  enterpriseCap: 0, reputationBonus: 0,  autoInflow: 1 },
      { lv: 2, name: "Growth",        upgradeCost: 15000000, selfServeCap: 4,  enterpriseCap: 1, reputationBonus: 5,  autoInflow: 2 },
      { lv: 3, name: "Scale",         upgradeCost: 30000000, selfServeCap: 6,  enterpriseCap: 2, reputationBonus: 10, autoInflow: 3 },
      { lv: 4, name: "Expert",        upgradeCost: 60000000, selfServeCap: 8,  enterpriseCap: 3, reputationBonus: 15, autoInflow: 5 },
      { lv: 5, name: "Market Leader", upgradeCost: 120000000,selfServeCap: 10, enterpriseCap: 5, reputationBonus: 25, autoInflow: 8, marketShareBonus: 5 },
    ],
  },
  {
    id: "deal",
    name: "Deal",
    description: "営業・大型受注・M&Aソーシング",
    icon: "◐",
    color: "#F85149",
    departments: ["営業部", "MA評価部"],
    initialLevel: 0,
    levels: [
      { lv: 1, name: "Starter",       upgradeCost: 5000000,  selfServeCap: 1,  enterpriseCap: 1, reputationBonus: 0,  autoInflow: 0 },
      { lv: 2, name: "Growth",        upgradeCost: 15000000, selfServeCap: 2,  enterpriseCap: 2, reputationBonus: 5,  autoInflow: 1 },
      { lv: 3, name: "Scale",         upgradeCost: 30000000, selfServeCap: 3,  enterpriseCap: 3, reputationBonus: 10, autoInflow: 2 },
      { lv: 4, name: "Expert",        upgradeCost: 60000000, selfServeCap: 4,  enterpriseCap: 4, reputationBonus: 20, autoInflow: 3 },
      { lv: 5, name: "Market Leader", upgradeCost: 120000000,selfServeCap: 5,  enterpriseCap: 6, reputationBonus: 30, autoInflow: 5, marketShareBonus: 8 },
    ],
  },
];

// モジュールと案件のマッピング
export const MODULE_PROJECT_MAP = {
  strategy: ["経営戦略", "競合分析", "市場調査", "新規事業", "OKR", "PMI", "組織", "戦略"],
  finance:  ["財務", "DD", "バリュエーション", "M&A", "予算", "コスト", "会計", "投資"],
  growth:   ["マーケティング", "LP", "SNS", "広告", "CRM", "リテンション", "PLG", "ブランド"],
  people:   ["採用", "HR", "人材", "組織開発", "オンボーディング", "タレント"],
  data:     ["データ", "KPI", "ダッシュボード", "分析", "ABテスト", "SQL", "BI"],
  deal:     ["営業", "受注", "クロージング", "提案", "ソーシング", "契約"],
};

// ===== ゲーム初期状態 =====
export const INITIAL_GAME_STATE = {
  currentTurn: 1,
  currentMonthLabel: "2026年4月",
  playerCompany: "Alpha社",
  marketSize: 100000000, // 1億円
  reputationScore: 0,    // 評判スコア（PLG）
  cash: 30000000,        // 初期資金 3,000万円
  financials: {
    revenue: 0,
    cost: 0,
    profit: 0,
  },
  monthlyHistory: [],
};

// モジュール初期状態
export const INITIAL_MODULES = MODULE_DEFINITIONS.map(m => ({
  id: m.id,
  level: m.initialLevel,
}));
