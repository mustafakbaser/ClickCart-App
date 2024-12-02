export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at: string;
}

export interface ProfileUpdate {
  full_name?: string;
  phone?: string;
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

export interface Address {
  id: string;
  user_id: string;
  title: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface PaymentMethod {
  id: string;
  user_id: string;
  card_brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

export interface NotificationSettings {
  order_updates: boolean;
  promotions: boolean;
  newsletter: boolean;
  price_alerts: boolean;
}