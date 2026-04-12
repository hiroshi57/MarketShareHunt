import React from 'react';
import styles from './NewsTicker.module.css';

function NewsTicker({ newsItems }) {
  if (!newsItems || newsItems.length === 0) return null;

  const text = newsItems.map(n => n.text).join('　　　　　');
  const fullText = text + '　　　　　' + text;

  return (
    <div className={styles.ticker}>
      <div className={styles.tickerLabel}>NEWS</div>
      <div className={styles.tickerTrack}>
        <span
          className={styles.tickerText}
          style={{ animationDuration: `${Math.max(fullText.length * 55, 12000)}ms` }}
        >
          {fullText}
        </span>
      </div>
    </div>
  );
}

export default NewsTicker;
