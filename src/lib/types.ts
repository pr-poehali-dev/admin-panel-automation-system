export type Role = 'admin' | 'manager' | 'master';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'blocked';
  lastLogin: string;
  avatar?: string;
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
  createdAt: string;
  deadline: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  type: 'individual' | 'company';
  createdAt: string;
}

export interface Device {
  id: number;
  type: string;
  brand: string;
  model: string;
  serial: string;
  client: string;
  status: 'in_service' | 'returned' | 'in_stock';
}

export interface Master {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  activeOrders: number;
  rating: number;
  completedOrders: number;
  status: 'available' | 'busy' | 'vacation';
}

export interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: string;
  popular: boolean;
}

export interface Part {
  id: number;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  minStock: number;
  supplier: string;
}

export interface Report {
  id: number;
  title: string;
  period: string;
  revenue: number;
  orders: number;
  type: 'daily' | 'weekly' | 'monthly';
  createdAt: string;
}

export interface Equipment {
  id: number;
  name: string;
  inventory: string;
  location: string;
  condition: 'working' | 'maintenance' | 'broken';
  assignedTo: string;
  purchaseDate: string;
}
