import CrudSection, { FieldConfig } from '../CrudSection';
import { partsService } from '@/lib/crudService';
import Icon from '@/components/ui/icon';

const fields: FieldConfig[] = [
  { key: 'name', label: 'Запчасть' },
  { key: 'category', label: 'Категория' },
  { key: 'sku', label: 'Артикул' },
  { key: 'supplier', label: 'Поставщик' },
  { key: 'price', label: 'Цена', type: 'number', render: (r) => `${Number(r.price).toLocaleString('ru')} ₽` },
  { key: 'stock', label: 'Остаток', type: 'number', render: (r) => {
    const low = Number(r.stock) < Number(r.minStock);
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium ${low ? 'text-red-400' : 'text-emerald-400'}`}>
        {low && <Icon name="TriangleAlert" size={14} />}{String(r.stock)} шт
      </span>
    );
  } },
  { key: 'minStock', label: 'Минимум', type: 'number' },
];

const PartsSection = () => (
  <CrudSection title="Запчасти" subtitle="Склад комплектующих и расходников" icon="Cpu"
    service={partsService} fields={fields} searchKeys={['name', 'sku', 'category', 'supplier']} />
);

export default PartsSection;
