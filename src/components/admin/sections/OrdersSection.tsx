import CrudSection, { FieldConfig } from '../CrudSection';
import { ordersService } from '@/lib/crudService';

const statusOptions = [
  { value: 'new', label: 'Новый' },
  { value: 'diagnostics', label: 'Диагностика' },
  { value: 'repair', label: 'В ремонте' },
  { value: 'waiting', label: 'Ожидание' },
  { value: 'done', label: 'Готов' },
  { value: 'issued', label: 'Выдан' },
];

const fields: FieldConfig[] = [
  { key: 'number', label: '№ Заказа' },
  { key: 'client', label: 'Клиент' },
  { key: 'device', label: 'Устройство' },
  { key: 'problem', label: 'Неисправность' },
  { key: 'master', label: 'Мастер' },
  { key: 'status', label: 'Статус', type: 'status', options: statusOptions },
  { key: 'price', label: 'Сумма', type: 'number', render: (r) => `${Number(r.price).toLocaleString('ru')} ₽` },
  { key: 'deadline', label: 'Срок' },
  { key: 'createdAt', label: 'Создан', hideInForm: true },
];

const OrdersSection = () => (
  <CrudSection title="Заказы" subtitle="Заявки на ремонт техники" icon="ClipboardList"
    service={ordersService} fields={fields} searchKeys={['number', 'client', 'device', 'master']} />
);

export default OrdersSection;
