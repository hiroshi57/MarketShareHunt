import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './PnLCard.module.css';

function formatYen(value) {
  if (Math.abs(value) >= 100000000) return `¥${(value / 100000000).toFixed(2)}億`;
  if (Math.abs(value) >= 10000) return `¥${(value / 10000).toFixed(0)}万`;
  return `¥${value.toLocaleString()}`;
}

// type: 'arr' | 'mrr' | 'nrr' | 'revenue' | 'cost' | 'profit'
const TYPE_CONFIG = {
  arr:     { label: 'ARR',     sublabel: 'Annual Recurring Revenue', color: '#00B4D8', border: 'rgba(0,180,216,0.3)' },
  mrr:     { label: 'MRR',     sublabel: 'Monthly Recurring Revenue', color: '#3FB950', border: 'rgba(63,185,80,0.3)' },
  nrr:     { label: 'NRR',     sublabel: 'Net Revenue Retention',     color: '#E3B341', border: 'rgba(227,179,65,0.3)' },
  revenue: { label: 'REVENUE', sublabel: '月次収益',  color: '#4A90E2', border: 'rgba(74,144,226,0.3)' },
  cost:    { label: 'COST',    sublabel: '月次人件費', color: '#E3B341', border: 'rgba(227,179,65,0.3)' },
  profit:  { label: 'PROFIT',  sublabel: null,         color: null,      border: null },
};

function PnLCard({ label, value, type, secondaryValue = null, secondaryLabel = null }) {
  const displayValue = useCountUp(value, 900);
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.revenue;

  const color = type === 'profit'
    ? (value >= 0 ? '#3FB950' : '#F85149')
    : cfg.color;
  const borderColor = type === 'profit'
    ? (value >= 0 ? 'rgba(63,185,80,0.3)' : 'rgba(248,81,73,0.3)')
    : cfg.border;
  const sublabel = cfg.sublabel || (value >= 0 ? 'Profitable' : 'Burning');

  const isPercent = type === 'nrr';

  return (
    <div className={`${styles.card} panel`} style={{ borderTop: `2px solid ${borderColor || 'transparent'}` }}>
      <div className={styles.topRow}>
        <span className={styles.label} style={{ color: color }}>{cfg.label}</span>
        {secondaryValue != null && (
          <span className={styles.secondary}>{secondaryLabel} <strong style={{ color }}>{secondaryValue}</strong></span>
        )}
      </div>
      <div className={styles.value} style={{ color }}>
        {type === 'profit' && value > 0 ? '+' : ''}
        {isPercent ? `${displayValue}%` : formatYen(displayValue)}
      </div>
      <div className={styles.subLabel}>{sublabel}</div>
    </div>
  );
}

export default PnLCard;
