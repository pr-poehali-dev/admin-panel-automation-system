import { useState } from 'react';
import { useAuth, demoAccounts } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const LoginScreen = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('admin@techfix.ru');
  const [password, setPassword] = useState('admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await login(email, password);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Добро пожаловать в TechFix!');
    }
  };

  const quick = (mail: string, pass: string) => {
    setEmail(mail);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center glow mb-4">
            <Icon name="Wrench" className="text-primary-foreground" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-wide">
            Tech<span className="gradient-text">Fix</span> АИС
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Система управления ремонтом техники</p>
        </div>

        <Card className="glass border-border/50">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Icon name="Mail" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" placeholder="you@techfix.ru" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" placeholder="••••••" />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition">
                <Icon name={loading ? 'Loader2' : 'LogIn'} size={18} className={loading ? 'mr-2 animate-spin' : 'mr-2'} />
                {loading ? 'Вход...' : 'Войти в систему'}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-3 text-center">Демо-доступы для проверки ролей</p>
              <div className="grid gap-2">
                {Object.values(demoAccounts).map((a) => (
                  <button
                    key={a.email}
                    onClick={() => quick(a.email, a.password)}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/40 px-3 py-2 text-left hover:border-primary/50 transition"
                  >
                    <div>
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.email}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">{a.role}</Badge>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-6">© 2026 TechFix · Сервисный центр</p>
      </div>
    </div>
  );
};

export default LoginScreen;