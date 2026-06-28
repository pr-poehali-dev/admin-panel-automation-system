import {
  mockOrders, mockClients, mockDevices, mockMasters,
  mockServices, mockParts, mockReports, mockEquipment, mockUsers,
} from './mockData';

export interface Entity { id: number; [key: string]: unknown }

function clone<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr));
}

function delay(ms = 250) {
  return new Promise((res) => setTimeout(res, ms));
}

export class CrudService<T extends Entity> {
  private data: T[];

  constructor(initial: T[]) {
    this.data = clone(initial);
  }

  async getAll(): Promise<T[]> {
    await delay();
    return clone(this.data);
  }

  async getById(id: number): Promise<T | undefined> {
    await delay();
    return this.data.find((i) => i.id === id);
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    await delay();
    const id = this.data.length ? Math.max(...this.data.map((i) => i.id)) + 1 : 1;
    const created = { ...item, id } as T;
    this.data.unshift(created);
    return clone([created])[0];
  }

  async update(id: number, patch: Partial<T>): Promise<T | undefined> {
    await delay();
    const idx = this.data.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    this.data[idx] = { ...this.data[idx], ...patch, id };
    return clone([this.data[idx]])[0];
  }

  async remove(id: number): Promise<boolean> {
    await delay();
    const before = this.data.length;
    this.data = this.data.filter((i) => i.id !== id);
    return this.data.length < before;
  }
}

export const ordersService = new CrudService(mockOrders);
export const clientsService = new CrudService(mockClients);
export const devicesService = new CrudService(mockDevices);
export const mastersService = new CrudService(mockMasters);
export const servicesService = new CrudService(mockServices);
export const partsService = new CrudService(mockParts);
export const reportsService = new CrudService(mockReports);
export const equipmentService = new CrudService(mockEquipment);
export const usersService = new CrudService(mockUsers);
