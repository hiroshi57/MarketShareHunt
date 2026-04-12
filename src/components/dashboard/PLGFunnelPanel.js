import React from 'react';
import styles from './PLGFunnelPanel.module.css';

function PLGFunnelPanel({ projects, employees }) {
  const allContracted = projects.filter(p => p.status === 'contracted');
  const plgContracted = allContracted.filter(p => p.origin === 'plg');
  const selfServeContracted = allContracted.filter(p => p.tier === 'self-serve' && p.origin !== 'plg');
  const enterpriseContracted = allContracted.filter(p => p.tier === 'enterprise');

  const plgAvailable = projects.filter(p => p.status === 'available' && p.origin === 'plg').length;
  const selfServeAvailable = projects.filter(p => p.status === 'available' && p.tier === 'self-serve' && p.origin !== 'plg').length;
  const enterpriseAvailable = projects.filter(p => p.status === 'available' && p.tier === 'enterprise').length;

  const plgRevenue = plgContracted.reduce((s, p) => s + Math.round(p.revenue / p.duration), 0);
  const selfServeRevenue = selfServeContracted.reduce((s, p) => s + Math.round(p.revenue / p.duration), 0);
  const enterpriseRevenue = enterpriseContracted.reduce((s, p) => s + Math.round(p.revenue / p.duration), 0);
  const totalRevenue = plgRevenue + selfServeRevenue + enterpriseRevenue;

  // PLG→Self-Serve→Enterpriseのコンバージョン率
  const plgToSelf = plgContracted.length > 0
    ? Math.min(Math.round((selfServeContracted.length / Math.max(plgContracted.length, 1)) * 100), 999)
    : 0;
  const selfToEnt = selfServeContracted.length > 0
    ? Math.min(Math.round((enterpriseContracted.length / Math.max(selfServeContracted.length, 1)) * 100), 999)
    : 0;

  const hiredCount = employees.filter(e => e.status === 'hired').length;

  const stages = [
    {
      key: 'plg',
      label: 'PLG流入',
      sublabel: 'Product-Led Growth',
      contracted: plgContracted.length,
      available: plgAvailable,
      revenue: plgRevenue,
      color: '#00B4D8',
      barColor: 'linear-gradient(90deg,#0077B6,#00B4D8)',
      icon: '⬇',
      desc: 'Growthモジュールが自動生成',
    },
    {
      key: 'self',
      label: 'Self-Serve',
      sublabel: 'スキル不要・即受注',
      contracted: selfServeContracted.length,
      available: selfServeAvailable,
      revenue: selfServeRevenue,
      color: '#3FB950',
      barColor: 'linear-gradient(90deg,#238636,#3FB950)',
      icon: '◎',
      desc: 'スキル不要で受注可能',
    },
    {
      key: 'enterprise',
      label: 'Enterprise',
      sublabel: 'スキルマッチ必須',
      contracted: enterpriseContracted.length,
      available: enterpriseAvailable,
      revenue: enterpriseRevenue,
      color: '#E3B341',
      barColor: 'linear-gradient(90deg,#B08020,#E3B341)',
      icon: '◈',
      desc: `採用社員${hiredCount}名が担当`,
    },
  ];

  const maxContracted = Math.max(...stages.map(s => s.contracted), 1);

  return (
    <div className={`${styles.wrap} panel`}>
      <div className={styles.title}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className={styles.hIcon}>H</div>
          <span className={styles.titleText}>GROWTH FUNNEL</span>
          <span className={styles.titleBadge}>Harness PLG Model</span>
        </div>
        <span className={styles.totalRevenue}>
          月次合計 <strong>¥{(totalRevenue / 10000).toFixed(0)}万</strong>
        </span>
      </div>

      {/* ファネル図 */}
      <div className={styles.funnel}>
        {stages.map((stage, idx) => {
          const pct = Math.round((stage.contracted / maxContracted) * 100);
          const revPct = totalRevenue > 0 ? Math.round((stage.revenue / totalRevenue) * 100) : 0;
          return (
            <React.Fragment key={stage.key}>
              <div className={styles.stage}>
                {/* ファネルバー */}
                <div className={styles.stageBarWrap}>
                  <div
                    className={styles.stageBar}
                    style={{
                      width: `${Math.max(pct, 8)}%`,
                      background: stage.barColor,
                      boxShadow: `0 0 8px ${stage.color}44`,
                    }}
                  />
                </div>
                {/* ステージ情報 */}
                <div className={styles.stageInfo}>
                  <div className={styles.stageHeader}>
                    <span className={styles.stageIcon} style={{ color: stage.color }}>{stage.icon}</span>
                    <span className={styles.stageLabel} style={{ color: stage.color }}>{stage.label}</span>
                    <span className={styles.stageSublabel}>{stage.sublabel}</span>
                  </div>
                  <div className={styles.stageStats}>
                    <span className={styles.statItem}>
                      <span className={styles.statNum} style={{ color: stage.color }}>{stage.contracted}</span>
                      <span className={styles.statLabel}>受注</span>
                    </span>
                    <span className={styles.statDivider} />
                    <span className={styles.statItem}>
                      <span className={styles.statNum} style={{ color: '#57606A' }}>{stage.available}</span>
                      <span className={styles.statLabel}>待機中</span>
                    </span>
                    <span className={styles.statDivider} />
                    <span className={styles.statItem}>
                      <span className={styles.statNum} style={{ color: '#24292F' }}>
                        ¥{(stage.revenue / 10000).toFixed(0)}万
                      </span>
                      <span className={styles.statLabel}>/月</span>
                    </span>
                    <span className={styles.statDivider} />
                    <span className={styles.statItem}>
                      <span className={styles.statNum} style={{ color: stage.color }}>{revPct}%</span>
                      <span className={styles.statLabel}>収益比</span>
                    </span>
                  </div>
                  <div className={styles.stageDesc}>{stage.desc}</div>
                </div>
              </div>

              {/* コンバージョン矢印 */}
              {idx < stages.length - 1 && (
                <div className={styles.conversion}>
                  <div className={styles.convArrow}>▼</div>
                  <div className={styles.convRate} style={{ color: idx === 0 ? '#00B4D8' : '#3FB950' }}>
                    {idx === 0
                      ? `PLG→Self CVR ${plgToSelf}%`
                      : `Self→ENT CVR ${selfToEnt}%`
                    }
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ボトムサマリー */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>PLG比率</span>
          <span className={styles.summaryValue} style={{ color: '#00B4D8' }}>
            {totalRevenue > 0 ? Math.round((plgRevenue / totalRevenue) * 100) : 0}%
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>ENT比率</span>
          <span className={styles.summaryValue} style={{ color: '#E3B341' }}>
            {totalRevenue > 0 ? Math.round((enterpriseRevenue / totalRevenue) * 100) : 0}%
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>受注合計</span>
          <span className={styles.summaryValue} style={{ color: '#24292F' }}>
            {allContracted.length}件
          </span>
        </div>
      </div>
    </div>
  );
}

export default PLGFunnelPanel;
