import CrudSection, { FieldConfig } from '../CrudSection';
import { ordersService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard, MeterRow } from '../DetailWidgets';
import StatusBadge from '../StatusBadge';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const statusOptions = [
  { value: 'new', label: 'Новый' },
  { value: 'diagnostics', label: 'Диагностика' },
  { value: 'repair', label: 'В ремонте' },
  { value: 'waiting', label: 'Ожидание' },
  { value: 'done', label: 'Готов' },
  { value: 'issued', label: 'Выдан' },
];

const priorityOptions = [
  { value: 'urgent', label: 'Срочно' },
  { value: 'high', label: 'Высокий' },
  { value: 'normal', label: 'Обычный' },
  { value: 'low', label: 'Низкий' },
];

const priorityLabel: Record<string, { label: string; cls: string }> = {
  urgent: { label: 'Срочно', cls: 'bg-red-500/15 text-red-400 border-red-500/30' },
  high: { label: 'Высокий', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  normal: { label: 'Обычный', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  low: { label: 'Низкий', cls: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30' },
};

const money = (n: unknown) => `${Number(n || 0).toLocaleString('ru')} ₽`;

const fields: FieldConfig[] = [
  { key: 'number', label: '№ Заказа' },
  { key: 'client', label: 'Клиент' },
  { key: 'device', label: 'Устройство' },
  { key: 'problem', label: 'Неисправность', type: 'textarea', hideInTable: true },
  { key: 'diagnosis', label: 'Диагноз', type: 'textarea', hideInTable: true },
  { key: 'master', label: 'Мастер' },
  { key: 'priority', label: 'Приоритет', type: 'select', options: priorityOptions,
    render: (r) => { const p = priorityLabel[String(r.priority)] ?? priorityLabel.normal; return <Badge variant="outline" className={p.cls}>{p.label}</Badge>; } },
  { key: 'status', label: 'Статус', type: 'status', options: statusOptions },
  { key: 'price', label: 'Сумма', type: 'number', render: (r) => money(r.price) },
  { key: 'prepayment', label: 'Предоплата', type: 'number', hideInTable: true },
  { key: 'deadline', label: 'Срок' },
  { key: 'created_at', label: 'Создан', hideInForm: true, hideInTable: true },
];

const OrdersSection = () => (
  <CrudSection
    title="Заказы" subtitle="Заявки на ремонт техники" icon="ClipboardList"
    service={ordersService} fields={fields}
    searchKeys={['number', 'client', 'device', 'master']}
    stats={(rows) => {
      const active = rows.filter((r) => !['issued', 'done'].includes(r.status)).length;
      const revenue = rows.reduce((s, r) => s + Number(r.price || 0), 0);
      const urgent = rows.filter((r) => r.priority === 'urgent').length;
      const avg = rows.length ? Math.round(revenue / rows.length) : 0;
      return (
        <StatGrid items={[
          { label: 'Всего заказов', value: String(rows.length), icon: 'ClipboardList' },
          { label: 'В работе', value: String(active), icon: 'Loader', color: 'text-amber-400' },
          { label: 'Срочных', value: String(urgent), icon: 'Flame', color: 'text-red-400' },
          { label: 'Общая сумма', value: money(revenue), icon: 'Wallet', color: 'text-emerald-400', hint: `средний ${money(avg)}` },
        ]} />
      );
    }}
    renderDetails={(o) => {
      const paid = Number(o.prepayment || 0);
      const total = Number(o.price || 0);
      const left = Math.max(total - paid, 0);
      const p = priorityLabel[o.priority] ?? priorityLabel.normal;
      return (
        <div className="space-y-4 py-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-display font-bold">{o.number}</span>
              <StatusBadge value={o.status} />
              <Badge variant="outline" className={p.cls}>{p.label}</Badge>
            </div>
            <span className="text-lg font-display font-bold text-emerald-400">{money(total)}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SectionCard title="Клиент и устройство" icon="User">
              <InfoRow label="Клиент" value={o.client} icon="UserRound" />
              <InfoRow label="Устройство" value={o.device} icon="Laptop" />
              <InfoRow label="Мастер" value={o.master} icon="Wrench" />
              <InfoRow label="Срок сдачи" value={o.deadline} icon="CalendarClock" />
            </SectionCard>

            <SectionCard title="Оплата" icon="CreditCard">
              <InfoRow label="Стоимость работ" value={money(total)} />
              <InfoRow label="Предоплата" value={<span className="text-emerald-400">{money(paid)}</span>} />
              <InfoRow label="Остаток к оплате" value={<span className="text-amber-400">{money(left)}</span>} />
              <div className="mt-3">
                <MeterRow label="Оплачено" value={total ? Math.round((paid / total) * 100) : 0} max={100} suffix="%" />
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Неисправность" icon="TriangleAlert">
            <p className="text-sm text-muted-foreground">{o.problem || '—'}</p>
          </SectionCard>

          <SectionCard title="Заключение мастера" icon="Stethoscope">
            <p className="text-sm text-muted-foreground">{o.diagnosis || 'Диагностика не проводилась'}</p>
          </SectionCard>

          <SectionCard title="Хронология заказа" icon="History">
            <div className="space-y-2">
              {[
                { t: o.created_at, e: 'Заказ создан и принят в работу', ok: true },
                { t: o.created_at, e: 'Назначен мастер: ' + o.master, ok: true },
                { t: '—', e: 'Диагностика выполнена', ok: !!o.diagnosis },
                { t: o.deadline, e: 'Плановая дата выдачи', ok: o.status === 'issued' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <Icon name={step.ok ? 'CircleCheck' : 'Circle'} size={16} className={step.ok ? 'text-emerald-400' : 'text-muted-foreground'} />
                  <span className={step.ok ? '' : 'text-muted-foreground'}>{step.e}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{step.t}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      );
    }}
  />
);

export default OrdersSection;