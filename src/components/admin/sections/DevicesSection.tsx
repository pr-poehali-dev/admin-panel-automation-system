import CrudSection, { FieldConfig } from '../CrudSection';
import { devicesService } from '@/lib/crudService';

const fields: FieldConfig[] = [
  { key: 'type', label: 'Тип' },
  { key: 'brand', label: 'Бренд' },
  { key: 'model', label: 'Модель' },
  { key: 'serial', label: 'Серийный номер' },
  { key: 'client', label: 'Владелец' },
  { key: 'status', label: 'Статус', type: 'status', options: [
    { value: 'in_service', label: 'В сервисе' },
    { value: 'returned', label: 'Возвращено' },
    { value: 'in_stock', label: 'На складе' },
  ] },
];

const DevicesSection = () => (
  <CrudSection title="Устройства" subtitle="Принятая в ремонт техника" icon="Laptop"
    service={devicesService} fields={fields} searchKeys={['brand', 'model', 'serial', 'client']} />
);

export default DevicesSection;
