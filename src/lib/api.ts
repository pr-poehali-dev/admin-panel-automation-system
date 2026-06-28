import type { Order, Client, Master, Device, Service, Part, Report, Equipment, User } from './types';

const CRUD_URL = 'https://functions.poehali.dev/4f2e4290-6432-47f0-a3f6-1b28e86654f0';
const AUTH_URL = 'https://functions.poehali.dev/0de25892-1164-41d4-84af-c0751e75c2a6';

export interface Entity { id: number; [key: string]: unknown }

export type EntityName =
  | 'orders' | 'clients' | 'masters' | 'devices' | 'services'
  | 'parts' | 'reports' | 'equipment' | 'users';

export class ApiService<T extends Entity> {
  constructor(private entity: EntityName) {}

  async getAll(): Promise<T[]> {
    const res = await fetch(`${CRUD_URL}?entity=${this.entity}`);
    const data = await res.json();
    return (data.items ?? []) as T[];
  }

  async create(item: Partial<T>): Promise<T> {
    const res = await fetch(`${CRUD_URL}?entity=${this.entity}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return res.json();
  }

  async update(id: number, patch: Partial<T>): Promise<T> {
    const res = await fetch(`${CRUD_URL}?entity=${this.entity}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...patch, id }),
    });
    return res.json();
  }

  async remove(id: number): Promise<boolean> {
    const res = await fetch(`${CRUD_URL}?entity=${this.entity}&id=${id}`, { method: 'DELETE' });
    return res.ok;
  }
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'master';
  status: string;
}

export async function apiLogin(email: string, password: string): Promise<{ user: AuthUser; token: string } | { error: string }> {
  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export const ordersService = new ApiService<Order & Entity>('orders');
export const clientsService = new ApiService<Client & Entity>('clients');
export const mastersService = new ApiService<Master & Entity>('masters');
export const devicesService = new ApiService<Device & Entity>('devices');
export const servicesService = new ApiService<Service & Entity>('services');
export const partsService = new ApiService<Part & Entity>('parts');
export const reportsService = new ApiService<Report & Entity>('reports');
export const equipmentService = new ApiService<Equipment & Entity>('equipment');
export const usersService = new ApiService<User & Entity>('users');