export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatar_url: string | null;
  created_at: string;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Cancelled';

export interface Order {
  id: string;
  order_id: string;
  customer_name: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  image_url: string | null;
  created_at: string;
}
