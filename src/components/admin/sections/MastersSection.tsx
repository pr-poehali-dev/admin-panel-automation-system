import CrudSection, { FieldConfig } from '../CrudSection';
import { mastersService } from '@/lib/crudService';
import Icon from '@/components/ui/icon';

const fields: FieldConfig[] = [
  { key: 'name', label: 'Мастер' },
  { key: 'specialization', label: 'Специализация' },
  { key: 'phone', label: 'Телефон' },
  { key: 'activeOrders', label: 'Активных', type: 'number' },
  { key: 'completedOrders', label: 'Выполнено', type: 'number' },
  { key: 'rating', label: 'Рейтинг', type: 'number', render: (r) => (
    <span className="inline-flex items-center gap-1 font-medium">
      <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />{Number(r.rating).toFixed(1)}
    </span>
  ) },
  { key: 'status', label: 'Статус', type: 'status', options: [
    { value: 'available', label: 'Свободен' },
    { value: 'busy', label: 'Занят' },
    { value: 'vacation', label: 'Отпуск' },
  ] },
];

const MastersSection = () => (
  <CrudSection title="Мастера" subtitle="Специалисты сервисного центра" icon="Wrench"
    service={mastersService} fields={fields} searchKeys={['name', 'specialization']} />
);

export default MastersSection;
