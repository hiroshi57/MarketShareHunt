import styles from './Header.module.css';

function Header({ playerCompany, currentTurn, currentMonthLabel, reputationScore, hiredCount, contractedCount, cash, arr = 0, nrr = 100, plgRate = 0, roomId, isHost }) {
  const cashLabel = cash >= 100000000
    ? `¥${(cash / 100000000).toFixed(1)}億`
    : `¥${(cash / 10000).toFixed(0)}万`;

  const arrLabel = arr >= 100000000
    ? `¥${(arr / 100000000).toFixed(1)}億`
    : `¥${(arr / 10000).toFixed(0)}万`;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>H</div>
        <div className={styles.logoBlock}>
          <span className={styles.logoText}>Harness <span className={styles.logoSub}>MarketShareHunt</span></span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span className={styles.logoBadge}>PLG + Enterprise</span>
            {roomId && (
              <span className={styles.logoBadge} style={{ color: '#E3B341', borderColor: 'rgba(227,179,65,0.3)', background: 'rgba(227,179,65,0.1)' }}>
                ROOM: {roomId}{isHost ? ' ★HOST' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Harness KPI群 */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiItem}>
          <span className={styles.kpiLabel}>ARR</span>
          <span className={styles.kpiValueGreen}>{arrLabel}</span>
        </div>
        <div className={styles.kpiDivider} />
        <div className={styles.kpiItem}>
          <span className={styles.kpiLabel}>NRR</span>
          <span className={nrr >= 100 ? styles.kpiValueGreen : styles.kpiValueRed}>{nrr}%</span>
        </div>
        <div className={styles.kpiDivider} />
        <div className={styles.kpiItem}>
          <span className={styles.kpiLabel}>PLG Rate</span>
          <span className={styles.kpiValueBlue}>{plgRate}%</span>
        </div>
        <div className={styles.kpiDivider} />
        <div className={styles.kpiItem}>
          <span className={styles.kpiLabel}>CASH</span>
          <span className={styles.kpiValueGreen}>{cashLabel}</span>
        </div>
      </div>

      {/* ゲームメタ情報 */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>PERIOD</span>
          <span className={styles.metaValue}>{currentMonthLabel}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>COMPANY</span>
          <span className={styles.metaValueAccent}>{playerCompany}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>HEADCOUNT</span>
          <span className={styles.metaValue}>{hiredCount}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>DEALS</span>
          <span className={styles.metaValue}>{contractedCount}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>REP SCORE</span>
          <span className={styles.metaValueRep}>{reputationScore}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
