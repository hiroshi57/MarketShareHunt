import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import styles from './PnLChart.module.css';

function formatYenShort(value) {
  if (Math.abs(value) >= 100000000) return `${(value / 100000000).toFixed(1)}億`;
  if (Math.abs(value) >= 10000) return `${(value / 10000).toFixed(0)}万`;
  return `${value}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const items = [
    { key: 'revenue', name: '月次収益', color: '#0969DA' },
    { key: 'cost',    name: '人件費',   color: '#E3B341' },
    { key: 'profit',  name: '損益',     color: '#1A7F37' },
    { key: 'arr',     name: 'ARR',      color: '#CF222E' },
  ];
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      {items.map(item => {
        const p = payload.find(d => d.dataKey === item.key);
        if (!p) return null;
        const isNeg = p.value < 0;
        return (
          <div key={item.key} className={styles.tooltipRow} style={{ color: isNeg && item.key === 'profit' ? '#CF222E' : item.color }}>
            <span className={styles.tooltipDot} style={{ background: item.color }} />
            {item.name}: {item.key === 'profit' && p.value > 0 ? '+' : ''}¥{p.value.toLocaleString()}
          </div>
        );
      })}
    </div>
  );
}

const VIEWS = [
  { key: 'all',     label: '全表示' },
  { key: 'revenue', label: '収益/費用' },
  { key: 'profit',  label: '損益' },
];

function PnLChart({ history }) {
  const [view, setView] = useState('all');

  // ARR = 月次収益 × 12
  const data = history.map(h => ({
    ...h,
    arr: h.revenue * 12,
  }));

  const hasData = data.length > 0;

  // 最新の数値サマリー
  const latest = data[data.length - 1];
  const prev   = data[data.length - 2];

  const revDiff    = latest && prev ? latest.revenue - prev.revenue : null;
  const profitSign = latest ? latest.profit >= 0 : null;

  return (
    <div className={`${styles.wrap} panel`}>
      {/* ヘッダー */}
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={styles.title}>収益・費用・損益 推移</span>
          {latest && (
            <div className={styles.latestRow}>
              <span className={styles.chip} style={{ color: '#0969DA', background: 'rgba(9,105,218,0.08)', borderColor: 'rgba(9,105,218,0.2)' }}>
                収益 ¥{(latest.revenue / 10000).toFixed(0)}万/月
              </span>
              <span className={styles.chip} style={{ color: '#E3B341', background: 'rgba(227,179,65,0.08)', borderColor: 'rgba(227,179,65,0.2)' }}>
                費用 ¥{(latest.cost / 10000).toFixed(0)}万/月
              </span>
              <span className={styles.chip} style={{
                color: profitSign ? '#1A7F37' : '#CF222E',
                background: profitSign ? 'rgba(26,127,55,0.08)' : 'rgba(207,34,46,0.08)',
                borderColor: profitSign ? 'rgba(26,127,55,0.2)' : 'rgba(207,34,46,0.2)',
              }}>
                損益 {profitSign ? '+' : ''}¥{(latest.profit / 10000).toFixed(0)}万
              </span>
              {revDiff !== null && (
                <span className={styles.chip} style={{
                  color: revDiff >= 0 ? '#1A7F37' : '#CF222E',
                  background: revDiff >= 0 ? 'rgba(26,127,55,0.07)' : 'rgba(207,34,46,0.07)',
                  borderColor: revDiff >= 0 ? 'rgba(26,127,55,0.15)' : 'rgba(207,34,46,0.15)',
                }}>
                  {revDiff >= 0 ? '▲' : '▼'} 前月比 {revDiff >= 0 ? '+' : ''}¥{(revDiff / 10000).toFixed(0)}万
                </span>
              )}
            </div>
          )}
        </div>
        {/* ビュー切り替えタブ */}
        <div className={styles.viewTabs}>
          {VIEWS.map(v => (
            <button
              key={v.key}
              className={`${styles.viewTab} ${view === v.key ? styles.viewTabActive : ''}`}
              onClick={() => setView(v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* グラフ本体 */}
      {!hasData ? (
        <div className={styles.empty}>「次の月へ」を押すとグラフが表示されます</div>
      ) : (
        <div className={styles.chartArea}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 52, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0969DA" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0969DA" stopOpacity={0.5} />
                </linearGradient>
                <linearGradient id="gradCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E3B341" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#E3B341" stopOpacity={0.5} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#EAEEF2" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: '#57606A', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={36}
              />
              {/* 左Y軸: 金額 */}
              <YAxis
                yAxisId="left"
                tickFormatter={formatYenShort}
                tick={{ fill: '#57606A', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              {/* 右Y軸: ARR */}
              {(view === 'all') && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={formatYenShort}
                  tick={{ fill: '#CF222E', fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  label={{ value: 'ARR', position: 'insideTopRight', fill: '#CF222E', fontSize: 9, dx: 8 }}
                />
              )}

              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 11, color: '#57606A', paddingTop: 4 }}
                iconType="circle"
                iconSize={8}
              />

              {/* ゼロライン（損益が赤/緑分岐する基準） */}
              <ReferenceLine yAxisId="left" y={0} stroke="#D0D7DE" strokeWidth={1} />

              {/* 収益・費用 棒グラフ */}
              {view !== 'profit' && (
                <Bar yAxisId="left" dataKey="revenue" name="月次収益" fill="url(#gradRev)" radius={[3, 3, 0, 0]} maxBarSize={32} animationDuration={600} />
              )}
              {view !== 'profit' && (
                <Bar yAxisId="left" dataKey="cost" name="人件費" fill="url(#gradCost)" radius={[3, 3, 0, 0]} maxBarSize={32} animationDuration={600} />
              )}

              {/* 損益 折れ線 */}
              {(view === 'all' || view === 'profit') && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="profit"
                  name="損益"
                  stroke="#1A7F37"
                  strokeWidth={2.5}
                  dot={{ fill: '#1A7F37', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  animationDuration={800}
                />
              )}

              {/* ARR 折れ線（右Y軸） */}
              {view === 'all' && (
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="arr"
                  name="ARR"
                  stroke="#CF222E"
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  dot={false}
                  animationDuration={800}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default PnLChart;
