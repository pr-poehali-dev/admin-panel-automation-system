import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { navItems, roleLabels } from '@/lib/navConfig';
import Sidebar from './Sidebar';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import DashboardSection from './sections/DashboardSection';
import OrdersSection from './sections/OrdersSection';
import ClientsSection from './sections/ClientsSection';
import DevicesSection from './sections/DevicesSection';
import MastersSection from './sections/MastersSection';
import ServicesSection from './sections/ServicesSection';
import PartsSection from './sections/PartsSection';
import ReportsSection from './sections/ReportsSection';
import UsersSection from './sections/UsersSection';
import EquipmentSection from './sections/EquipmentSection';

const sections: Record<string, JSX.Element> = {
  dashboard: <DashboardSection />,
  orders: <OrdersSection />,
  clients: <ClientsSection />,
  devices: <DevicesSection />,
  masters: <MastersSection />,
  services: <ServicesSection />,
  parts: <PartsSection />,
  reports: <ReportsSection />,
  users: <UsersSection />,
  equipment: <EquipmentSection />,
};

const notifications = [
  { icon: 'ClipboardList', text: 'Новый заказ ЗК-1045 от Михаила Орлова', time: '5 мин назад' },
  { icon: 'TriangleAlert', text: 'Заканчивается аккумулятор MacBook Air M1', time: '1 ч назад' },
  { icon: 'CheckCircle2', text: 'Заказ ЗК-1041 выдан клиенту', time: '3 ч назад' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const current = navItems.find((i) => i.key === active);
  const initials = user?.name.split(' ').map((w) => w[0]).slice(0, 2).join('') ?? '';

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active={active} onSelect={setActive} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 glass border-b border-border flex items-center justify-between gap-4 px-4 sm:px-6">
          <div className="min-w-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink>TechFix</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage className="font-medium">{current?.label}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Глобальный поиск..." className="pl-9 w-56 bg-secondary/50" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="Bell" size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive animate-pulse" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Уведомления <Badge variant="secondary">{notifications.length}</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((n, i) => (
                  <DropdownMenuItem key={i} className="gap-3 py-2.5 cursor-pointer">
                    <Icon name={n.icon} size={16} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm leading-snug">{n.text}</p>
                      <p className="text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <span className="w-8 h-8 rounded-full gradient-brand text-primary-foreground text-xs font-semibold flex items-center justify-center">{initials}</span>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium leading-none">{user?.name.split(' ')[0]}</p>
                    <p className="text-[11px] text-muted-foreground">{user && roleLabels[user.role]}</p>
                  </div>
                  <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Icon name="User" size={16} className="mr-2" /> Профиль</DropdownMenuItem>
                <DropdownMenuItem><Icon name="Settings" size={16} className="mr-2" /> Настройки</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <Icon name="LogOut" size={16} className="mr-2" /> Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-[1500px] w-full mx-auto">
          {sections[active]}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
