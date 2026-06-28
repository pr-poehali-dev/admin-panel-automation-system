import CrudSection, { FieldConfig } from '../CrudSection';
import { equipmentService } from '@/lib/crudService';

const fields: FieldConfig[] = [
  { key: 'name', label: 'Оборудование' },
  { key: 'inventory', label: 'Инв. номер' },
  { key: 'location', label: 'Расположение' },
  { key: 'assignedTo', label: 'Закреплено за' },
  { key: 'condition', label: 'Состояние', type: 'status', options: [
    { value: 'working', label: 'Исправно' },
    { value: 'maintenance', label: 'ТО' },
    { value: 'broken', label: 'Неисправно' },
  ] },
  { key: 'purchaseDate', label: 'Дата покупки' },
];

const EquipmentSection = () => (
  <CrudSection title="Оборудование" subtitle="Инвентарь и техника мастерской" icon="HardDrive"
    service={equipmentService} fields={fields} searchKeys={['name', 'inventory', 'location', 'assignedTo']} />
);

export default EquipmentSection;
