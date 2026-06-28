import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import StatusBadge from '../StatusBadge';
import {
  mockOrders, mockMasters, mockParts, mockReports,
} from '@/lib/mockData';
import { OrderStatus } from '@/lib/types';

const stats = [
  { label: 'Активных заказов', value: '34', icon: 'ClipboardList', trend: '+12%', color: 'text-primary' },
  { label: 'Выручка за месяц', value: '487 600 ₽', icon: 'Wallet', trend: '+8%', color: 'text-emerald-400' },
  { label: 'Клиентов в базе', value: '1 248', icon: 'Users', trend: '+24', color: 'text-accent' },
  { label: 'Свободных мастеров', value: '2', icon: 'Wrench', trend: 'из 5', color: 'text-amber-400' },
];

const statusFlow: OrderStatus[] = ['new', 'diagnostics', 'repair', 'waiting', 'done', 'issued'];
const statusCounts: Record<string, number> = { new: 8, diagnostics: 6, repair: 11, waiting: 5, done: 3, issued: 1 };

const DashboardSection = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const t = setTimeout(() => setProgress(72), 200); return () => clearTimeout(t); }, []);

  const maxLoad = Math.max(...mockMasters.map((m) => m.activeOrders), 1);
  const lowStock = mockParts.filter((p) => p.stock < p.minStock);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold tracking-wide">Панель управления</h2>
        <p className="text-sm text-muted-foreground">Сводка по сервисному центру TechFix на 28 июня 2026</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="relative overflow-hidden group hover:border-primary/40 transition">
            <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-primary/5 group-hover:bg-primary/10 transition" />
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name={s.icon} size={20} className={s.color} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{s.trend}</span>
              </div>
              <p className="text-2xl font-display font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-lg">
              <Icon name="Activity" size={18} className="text-primary" /> Воронка статусов заказов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {statusFlow.map((st) => {
              const count = statusCounts[st];
              const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
              return (
                <div key={st} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <StatusBadge value={st} />
                    <span className="font-medium text-muted-foreground">{count} заказов</span>
                  </div>
                  <Progress value={(count / total) * 100} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-lg">
              <Icon name="Target" size={18} className="text-emerald-400" /> План на месяц
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
              </svg>
              <div className="absolute text-center">
                <p className="text-3xl font-display font-bold">{progress}%</p>
                <p className="text-xs text-muted-foreground">выполнено</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">142 из 197 заказов закрыто</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-lg">
              <Icon name="BarChart3" size={18} className="text-accent" /> Загрузка мастеров
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="load">
              <TabsList className="mb-4">
                <TabsTrigger value="load">Загрузка</TabsTrigger>
                <TabsTrigger value="rating">Рейтинг</TabsTrigger>
              </TabsList>
              <TabsContent value="load" className="space-y-4">
                {mockMasters.map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 shrink-0">
                      <AvatarFallback className="text-xs bg-secondary">{m.name.split(' ').map((w) => w[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium truncate">{m.name}</span>
                        <StatusBadge value={m.status} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={(m.activeOrders / maxLoad) * 100} className="h-1.5" />
                        <span className="text-xs text-muted-foreground w-16 text-right">{m.activeOrders} зак.</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="rating" className="space-y-3">
                {[...mockMasters].sort((a, b) => b.rating - a.rating).map((m, i) => (
                  <div key={m.id} className="flex items-center gap-3 rounded-lg bg-secondary/40 px-3 py-2">
                    <span className="w-6 h-6 rounded-md gradient-brand text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm font-medium flex-1">{m.name}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold">
                      <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />{m.rating.toFixed(1)}
                    </span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-amber-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-display flex items-center gap-2 text-base">
                <Icon name="TriangleAlert" size={16} className="text-amber-400" /> Заканчиваются запчасти
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="truncate text-muted-foreground">{p.name}</span>
                  <span className="text-red-400 font-medium shrink-0 ml-2">{p.stock} шт</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-display flex items-center gap-2 text-base">
                <Icon name="History" size={16} className="text-primary" /> Последние заказы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {mockOrders.slice(0, 4).map((o) => (
                <div key={o.id} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{o.number}</p>
                    <p className="text-xs text-muted-foreground truncate">{o.client}</p>
                  </div>
                  <StatusBadge value={o.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Последний отчёт: {mockReports[0].title} · выручка {mockReports[0].revenue.toLocaleString('ru')} ₽
      </p>
    </div>
  );
};

export default DashboardSection;
