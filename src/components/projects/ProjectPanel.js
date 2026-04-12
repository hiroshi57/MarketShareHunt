import { useState } from 'react';
import ProjectCard from './ProjectCard';
import styles from './ProjectPanel.module.css';

const TABS = [
  { key: 'all',          label: '全案件' },
  { key: 'self-serve',   label: 'セルフ' },
  { key: 'enterprise',   label: 'Enterprise' },
  { key: 'plg',          label: 'PLG' },
  { key: 'contracted',   label: '受注済' },
];

function ProjectPanel({ projects, onContract, canContractProject, employees = [], currentTurn = 1 }) {
  const [tab, setTab] = useState('all');

  const hiredEmployees = employees.filter(e => e.status === 'hired');
  const contracted  = projects.filter(p => p.status === 'contracted');
  const available   = projects.filter(p => p.status === 'available');
  const selfServe   = available.filter(p => p.tier === 'self-serve' && p.origin !== 'plg');
  const enterprise  = available.filter(p => p.tier === 'enterprise');
  const plg         = available.filter(p => p.origin === 'plg');

  // 次ターン収益プレビュー（受注済み案件の月次合計）
  const hiredCost = hiredEmployees.reduce((sum, e) => sum + e.monthlyCost, 0);
  const nextRevenue = contracted.reduce((sum, p) => sum + Math.round(p.revenue / p.duration), 0);
  const nextProfit = nextRevenue - hiredCost;

  // 「全案件」タブは available + contracted を合わせて表示（受注済みは薄く）
  const allProjects = [...available, ...contracted];

  const list = tab === 'contracted' ? contracted
    : tab === 'self-serve'  ? selfServe
    : tab === 'enterprise'  ? enterprise
    : tab === 'plg'         ? plg
    : allProjects;

  const counts = {
    all: available.length,
    'self-serve': selfServe.length,
    enterprise: enterprise.length,
    plg: plg.length,
    contracted: contracted.length,
  };

  return (
    <div className={`${styles.wrap} panel`}>
      <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span>📋 案件受注</span>
        <span style={{ fontSize: 10, fontWeight: 400, color: '#57606A', letterSpacing: 0 }}>受注した案件の収益が毎月入る</span>
      </div>

      {/* 次ターンプレビュー */}
      <div className={styles.nextTurnPreview}>
        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>次ターン収益</span>
          <span className={styles.previewRevenue}>¥{(nextRevenue / 10000).toFixed(0)}万</span>
        </div>
        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>人件費</span>
          <span className={styles.previewCost}>−¥{(hiredCost / 10000).toFixed(0)}万</span>
        </div>
        <div className={styles.previewRow}>
          <span className={styles.previewLabel}>損益</span>
          <span className={nextProfit >= 0 ? styles.previewProfitPos : styles.previewProfitNeg}>
            {nextProfit >= 0 ? '+' : ''}¥{(nextProfit / 10000).toFixed(0)}万
          </span>
        </div>
        {contracted.length > 0 && (
          <div className={styles.contractedList}>
            {contracted.map(p => {
              const elapsed = p.contractedAtTurn != null ? currentTurn - p.contractedAtTurn : 0;
              const remaining = Math.max(p.duration - elapsed, 0);
              return (
                <div key={p.id} className={styles.contractedItem}>
                  <span className={styles.contractedName}>{p.name}</span>
                  <span className={styles.contractedMeta}>
                    ¥{(Math.round(p.revenue / p.duration) / 10000).toFixed(0)}万/月
                    {remaining > 0
                      ? <span style={{ color: '#8B949E', marginLeft: 4 }}>残{remaining}ヶ月</span>
                      : <span style={{ color: '#F85149', marginLeft: 4 }}>完了</span>
                    }
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.active : ''} ${styles['tab_' + t.key.replace(/[-]/g, '')]}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            <span className={styles.badge}>{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {tab === 'enterprise' && (
        <div className={styles.tierNote}>
          スキルを持つ社員を採用すると受注できる大型案件
        </div>
      )}
      {tab === 'plg' && (
        <div className={styles.tierNote}>
          Growthモジュールが育つほど自動流入が増えます
        </div>
      )}

      <div className={styles.list}>
        {list.length === 0 ? (
          <div className={styles.empty}>
            {tab === 'contracted' ? '案件を受注してください\n受注した案件の収益が毎月発生します'
              : tab === 'enterprise' ? '必要スキルを持つ社員を採用すると\n大型案件を受注できます'
              : tab === 'plg' ? 'Growthモジュールを解放すると\nPLG案件が自動で流入します'
              : '案件がありません'}
          </div>
        ) : (
          list.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              canContract={canContractProject(p)}
              onContract={onContract}
              hiredEmployees={hiredEmployees}
              currentTurn={currentTurn}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectPanel;
