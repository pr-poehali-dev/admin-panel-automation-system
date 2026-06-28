import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const map: Record<string, { label: string; cls: string }> = {
  // orders
  new: { label: 'Новый', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  diagnostics: { label: 'Диагностика', cls: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  repair: { label: 'В ремонте', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  waiting: { label: 'Ожидание', cls: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  done: { label: 'Готов', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  issued: { label: 'Выдан', cls: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30' },
  // generic statuses
  active: { label: 'Активен', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  blocked: { label: 'Заблокирован', cls: 'bg-red-500/15 text-red-400 border-red-500/30' },
  available: { label: 'Свободен', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  busy: { label: 'Занят', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  vacation: { label: 'Отпуск', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  in_service: { label: 'В сервисе', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  returned: { label: 'Возвращено', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  in_stock: { label: 'На складе', cls: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30' },
  working: { label: 'Исправно', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  maintenance: { label: 'ТО', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  broken: { label: 'Неисправно', cls: 'bg-red-500/15 text-red-400 border-red-500/30' },
  individual: { label: 'Физлицо', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  company: { label: 'Компания', cls: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  admin: { label: 'Администратор', cls: 'bg-accent/20 text-accent border-accent/40' },
  manager: { label: 'Менеджер', cls: 'bg-primary/15 text-primary border-primary/40' },
  master: { label: 'Мастер', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  daily: { label: 'День', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  weekly: { label: 'Неделя', cls: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  monthly: { label: 'Месяц', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
};

const StatusBadge = ({ value }: { value: string }) => {
  const item = map[value] ?? { label: value, cls: '' };
  return <Badge variant="outline" className={cn('font-medium', item.cls)}>{item.label}</Badge>;
};

export default StatusBadge;
