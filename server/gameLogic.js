// ゲームロジック（バックエンド用 - dummyData相当）
const uuidv4 = () => require('crypto').randomUUID();

const MONTH_LABELS = [
  '2026年4月','2026年5月','2026年6月','2026年7月','2026年8月','2026年9月',
  '2026年10月','2026年11月','2026年12月','2027年1月','2027年2月','2027年3月',
];

// PLG案件テンプレート
const PLG_TEMPLATES = [
  { suffix: '（PLG流入）', industry: 'IT・ソフトウェア', tier: 'self-serve', difficulty: 1, duration: 1, baseRevenue: 500000 },
  { suffix: '（PLG流入）', industry: 'スタートアップ支援', tier: 'self-serve', difficulty: 1, duration: 1, baseRevenue: 400000 },
  { suffix: '（PLG流入）', industry: '小売・EC', tier: 'self-serve', difficulty: 1, duration: 2, baseRevenue: 600000 },
];

let plgCounter = 100;

function generatePlgProject(reputationScore) {
  const template = PLG_TEMPLATES[plgCounter % PLG_TEMPLATES.length];
  plgCounter++;
  return {
    id: `plg_${plgCounter}`,
    name: `自動流入案件 #${plgCounter}${template.suffix}`,
    industry: template.industry,
    requiredSkills: [],
    difficulty: template.difficulty,
    duration: template.duration,
    revenue: Math.round(template.baseRevenue * (1 + reputationScore / 200)),
    origin: 'plg',
    tier: 'self-serve',
    status: 'available',
    contractedBy: null,
    contractedAtTurn: null,
  };
}

// 初期ゲーム状態を生成
function createInitialGameState(players) {
  // フロントのdummyData相当のデータをここでも保持
  const state = {
    currentTurn: 1,
    currentMonthLabel: MONTH_LABELS[0],
    marketSize: 100000000,
    reputationScore: 0,
    // プレイヤーごとのCASH
    playerCash: {},
    playerFinancials: {},
    // 共有リソース
    employees: buildEmployeePool(),
    projects: buildProjectPool(),
    competitorShares: [
      { name: 'Alpha社', share: 12, color: '#4A90E2', playerId: players[0]?.id },
      { name: 'Beta社',  share: 23, color: '#E25C4A', playerId: players[1]?.id || null },
      { name: 'Gamma社', share: 18, color: '#50E24A', playerId: players[2]?.id || null },
      { name: 'Delta社', share: 15, color: '#E2C44A', playerId: players[3]?.id || null },
      { name: '未参入領域', share: 32, color: '#444C58', playerId: null },
    ],
    monthlyHistory: [],
  };

  // 各プレイヤーの初期資金
  players.forEach(p => {
    state.playerCash[p.id] = 30000000;
    state.playerFinancials[p.id] = { revenue: 0, cost: 0, profit: 0 };
  });

  return state;
}

// 採用処理
function hireEmployee(state, employeeId, playerId, playerCompany) {
  const emp = state.employees.find(e => e.id === employeeId);
  if (!emp || emp.status !== 'available') return { success: false, reason: '採用不可' };

  emp.status = 'hired';
  emp.hiredBy = playerCompany;
  emp.hiredByPlayerId = playerId;
  return { success: true, employee: emp };
}

// 受注処理
function contractProject(state, projectId, playerId, playerCompany, currentTurn) {
  const proj = state.projects.find(p => p.id === projectId);
  if (!proj || proj.status !== 'available') return { success: false, reason: '受注不可' };

  // スキルチェック（self-serveはスキル不要）
  if (proj.tier === 'enterprise' && proj.requiredSkills.length > 0) {
    const hiredSkills = state.employees
      .filter(e => e.status === 'hired' && e.hiredByPlayerId === playerId)
      .flatMap(e => e.skills);
    const hasSkill = proj.requiredSkills.some(s => hiredSkills.includes(s));
    if (!hasSkill) return { success: false, reason: 'スキル不足' };
  }

  proj.status = 'contracted';
  proj.contractedBy = playerCompany;
  proj.contractedByPlayerId = playerId;
  proj.contractedAtTurn = currentTurn;
  return { success: true, project: proj };
}

// ターン進行
function advanceTurn(state, players) {
  const nextTurn = state.currentTurn + 1;

  // 各プレイヤーの損益計算
  players.forEach(p => {
    const hiredEmployees = state.employees.filter(e => e.hiredByPlayerId === p.id);
    const contractedProjects = state.projects.filter(
      proj => proj.contractedByPlayerId === p.id && proj.status === 'contracted'
    );
    const cost = hiredEmployees.reduce((s, e) => s + e.monthlyCost, 0);
    const revenue = contractedProjects.reduce((s, proj) => s + Math.round(proj.revenue / proj.duration), 0);
    const profit = revenue - cost;

    state.playerCash[p.id] = (state.playerCash[p.id] || 0) + profit;
    state.playerFinancials[p.id] = { revenue, cost, profit };
  });

  // 市場シェア更新（収益に基づく簡易計算）
  const totalRevenue = players.reduce((s, p) => s + (state.playerFinancials[p.id]?.revenue || 0), 0);
  if (totalRevenue > 0) {
    players.forEach((p, i) => {
      const rev = state.playerFinancials[p.id]?.revenue || 0;
      const share = Math.round((rev / state.marketSize) * 100 * 100) / 100;
      if (state.competitorShares[i]) state.competitorShares[i].share = share;
    });
  }

  state.monthlyHistory.push({
    month: MONTH_LABELS[state.currentTurn - 1] || `Month ${state.currentTurn}`,
    playerFinancials: { ...state.playerFinancials },
  });

  state.currentTurn = nextTurn;
  state.currentMonthLabel = MONTH_LABELS[nextTurn - 1] || `Month ${nextTurn}`;

  return state;
}

// --- 社員・案件データ（server側コピー）---
function buildEmployeePool() {
  return [
    { id:'emp_001', name:'Haruto', department:'経営企画部', role:'シニアストラテジスト', skills:['事業ポートフォリオ分析','OKR戦略実行管理','新規事業評価'], monthlyCost:950000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_002', name:'Kaito', department:'経営企画部', role:'競合インテリジェンスアナリスト', skills:['競合戦略分析','ポジショニング','業界レポート読解'], monthlyCost:720000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_003', name:'Mei', department:'経営企画部', role:'プランニングマネージャー', skills:['ガントチャート管理','WBS作成管理','ステークホルダー管理'], monthlyCost:680000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_004', name:'Riko', department:'経営企画部', role:'コーポレートアシスタント', skills:['会議アジェンダ設計','議事録整理','アクションアイテム抽出'], monthlyCost:380000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_005', name:'Koharu', department:'事業開発部', role:'CXスペシャリスト', skills:['NPS設計','カスタマージャーニー作成','解約要因分析'], monthlyCost:700000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_006', name:'Ren', department:'事業開発部', role:'パートナーシップマネージャー', skills:['BPO選定','アライアンス交渉','SLA設定管理'], monthlyCost:750000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_007', name:'Risa', department:'事業開発部', role:'レベニューストラテジスト', skills:['サブスク設計','プライシング戦略','LTV/CAC管理'], monthlyCost:820000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_008', name:'Sota', department:'事業開発部', role:'プロダクトストラテジスト', skills:['ユーザーインタビュー設計','MVPプロトタイプ','ジョブ理論'], monthlyCost:760000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_029', name:'Io', department:'データ分析部', role:'実験設計スペシャリスト', skills:['ABテスト設計','統計的仮説検定','サンプルサイズ計算'], monthlyCost:810000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_036', name:'Ryota', department:'営業部', role:'法人営業リーダー', skills:['法人向け提案・クロージング','商談プロセス設計','顧客ヒアリング'], monthlyCost:850000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_037', name:'Akito', department:'MA評価部', role:'DDリードアナリスト', skills:['財務DD','ビジネスDD','DDレポート作成'], monthlyCost:960000, status:'available', hiredBy:null, hiredByPlayerId:null },
    { id:'emp_040', name:'Nanami', department:'MA評価部', role:'バリュエーションアナリスト', skills:['DCF法','マルチプル法','財務モデリング'], monthlyCost:940000, status:'available', hiredBy:null, hiredByPlayerId:null },
  ];
}

function buildProjectPool() {
  return [
    { id:'proj_001', name:'大手製造業 経営戦略再設計', industry:'製造・メーカー', requiredSkills:['OKR戦略実行管理','事業ポートフォリオ分析'], difficulty:4, duration:3, revenue:4800000, origin:'seasonal', tier:'enterprise', status:'available', contractedBy:null, contractedByPlayerId:null, contractedAtTurn:null },
    { id:'proj_002', name:'ITスタートアップ 競合分析レポート', industry:'IT・ソフトウェア', requiredSkills:['競合戦略分析','業界レポート読解'], difficulty:3, duration:1, revenue:800000, origin:'news', tier:'enterprise', status:'available', contractedBy:null, contractedByPlayerId:null, contractedAtTurn:null },
    { id:'proj_003', name:'保険会社 顧客満足度改善', industry:'保険', requiredSkills:['NPS設計'], difficulty:3, duration:4, revenue:4800000, origin:'seasonal', tier:'enterprise', status:'available', contractedBy:null, contractedByPlayerId:null, contractedAtTurn:null },
    { id:'proj_004', name:'EC企業 LPリニューアル', industry:'小売・EC', requiredSkills:[], difficulty:2, duration:2, revenue:1600000, origin:'seasonal', tier:'self-serve', status:'available', contractedBy:null, contractedByPlayerId:null, contractedAtTurn:null },
    { id:'proj_005', name:'医療法人 財務モデリング支援', industry:'医療・ヘルスケア', requiredSkills:['財務モデリング'], difficulty:5, duration:3, revenue:7500000, origin:'news', tier:'enterprise', status:'available', contractedBy:null, contractedByPlayerId:null, contractedAtTurn:null },
    { id:'proj_014', name:'自動車メーカー M&A財務DD', industry:'自動車', requiredSkills:['財務DD','DCF法'], difficulty:5, duration:4, revenue:10000000, origin:'news', tier:'enterprise', status:'available', contractedBy:null, contractedByPlayerId:null, contractedAtTurn:null },
  ];
}

module.exports = {
  createInitialGameState,
  hireEmployee,
  contractProject,
  advanceTurn,
  generatePlgProject,
};
