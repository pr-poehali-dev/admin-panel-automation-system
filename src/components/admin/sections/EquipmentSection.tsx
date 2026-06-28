import CrudSection, { FieldConfig } from '../CrudSection';
import { equipmentService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard } from '../DetailWidgets';
import StatusBadge from '../StatusBadge';

const money = (n: unknown) => `${Number(n || 0).toLocaleString('ru')} ₽`;

const fields: FieldConfig[] = [
  { key: 'name', label: 'Оборудование' },
  { key: 'inventory', label: 'Инв. номер' },
  { key: 'location', label: 'Расположение' },
  { key: 'assigned_to', label: 'Закреплено за' },
  { key: 'price', label: 'Стоимость', type: 'number', hideInTable: true },
  { key: 'purchase_date', label: 'Дата покупки', hideInTable: true },
  { key: 'last_service', label: 'Последнее ТО', hideInTable: true },
  { key: 'condition', label: 'Состояние', type: 'status', options: [
    { value: 'working', label: 'Исправно' },
    { value: 'maintenance', label: 'ТО' },
    { value: 'broken', label: 'Неисправно' },
  ] },
];

const EquipmentSection = () => (
  <CrudSection
    title="Оборудование" subtitle="Инвентарь и техника мастерской" icon="HardDrive"
    service={equipmentService} fields={fields}
    searchKeys={['name', 'inventory', 'location', 'assigned_to']}
    stats={(rows) => {
      const working = rows.filter((r) => r.condition === 'working').length;
      const broken = rows.filter((r) => r.condition === 'broken').length;
      const value = rows.reduce((s, r) => s + Number(r.price || 0), 0);
      return (
        <StatGrid items={[
          { label: 'Единиц техники', value: String(rows.length), icon: 'HardDrive' },
          { label: 'Исправно', value: String(working), icon: 'CircleCheck', color: 'text-emerald-400' },
          { label: 'Неисправно', value: String(broken), icon: 'CircleX', color: 'text-red-400' },
          { label: 'Стоимость парка', value: money(value), icon: 'Wallet', color: 'text-emerald-400' },
        ]} />
      );
    }}
    renderDetails={(e) => (
      <div className="space-y-4 py-1">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-xl font-display font-bold">{e.name}</p>
            <p className="text-sm text-muted-foreground">{e.inventory}</p>
          </div>
          <StatusBadge value={e.condition} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <SectionCard title="Учётные данные" icon="ClipboardList">
            <InfoRow label="Инвентарный №" value={e.inventory} icon="Hash" />
            <InfoRow label="Расположение" value={e.location} icon="MapPin" />
            <InfoRow label="Закреплено за" value={e.assigned_to} icon="UserRound" />
            <InfoRow label="Состояние" value={<StatusBadge value={e.condition} />} icon="Activity" />
          </SectionCard>

          <SectionCard title="Эксплуатация" icon="Settings2">
            <InfoRow label="Стоимость" value={money(e.price)} icon="Wallet" />
            <InfoRow label="Дата покупки" value={e.purchase_date} icon="CalendarDays" />
            <InfoRow label="Последнее ТО" value={e.last_service} icon="Wrench" />
          </SectionCard>
        </div>

        <SectionCard title="Техническое обслуживание" icon="CalendarClock">
          <InfoRow label="Последнее обслуживание" value={e.last_service} />
          <InfoRow label="Статус" value={e.condition === 'maintenance' ? 'На обслуживании' : e.condition === 'broken' ? 'Требует ремонта' : 'В норме'} />
        </SectionCard>

        <SectionCard title="Рекомендации" icon="Lightbulb">
          <p className="text-sm text-muted-foreground">
            {e.condition === 'broken' ? 'Оборудование неисправно — необходим ремонт или списание.'
              : e.condition === 'maintenance' ? 'Идёт плановое техническое обслуживание.'
              : 'Оборудование исправно и готово к работе.'}
          </p>
        </SectionCard>

        <SectionCard title="Амортизация" icon="TrendingDown">
          <InfoRow label="Первоначальная стоимость" value={money(e.price)} />
          <InfoRow label="Статус актива" value={e.condition === 'broken' ? 'К списанию' : 'В эксплуатации'} />
        </SectionCard>
      </div>
    )}
  />
);

export default EquipmentSection;