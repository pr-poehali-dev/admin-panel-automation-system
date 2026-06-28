import { useEffect, useState } from 'react';
import { CrudService, Entity } from '@/lib/crudService';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import StatusBadge from './StatusBadge';

export interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'status';
  options?: { value: string; label: string }[];
  hideInForm?: boolean;
  render?: (row: Record<string, unknown>) => React.ReactNode;
}

interface CrudSectionProps<T extends Entity> {
  title: string;
  subtitle: string;
  icon: string;
  service: CrudService<T>;
  fields: FieldConfig[];
  searchKeys: string[];
  canEdit?: boolean;
}

function CrudSection<T extends Entity>({
  title, subtitle, icon, service, fields, searchKeys, canEdit = true,
}: CrudSectionProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const formFields = fields.filter((f) => !f.hideInForm);

  const load = async () => {
    setLoading(true);
    setRows(await service.getAll());
    setLoading(false);
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openCreate = () => {
    const base: Record<string, unknown> = {};
    formFields.forEach((f) => { base[f.key] = f.type === 'number' ? 0 : ''; });
    setForm(base);
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (row: T) => {
    setForm({ ...row });
    setEditing(row);
    setDialogOpen(true);
  };

  const save = async () => {
    if (editing) {
      await service.update(editing.id, form as Partial<T>);
      toast.success('Запись обновлена');
    } else {
      await service.create(form as Omit<T, 'id'>);
      toast.success('Запись создана');
    }
    setDialogOpen(false);
    load();
  };

  const confirmDelete = async () => {
    if (deleteId != null) {
      await service.remove(deleteId);
      toast.success('Запись удалена');
      setDeleteId(null);
      load();
    }
  };

  const filtered = rows.filter((r) =>
    searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
            <Icon name={icon} size={22} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold tracking-wide">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate} className="gradient-brand text-primary-foreground font-medium hover:opacity-90">
                <Icon name="Plus" size={18} className="mr-1.5" /> Добавить
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto scrollbar-thin">
              <DialogHeader>
                <DialogTitle className="font-display">{editing ? 'Редактирование' : 'Новая запись'}</DialogTitle>
                <DialogDescription>{subtitle}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                {formFields.map((f) => (
                  <div key={f.key} className="grid gap-2">
                    <Label>{f.label}</Label>
                    {f.type === 'select' || f.type === 'status' ? (
                      <Select value={String(form[f.key] ?? '')} onValueChange={(v) => setForm((p) => ({ ...p, [f.key]: v }))}>
                        <SelectTrigger><SelectValue placeholder="Выберите..." /></SelectTrigger>
                        <SelectContent>
                          {f.options?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={f.type === 'number' ? 'number' : 'text'}
                        value={String(form[f.key] ?? '')}
                        onChange={(e) => setForm((p) => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                      />
                    )}
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button>
                <Button onClick={save} className="gradient-brand text-primary-foreground">Сохранить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="relative max-w-sm">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Поиск..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {fields.map((f) => <TableHead key={f.key}>{f.label}</TableHead>)}
                {canEdit && <TableHead className="text-right">Действия</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {fields.map((f) => <TableCell key={f.key}><Skeleton className="h-5 w-24" /></TableCell>)}
                    {canEdit && <TableCell><Skeleton className="h-5 w-16 ml-auto" /></TableCell>}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={fields.length + 1} className="text-center py-10 text-muted-foreground">
                    <Icon name="SearchX" size={32} className="mx-auto mb-2 opacity-50" />
                    Ничего не найдено
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.id} className="group">
                    {fields.map((f) => (
                      <TableCell key={f.key}>
                        {f.render ? f.render(row as Record<string, unknown>)
                          : f.type === 'status' ? <StatusBadge value={String(row[f.key])} />
                          : <span className={f.key === fields[0].key ? 'font-medium' : ''}>{String(row[f.key] ?? '')}</span>}
                      </TableCell>
                    ))}
                    {canEdit && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(row)}>
                            <Icon name="Pencil" size={15} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(row.id)}>
                            <Icon name="Trash2" size={15} />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AlertDialog open={deleteId != null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
            <AlertDialogDescription>Это действие нельзя отменить. Запись будет удалена безвозвратно.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CrudSection;
