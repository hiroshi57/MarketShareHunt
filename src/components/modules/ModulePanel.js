import React, { useState } from 'react';
import styles from './ModulePanel.module.css';

const LV_NAMES = ['', 'Starter', 'Growth', 'Scale', 'Expert', 'Market Leader'];

function formatCost(n) {
  if (n >= 100000000) return `¥${(n / 100000000).toFixed(0)}億`;
  if (n >= 10000) return `¥${(n / 10000).toFixed(0)}万`;
  return `¥${n}`;
}

function ModuleCard({ moduleDef, moduleState, onUpgrade, cash }) {
  const [showDetail, setShowDetail] = useState(false);
  const currentLv = moduleState.level;
  const isUnlocked = currentLv > 0;
  const isMaxed = currentLv >= 5;
  const nextLv = currentLv + 1;
  const nextLvData = !isMaxed ? moduleDef.levels[nextLv - 1] : null;
  const upgradeCost = nextLvData ? nextLvData.upgradeCost : 0;
  const canAfford = cash >= upgradeCost || upgradeCost === 0;

  const currentLvData = isUnlocked ? moduleDef.levels[currentLv - 1] : null;

  return (
    <div
      className={`${styles.card} ${isUnlocked ? styles.unlocked : styles.locked}`}
      style={{ borderColor: isUnlocked ? moduleDef.color : '#30363D' }}
    >
      <div className={styles.cardTop} onClick={() => setShowDetail(v => !v)}>
        <div className={styles.iconWrap} style={{ color: moduleDef.color }}>
          {moduleDef.icon}
        </div>
        <div className={styles.info}>
          <div className={styles.name} style={{ color: isUnlocked ? moduleDef.color : '#8B949E' }}>
            {moduleDef.name}
          </div>
          <div className={styles.desc}>{moduleDef.description}</div>
        </div>
        <div className={styles.lvBadge} style={{ background: isUnlocked ? moduleDef.color + '33' : '#30363D', color: isUnlocked ? moduleDef.color : '#555' }}>
          {isUnlocked ? `Lv${currentLv}` : 'LOCKED'}
        </div>
      </div>

      {/* レベルバー */}
      {isUnlocked && (
        <div className={styles.lvBar}>
          {[1,2,3,4,5].map(lv => (
            <div
              key={lv}
              className={`${styles.lvDot} ${lv <= currentLv ? styles.lvDotActive : ''}`}
              style={{ background: lv <= currentLv ? moduleDef.color : '#30363D' }}
              title={LV_NAMES[lv]}
            />
          ))}
          <span className={styles.lvName}>{LV_NAMES[currentLv]}</span>
        </div>
      )}

      {/* 詳細展開 */}
      {showDetail && isUnlocked && currentLvData && (
        <div className={styles.detail}>
          <div className={styles.detailRow}>
            <span>セルフサーブ案件上限</span><span>{currentLvData.selfServeCap}件</span>
          </div>
          <div className={styles.detailRow}>
            <span>エンタープライズ案件上限</span><span>{currentLvData.enterpriseCap}件</span>
          </div>
          <div className={styles.detailRow}>
            <span>PLG自動流入</span><span>{currentLvData.autoInflow}件/ターン</span>
          </div>
          <div className={styles.detailRow}>
            <span>評判スコアボーナス</span><span>+{currentLvData.reputationBonus}</span>
          </div>
          {currentLvData.marketShareBonus && (
            <div className={styles.detailRow}>
              <span>市場シェアボーナス</span><span style={{color:'#3FB950'}}>+{currentLvData.marketShareBonus}%</span>
            </div>
          )}
          {currentLvData.hireDiscount && (
            <div className={styles.detailRow}>
              <span>採用コスト割引</span><span style={{color:'#BC8CFF'}}>{(currentLvData.hireDiscount * 100).toFixed(0)}%OFF</span>
            </div>
          )}
        </div>
      )}

      {/* アップグレードボタン */}
      {!isMaxed && (
        <button
          className={`${styles.upgradeBtn} ${!canAfford ? styles.upgradeBtnDisabled : ''}`}
          onClick={() => canAfford && onUpgrade(moduleDef.id)}
          disabled={!canAfford}
          style={{ borderColor: moduleDef.color, color: canAfford ? moduleDef.color : '#555' }}
        >
          {isUnlocked
            ? `Lv${nextLv}へアップグレード — ${formatCost(upgradeCost)}`
            : `解放する — ${formatCost(upgradeCost)}`}
          {!canAfford && ' (資金不足)'}
        </button>
      )}
      {isMaxed && (
        <div className={styles.maxBadge} style={{ color: moduleDef.color }}>
          ★ Market Leader — 最高レベル達成
        </div>
      )}
    </div>
  );
}

function ModulePanel({ modules, moduleDefs, onUpgrade, cash }) {
  const [isOpen, setIsOpen] = useState(false);

  const cashLabel = cash >= 100000000
    ? `¥${(cash / 100000000).toFixed(1)}億`
    : `¥${(cash / 10000).toFixed(0)}万`;

  const unlockedCount = modules.filter(m => m.level > 0).length;

  return (
    <div className={`${styles.wrap} panel`} style={{ padding: '10px 14px' }}>
      {/* 折りたたみヘッダー */}
      <div
        onClick={() => setIsOpen(v => !v)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 18, height: 18, background: 'linear-gradient(135deg,#00B4D8,#0077B6)',
            borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 900, color: '#fff',
          }}>H</div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#0077B6' }}>HARNESS MODULES</span>
          <span style={{
            fontSize: 8, background: 'rgba(0,119,182,0.1)', border: '1px solid rgba(0,119,182,0.25)',
            borderRadius: 3, padding: '1px 5px', color: '#0077B6', letterSpacing: '0.08em', fontWeight: 700
          }}>PLG + ENTERPRISE</span>
          <span style={{
            fontSize: 9, color: '#1A7F37', fontWeight: 700,
            background: 'rgba(26,127,55,0.1)', border: '1px solid rgba(26,127,55,0.25)',
            borderRadius: 3, padding: '1px 5px',
          }}>{unlockedCount}/{moduleDefs.length} 解放済み</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: '#1A7F37', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>CASH {cashLabel}</span>
          <span style={{ fontSize: 12, color: '#57606A', transform: isOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
        </div>
      </div>

      {/* 展開コンテンツ */}
      {isOpen && (
        <div className={styles.list} style={{ marginTop: 10 }}>
          {moduleDefs.map(def => {
            const state = modules.find(m => m.id === def.id);
            return (
              <ModuleCard
                key={def.id}
                moduleDef={def}
                moduleState={state}
                onUpgrade={onUpgrade}
                cash={cash}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ModulePanel;
