import React, { useState } from 'react';
import { CardProvider, useCards } from './context/CardContext.jsx';
import LoginView from './components/LoginView.jsx';
import CardList from './components/CardList.jsx';
import UsageLimits from './components/UsageLimits.jsx';
import ActivateForm from './components/ActivateForm.jsx';
import AlertSettings from './components/AlertSettings.jsx';
import HistoryLog from './components/HistoryLog.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import TransactionHistory from './components/TransactionHistory.jsx';
import styles from './App.module.css';

function MainUserDashboard() {
  const { user, logoutUser, cards } = useCards();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCardId, setSelectedCardId] = useState(1);
  
  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  // Secure User Session Guard
  if (!user) {
    return <LoginView />;
  }

  return (
    <div className={styles.portalContainer}>
      {/* 🛠️ Advanced Left Navigation Sidebar */}
      <aside className={styles.sidebar}>
        <div>
          {/* Profile Card Block */}
          <div className={styles.profileSection}>
            <div className={styles.avatar}>👤</div>
            <div>
              <p className={styles.profileName}>{user.name}</p>
              <div className={styles.tierContainer}>
                <span className={styles.profileRole}>Client Account</span>
                <span className={styles.premiumBadge}>PRO</span>
              </div>
            </div>
          </div>

          {/* Financial Assets Summary */}
          <div className={styles.balanceWidget}>
            <div className={styles.balanceMeta}>COMBINED NET ASSETS</div>
            <div className={styles.balanceAmount}>$48,914.50</div>
            <div className={styles.accountCount}>📦 Active Cards: {cards.length}</div>
          </div>
          
          {/* Menu Actions Group 1: Main Management */}
          <div className={styles.menuLabel}>Main Management</div>
          <nav className={styles.navMenu}>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`${styles.navBtn} ${activeTab === 'dashboard' ? styles.active : ''}`}
            >
              <span className={styles.icon}>💳</span> Cards Overview
            </button>
            
            {/* ✨ NEW STANDALONE MENU ROUTE FOR TRANSACTIONS */}
            <button 
              onClick={() => setActiveTab('transactions')} 
              className={`${styles.navBtn} ${activeTab === 'transactions' ? styles.active : ''}`}
            >
              <span className={styles.icon}>📊</span> Recent Transactions
            </button>

            <button 
              onClick={() => setActiveTab('activate')} 
              className={`${styles.navBtn} ${activeTab === 'activate' ? styles.active : ''}`}
            >
              <span className={styles.icon}>加</span> Activate Card
            </button>
          </nav>

          {/* Menu Actions Group 2: Security */}
          <div className={styles.menuLabel}>Security & Privacy</div>
          <nav className={styles.navMenu}>
            <button 
              onClick={() => setActiveTab('alerts')} 
              className={`${styles.navBtn} ${activeTab === 'alerts' ? styles.active : ''}`}
            >
              <span className={styles.icon}>🛡️</span> Security Center
            </button>
          </nav>

          {/* 24/7 Hotline Priority Module */}
          <div className={styles.menuLabel}>24/7 Priority Support</div>
          <div className={styles.supportHotlineBox}>
            <div className={styles.hotlineHeader}>
              <span className={styles.pulseDot}></span> Urgent Direct Hotline
            </div>
            <p className={styles.phoneString}>📞 1-800-555-APEX</p>
            <p className={styles.supportDisclaimer}>Verification tokens are processed inside secure chat relays automatically.</p>
          </div>
        </div>
        
        {/* Sidebar Footer Controls Wrapper */}
        <div className={styles.sidebarBottom}>
          <button 
            onClick={() => alert("Connecting to automated tech support systems...")} 
            className={styles.supportBtn}
          >
            <span className={styles.icon}>💬</span> Live Chat Help
          </button>
          <button onClick={logoutUser} className={styles.logoutBtn}>
            <span className={styles.logoutIcon}>➔</span> Disconnect Session
          </button>
        </div>
      </aside>

      {/* Primary Workspace Content Viewport Frame */}
      <main className={styles.mainViewport}>
        
        {/* VIEW 1: Dashboard Home Layout */}
        {activeTab === 'dashboard' && (
          <div className={styles.dashboardGrid}>
            <div className={styles.leftColumn}>
              <CardList selectedCardId={selectedCardId} onSelectCard={setSelectedCardId} />
              {selectedCard && <UsageLimits card={selectedCard} />}
            </div>
            <div className={styles.rightColumn}>
              <HistoryLog />
            </div>
          </div>
        )}
        
        {/* VIEW 2: Dedicated Standalone Full-Page Transactions Screen */}
        {activeTab === 'transactions' && (
          <div className={styles.fullPageWidthWrapper}>
            {selectedCard ? (
              <TransactionHistory activeCardNumber={selectedCard.number} />
            ) : (
              <div className={styles.fallbackAlert}>Please select or activate a debit card to view transaction analytics history.</div>
            )}
          </div>
        )}
        
        {/* VIEW 3: Register / Activate New Assets Form */}
        {activeTab === 'activate' && (
          <div className={styles.centeredWrapper}>
            <ActivateForm onSuccess={() => setActiveTab('dashboard')} />
          </div>
        )}
        
        {/* VIEW 4: Security Control Matrix Panels */}
        {activeTab === 'alerts' && (
          <div className={styles.securityTabStack}>
            <AlertSettings />
            <AdminPanel />
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CardProvider>
      <MainUserDashboard />
    </CardProvider>
  );
}