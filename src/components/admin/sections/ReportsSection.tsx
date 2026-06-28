import CrudSection, { FieldConfig } from '../CrudSection';
import { reportsService } from '@/lib/api';
import { StatGrid, InfoRow, SectionCard, MeterRow } from '../DetailWidgets';
import StatusBadge from '../StatusBadge';

const money = (n: unknown) => `${Number(n || 0).toLocaleString('ru')} ₽`;

const fields: FieldConfig[] = [
  { key: 'title', label: 'Отчёт' },
  { key: 'period', label: 'Период' },
  { key: 'type', label: 'Тип', type: 'status', options: [
    { value: 'daily', label: 'День' },
    { value: 'weekly', label: 'Неделя' },
    { value: 'monthly', label: 'Месяц' },
  ] },
  { key: 'orders', label: 'Заказов', type: 'number' },
  { key: 'revenue', label: 'Выручка', type: 'number', render: (r) => money(r.revenue) },
  { key: 'expenses', label: 'Расходы', type: 'number', hideInTable: true },
  { key: 'profit', label: 'Прибыль', type: 'number', render: (r) => <span className="text-emerald-400 font-medium">{money(r.profit)}</span> },
  { key: 'avg_check', label: 'Средний чек', type: 'number', hideInTable: true },
  { key: 'created_at', label: 'Сформирован', hideInForm: true, hideInTable: true },
];

const ReportsSection = () => (
  <CrudSection
    title="Отчёты" subtitle="Финансовая и операционная отчётность" icon="FileBarChart"
    service={reportsService} fields={fields}
    searchKeys={['title', 'period']}
    stats={(rows) => {
      const revenue = rows.reduce((s, r) => s + Number(r.revenue || 0), 0);
      const profit = rows.reduce((s, r) => s + Number(r.profit || 0), 0);
      const orders = rows.reduce((s, r) => s + Number(r.orders || 0), 0);
      return (
        <StatGrid items={[
          { label: 'Отчётов', value: String(rows.length), icon: 'FileBarChart' },
          { label: 'Суммарная выручка', value: money(revenue), icon: 'Wallet', color: 'text-emerald-400' },
          { label: 'Суммарная прибыль', value: money(profit), icon: 'TrendingUp', color: 'text-primary' },
          { label: 'Заказов учтено', value: String(orders), icon: 'ClipboardList', color: 'text-accent' },
        ]} />
      );
    }}
    renderDetails={(r) => {
      const marginPct = Number(r.revenue) ? Math.round((Number(r.profit) / Number(r.revenue)) * 100) : 0;
      return (
        <div className="space-y-4 py-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xl font-display font-bold">{r.title}</p>
              <p className="text-sm text-muted-foreground">{r.period}</p>
            </div>
            <StatusBadge value={r.type} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <SectionCard title="Финансовые итоги" icon="Wallet">
              <InfoRow label="Выручка" value={<span className="text-emerald-400">{money(r.revenue)}</span>} icon="TrendingUp" />
              <InfoRow label="Расходы" value={<span className="text-red-400">{money(r.expenses)}</span>} icon="TrendingDown" />
              <InfoRow label="Чистая прибыль" value={<span className="text-primary font-semibold">{money(r.profit)}</span>} icon="Coins" />
              <InfoRow label="Рентабельность" value={`${marginPct}%`} icon="Percent" />
            </SectionCard>

            <SectionCard title="Операционные показатели" icon="Activity">
              <InfoRow label="Заказов выполнено" value={r.orders} icon="ClipboardCheck" />
              <InfoRow label="Средний чек" value={money(r.avg_check)} icon="Receipt" />
              <InfoRow label="Выручка на заказ" value={money(r.orders ? Math.round(Number(r.revenue) / r.orders) : 0)} icon="Divide" />
              <InfoRow label="Сформирован" value={r.created_at} icon="CalendarDays" />
            </SectionCard>
          </div>

          <SectionCard title="Структура выручки" icon="PieChart">
            <MeterRow label="Доля прибыли в выручке" value={marginPct} max={100} suffix="%" />
            <MeterRow label="Доля расходов в выручке" value={Number(r.revenue) ? Math.round((Number(r.expenses) / Number(r.revenue)) * 100) : 0} max={100} suffix="%" />
          </SectionCard>

          <SectionCard title="Вывод" icon="Lightbulb">
            <p className="text-sm text-muted-foreground">
              {marginPct >= 50 ? 'Отличная рентабельность периода — бизнес работает эффективно.'
                : marginPct >= 30 ? 'Хорошие показатели, есть потенциал для роста маржи.'
                : 'Рентабельность ниже целевой — стоит проанализировать расходы.'}
            </p>
          </SectionCard>

          <SectionCard title="Тип отчётности" icon="FileText">
            <InfoRow label="Период агрегации" value={r.type === 'daily' ? 'Ежедневный' : r.type === 'weekly' ? 'Еженедельный' : 'Ежемесячный'} />
          </SectionCard>
        </div>
      );
    }}
  />
);

export default ReportsSection;