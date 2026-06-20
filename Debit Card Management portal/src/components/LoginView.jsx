import React, { useState } from 'react';
import { useCards } from '../context/CardContext.jsx';
import styles from './LoginView.module.css';

export default function LoginView() {
  const { loginUser } = useCards();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return alert("Authentication error: Username and Password parameters cannot be empty.");
    }
    // Fires state mutation directly to route layout home
    loginUser(username); 
  };

  return (
    <div className={styles.authWrapper}>
      <div className={`${styles.glowCircle} ${styles.circleOne}`}></div>
      <div className={`${styles.glowCircle} ${styles.circleTwo}`}></div>

      <div className={styles.loginCard}>
        <div className={styles.brandBadge}>
          <span className={styles.bankIcon}>🏦</span> APEX PREMIUM BANKING
        </div>
        
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to securely oversee, freeze, and manage your active personal debit cards.</p>
        
        <form onSubmit={handleAuthSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Online Identity Identifier</label>
            <div className={styles.inputWrapper}>
              <span className={styles.fieldIcon}>👤</span>
              <input 
                id="username"
                type="text" 
                placeholder="Enter username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Security Access Key (PIN / Pass)</label>
            <div className={styles.inputWrapper}>
              <span className={styles.fieldIcon}>🔒</span>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Authenticate Terminal Securely
          </button>
        </form>

        <div className={styles.noticeText}>
          🛡️ End-to-End Advanced AES-256 Bit Encrypted Environment
        </div>
      </div>
    </div>
  );
}