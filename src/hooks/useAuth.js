import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  function login(form) {
    // Simulate backend login (replace with real API later)
    localStorage.setItem('user', JSON.stringify(form));
    setUser(form);
  }

  function logout() {
    localStorage.removeItem('user');
    setUser(null);
  }

  return { user, login, logout };
}
