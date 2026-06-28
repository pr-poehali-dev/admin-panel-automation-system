export type Role = 'admin' | 'manager' | 'master';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: Role;
  status: 'active' | 'blocked';
  phone: string;
  position: string;
  last_login: string;
}

export type OrderStatus = 'new' | 'diagnostics' | 'repair' | 'waiting' | 'done' | 'issued';

export interface Order {
  id: number;
  number: string;
  client: string;
  device: string;
  problem: string;
  master: string;
  status: OrderStatus;
  price: number;
  prepayment: number;
  priority: string;
  diagnosis: string;
  created_at: string;
  deadline: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: 'individual' | 'company';
  orders_count: number;
  total_spent: number;
  discount: number;
  notes: string;
  created_at: string;
}

export interface Device {
  id: number;
  type: string;
  brand: string;
  model: string;
  serial: string;
  client: string;
  status: 'in_service' | 'returned' | 'in_stock';
  received_at: string;
  condition: string;
  accessories: string;
}

export interface Master {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  active_orders: number;
  completed_orders: number;
  rating: number;
  status: 'available' | 'busy' | 'vacation';
  experience_years: number;
  salary: number;
  hired_at: string;
}

export interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: string;
  popular: boolean;
  description: string;
  warranty_days: number;
}

export interface Part {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  min_stock: number;
  supplier: string;
  location: string;
}

export interface Report {
  id: number;
  title: string;
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  orders: number;
  avg_check: number;
  type: 'daily' | 'weekly' | 'monthly';
  created_at: string;
}

export interface Equipment {
  id: number;
  name: string;
  inventory: string;
  location: string;
  condition: 'working' | 'maintenance' | 'broken';
  assigned_to: string;
  purchase_date: string;
  price: number;
  last_service: string;
}
