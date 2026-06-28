import CrudSection, { FieldConfig } from '../CrudSection';
import { clientsService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard, MeterRow } from '../DetailWidgets';
import StatusBadge from '../StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const money = (n: unknown) => `${Number(n || 0).toLocaleString('ru')} ₽`;

const fields: FieldConfig[] = [
  { key: 'name', label: 'Клиент' },
  { key: 'type', label: 'Тип', type: 'status', options: [{ value: 'individual', label: 'Физлицо' }, { value: 'company', label: 'Компания' }] },
  { key: 'phone', label: 'Телефон' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Адрес', type: 'textarea', hideInTable: true },
  { key: 'orders_count', label: 'Заказов', type: 'number' },
  { key: 'total_spent', label: 'Потрачено', type: 'number', render: (r) => money(r.total_spent) },
  { key: 'discount', label: 'Скидка %', type: 'number', hideInTable: true },
  { key: 'notes', label: 'Заметки', type: 'textarea', hideInTable: true },
  { key: 'created_at', label: 'С нами с', hideInForm: true, hideInTable: true },
];

const ClientsSection = () => (
  <CrudSection
    title="Клиенты" subtitle="База клиентов сервисного центра" icon="Users"
    service={clientsService} fields={fields}
    searchKeys={['name', 'phone', 'email']}
    stats={(rows) => {
      const companies = rows.filter((r) => r.type === 'company').length;
      const revenue = rows.reduce((s, r) => s + Number(r.total_spent || 0), 0);
      const vip = rows.filter((r) => Number(r.total_spent) > 40000).length;
      return (
        <StatGrid items={[
          { label: 'Всего клиентов', value: String(rows.length), icon: 'Users' },
          { label: 'Компаний', value: String(companies), icon: 'Building2', color: 'text-accent' },
          { label: 'VIP-клиентов', value: String(vip), icon: 'Crown', color: 'text-amber-400' },
          { label: 'Общая выручка', value: money(revenue), icon: 'Wallet', color: 'text-emerald-400' },
        ]} />
      );
    }}
    renderDetails={(c) => {
      const initials = c.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
      const maxSpent = 150000;
      return (
        <div className="space-y-4 py-1">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 border border-border">
              <AvatarFallback className="gradient-brand text-primary-foreground font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-display font-bold">{c.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge value={c.type} />
                {Number(c.total_spent) > 40000 && <Badge variant="outline" className="bg-amber-500/15 text-amber-400 border-amber-500/30">VIP</Badge>}
                {Number(c.discount) > 0 && <Badge variant="outline">Скидка {c.discount}%</Badge>}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SectionCard title="Контакты" icon="Phone">
              <InfoRow label="Телефон" value={c.phone} icon="Phone" />
              <InfoRow label="Email" value={c.email} icon="Mail" />
              <InfoRow label="Адрес" value={c.address || '—'} icon="MapPin" />
            </SectionCard>

            <SectionCard title="Финансы и лояльность" icon="TrendingUp">
              <InfoRow label="Всего заказов" value={c.orders_count} icon="ClipboardList" />
              <InfoRow label="Сумма покупок" value={money(c.total_spent)} icon="Wallet" />
              <InfoRow label="Персональная скидка" value={`${c.discount}%`} icon="Percent" />
              <InfoRow label="Клиент с" value={c.created_at} icon="CalendarDays" />
            </SectionCard>
          </div>

          <SectionCard title="Уровень лояльности" icon="Star">
            <MeterRow label="Прогресс до статуса «Платина»" value={Number(c.total_spent)} max={maxSpent} suffix=" ₽" />
            <p className="text-xs text-muted-foreground mt-2">
              {Number(c.total_spent) >= maxSpent ? 'Достигнут максимальный статус!' : `До «Платины» осталось потратить ${money(maxSpent - Number(c.total_spent))}`}
            </p>
          </SectionCard>

          <SectionCard title="Заметки менеджера" icon="StickyNote">
            <p className="text-sm text-muted-foreground">{c.notes || 'Заметок нет'}</p>
          </SectionCard>

          <SectionCard title="Средний чек и активность" icon="BarChart3">
            <InfoRow label="Средний чек" value={money(c.orders_count ? Math.round(Number(c.total_spent) / c.orders_count) : 0)} />
            <InfoRow label="Тип клиента" value={c.type === 'company' ? 'Юридическое лицо' : 'Физическое лицо'} />
          </SectionCard>
        </div>
      );
    }}
  />
);

export default ClientsSection;