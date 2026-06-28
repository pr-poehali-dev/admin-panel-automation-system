import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiLogin, AuthUser } from './api';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = 'techfix_user';

export const demoAccounts = [
  { name: 'Алексей Воронов', email: 'admin@techfix.ru', role: 'admin', password: 'admin' },
  { name: 'Марина Соколова', email: 'manager@techfix.ru', role: 'manager', password: 'manager' },
  { name: 'Дмитрий Кузнецов', email: 'master@techfix.ru', role: 'master', password: 'master' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    setLoading(true);
    const res = await apiLogin(email, password);
    setLoading(false);
    if ('error' in res) return res.error;
    setUser(res.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
