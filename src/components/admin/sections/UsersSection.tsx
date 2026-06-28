import CrudSection, { FieldConfig } from '../CrudSection';
import { usersService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard } from '../DetailWidgets';
import StatusBadge from '../StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const roleOptions = [
  { value: 'admin', label: 'Администратор' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'master', label: 'Мастер' },
];

const rolePerms: Record<string, string[]> = {
  admin: ['Полный доступ ко всем разделам', 'Управление пользователями', 'Финансовые отчёты', 'Настройки системы'],
  manager: ['Заказы и клиенты', 'Услуги и запчасти', 'Просмотр отчётов', 'Без доступа к пользователям'],
  master: ['Свои заказы', 'Устройства', 'Просмотр запчастей', 'Без доступа к финансам'],
};

const fields: FieldConfig[] = [
  { key: 'name', label: 'Сотрудник' },
  { key: 'email', label: 'Email' },
  { key: 'position', label: 'Должность', hideInTable: true },
  { key: 'phone', label: 'Телефон', hideInTable: true },
  { key: 'password', label: 'Пароль', hideInTable: true },
  { key: 'role', label: 'Роль', type: 'status', options: roleOptions },
  { key: 'status', label: 'Доступ', type: 'status', options: [
    { value: 'active', label: 'Активен' },
    { value: 'blocked', label: 'Заблокирован' },
  ] },
  { key: 'last_login', label: 'Последний вход', hideInForm: true, hideInTable: true },
];

const UsersSection = () => (
  <CrudSection
    title="Пользователи" subtitle="Учётные записи и права доступа" icon="ShieldCheck"
    service={usersService} fields={fields}
    searchKeys={['name', 'email']}
    stats={(rows) => {
      const active = rows.filter((r) => r.status === 'active').length;
      const admins = rows.filter((r) => r.role === 'admin').length;
      const blocked = rows.filter((r) => r.status === 'blocked').length;
      return (
        <StatGrid items={[
          { label: 'Всего аккаунтов', value: String(rows.length), icon: 'Users' },
          { label: 'Активных', value: String(active), icon: 'CircleCheck', color: 'text-emerald-400' },
          { label: 'Администраторов', value: String(admins), icon: 'ShieldCheck', color: 'text-accent' },
          { label: 'Заблокировано', value: String(blocked), icon: 'Ban', color: 'text-red-400' },
        ]} />
      );
    }}
    renderDetails={(u) => {
      const initials = u.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
      return (
        <div className="space-y-4 py-1">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 border border-border">
              <AvatarFallback className="gradient-brand text-primary-foreground font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-display font-bold">{u.name}</p>
              <p className="text-sm text-muted-foreground">{u.position}</p>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge value={u.role} />
                <StatusBadge value={u.status} />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SectionCard title="Учётные данные" icon="KeyRound">
              <InfoRow label="Email" value={u.email} icon="Mail" />
              <InfoRow label="Телефон" value={u.phone || '—'} icon="Phone" />
              <InfoRow label="Должность" value={u.position || '—'} icon="Briefcase" />
              <InfoRow label="Последний вход" value={u.last_login || '—'} icon="LogIn" />
            </SectionCard>

            <SectionCard title="Безопасность" icon="ShieldAlert">
              <InfoRow label="Роль в системе" value={<StatusBadge value={u.role} />} icon="UserCog" />
              <InfoRow label="Статус доступа" value={<StatusBadge value={u.status} />} icon="Lock" />
              <InfoRow label="2FA" value="Не настроена" icon="Smartphone" />
            </SectionCard>
          </div>

          <SectionCard title="Права доступа роли" icon="ListChecks">
            <div className="space-y-1.5">
              {(rolePerms[u.role] ?? []).map((perm, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />{perm}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="История активности" icon="History">
            <InfoRow label="Последний вход в систему" value={u.last_login || '—'} />
            <InfoRow label="Статус сессии" value={u.status === 'active' ? 'Доступ разрешён' : 'Доступ заблокирован'} />
          </SectionCard>

          <SectionCard title="Зона ответственности" icon="Target">
            <p className="text-sm text-muted-foreground">
              {u.role === 'admin' ? 'Полный контроль над системой и сотрудниками.'
                : u.role === 'manager' ? 'Работа с клиентами, заказами и складом.'
                : 'Выполнение ремонтных работ и обновление статусов заказов.'}
            </p>
          </SectionCard>
        </div>
      );
    }}
  />
);

export default UsersSection;