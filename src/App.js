import React, { useState, useCallback, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import './App.css';
import Lobby from './components/lobby/Lobby';
import {
  EMPLOYEE_POOL,
  PROJECT_POOL,
  INITIAL_COMPETITOR_SHARES,
  NEWS_ITEMS,
  TURN_EVENTS,
  INITIAL_GAME_STATE,
  MODULE_DEFINITIONS,
  INITIAL_MODULES,
} from './data/dummyData';

import Header from './components/layout/Header';
import NewsTicker from './components/news/NewsTicker';
import PnLCard from './components/dashboard/PnLCard';
import PnLChart from './components/dashboard/PnLChart';
import MarketSharePanel from './components/dashboard/MarketSharePanel';
import EmployeePanel from './components/employees/EmployeePanel';
import ProjectPanel from './components/projects/ProjectPanel';
import ModulePanel from './components/modules/ModulePanel';
import PLGFunnelPanel from './components/dashboard/PLGFunnelPanel';
import TurnButton from './components/controls/TurnButton';

const MONTH_LABELS = [
  '2026年4月','2026年5月','2026年6月','2026年7月','2026年8月','2026年9月',
  '2026年10月','2026年11月','2026年12月','2027年1月','2027年2月','2027年3月',
];

// PLG自動流入案件テンプレート（全モジュール対応）
const PLG_TEMPLATES = [
  { suffix: "（PLG流入）", industry: "IT・ソフトウェア",      tier: "self-serve", difficulty: 1, duration: 1, baseRevenue: 500000, moduleId: "growth" },
  { suffix: "（PLG流入）", industry: "スタートアップ支援",    tier: "self-serve", difficulty: 1, duration: 1, baseRevenue: 400000, moduleId: "strategy" },
  { suffix: "（PLG流入）", industry: "小売・EC",              tier: "self-serve", difficulty: 1, duration: 2, baseRevenue: 600000, moduleId: "data" },
  { suffix: "（PLG流入）", industry: "金融・FinTech",         tier: "self-serve", difficulty: 1, duration: 1, baseRevenue: 550000, moduleId: "finance" },
  { suffix: "（PLG流入）", industry: "HRTech・組織開発",      tier: "self-serve", difficulty: 1, duration: 1, baseRevenue: 420000, moduleId: "people" },
  { suffix: "（PLG流入）", industry: "製造・商社",            tier: "self-serve", difficulty: 2, duration: 2, baseRevenue: 700000, moduleId: "deal" },
];

let plgCounter = 100;

function generatePlgProject(moduleId, reputationScore) {
  const template = PLG_TEMPLATES.find(t => t.moduleId === moduleId) || PLG_TEMPLATES[0];
  plgCounter++;
  return {
    id: `plg_${plgCounter}`,
    name: `自動流入案件 #${plgCounter}${template.suffix}`,
    industry: template.industry,
    requiredSkills: [],
    difficulty: template.difficulty,
    duration: template.duration,
    revenue: Math.round(template.baseRevenue * (1 + reputationScore / 200)),
    origin: "plg",
    tier: "self-serve",
    moduleId,
    status: "available",
    contractedBy: null,
  };
}

function App() {
  const [session, setSession] = useState(null);
  if (!session) return <Lobby onEnter={(s) => setSession(s)} />;
  return <Game session={session} />;
}

function Game({ session }) {
  const isMulti = !!(session?.roomId);

  // マルチプレイ時のみSocket.io接続
  const { joinRoom, hire: socketHire, contract: socketContract, nextTurn: socketNextTurn } = useSocket(isMulti, {
    onGameState: ({ state }) => {
      // マルチ時: サーバーからの { state, players, playerId } を展開して同期
      if (!state) return;
      if (state.employees)        setEmployees(state.employees);
      if (state.projects)         setProjects(state.projects);
      if (state.competitorShares) setCompetitorShares(state.competitorShares);
      // ゲーム状態（currentTurn, cash等）をサーバー値で更新
      setGameState(prev => ({
        ...prev,
        currentTurn:       state.currentTurn       ?? prev.currentTurn,
        currentMonthLabel: state.currentMonthLabel  ?? prev.currentMonthLabel,
        marketSize:        state.marketSize         ?? prev.marketSize,
        monthlyHistory:    state.monthlyHistory     ?? prev.monthlyHistory,
        cash:              state.playerCash?.[session.playerId] ?? prev.cash,
        financials:        state.playerFinancials?.[session.playerId] ?? prev.financials,
      }));
    },
    onTurnAdvanced: ({ state }) => {
      // マルチ時: ターン進行結果をサーバーから受け取って反映
      if (!state) return;
      if (state.employees)        setEmployees(state.employees);
      if (state.projects)         setProjects(state.projects);
      if (state.competitorShares) setCompetitorShares(state.competitorShares);
      setGameState(prev => ({
        ...prev,
        currentTurn:       state.currentTurn       ?? prev.currentTurn,
        currentMonthLabel: state.currentMonthLabel  ?? prev.currentMonthLabel,
        marketSize:        state.marketSize         ?? prev.marketSize,
        monthlyHistory:    state.monthlyHistory     ?? prev.monthlyHistory,
        cash:              state.playerCash?.[session.playerId] ?? prev.cash,
        financials:        state.playerFinancials?.[session.playerId] ?? prev.financials,
      }));
    },
    onActionError: (err) => {
      console.warn('[Socket] action_error', err);
    },
    onError: (err) => {
      console.error('[Socket] error', err);
    },
  });

  // マルチプレイ: 起動時にルームに参加
  useEffect(() => {
    if (isMulti && session.roomId && session.playerId) {
      joinRoom(session.roomId, session.playerId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMulti]);

  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [employees, setEmployees] = useState(EMPLOYEE_POOL.map(e => ({ ...e })));
  const [projects, setProjects] = useState(PROJECT_POOL.map(p => ({ ...p, tier: p.difficulty <= 2 ? 'self-serve' : 'enterprise' })));
  const [competitorShares, setCompetitorShares] = useState(INITIAL_COMPETITOR_SHARES.map(s => ({ ...s })));
  const [modules, setModules] = useState(INITIAL_MODULES.map(m => ({ ...m })));
  const [isAnimating, setIsAnimating] = useState(false);
  const [flashOverlay, setFlashOverlay] = useState(false);
  const [reputationScore, setReputationScore] = useState(0);
  const [dynamicNews, setDynamicNews] = useState([]);

  const currentNews = [
    ...NEWS_ITEMS.filter(n => n.turn === gameState.currentTurn),
    ...dynamicNews,
  ];

  // モジュール解放/レベルアップ
  const handleModuleUpgrade = useCallback((moduleId) => {
    const moduleDef = MODULE_DEFINITIONS.find(m => m.id === moduleId);
    const moduleState = modules.find(m => m.id === moduleId);
    if (!moduleDef || !moduleState) return;

    const currentLv = moduleState.level;
    const nextLv = currentLv + 1;
    if (nextLv > 5) return;

    const cost = moduleDef.levels[nextLv - 1].upgradeCost;
    if (gameState.cash < cost) return; // 資金チェック

    setModules(prev => prev.map(m =>
      m.id === moduleId ? { ...m, level: nextLv } : m
    ));

    // 資金を消費
    setGameState(prev => ({ ...prev, cash: prev.cash - cost }));

    // レベルアップによる評判スコア加算
    const bonus = moduleDef.levels[nextLv - 1].reputationBonus;
    setReputationScore(prev => prev + bonus);
  }, [modules, gameState.cash]);

  // 採用処理（マルチ時はソケット経由）
  const handleHire = useCallback((employeeId) => {
    if (isMulti) {
      socketHire(employeeId);
      return; // サーバーからのonGameStateで状態が更新される
    }
    setEmployees(prev => prev.map(e =>
      e.id === employeeId ? { ...e, status: 'hired', hiredBy: gameState.playerCompany } : e
    ));
  }, [isMulti, socketHire, gameState.playerCompany]);

  // 受注処理（マルチ時はソケット経由）
  const handleContract = useCallback((projectId) => {
    if (isMulti) {
      socketContract(projectId);
      return;
    }
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, status: 'contracted', contractedBy: gameState.playerCompany, contractedAtTurn: gameState.currentTurn } : p
    ));
    // 案件受注で評判スコア+
    setReputationScore(prev => prev + 3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMulti, socketContract, gameState.playerCompany, gameState.currentTurn]);

  // ターン進行
  const handleNextTurn = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setFlashOverlay(true);
    setTimeout(() => setFlashOverlay(false), 300);

    // マルチ時はサーバー経由でターン進行
    if (isMulti) {
      socketNextTurn();
      setTimeout(() => setIsAnimating(false), 1200);
      return;
    }

    // PLG自動流入案件を生成
    const activeModules = modules.filter(m => m.level > 0);
    const newPlgProjects = [];
    activeModules.forEach(m => {
      const modDef = MODULE_DEFINITIONS.find(d => d.id === m.id);
      if (!modDef) return;
      const lvData = modDef.levels[m.level - 1];
      const inflowCount = lvData.autoInflow || 0;
      for (let i = 0; i < inflowCount; i++) {
        newPlgProjects.push(generatePlgProject(m.id, reputationScore));
      }
    });

    if (newPlgProjects.length > 0) {
      setProjects(prev => [...prev, ...newPlgProjects]);
      // PLG流入をニュースティッカーに通知
      const plgNews = newPlgProjects.map(p => ({
        id: `plg_news_${p.id}`,
        turn: gameState.currentTurn + 1,
        text: `🟢 PLG流入: 新規案件「${p.name}」が追加されました — ¥${(p.revenue / 10000).toFixed(0)}万/${p.duration}ヶ月`,
      }));
      setDynamicNews(prev => [...prev, ...plgNews]);
    }

    setGameState(prev => {
      const hiredEmployees = employees.filter(e => e.status === 'hired');
      const contractedProjects = projects.filter(p => p.status === 'contracted');

      const newCost = hiredEmployees.reduce((sum, e) => sum + e.monthlyCost, 0);
      const newRevenue = contractedProjects.reduce((sum, p) => sum + (p.revenue / p.duration), 0);
      const newProfit = newRevenue - newCost;

      const newHistory = [
        ...prev.monthlyHistory,
        {
          month: MONTH_LABELS[prev.currentTurn - 1] || `Month ${prev.currentTurn}`,
          revenue: Math.round(newRevenue),
          cost: newCost,
          profit: Math.round(newProfit),
        },
      ];

      const nextTurn = prev.currentTurn + 1;
      const event = TURN_EVENTS.find(e => e.turn === nextTurn);
      const newMarketSize = event
        ? Math.round(prev.marketSize * (1 + event.marketSizeChange))
        : prev.marketSize;

      return {
        ...prev,
        currentTurn: nextTurn,
        currentMonthLabel: MONTH_LABELS[nextTurn - 1] || `Month ${nextTurn}`,
        marketSize: newMarketSize,
        cash: prev.cash + Math.round(newProfit),
        financials: {
          revenue: Math.round(newRevenue),
          cost: newCost,
          profit: Math.round(newProfit),
        },
        monthlyHistory: newHistory,
      };
    });

    // 新規案件・競合シェアの更新
    const nextTurn = gameState.currentTurn + 1;
    const event = TURN_EVENTS.find(e => e.turn === nextTurn);
    if (event) {
      if (event.newProjects) {
        setProjects(prev => [...prev, ...event.newProjects.map(p => ({
          ...p,
          tier: p.difficulty <= 2 ? 'self-serve' : 'enterprise'
        }))]);
      }
      if (event.newCompetitorShares) {
        setCompetitorShares(event.newCompetitorShares.map(s => ({ ...s })));
      }
    }

    setTimeout(() => setIsAnimating(false), 1200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, isMulti, socketNextTurn, employees, projects, gameState.currentTurn, modules, reputationScore]);

  // モジュールレベルに応じて受注可能かチェック
  const canContractProject = useCallback((project) => {
    if (project.tier === 'self-serve') return true; // PLG案件はスキル不要
    const hiredSkills = employees.filter(e => e.status === 'hired').flatMap(e => e.skills);
    if (project.requiredSkills.length === 0) return true;
    return project.requiredSkills.some(s => hiredSkills.includes(s));
  }, [employees]);

  // 自社シェア計算
  const myRevenue = gameState.financials.revenue;
  const totalMarket = gameState.marketSize;
  const myShare = totalMarket > 0 ? Math.min(Math.round((myRevenue / totalMarket) * 100 * 100) / 100, 100) : 0;
  const displayShares = competitorShares.map(s =>
    s.name.startsWith('Alpha') ? { ...s, share: myShare > 0 ? myShare : s.share } : s
  );

  const hiredCount = employees.filter(e => e.status === 'hired').length;
  const contractedCount = projects.filter(p => p.status === 'contracted').length;

  // Harness KPI計算
  const arr = gameState.financials.revenue * 12; // 月次収益×12 = ARR
  const plgProjects = projects.filter(p => p.status === 'contracted' && p.origin === 'plg');
  const totalContracted = projects.filter(p => p.status === 'contracted').length;
  const plgRate = totalContracted > 0 ? Math.round((plgProjects.length / totalContracted) * 100) : 0;
  // NRR: 前ターン比収益維持率（簡易計算：収益があれば100%以上、赤字なら低下）
  const history = gameState.monthlyHistory;
  const prevRevenue = history.length >= 2 ? history[history.length - 2].revenue : null;
  const currRevenue = gameState.financials.revenue;
  const nrr = prevRevenue != null && prevRevenue > 0
    ? Math.min(Math.round((currRevenue / prevRevenue) * 100), 200)
    : 100;

  return (
    <div className="app">
      <div className={`turn-overlay${flashOverlay ? ' active' : ''}`} />
      <Header
        playerCompany={session?.companyName || gameState.playerCompany}
        currentTurn={gameState.currentTurn}
        currentMonthLabel={gameState.currentMonthLabel}
        reputationScore={reputationScore}
        hiredCount={hiredCount}
        contractedCount={contractedCount}
        cash={gameState.cash}
        arr={arr}
        nrr={nrr}
        plgRate={plgRate}
        roomId={session?.roomId}
        isHost={session?.isHost}
      />
      <NewsTicker newsItems={currentNews} />

      <div className="app-body">
        {/* 左: 社員採用パネル */}
        <div className="action-column-left">
          <EmployeePanel
            employees={employees}
            onHire={handleHire}
            projects={projects}
          />
        </div>

        {/* 中央: 案件受注パネル */}
        <div className="action-column-center">
          <ProjectPanel
            projects={projects}
            onContract={handleContract}
            canContractProject={canContractProject}
            employees={employees}
            currentTurn={gameState.currentTurn}
          />
        </div>

        {/* 右: ダッシュボード */}
        <div className="action-column-right">
          <ModulePanel
            modules={modules}
            moduleDefs={MODULE_DEFINITIONS}
            onUpgrade={handleModuleUpgrade}
            cash={gameState.cash}
          />
          <div className="pnl-cards-row">
            <PnLCard label="ARR" value={arr} type="arr" secondaryLabel="MRR" secondaryValue={`¥${(gameState.financials.revenue / 10000).toFixed(0)}万`} />
            <PnLCard label="NRR" value={nrr} type="nrr" secondaryLabel="前月比" secondaryValue={nrr >= 100 ? `+${nrr - 100}%` : `${nrr - 100}%`} />
            <PnLCard label="損益" value={gameState.financials.profit} type="profit" />
          </div>
          <PLGFunnelPanel projects={projects} employees={employees} />
          <PnLChart history={gameState.monthlyHistory} />
          <MarketSharePanel shares={displayShares} marketSize={gameState.marketSize} reputationScore={reputationScore} />
        </div>
      </div>

      <TurnButton
        onNextTurn={handleNextTurn}
        isAnimating={isAnimating}
        currentTurn={gameState.currentTurn}
      />
    </div>
  );
}

export default App;
