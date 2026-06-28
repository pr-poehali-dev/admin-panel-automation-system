import CrudSection, { FieldConfig } from '../CrudSection';
import { partsService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard, MeterRow } from '../DetailWidgets';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const money = (n: unknown) => `${Number(n || 0).toLocaleString('ru')} ₽`;

const fields: FieldConfig[] = [
  { key: 'name', label: 'Запчасть' },
  { key: 'category', label: 'Категория' },
  { key: 'sku', label: 'Артикул' },
  { key: 'supplier', label: 'Поставщик' },
  { key: 'location', label: 'Ячейка', hideInTable: true },
  { key: 'cost', label: 'Закупка', type: 'number', hideInTable: true },
  { key: 'price', label: 'Цена', type: 'number', render: (r) => money(r.price) },
  { key: 'stock', label: 'Остаток', type: 'number', render: (r) => {
    const low = Number(r.stock) < Number(r.min_stock);
    return (
      <span className={`inline-flex items-center gap-1.5 font-medium ${low ? 'text-red-400' : 'text-emerald-400'}`}>
        {low && <Icon name="TriangleAlert" size={14} />}{String(r.stock)} шт
      </span>
    );
  } },
  { key: 'min_stock', label: 'Минимум', type: 'number', hideInTable: true },
];

const PartsSection = () => (
  <CrudSection
    title="Запчасти" subtitle="Склад комплектующих и расходников" icon="Cpu"
    service={partsService} fields={fields}
    searchKeys={['name', 'sku', 'category', 'supplier']}
    stats={(rows) => {
      const low = rows.filter((r) => Number(r.stock) < Number(r.min_stock)).length;
      const totalValue = rows.reduce((s, r) => s + Number(r.price) * Number(r.stock), 0);
      const units = rows.reduce((s, r) => s + Number(r.stock || 0), 0);
      return (
        <StatGrid items={[
          { label: 'Позиций', value: String(rows.length), icon: 'Boxes' },
          { label: 'Единиц на складе', value: String(units), icon: 'Package', color: 'text-primary' },
          { label: 'Заканчивается', value: String(low), icon: 'TriangleAlert', color: 'text-red-400' },
          { label: 'Стоимость склада', value: money(totalValue), icon: 'Wallet', color: 'text-emerald-400' },
        ]} />
      );
    }}
    renderDetails={(p) => {
      const margin = Number(p.price) - Number(p.cost);
      const marginPct = Number(p.cost) ? Math.round((margin / Number(p.cost)) * 100) : 0;
      const low = Number(p.stock) < Number(p.min_stock);
      return (
        <div className="space-y-4 py-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xl font-display font-bold">{p.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{p.category}</Badge>
                <span className="text-xs text-muted-foreground">Арт. {p.sku}</span>
              </div>
            </div>
            {low && <Badge variant="outline" className="bg-red-500/15 text-red-400 border-red-500/30">Требует закупки</Badge>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SectionCard title="Складские данные" icon="Warehouse">
              <InfoRow label="Остаток" value={<span className={low ? 'text-red-400' : 'text-emerald-400'}>{p.stock} шт</span>} icon="Package" />
              <InfoRow label="Минимальный остаток" value={`${p.min_stock} шт`} icon="ArrowDownToLine" />
              <InfoRow label="Ячейка хранения" value={p.location || '—'} icon="MapPin" />
              <InfoRow label="Поставщик" value={p.supplier} icon="Truck" />
            </SectionCard>

            <SectionCard title="Ценообразование" icon="Calculator">
              <InfoRow label="Закупочная цена" value={money(p.cost)} icon="ShoppingCart" />
              <InfoRow label="Цена продажи" value={money(p.price)} icon="Tag" />
              <InfoRow label="Маржа" value={<span className="text-emerald-400">{money(margin)} ({marginPct}%)</span>} icon="TrendingUp" />
              <InfoRow label="Артикул" value={p.sku} icon="Hash" />
            </SectionCard>
          </div>

          <SectionCard title="Уровень запаса" icon="Gauge">
            <MeterRow label="Остаток относительно минимума" value={Number(p.stock)} max={Math.max(Number(p.min_stock) * 3, 1)} suffix=" шт" />
            <p className="text-xs text-muted-foreground mt-2">{low ? `Рекомендуется заказать минимум ${Number(p.min_stock) * 2 - Number(p.stock)} шт` : 'Запаса достаточно'}</p>
          </SectionCard>

          <SectionCard title="Стоимость позиции на складе" icon="Wallet">
            <InfoRow label="Общая закупочная стоимость" value={money(Number(p.cost) * Number(p.stock))} />
            <InfoRow label="Потенциальная выручка" value={money(Number(p.price) * Number(p.stock))} />
          </SectionCard>

          <SectionCard title="Рекомендация по закупке" icon="Lightbulb">
            <p className="text-sm text-muted-foreground">
              {low ? `Запас ниже минимума. Свяжитесь с поставщиком «${p.supplier}» для пополнения.` : 'Закупка не требуется в ближайшее время.'}
            </p>
          </SectionCard>
        </div>
      );
    }}
  />
);

export default PartsSection;