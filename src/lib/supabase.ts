import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Sample Products
export const mockProducts = [
  {
    id: '1',
    title: 'Wireless Headphones',
    description: 'High-quality sound with active noise cancellation',
    price: 999.99,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50
  },
  {
    id: '2',
    title: 'Smart Watch',
    description: 'Fitness tracking, heart rate monitoring, notifications',
    price: 1299.99,
    image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    category: 'Electronics',
    stock: 30
  },
  {
    id: '3',
    title: 'Leather Wallet',
    description: 'Handmade, genuine leather, multiple compartments',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    category: 'Accessories',
    stock: 100
  },
  {
    id: '4',
    title: 'Running Shoes',
    description: 'Lightweight, breathable material, comfortable fit',
    price: 799.99,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Footwear',
    stock: 45
  }
];