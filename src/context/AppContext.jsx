import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [portfolio, setPortfolio] = useState(JSON.parse(localStorage.getItem('portfolio')) || []);

  function login(payload) {
    setUser(payload);
    localStorage.setItem('user', JSON.stringify(payload));
  }
  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }
  function addStock(stock) {
    const updated = [...portfolio, stock];
    setPortfolio(updated);
    localStorage.setItem('portfolio', JSON.stringify(updated));
  }
  function removeStock(symbol) {
    const updated = portfolio.filter(s => s.symbol !== symbol);
    setPortfolio(updated);
    localStorage.setItem('portfolio', JSON.stringify(updated));
  }

  return (
    <AppContext.Provider value={{
      user, portfolio, login, logout, addStock, removeStock
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
