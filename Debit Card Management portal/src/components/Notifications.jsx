import React from 'react';
import { useCards } from '../context/CardContext';
import styles from './Notifications.module.css';

export default function Notifications() {
  const { history } = useCards();
  const activeAlertsStream = history.slice(0, 3);

  return (
    <div className={styles.notifyPanel}>
      <h2 className={styles.notifyTitle}>Live Transaction Alerts</h2>
      <div className={styles.streamStack}>
        {activeAlertsStream.map(n => (
          <div key={n.id} className={styles.toastElement}>{n.action}</div>
        ))}
      </div>
    </div>
  );
}