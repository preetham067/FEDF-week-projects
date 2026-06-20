import React from 'react';
import { useCards } from '../context/CardContext.jsx';
import styles from './UsageLimits.module.css';

export default function UsageLimits({ card }) {
  const { updateLimits, logAction } = useCards();

  const handleToggle = (field, val) => {
    updateLimits(card.id, { [field]: val });
    logAction(`Configuration modified: Updated operational limit channel [${field}].`);
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Usage Controls & Limits</h2>
      <p className={styles.sub}>Adjust card boundary parameters for target: •••• {card.number.slice(-4)}</p>
      
      <div className={styles.row}>
        <div>
          <p className={styles.heading}>E-Commerce / Online Usage</p>
          <p className={styles.caption}>Allow card parsing for web payment portals</p>
        </div>
        <input type="checkbox" checked={card.onlineUsage} onChange={e => handleToggle('onlineUsage', e.target.checked)} className={styles.switch} />
      </div>

      <div className={styles.row}>
        <div>
          <p className={styles.heading}>International Operations</p>
          <p className={styles.caption}>Allow foreign cross-border processing elements</p>
        </div>
        <input type="checkbox" checked={card.internationalUsage} onChange={e => handleToggle('internationalUsage', e.target.checked)} className={styles.switch} />
      </div>

      <div className={styles.sliderGroup}>
        <div className={styles.meta}>
          <span>Domestic Daily Ceiling</span>
          <span className={styles.val}>${card.domesticLimit}</span>
        </div>
        <input type="range" min="0" max="10000" step="500" value={card.domesticLimit} onChange={e => updateLimits(card.id, { domesticLimit: Number(e.target.value) })} onMouseUp={() => logAction('Adjusted regional processing boundary constraints.')} className={styles.slider} />
      </div>

      <div className={styles.sliderGroup}>
        <div className={styles.meta}>
          <span>International Daily Ceiling</span>
          <span className={styles.val}>${card.internationalLimit}</span>
        </div>
        <input type="range" min="0" max="5000" step="250" value={card.internationalLimit} onChange={e => updateLimits(card.id, { internationalLimit: Number(e.target.value) })} onMouseUp={() => logAction('Adjusted cross-border constraint variables.')} className={styles.slider} disabled={!card.internationalUsage} />
      </div>
    </div>
  );
}