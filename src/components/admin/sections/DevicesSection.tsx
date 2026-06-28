import CrudSection, { FieldConfig } from '../CrudSection';
import { devicesService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard } from '../DetailWidgets';
import StatusBadge from '../StatusBadge';

const statusOptions = [
  { value: 'in_service', label: 'В сервисе' },
  { value: 'returned', label: 'Возвращено' },
  { value: 'in_stock', label: 'На складе' },
];

const fields: FieldConfig[] = [
  { key: 'type', label: 'Тип' },
  { key: 'brand', label: 'Бренд' },
  { key: 'model', label: 'Модель' },
  { key: 'serial', label: 'Серийный номер' },
  { key: 'client', label: 'Владелец' },
  { key: 'condition', label: 'Состояние при приёме', type: 'textarea', hideInTable: true },
  { key: 'accessories', label: 'Комплектация', hideInTable: true },
  { key: 'received_at', label: 'Принято', hideInTable: true },
  { key: 'status', label: 'Статус', type: 'status', options: statusOptions },
];

const DevicesSection = () => (
  <CrudSection
    title="Устройства" subtitle="Принятая в ремонт техника" icon="Laptop"
    service={devicesService} fields={fields}
    searchKeys={['brand', 'model', 'serial', 'client']}
    stats={(rows) => {
      const inService = rows.filter((r) => r.status === 'in_service').length;
      const brands = new Set(rows.map((r) => r.brand)).size;
      const types = new Set(rows.map((r) => r.type)).size;
      return (
        <StatGrid items={[
          { label: 'Всего устройств', value: String(rows.length), icon: 'Laptop' },
          { label: 'В сервисе', value: String(inService), icon: 'Wrench', color: 'text-amber-400' },
          { label: 'Брендов', value: String(brands), icon: 'Tags', color: 'text-accent' },
          { label: 'Категорий', value: String(types), icon: 'LayoutGrid', color: 'text-primary' },
        ]} />
      );
    }}
    renderDetails={(d) => (
      <div className="space-y-4 py-1">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-xl font-display font-bold">{d.brand} {d.model}</p>
            <p className="text-sm text-muted-foreground">{d.type}</p>
          </div>
          <StatusBadge value={d.status} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <SectionCard title="Идентификация" icon="ScanLine">
            <InfoRow label="Тип" value={d.type} icon="Laptop" />
            <InfoRow label="Бренд" value={d.brand} icon="Tag" />
            <InfoRow label="Модель" value={d.model} icon="Cpu" />
            <InfoRow label="Серийный №" value={d.serial} icon="Hash" />
          </SectionCard>

          <SectionCard title="Приём в сервис" icon="PackageOpen">
            <InfoRow label="Владелец" value={d.client} icon="UserRound" />
            <InfoRow label="Дата приёма" value={d.received_at || '—'} icon="CalendarDays" />
            <InfoRow label="Комплектация" value={d.accessories || '—'} icon="Package" />
            <InfoRow label="Статус" value={<StatusBadge value={d.status} />} icon="Activity" />
          </SectionCard>
        </div>

        <SectionCard title="Состояние при приёме" icon="ClipboardCheck">
          <p className="text-sm text-muted-foreground">{d.condition || '—'}</p>
        </SectionCard>

        <SectionCard title="Гарантийная памятка" icon="ShieldCheck">
          <p className="text-sm text-muted-foreground">
            Устройство принято с описанной выше комплектацией. Сервис не несёт ответственности за скрытые дефекты,
            не выявленные при первичном осмотре.
          </p>
        </SectionCard>

        <SectionCard title="Перемещение по сервису" icon="Route">
          <InfoRow label="Текущая зона" value={d.status === 'in_service' ? 'Ремонтный цех' : d.status === 'returned' ? 'Выдано клиенту' : 'Склад хранения'} />
          <InfoRow label="Ответственный" value={d.client} />
        </SectionCard>
      </div>
    )}
  />
);

export default DevicesSection;