import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface StatItem {
  label: string;
  value: string;
  icon: string;
  hint?: string;
  color?: string;
}

export function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <Card key={s.label} className="relative overflow-hidden group hover:border-primary/40 transition">
          <div className="absolute -right-5 -top-5 w-16 h-16 rounded-full bg-primary/5 group-hover:bg-primary/10 transition" />
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Icon name={s.icon} size={18} className={s.color ?? 'text-primary'} />
              </div>
              {s.hint && <span className="text-[11px] text-muted-foreground">{s.hint}</span>}
            </div>
            <p className="text-xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function InfoRow({ label, value, icon }: { label: string; value: React.ReactNode; icon?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        {icon && <Icon name={icon} size={15} className="text-primary/70" />}{label}
      </span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}

export function MeterRow({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}{suffix}</span>
      </div>
      <Progress value={pct} className={cn('h-2')} />
    </div>
  );
}

export function SectionCard({ title, icon, children, className }: { title: string; icon: string; children: React.ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="pt-5">
        <p className="font-display font-semibold flex items-center gap-2 mb-3 text-sm">
          <Icon name={icon} size={16} className="text-primary" /> {title}
        </p>
        {children}
      </CardContent>
    </Card>
  );
}
