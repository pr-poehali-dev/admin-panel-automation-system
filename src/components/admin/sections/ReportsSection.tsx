import CrudSection, { FieldConfig } from '../CrudSection';
import { reportsService } from '@/lib/crudService';

const fields: FieldConfig[] = [
  { key: 'title', label: 'Отчёт' },
  { key: 'period', label: 'Период' },
  { key: 'type', label: 'Тип', type: 'status', options: [
    { value: 'daily', label: 'День' },
    { value: 'weekly', label: 'Неделя' },
    { value: 'monthly', label: 'Месяц' },
  ] },
  { key: 'orders', label: 'Заказов', type: 'number' },
  { key: 'revenue', label: 'Выручка', type: 'number', render: (r) => `${Number(r.revenue).toLocaleString('ru')} ₽` },
  { key: 'createdAt', label: 'Сформирован', hideInForm: true },
];

const ReportsSection = () => (
  <CrudSection title="Отчёты" subtitle="Финансовая и операционная отчётность" icon="FileBarChart"
    service={reportsService} fields={fields} searchKeys={['title', 'period']} />
);

export default ReportsSection;
