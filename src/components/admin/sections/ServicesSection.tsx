import CrudSection, { FieldConfig } from '../CrudSection';
import { servicesService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard } from '../DetailWidgets';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const money = (n: unknown) => Number(n || 0) === 0 ? 'Бесплатно' : `${Number(n).toLocaleString('ru')} ₽`;

const fields: FieldConfig[] = [
  { key: 'name', label: 'Услуга' },
  { key: 'category', label: 'Категория' },
  { key: 'price', label: 'Цена', type: 'number', render: (r) => money(r.price) },
  { key: 'duration', label: 'Длительность' },
  { key: 'warranty_days', label: 'Гарантия (дней)', type: 'number', hideInTable: true },
  { key: 'description', label: 'Описание', type: 'textarea', hideInTable: true },
  { key: 'popular', label: 'Популярная', type: 'select', options: [{ value: 'true', label: 'Да' }, { value: 'false', label: 'Нет' }],
    render: (r) => (r.popular === true || r.popular === 'true') ? <span className="inline-flex items-center gap-1 text-amber-400 text-sm"><Icon name="Flame" size={14} /> Хит</span> : <span className="text-muted-foreground text-sm">—</span> },
];

const ServicesSection = () => (
  <CrudSection
    title="Услуги" subtitle="Прайс-лист выполняемых работ" icon="ListChecks"
    service={servicesService} fields={fields}
    searchKeys={['name', 'category']}
    stats={(rows) => {
      const popular = rows.filter((r) => r.popular === true).length;
      const cats = new Set(rows.map((r) => r.category)).size;
      const avg = rows.length ? Math.round(rows.reduce((s, r) => s + Number(r.price || 0), 0) / rows.length) : 0;
      return (
        <StatGrid items={[
          { label: 'Всего услуг', value: String(rows.length), icon: 'ListChecks' },
          { label: 'Категорий', value: String(cats), icon: 'LayoutGrid', color: 'text-accent' },
          { label: 'Популярных', value: String(popular), icon: 'Flame', color: 'text-amber-400' },
          { label: 'Средняя цена', value: `${avg.toLocaleString('ru')} ₽`, icon: 'Wallet', color: 'text-emerald-400' },
        ]} />
      );
    }}
    renderDetails={(s) => (
      <div className="space-y-4 py-1">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-xl font-display font-bold">{s.name}</p>
            <Badge variant="outline" className="mt-1">{s.category}</Badge>
          </div>
          <span className="text-lg font-display font-bold text-emerald-400">{money(s.price)}</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <SectionCard title="Параметры услуги" icon="Settings2">
            <InfoRow label="Категория" value={s.category} icon="Tag" />
            <InfoRow label="Стоимость" value={money(s.price)} icon="Wallet" />
            <InfoRow label="Время выполнения" value={s.duration} icon="Clock" />
            <InfoRow label="Гарантия" value={`${s.warranty_days} дней`} icon="ShieldCheck" />
          </SectionCard>

          <SectionCard title="Статус в прайсе" icon="Star">
            <InfoRow label="Популярность" value={s.popular ? 'Хит продаж' : 'Стандартная'} icon="Flame" />
            <InfoRow label="Гарантийный срок" value={s.warranty_days > 0 ? `${s.warranty_days} дней` : 'Без гарантии'} icon="BadgeCheck" />
            <InfoRow label="Рекомендуется к допродаже" value={s.popular ? 'Да' : 'Нет'} icon="ThumbsUp" />
          </SectionCard>
        </div>

        <SectionCard title="Описание работ" icon="FileText">
          <p className="text-sm text-muted-foreground">{s.description || '—'}</p>
        </SectionCard>

        <SectionCard title="Что входит в гарантию" icon="ShieldCheck">
          <p className="text-sm text-muted-foreground">
            {s.warranty_days > 0
              ? `На данную услугу предоставляется гарантия ${s.warranty_days} дней. В течение этого срока повторное устранение того же дефекта — бесплатно.`
              : 'Гарантия на услугу не предоставляется.'}
          </p>
        </SectionCard>

        <SectionCard title="Рекомендации мастеру" icon="Lightbulb">
          <p className="text-sm text-muted-foreground">Перед началом работ согласуйте стоимость с клиентом и уточните комплектацию устройства.</p>
        </SectionCard>
      </div>
    )}
  />
);

export default ServicesSection;