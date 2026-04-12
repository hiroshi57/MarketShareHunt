import React, { useState } from 'react';
import styles from './ProjectCard.module.css';

const DIFFICULTY_LABELS = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];

function ProjectCard({ project, canContract, onContract, hiredEmployees = [], currentTurn = 1 }) {
  const [flash, setFlash] = useState(false);
  const isContracted = project.status === 'contracted';

  const handleContract = () => {
    if (isContracted || !canContract) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
    onContract(project.id);
  };

  // 月次収益（期間按分）
  const monthlyRevenue = Math.round(project.revenue / project.duration);

  // 担当可能な社員（スキルマッチ）
  const matchedEmployees = project.tier === 'enterprise' && project.requiredSkills.length > 0
    ? hiredEmployees.filter(e =>
        e.skills.some(s => project.requiredSkills.includes(s))
      )
    : [];

  // 不足スキル（enterprise案件で社員未採用の場合）
  const hiredSkills = hiredEmployees.flatMap(e => e.skills);
  const missingSkills = project.tier === 'enterprise'
    ? project.requiredSkills.filter(s => !hiredSkills.includes(s))
    : [];

  return (
    <div className={`${styles.card} ${flash ? styles.flash : ''} ${isContracted ? styles.contracted : ''}`}>
      {/* ヘッダー行 */}
      <div className={styles.top}>
        <div className={styles.name}>{project.name}</div>
        <div className={styles.revenueBlock}>
          <div className={styles.revenue}>¥{(monthlyRevenue / 10000).toFixed(0)}万/月</div>
          {project.duration > 1 && (
            <div className={styles.revenueTotal}>計¥{(project.revenue / 10000).toFixed(0)}万</div>
          )}
        </div>
      </div>

      {/* メタ情報 */}
      <div className={styles.meta}>
        <span className={styles.industry}>{project.industry}</span>
        {project.difficulty > 0 && <span className={styles.difficulty}>{DIFFICULTY_LABELS[project.difficulty]}</span>}
        <span className={styles.duration}>📅 {project.duration}ヶ月</span>
        {project.origin === 'news' && <span className={`${styles.origin} ${styles.originNews}`}>NEWS</span>}
        {project.origin === 'seasonal' && <span className={`${styles.origin} ${styles.originSeasonal}`}>季節</span>}
        {project.origin === 'plg' && <span className={`${styles.origin} ${styles.originPlg}`}>PLG</span>}
        {project.tier === 'enterprise' && <span className={`${styles.tier} ${styles.tierEnterprise}`}>Enterprise</span>}
        {project.tier === 'self-serve' && project.origin !== 'plg' && <span className={`${styles.tier} ${styles.tierSelf}`}>Self-Serve</span>}
      </div>

      {/* 受注インパクト preview（未受注時のみ） */}
      {!isContracted && (
        <div className={styles.impact}>
          <div className={styles.impactRow}>
            <span className={styles.impactLabel}>受注すると</span>
            <span className={styles.impactValue}>月次収益 +¥{(monthlyRevenue / 10000).toFixed(0)}万 × {project.duration}ヶ月</span>
          </div>

          {/* Self-Serve: スキル不要の説明 */}
          {project.tier === 'self-serve' && (
            <div className={styles.impactNote}>✓ スキル不要 — 即受注可能</div>
          )}

          {/* Enterprise: 担当社員表示 */}
          {project.tier === 'enterprise' && matchedEmployees.length > 0 && (
            <div className={styles.impactNote} style={{ color: '#3FB950' }}>
              ✓ 担当可: {matchedEmployees.map(e => e.name).join(', ')}
            </div>
          )}

          {/* Enterprise: 不足スキル表示 */}
          {project.tier === 'enterprise' && missingSkills.length > 0 && (
            <div className={styles.missingSkills}>
              <span className={styles.missingLabel}>必要スキル:</span>
              {missingSkills.map((s, i) => (
                <span key={i} className={styles.missingSkill}>{s}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* アクションボタン */}
      {!isContracted && (
        <button
          className={`${styles.btn} ${!canContract ? styles.btnDisabled : ''}`}
          onClick={handleContract}
          disabled={!canContract}
          title={!canContract ? '必要なスキルを持つ社員を採用してください' : ''}
        >
          {canContract ? `受注する (+¥${(monthlyRevenue / 10000).toFixed(0)}万/月)` : `社員が必要 — スキル不足`}
        </button>
      )}
      {isContracted && (() => {
        const elapsed = project.contractedAtTurn != null ? currentTurn - project.contractedAtTurn : 0;
        const remaining = Math.max(project.duration - elapsed, 0);
        return (
          <div className={styles.statusBadge}>
            ✓ 受注済み — ¥{(monthlyRevenue / 10000).toFixed(0)}万/月
            {remaining > 0
              ? <span style={{ color: '#8B949E', fontWeight: 400, marginLeft: 6 }}>残り{remaining}ヶ月</span>
              : <span style={{ color: '#F85149', fontWeight: 700, marginLeft: 6 }}>完了</span>
            }
          </div>
        );
      })()}
    </div>
  );
}

export default ProjectCard;
