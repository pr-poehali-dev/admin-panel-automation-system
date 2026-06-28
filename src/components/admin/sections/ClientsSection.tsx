import CrudSection, { FieldConfig } from '../CrudSection';
import { clientsService } from '@/lib/crudService';

const fields: FieldConfig[] = [
  { key: 'name', label: 'Клиент' },
  { key: 'type', label: 'Тип', type: 'status', options: [{ value: 'individual', label: 'Физлицо' }, { value: 'company', label: 'Компания' }] },
  { key: 'phone', label: 'Телефон' },
  { key: 'email', label: 'Email' },
  { key: 'ordersCount', label: 'Заказов', type: 'number' },
  { key: 'totalSpent', label: 'Потрачено', type: 'number', render: (r) => `${Number(r.totalSpent).toLocaleString('ru')} ₽` },
  { key: 'createdAt', label: 'С нами с', hideInForm: true },
];

const ClientsSection = () => (
  <CrudSection title="Клиенты" subtitle="База клиентов сервисного центра" icon="Users"
    service={clientsService} fields={fields} searchKeys={['name', 'phone', 'email']} />
);

export default ClientsSection;
