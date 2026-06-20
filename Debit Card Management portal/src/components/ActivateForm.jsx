import React, { useState } from 'react';
import { useCards } from '../context/CardContext';
import styles from './ActivateForm.module.css';

export default function ActivateForm({ onSuccess }) {
  const { addCard } = useCards();
  const [form, setForm] = useState({ number: '', holder: '', type: 'Visa', pin: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.number.length !== 16 || isNaN(form.number)) return alert("Registration format array anomaly. Specify 16 variables.");
    addCard(form);
    onSuccess();
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formPanel}>
        <h2 className={styles.formTitle}>Activate & Register Card</h2>
        <form onSubmit={onSubmit} className={styles.fieldsGrid}>
          <div className={styles.formGroup}>
            <label>Card Network Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className={styles.controlField}>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Amex">American Express</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>16-Digit Card Number</label>
            <input type="text" maxLength="16" placeholder="4111222233334444" value={form.number} onChange={e => setForm({...form, number: e.target.value})} className={`${styles.controlField} ${styles.fontMono}`} required />
          </div>
          <div className={styles.formGroup}>
            <label>Cardholder Name</label>
            <input type="text" placeholder="JOHN DOE" value={form.holder} onChange={e => setForm({...form, holder: e.target.value.toUpperCase()})} className={styles.controlField} required />
          </div>
          <div className={styles.formGroup}>
            <label>Setup Initial PIN</label>
            <input type="password" maxLength="4" placeholder="••••" value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} className={styles.controlField} required />
          </div>
          <button type="submit" className={styles.submitBtn}>Activate Core Operations</button>
        </form>
      </div>
    </div>
  );
}