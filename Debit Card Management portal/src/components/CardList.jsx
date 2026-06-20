import React, { useState } from 'react';
import { useCards } from '../context/CardContext.jsx';
import styles from './CardList.module.css';

export default function CardList({ selectedCardId, onSelectCard }) {
  const { cards, toggleBlockCard, changePin } = useCards();
  const [activeFormId, setActiveFormId] = useState(null);
  const [pinBuffer, setPinBuffer] = useState('');

  const submitPin = (e, id) => {
    e.preventDefault();
    if (pinBuffer.length !== 4 || isNaN(pinBuffer)) return alert("PIN must be a 4-digit number sequence.");
    changePin(id, pinBuffer);
    setActiveFormId(null);
    setPinBuffer('');
    alert("PIN code access parameter re-calculated safely.");
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Your Managed Debit Cards</h2>
      <div className={styles.stack}>
        {cards.map(c => (
          <div 
            key={c.id} 
            onClick={() => onSelectCard(c.id)} 
            className={`${styles.item} ${selectedCardId === c.id ? styles.selected : ''}`}
          >
            <div className={styles.cardGraphic}>
              <div className={styles.headerRow}>
                <span className={styles.typeTag}>{c.type}</span>
                <span className={`${styles.statusTag} ${styles[c.status.toLowerCase()]}`}>{c.status}</span>
              </div>
              <p className={styles.number}>•••• •••• •••• {c.number.slice(-4)}</p>
              <p className={styles.holder}>{c.holder}</p>
              <div className={styles.chip}>📟</div>
            </div>

            <div className={styles.actions} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => toggleBlockCard(c.id)} 
                className={`${styles.btn} ${c.status === 'Active' ? styles.btnDanger : styles.btnSuccess}`}
              >
                {c.status === 'Active' ? '🔒 Block Card' : '🔓 Unblock'}
              </button>
              <button 
                onClick={() => setActiveFormId(activeFormId === c.id ? null : c.id)} 
                className={`${styles.btn} ${styles.btnDark}`}
              >
                🔢 Change PIN (Mock)
              </button>
            </div>

            {activeFormId === c.id && (
              <form onSubmit={e => submitPin(e, c.id)} className={styles.inlineForm} onClick={e => e.stopPropagation()}>
                <input 
                  type="password" maxLength="4" placeholder="Enter New PIN" 
                  value={pinBuffer} onChange={e => setPinBuffer(e.target.value)} 
                  className={styles.inlineInput} 
                />
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Save</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}