import React from 'react';
import styles from './TransactionHistory.module.css';

// Rich Mock Data Set representing live client card authorizations
const mockLedger = [
  { id: 'TXN-9982', date: 'Jun 15, 2026', merchant: 'Amazon Web Services', category: 'Infrastructure', amount: -142.50, status: 'Settled' },
  { id: 'TXN-9941', date: 'Jun 14, 2026', merchant: 'Starbucks Coffee', category: 'Dining', amount: -6.80, status: 'Settled' },
  { id: 'TXN-9832', date: 'Jun 12, 2026', merchant: 'Apple Store Refund', category: 'Electronics', amount: 1200.00, status: 'Refunded' },
  { id: 'TXN-9711', date: 'Jun 10, 2026', merchant: 'Uber Rides Inc', category: 'Transport', amount: -24.15, status: 'Settled' },
  { id: 'TXN-9604', date: 'Jun 08, 2026', merchant: 'Target Superstore', category: 'Groceries', amount: -89.40, status: 'Settled' }
];

export default function TransactionHistory({ activeCardNumber }) {
  // Extract trailing digits for clean rendering labels
  const simplifiedCardToken = activeCardNumber ? activeCardNumber.slice(-4) : '4321';

  return (
    <div className={styles.historyPanel}>
      <div className={styles.panelHeader}>
        <div>
          <h2 className={styles.panelTitle}>Recent Retail Transactions</h2>
          <p className={styles.panelSubtitle}>
            Live clearing authorizations ledger for card ending: <strong>•••• {simplifiedCardToken}</strong>
          </p>
        </div>
        <span className={styles.liveIndicator}>● Live Stream</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.transactionTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant Description</th>
              <th>Category</th>
              <th>Reference ID</th>
              <th>Status</th>
              <th className={styles.alignRight}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockLedger.map((txn) => {
              const isRefund = txn.amount > 0;
              return (
                <tr key={txn.id} className={styles.tableRow}>
                  <td className={styles.dateCell}>{txn.date}</td>
                  <td>
                    <div className={styles.merchantContainer}>
                      <span className={styles.merchantIcon}>
                        {isRefund ? '📥' : '🛒'}
                      </span>
                      <span className={styles.merchantName}>{txn.merchant}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{txn.category}</span>
                  </td>
                  <td className={styles.monoToken}>{txn.id}</td>
                  <td>
                    <span className={`${styles.statusPill} ${styles[txn.status.toLowerCase()]}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className={`${styles.amountCell} ${isRefund ? styles.refund : styles.charge}`}>
                    {isRefund ? `+$${txn.amount.toFixed(2)}` : `-$${Math.abs(txn.amount).toFixed(2)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}