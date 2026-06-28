import {
  Order, Client, Device, Master, Service, Part, Report, Equipment, User,
} from './types';

export const mockUsers: User[] = [
  { id: 1, name: 'Алексей Воронов', email: 'voronov@techfix.ru', role: 'admin', status: 'active', lastLogin: '28.06.2026 09:14' },
  { id: 2, name: 'Марина Соколова', email: 'sokolova@techfix.ru', role: 'manager', status: 'active', lastLogin: '28.06.2026 08:50' },
  { id: 3, name: 'Дмитрий Кузнецов', email: 'kuznetsov@techfix.ru', role: 'master', status: 'active', lastLogin: '27.06.2026 18:22' },
  { id: 4, name: 'Ольга Никитина', email: 'nikitina@techfix.ru', role: 'manager', status: 'blocked', lastLogin: '20.06.2026 11:05' },
  { id: 5, name: 'Сергей Павлов', email: 'pavlov@techfix.ru', role: 'master', status: 'active', lastLogin: '28.06.2026 07:40' },
];

export const mockOrders: Order[] = [
  { id: 1, number: 'ЗК-1042', client: 'Иван Петров', device: 'Ноутбук ASUS ROG', problem: 'Не включается, нет питания', master: 'Дмитрий Кузнецов', status: 'repair', price: 6500, createdAt: '25.06.2026', deadline: '30.06.2026' },
  { id: 2, number: 'ЗК-1043', client: 'ООО «Стройсервис»', device: 'ПК HP ProDesk', problem: 'Перегрев, замена термопасты', master: 'Сергей Павлов', status: 'diagnostics', price: 2200, createdAt: '26.06.2026', deadline: '29.06.2026' },
  { id: 3, number: 'ЗК-1044', client: 'Анна Смирнова', device: 'MacBook Air M1', problem: 'Замена аккумулятора', master: 'Дмитрий Кузнецов', status: 'waiting', price: 9800, createdAt: '26.06.2026', deadline: '02.07.2026' },
  { id: 4, number: 'ЗК-1045', client: 'Михаил Орлов', device: 'Ноутбук Lenovo IdeaPad', problem: 'Залит клавиатуру жидкостью', master: 'Сергей Павлов', status: 'new', price: 0, createdAt: '28.06.2026', deadline: '03.07.2026' },
  { id: 5, number: 'ЗК-1041', client: 'Екатерина Лебедева', device: 'Моноблок Dell', problem: 'Замена жёсткого диска на SSD', master: 'Дмитрий Кузнецов', status: 'issued', price: 7400, createdAt: '20.06.2026', deadline: '24.06.2026' },
];

export const mockClients: Client[] = [
  { id: 1, name: 'Иван Петров', phone: '+7 (912) 345-67-89', email: 'petrov@mail.ru', ordersCount: 4, totalSpent: 24500, type: 'individual', createdAt: '12.01.2025' },
  { id: 2, name: 'ООО «Стройсервис»', phone: '+7 (495) 778-22-10', email: 'office@stroyservice.ru', ordersCount: 12, totalSpent: 145000, type: 'company', createdAt: '03.09.2024' },
  { id: 3, name: 'Анна Смирнова', phone: '+7 (903) 111-44-55', email: 'smirnova.a@gmail.com', ordersCount: 2, totalSpent: 18600, type: 'individual', createdAt: '21.03.2025' },
  { id: 4, name: 'Михаил Орлов', phone: '+7 (921) 999-00-12', email: 'orlov.m@yandex.ru', ordersCount: 1, totalSpent: 0, type: 'individual', createdAt: '28.06.2026' },
  { id: 5, name: 'Екатерина Лебедева', phone: '+7 (916) 234-88-77', email: 'lebedeva@mail.ru', ordersCount: 6, totalSpent: 52300, type: 'individual', createdAt: '15.11.2024' },
];

export const mockDevices: Device[] = [
  { id: 1, type: 'Ноутбук', brand: 'ASUS', model: 'ROG Strix G15', serial: 'AS2024X9981', client: 'Иван Петров', status: 'in_service' },
  { id: 2, type: 'Системный блок', brand: 'HP', model: 'ProDesk 400 G7', serial: 'HP7781220K', client: 'ООО «Стройсервис»', status: 'in_service' },
  { id: 3, type: 'Ноутбук', brand: 'Apple', model: 'MacBook Air M1', serial: 'FVFXC2LMQ6L', client: 'Анна Смирнова', status: 'in_service' },
  { id: 4, type: 'Ноутбук', brand: 'Lenovo', model: 'IdeaPad 3 15', serial: 'LN551203998', client: 'Михаил Орлов', status: 'in_service' },
  { id: 5, type: 'Моноблок', brand: 'Dell', model: 'OptiPlex 5400', serial: 'DL90021XX', client: 'Екатерина Лебедева', status: 'returned' },
];

export const mockMasters: Master[] = [
  { id: 1, name: 'Дмитрий Кузнецов', specialization: 'Ноутбуки, Apple', phone: '+7 (905) 200-10-20', activeOrders: 3, rating: 4.9, completedOrders: 312, status: 'busy' },
  { id: 2, name: 'Сергей Павлов', specialization: 'ПК, материнские платы', phone: '+7 (905) 200-30-40', activeOrders: 2, rating: 4.7, completedOrders: 198, status: 'busy' },
  { id: 3, name: 'Артём Белов', specialization: 'Восстановление данных', phone: '+7 (905) 200-50-60', activeOrders: 0, rating: 4.8, completedOrders: 145, status: 'available' },
  { id: 4, name: 'Игорь Зайцев', specialization: 'Пайка, чип-сервис', phone: '+7 (905) 200-70-80', activeOrders: 1, rating: 5.0, completedOrders: 256, status: 'available' },
  { id: 5, name: 'Роман Гусев', specialization: 'Мониторы, периферия', phone: '+7 (905) 200-90-00', activeOrders: 0, rating: 4.6, completedOrders: 87, status: 'vacation' },
];

export const mockServices: Service[] = [
  { id: 1, name: 'Диагностика устройства', category: 'Диагностика', price: 0, duration: '30 мин', popular: true },
  { id: 2, name: 'Замена термопасты', category: 'Обслуживание', price: 1500, duration: '1 ч', popular: true },
  { id: 3, name: 'Установка SSD', category: 'Апгрейд', price: 1200, duration: '40 мин', popular: true },
  { id: 4, name: 'Чистка от пыли', category: 'Обслуживание', price: 1800, duration: '1.5 ч', popular: false },
  { id: 5, name: 'Восстановление данных', category: 'Данные', price: 5000, duration: '1-3 дня', popular: false },
];

export const mockParts: Part[] = [
  { id: 1, name: 'SSD Samsung 970 EVO 500GB', category: 'Накопители', sku: 'SSD-SM-500', price: 4900, stock: 14, minStock: 5, supplier: 'ДНС' },
  { id: 2, name: 'Аккумулятор MacBook Air M1', category: 'Питание', sku: 'BAT-MBA-M1', price: 6200, stock: 3, minStock: 4, supplier: 'iParts' },
  { id: 3, name: 'Термопаста Arctic MX-6', category: 'Расходники', sku: 'TP-MX6', price: 850, stock: 42, minStock: 10, supplier: 'Ситилинк' },
  { id: 4, name: 'Клавиатура Lenovo IdeaPad 3', category: 'Периферия', sku: 'KB-LN-IP3', price: 2300, stock: 7, minStock: 3, supplier: 'iParts' },
  { id: 5, name: 'Оперативная память DDR4 8GB', category: 'Память', sku: 'RAM-DDR4-8', price: 1900, stock: 2, minStock: 6, supplier: 'ДНС' },
];

export const mockReports: Report[] = [
  { id: 1, title: 'Отчёт за июнь 2026', period: 'Июнь 2026', revenue: 487600, orders: 142, type: 'monthly', createdAt: '28.06.2026' },
  { id: 2, title: 'Отчёт за 26 неделю', period: '22–28 июня', revenue: 118400, orders: 34, type: 'weekly', createdAt: '28.06.2026' },
  { id: 3, title: 'Отчёт за май 2026', period: 'Май 2026', revenue: 521300, orders: 158, type: 'monthly', createdAt: '01.06.2026' },
  { id: 4, title: 'Отчёт за 27 июня', period: '27 июня', revenue: 24800, orders: 7, type: 'daily', createdAt: '27.06.2026' },
  { id: 5, title: 'Отчёт за квартал II', period: 'Апрель–Июнь', revenue: 1492000, orders: 458, type: 'monthly', createdAt: '28.06.2026' },
];

export const mockEquipment: Equipment[] = [
  { id: 1, name: 'Паяльная станция Lukey 852D+', inventory: 'ИНВ-001', location: 'Цех №1', condition: 'working', assignedTo: 'Игорь Зайцев', purchaseDate: '14.02.2023' },
  { id: 2, name: 'Микроскоп Saike 7050', inventory: 'ИНВ-002', location: 'Цех №1', condition: 'working', assignedTo: 'Игорь Зайцев', purchaseDate: '03.05.2023' },
  { id: 3, name: 'Мультиметр Fluke 17B+', inventory: 'ИНВ-003', location: 'Цех №2', condition: 'maintenance', assignedTo: 'Сергей Павлов', purchaseDate: '21.08.2022' },
  { id: 4, name: 'Ультразвуковая ванна', inventory: 'ИНВ-004', location: 'Цех №2', condition: 'working', assignedTo: 'Дмитрий Кузнецов', purchaseDate: '10.01.2024' },
  { id: 5, name: 'Тестер блоков питания', inventory: 'ИНВ-005', location: 'Склад', condition: 'broken', assignedTo: '—', purchaseDate: '17.06.2021' },
];
