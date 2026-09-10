/*
# Create Berry Dashboard tables (single-tenant, no auth)

1. New Tables
- `users` — user profiles for the Users management page
  - id (uuid PK), name, email, role, status, avatar_url, created_at
- `products` — product catalog for the Products management page
  - id (uuid PK), title, price, stock, category, image_url, created_at
- `orders` — order tracking for the Orders management page
  - id (uuid PK), order_id (human-readable), customer_name, total_amount, status, created_at

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated CRUD on all tables (single-tenant demo dashboard, data is intentionally shared/public).

3. Notes
- Uses gen_random_uuid() for all primary keys.
- created_at defaults to now() for all tables.
- Seed data inserted for each table so the dashboard is populated on first load.
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'User',
  status text NOT NULL DEFAULT 'Active',
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_users" ON users;
CREATE POLICY "anon_select_users" ON users FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_users" ON users;
CREATE POLICY "anon_insert_users" ON users FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_users" ON users;
CREATE POLICY "anon_update_users" ON users FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_users" ON users;
CREATE POLICY "anon_delete_users" ON users FOR DELETE
TO anon, authenticated USING (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  stock int NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'General',
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
TO anon, authenticated USING (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
TO anon, authenticated USING (true);

-- Seed users
INSERT INTO users (name, email, role, status, avatar_url) VALUES
('John Deo', 'john.deo@berry.com', 'Admin', 'Active', 'https://i.pravatar.cc/150?img=1'),
('Hema R', 'hema.r@berry.com', 'User', 'Active', 'https://i.pravatar.cc/150?img=5'),
('Ravi T', 'ravi.t@berry.com', 'Editor', 'Inactive', 'https://i.pravatar.cc/150?img=12'),
('Sara A', 'sara.a@berry.com', 'User', 'Active', 'https://i.pravatar.cc/150?img=9'),
('Kumar S', 'kumar.s@berry.com', 'Admin', 'Pending', 'https://i.pravatar.cc/150?img=15'),
('Asha M', 'asha.m@berry.com', 'User', 'Active', 'https://i.pravatar.cc/150?img=20'),
('Vijay P', 'vijay.p@berry.com', 'Editor', 'Inactive', 'https://i.pravatar.cc/150?img=33'),
('Nina D', 'nina.d@berry.com', 'User', 'Active', 'https://i.pravatar.cc/150?img=45'),
('Amit K', 'amit.k@berry.com', 'Admin', 'Active', 'https://i.pravatar.cc/150?img=52'),
('Leah B', 'leah.b@berry.com', 'User', 'Pending', 'https://i.pravatar.cc/150?img=48'),
('Tom H', 'tom.h@berry.com', 'Editor', 'Active', 'https://i.pravatar.cc/150?img=60'),
('Priya N', 'priya.n@berry.com', 'User', 'Active', 'https://i.pravatar.cc/150?img=47')
ON CONFLICT DO NOTHING;

-- Seed products
INSERT INTO products (title, price, stock, category, image_url) VALUES
('Apple Watch Series 7', 299.00, 45, 'Electronics', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Macbook Pro Air AMD', 1099.00, 23, 'Electronics', 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400'),
('iPhone 14 Pro Max', 1199.00, 67, 'Electronics', 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Sony WH-1000XM5', 399.00, 12, 'Audio', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'),
('iPad Air 5th Gen', 599.00, 34, 'Electronics', 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Samsung Galaxy S23', 899.00, 51, 'Electronics', 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Bose SoundLink Mini', 179.00, 8, 'Audio', 'https://images.pexels.com/photos/1666339/pexels-photo-1666339.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Fitbit Charge 5', 149.00, 89, 'Wearables', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Logitech MX Master 3', 99.00, 112, 'Accessories', 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Dell UltraSharp U2723QE', 689.00, 17, 'Electronics', 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400'),
('AirPods Pro 2', 249.00, 76, 'Audio', 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Keychron K2 Mechanical', 99.00, 31, 'Accessories', 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT DO NOTHING;

-- Seed orders
INSERT INTO orders (order_id, customer_name, total_amount, status) VALUES
('#ORD-001', 'John Deo', 299.00, 'Shipped'),
('#ORD-002', 'Hema R', 1099.00, 'Pending'),
('#ORD-003', 'Ravi T', 149.00, 'Cancelled'),
('#ORD-004', 'Sara A', 599.00, 'Shipped'),
('#ORD-005', 'Kumar S', 399.00, 'Pending'),
('#ORD-006', 'Asha M', 249.00, 'Shipped'),
('#ORD-007', 'Vijay P', 179.00, 'Cancelled'),
('#ORD-008', 'Nina D', 1199.00, 'Pending'),
('#ORD-009', 'Amit K', 689.00, 'Shipped'),
('#ORD-010', 'Leah B', 99.00, 'Shipped'),
('#ORD-011', 'Tom H', 899.00, 'Pending'),
('#ORD-012', 'Priya N', 149.00, 'Cancelled'),
('#ORD-013', 'John Deo', 299.00, 'Shipped'),
('#ORD-014', 'Sara A', 599.00, 'Shipped'),
('#ORD-015', 'Asha M', 399.00, 'Pending')
ON CONFLICT DO NOTHING;
