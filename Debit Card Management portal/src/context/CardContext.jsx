import React, { createContext, useState, useContext } from 'react';

const CardContext = createContext();

const initialCards = [
  { id: 1, number: '4111222233334321', holder: 'NEELAKESAV RAVURI', status: 'Active', pin: '1234', type: 'Visa', domesticLimit: 2000, internationalLimit: 500, onlineUsage: true, internationalUsage: false },
  { id: 2, number: '5555666677778899', holder: 'NEELAKESAV RAVURI', status: 'Blocked', pin: '5678', type: 'Mastercard', domesticLimit: 5000, internationalLimit: 0, onlineUsage: false, internationalUsage: false }
];

export const CardProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [cards, setCards] = useState(initialCards);
  const [history, setHistory] = useState([
    { id: 1, action: 'Secure end-to-end user terminal session initialized.', timestamp: new Date().toLocaleString() }
  ]);
  const [alertSettings, setAlertSettings] = useState({ email: true, sms: true, push: false });

  const logAction = (action) => {
    setHistory(prev => [{ id: Date.now(), action, timestamp: new Date().toLocaleString() }, ...prev]);
  };

  const loginUser = (username) => {
    setUser({ name: username.toUpperCase(), role: 'Client' });
    logAction(`User ${username} successfully established a secure portal session.`);
  };

  const logoutUser = () => {
    logAction(`User disconnected securely from portal terminal session.`);
    setUser(null);
  };

  const addCard = (newCard) => {
    setCards([...cards, { id: Date.now(), status: 'Active', domesticLimit: 1000, internationalLimit: 0, onlineUsage: true, internationalUsage: false, ...newCard }]);
    logAction(`Activated new user debit card ending in ${newCard.number.slice(-4)}`);
  };

  const toggleBlockCard = (id) => {
    setCards(cards.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c));
    const target = cards.find(c => c.id === id);
    logAction(`Security Lock Changed: Card ending ${target?.number.slice(-4)} state set to ${target?.status === 'Active' ? 'Blocked' : 'Active'}.`);
  };

  const changePin = (id, newPin) => {
    setCards(cards.map(c => c.id === id ? { ...c, pin: newPin } : c));
    logAction(`Mock Core Re-Key: Updated verification access PIN values.`);
  };

  const updateLimits = (id, fields) => {
    setCards(cards.map(c => c.id === id ? { ...c, ...fields } : c));
  };

  const toggleAlertSetting = (key) => {
    setAlertSettings(prev => ({ ...prev, [key]: !prev[key] }));
    logAction(`Notification rules reassigned: Alerts delivery channel [${key}] altered.`);
  };

  return (
    <CardContext.Provider value={{ user, cards, history, alertSettings, loginUser, logoutUser, addCard, toggleBlockCard, changePin, updateLimits, toggleAlertSetting, logAction }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => useContext(CardContext);