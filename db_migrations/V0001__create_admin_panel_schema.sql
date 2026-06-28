CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'manager',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    phone VARCHAR(50),
    position VARCHAR(120),
    last_login VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(150),
    address VARCHAR(300),
    type VARCHAR(20) NOT NULL DEFAULT 'individual',
    orders_count INTEGER DEFAULT 0,
    total_spent INTEGER DEFAULT 0,
    discount INTEGER DEFAULT 0,
    notes TEXT,
    created_at VARCHAR(50)
);

CREATE TABLE masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    specialization VARCHAR(200),
    phone VARCHAR(50),
    email VARCHAR(150),
    active_orders INTEGER DEFAULT 0,
    completed_orders INTEGER DEFAULT 0,
    rating NUMERIC(3,1) DEFAULT 5.0,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    experience_years INTEGER DEFAULT 0,
    salary INTEGER DEFAULT 0,
    hired_at VARCHAR(50)
);

CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    type VARCHAR(80),
    brand VARCHAR(80),
    model VARCHAR(150),
    serial VARCHAR(120),
    client VARCHAR(200),
    status VARCHAR(20) NOT NULL DEFAULT 'in_service',
    received_at VARCHAR(50),
    condition VARCHAR(120),
    accessories VARCHAR(250)
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(120),
    price INTEGER DEFAULT 0,
    duration VARCHAR(80),
    popular BOOLEAN DEFAULT false,
    description TEXT,
    warranty_days INTEGER DEFAULT 0
);

CREATE TABLE parts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(120),
    sku VARCHAR(80),
    price INTEGER DEFAULT 0,
    cost INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 0,
    supplier VARCHAR(150),
    location VARCHAR(120)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    number VARCHAR(40) NOT NULL,
    client VARCHAR(200),
    device VARCHAR(200),
    problem TEXT,
    master VARCHAR(150),
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    price INTEGER DEFAULT 0,
    prepayment INTEGER DEFAULT 0,
    priority VARCHAR(20) DEFAULT 'normal',
    diagnosis TEXT,
    created_at VARCHAR(50),
    deadline VARCHAR(50)
);

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    period VARCHAR(120),
    revenue INTEGER DEFAULT 0,
    expenses INTEGER DEFAULT 0,
    profit INTEGER DEFAULT 0,
    orders INTEGER DEFAULT 0,
    avg_check INTEGER DEFAULT 0,
    type VARCHAR(20) DEFAULT 'monthly',
    created_at VARCHAR(50)
);

CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    inventory VARCHAR(80),
    location VARCHAR(120),
    condition VARCHAR(20) NOT NULL DEFAULT 'working',
    assigned_to VARCHAR(150),
    purchase_date VARCHAR(50),
    price INTEGER DEFAULT 0,
    last_service VARCHAR(50)
);