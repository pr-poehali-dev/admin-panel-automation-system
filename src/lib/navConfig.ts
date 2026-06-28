import { Role } from './types';

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  desc: string;
  roles: Role[];
}

export const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard', desc: 'Сводка и аналитика', roles: ['admin', 'manager', 'master'] },
  { key: 'orders', label: 'Заказы', icon: 'ClipboardList', desc: 'Заявки на ремонт', roles: ['admin', 'manager', 'master'] },
  { key: 'clients', label: 'Клиенты', icon: 'Users', desc: 'База клиентов', roles: ['admin', 'manager'] },
  { key: 'devices', label: 'Устройства', icon: 'Laptop', desc: 'Принятая техника', roles: ['admin', 'manager', 'master'] },
  { key: 'masters', label: 'Мастера', icon: 'Wrench', desc: 'Специалисты сервиса', roles: ['admin', 'manager'] },
  { key: 'services', label: 'Услуги', icon: 'ListChecks', desc: 'Прайс-лист работ', roles: ['admin', 'manager'] },
  { key: 'parts', label: 'Запчасти', icon: 'Cpu', desc: 'Склад комплектующих', roles: ['admin', 'manager', 'master'] },
  { key: 'reports', label: 'Отчёты', icon: 'FileBarChart', desc: 'Финансовые отчёты', roles: ['admin', 'manager'] },
  { key: 'users', label: 'Пользователи', icon: 'ShieldCheck', desc: 'Доступы системы', roles: ['admin'] },
  { key: 'equipment', label: 'Оборудование', icon: 'HardDrive', desc: 'Инвентарь мастерской', roles: ['admin', 'manager'] },
];

export const roleLabels: Record<Role, string> = {
  admin: 'Администратор',
  manager: 'Менеджер',
  master: 'Мастер',
};
