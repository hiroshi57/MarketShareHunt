import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './MarketSharePanel.module.css';

function formatYenShort(value) {
  if (value >= 100000000) return `¥${(value / 100000000).toFixed(1)}億`;
  if (value >= 10000) return `¥${(value / 10000).toFixed(0)}万`;
  return `¥${value}`;
}

function MarketSharePanel({ shares, marketSize }) {
  const myShare = shares.find(s => s.name.includes('Alpha'))?.share || 0;

  return (
    <div className={`${styles.wrap} panel`}>
      <div className="panel-title">市場シェア</div>
      <div className={styles.inner}>
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={shares}
                dataKey="share"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                animationDuration={600}
              >
                {shares.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v}%`, '']}
                contentStyle={{ background: '#FFFFFF', border: '1px solid #D0D7DE', fontSize: 12, color: '#24292F' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.center}>
            <div className={styles.centerValue}>{myShare}%</div>
            <div className={styles.centerLabel}>自社シェア</div>
          </div>
        </div>
        <div className={styles.legend}>
          {shares.map((s, i) => (
            <div key={i} className={styles.legendRow}>
              <span className={styles.legendDot} style={{ background: s.color }} />
              <span className={styles.legendName}>{s.name}</span>
              <span className={styles.legendShare}>{s.share}%</span>
            </div>
          ))}
          <div className={styles.marketSize}>
            市場規模: {formatYenShort(marketSize)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketSharePanel;
