import CrudSection, { FieldConfig } from '../CrudSection';
import { usersService } from '@/lib/crudService';

const fields: FieldConfig[] = [
  { key: 'name', label: 'Сотрудник' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Роль', type: 'status', options: [
    { value: 'admin', label: 'Администратор' },
    { value: 'manager', label: 'Менеджер' },
    { value: 'master', label: 'Мастер' },
  ] },
  { key: 'status', label: 'Доступ', type: 'status', options: [
    { value: 'active', label: 'Активен' },
    { value: 'blocked', label: 'Заблокирован' },
  ] },
  { key: 'lastLogin', label: 'Последний вход', hideInForm: true },
];

const UsersSection = () => (
  <CrudSection title="Пользователи" subtitle="Учётные записи и права доступа" icon="ShieldCheck"
    service={usersService} fields={fields} searchKeys={['name', 'email']} />
);

export default UsersSection;
