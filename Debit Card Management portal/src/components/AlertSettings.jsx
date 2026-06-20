import React from 'react';
import { useCards } from '../context/CardContext';
import styles from './AlertSettings.module.css';

export default function AlertSettings() {
  const { alertSettings, toggleAlertSetting } = useCards();

  return (
    <div className={styles.alertSettingsPanel}>
      <h2 className={styles.alertTitle}>Transaction Security Alerts</h2>
      <p className={styles.alertDesc}>Configure how system communications dispatches updates.</p>
      <div className={styles.settingsStack}>
        {Object.keys(alertSettings).map(key => (
          <div key={key} className={styles.settingRow}>
            <span className={styles.channelName}>{key} Realtime Alerts Channel</span>
            <button onClick={() => toggleAlertSetting(key)} className={`${styles.toggleBtn} ${alertSettings[key] ? styles.on : styles.off}`}>
              {alertSettings[key] ? 'Active' : 'Disabled'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}