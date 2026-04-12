import React from 'react';
import styles from './TurnButton.module.css';

function TurnButton({ onNextTurn, isAnimating, currentTurn }) {
  return (
    <div className={styles.footer}>
      <div className={styles.turnInfo}>
        <span style={{ color: '#0969DA', fontWeight: 800 }}>TURN {currentTurn}</span>
        {' — '}
        {isAnimating ? '集計中...' : '① 社員を採用 → ② 案件を受注 → ③ 下のボタンで月を進める'}
      </div>
      <button
        className={`${styles.btn} ${isAnimating ? styles.btnLoading : ''}`}
        onClick={onNextTurn}
        disabled={isAnimating}
      >
        {isAnimating ? (
          <span className={styles.spinner}>処理中...</span>
        ) : (
          '次の月へ ▶'
        )}
      </button>
    </div>
  );
}

export default TurnButton;
