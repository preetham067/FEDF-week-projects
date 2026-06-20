import React from 'react';
import { useCards } from '../context/CardContext.jsx';
import styles from './AdminPanel.module.css';

export default function AdminPanel() {
  const { cards, toggleBlockCard } = useCards();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>System Control Bypass (Simulation)</h2>
        <p className={styles.caption}>Override system card parameters to test block and unblock state responses instantly</p>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.grid}>
          <thead>
            <tr>
              <th>Card Reference</th>
              <th>Status</th>
              <th className={styles.right}>Trigger Override</th>
            </tr>
          </thead>
          <tbody>
            {cards.map(c => (
              <tr key={c.id}>
                <td className={styles.mono}>•••• {c.number.slice(-4)}</td>
                <td>
                  <span className={`${styles.pill} ${styles[c.status.toLowerCase()]}`}>{c.status}</span>
                </td>
                <td className={styles.right}>
                  <button onClick={() => toggleBlockCard(c.id)} className={styles.actionBtn}>Force State Swap</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}