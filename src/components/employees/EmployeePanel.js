import React, { useState } from 'react';
import EmployeeCard from './EmployeeCard';
import styles from './EmployeePanel.module.css';

function EmployeePanel({ employees, onHire, projects = [] }) {
  const [tab, setTab] = useState('available');

  const available = employees.filter(e => e.status === 'available');
  const hired = employees.filter(e => e.status === 'hired');
  const totalCost = hired.reduce((sum, e) => sum + e.monthlyCost, 0);
  const list = tab === 'available' ? available : hired;

  return (
    <div className={`${styles.wrap} panel`}>
      <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>👤 社員採用</span>
        <span style={{ fontSize: 10, fontWeight: 400, color: '#57606A', letterSpacing: 0 }}>採用して案件を受注できる力を得よう</span>
      </div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'available' ? styles.active : ''}`}
          onClick={() => setTab('available')}
        >
          採用可能 <span className={styles.badge}>{available.length}</span>
        </button>
        <button
          className={`${styles.tab} ${tab === 'hired' ? styles.active : ''}`}
          onClick={() => setTab('hired')}
        >
          採用済み <span className={styles.badge}>{hired.length}</span>
        </button>
      </div>
      {tab === 'hired' && hired.length > 0 && (
        <div className={styles.costSummary}>
          月次人件費合計: <span>¥{(totalCost / 10000).toFixed(0)}万</span>
        </div>
      )}
      <div className={styles.list}>
        {list.length === 0 ? (
          <div className={styles.empty}>
            {tab === 'available' ? '採用可能な社員はいません' : 'まだ社員を採用していません'}
          </div>
        ) : (
          list.map(e => (
            <EmployeeCard key={e.id} employee={e} onHire={onHire} currentTotalCost={totalCost} availableProjects={projects} />
          ))
        )}
      </div>
    </div>
  );
}

export default EmployeePanel;
