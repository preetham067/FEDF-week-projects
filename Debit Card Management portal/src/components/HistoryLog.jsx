import React from 'react';
import { useCards } from '../context/CardContext.jsx';
import styles from './HistoryLog.module.css';

export default function HistoryLog() {
  const { history } = useCards();

  const downloadCSV = () => {
    const tableHeaders = 'ID,Operation Event Summary,Clock Timestamp\n';
    const rowPayload = history.map(h => `${h.id},"${h.action}",${h.timestamp}`).join('\n');
    const blob = new Blob([tableHeaders + rowPayload], { type: 'text/csv' });
    const localAnchor = document.createElement('a');
    localAnchor.href = window.URL.createObjectURL(blob);
    localAnchor.download = 'user_portal_audit_history.csv';
    localAnchor.click();
  };

  return (
    <div className={styles.logBox}>
      <div className={styles.header}>
        <h2 className={styles.title}>Security Action Logs</h2>
        <button onClick={downloadCSV} className={styles.exportBtn}>📥 Export CSV</button>
      </div>
      <div className={styles.scroller}>
        {history.map(item => (
          <div key={item.id} className={styles.record}>
            <p className={styles.text}>{item.action}</p>
            <p className={styles.time}>⏱️ {item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}