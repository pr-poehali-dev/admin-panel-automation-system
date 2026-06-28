import CrudSection, { FieldConfig } from '../CrudSection';
import { mastersService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard, MeterRow } from '../DetailWidgets';
import StatusBadge from '../StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const money = (n: unknown) => `${Number(n || 0).toLocaleString('ru')} ₽`;

const statusOptions = [
  { value: 'available', label: 'Свободен' },
  { value: 'busy', label: 'Занят' },
  { value: 'vacation', label: 'Отпуск' },
];

const fields: FieldConfig[] = [
  { key: 'name', label: 'Мастер' },
  { key: 'specialization', label: 'Специализация' },
  { key: 'phone', label: 'Телефон' },
  { key: 'email', label: 'Email', hideInTable: true },
  { key: 'active_orders', label: 'Активных', type: 'number' },
  { key: 'completed_orders', label: 'Выполнено', type: 'number' },
  { key: 'experience_years', label: 'Стаж (лет)', type: 'number', hideInTable: true },
  { key: 'salary', label: 'Оклад', type: 'number', hideInTable: true },
  { key: 'hired_at', label: 'Принят', hideInTable: true },
  { key: 'rating', label: 'Рейтинг', type: 'number', render: (r) => (
    <span className="inline-flex items-center gap-1 font-medium">
      <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />{Number(r.rating).toFixed(1)}
    </span>
  ) },
  { key: 'status', label: 'Статус', type: 'status', options: statusOptions },
];

const MastersSection = () => (
  <CrudSection
    title="Мастера" subtitle="Специалисты сервисного центра" icon="Wrench"
    service={mastersService} fields={fields}
    searchKeys={['name', 'specialization']}
    stats={(rows) => {
      const available = rows.filter((r) => r.status === 'available').length;
      const avgRating = rows.length ? (rows.reduce((s, r) => s + Number(r.rating), 0) / rows.length).toFixed(1) : '0';
      const completed = rows.reduce((s, r) => s + Number(r.completed_orders || 0), 0);
      return (
        <StatGrid items={[
          { label: 'Всего мастеров', value: String(rows.length), icon: 'Users' },
          { label: 'Свободны', value: String(available), icon: 'CircleCheck', color: 'text-emerald-400' },
          { label: 'Средний рейтинг', value: avgRating, icon: 'Star', color: 'text-amber-400' },
          { label: 'Ремонтов всего', value: String(completed), icon: 'Wrench', color: 'text-primary' },
        ]} />
      );
    }}
    renderDetails={(m) => {
      const initials = m.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
      const total = Number(m.completed_orders) + Number(m.active_orders);
      return (
        <div className="space-y-4 py-1">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 border border-border">
              <AvatarFallback className="gradient-brand text-primary-foreground font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-display font-bold">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.specialization}</p>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge value={m.status} />
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />{Number(m.rating).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SectionCard title="Контакты и стаж" icon="IdCard">
              <InfoRow label="Телефон" value={m.phone} icon="Phone" />
              <InfoRow label="Email" value={m.email} icon="Mail" />
              <InfoRow label="Опыт работы" value={`${m.experience_years} лет`} icon="Award" />
              <InfoRow label="В компании с" value={m.hired_at} icon="CalendarDays" />
            </SectionCard>

            <SectionCard title="Эффективность" icon="TrendingUp">
              <InfoRow label="Активных заказов" value={m.active_orders} icon="Loader" />
              <InfoRow label="Выполнено всего" value={m.completed_orders} icon="CircleCheck" />
              <InfoRow label="Оклад" value={money(m.salary)} icon="Wallet" />
              <InfoRow label="Рейтинг" value={`${Number(m.rating).toFixed(1)} / 5.0`} icon="Star" />
            </SectionCard>
          </div>

          <SectionCard title="Загрузка специалиста" icon="Activity">
            <MeterRow label="Текущая загрузка" value={Number(m.active_orders)} max={5} suffix=" зак." />
            <p className="text-xs text-muted-foreground mt-2">{m.status === 'busy' ? 'Мастер сейчас занят' : m.status === 'vacation' ? 'В отпуске' : 'Готов принять заказ'}</p>
          </SectionCard>

          <SectionCard title="Качество работы" icon="Star">
            <MeterRow label="Удовлетворённость клиентов" value={Math.round(Number(m.rating) * 20)} max={100} suffix="%" />
          </SectionCard>

          <SectionCard title="Статистика за всё время" icon="BarChart3">
            <InfoRow label="Всего заказов обработано" value={total} />
            <InfoRow label="Доля успешных" value={`${total ? Math.round((Number(m.completed_orders) / total) * 100) : 0}%`} />
          </SectionCard>
        </div>
      );
    }}
  />
);

export default MastersSection;