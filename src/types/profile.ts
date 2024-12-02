export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  created_at?: string;
  updated_at: string;
}

export interface ProfileUpdate {
  full_name?: string;
  avatar_url?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
}