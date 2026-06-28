import CrudSection, { FieldConfig } from '../CrudSection';
import { servicesService } from '@/lib/crudService';
import Icon from '@/components/ui/icon';

const fields: FieldConfig[] = [
  { key: 'name', label: 'Услуга' },
  { key: 'category', label: 'Категория' },
  { key: 'price', label: 'Цена', type: 'number', render: (r) => Number(r.price) === 0 ? 'Бесплатно' : `${Number(r.price).toLocaleString('ru')} ₽` },
  { key: 'duration', label: 'Длительность' },
  { key: 'popular', label: 'Популярная', type: 'select', options: [{ value: 'true', label: 'Да' }, { value: 'false', label: 'Нет' }],
    render: (r) => r.popular ? <span className="inline-flex items-center gap-1 text-amber-400 text-sm"><Icon name="Flame" size={14} /> Хит</span> : <span className="text-muted-foreground text-sm">—</span> },
];

const ServicesSection = () => (
  <CrudSection title="Услуги" subtitle="Прайс-лист выполняемых работ" icon="ListChecks"
    service={servicesService} fields={fields} searchKeys={['name', 'category']} />
);

export default ServicesSection;