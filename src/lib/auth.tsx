import { createContext, useContext, useState, ReactNode } from 'react';
import { Role } from './types';

interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const demoAccounts: Record<string, AuthUser & { password: string }> = {
  'admin@techfix.ru': { name: 'Алексей Воронов', email: 'admin@techfix.ru', role: 'admin', password: 'admin' },
  'manager@techfix.ru': { name: 'Марина Соколова', email: 'manager@techfix.ru', role: 'manager', password: 'manager' },
  'master@techfix.ru': { name: 'Дмитрий Кузнецов', email: 'master@techfix.ru', role: 'master', password: 'master' },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, password: string) => {
    const acc = demoAccounts[email.trim().toLowerCase()];
    if (acc && acc.password === password) {
      const { password: _pw, ...rest } = acc;
      setUser(rest);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { demoAccounts };
