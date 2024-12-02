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

// Sample Products with diverse categories
export const mockProducts = [
  // Electronics
  {
    id: '1',
    title: 'Sony WH-1000XM4 Wireless Headphones',
    description: 'Industry-leading noise cancellation with Dual Noise Sensor technology',
    price: 349.99,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50
  },
  {
    id: '2',
    title: 'Apple iPad Air',
    description: '10.9-inch Liquid Retina display with True Tone and P3 wide color',
    price: 599.99,
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    category: 'Electronics',
    stock: 30
  },
  {
    id: '3',
    title: 'DJI Mini 3 Pro Drone',
    description: 'Lightweight and portable drone with 4K camera and obstacle avoidance',
    price: 759.99,
    image_url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
    category: 'Electronics',
    stock: 15
  },

  // Fashion
  {
    id: '4',
    title: 'Premium Leather Jacket',
    description: 'Handcrafted genuine leather jacket with quilted lining',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Fashion',
    stock: 25
  },
  {
    id: '5',
    title: 'Designer Sunglasses',
    description: 'UV protection polarized sunglasses with premium metal frame',
    price: 159.99,
    image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    category: 'Fashion',
    stock: 40
  },
  {
    id: '6',
    title: 'Luxury Watch Collection',
    description: 'Swiss-made automatic movement with sapphire crystal',
    price: 1299.99,
    image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
    category: 'Fashion',
    stock: 10
  },

  // Home & Living
  {
    id: '7',
    title: 'Smart Home Security System',
    description: 'Complete home security with 4K cameras and mobile app control',
    price: 449.99,
    image_url: 'https://images.unsplash.com/photo-1558002038-bb4237b54c7f?w=500',
    category: 'Home & Living',
    stock: 20
  },
  {
    id: '8',
    title: 'Ergonomic Office Chair',
    description: 'Premium mesh back with lumbar support and adjustable features',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1505797149-0f7d06f0d90c?w=500',
    category: 'Home & Living',
    stock: 35
  },
  {
    id: '9',
    title: 'Smart Coffee Maker',
    description: 'WiFi-enabled 12-cup coffee maker with mobile app control',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    category: 'Home & Living',
    stock: 45
  },

  // Sports & Outdoors
  {
    id: '10',
    title: 'Carbon Fiber Mountain Bike',
    description: 'Professional-grade mountain bike with 27-speed Shimano gears',
    price: 1899.99,
    image_url: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500',
    category: 'Sports & Outdoors',
    stock: 8
  },
  {
    id: '11',
    title: 'Camping Tent Set',
    description: '4-person waterproof tent with built-in LED lighting',
    price: 249.99,
    image_url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500',
    category: 'Sports & Outdoors',
    stock: 30
  },
  {
    id: '12',
    title: 'Smart Fitness Watch',
    description: 'GPS-enabled fitness tracker with heart rate monitoring',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
    category: 'Sports & Outdoors',
    stock: 55
  },

  // Books & Media
  {
    id: '13',
    title: 'E-Reader Premium',
    description: '7-inch HD display with adjustable warm light and waterproof design',
    price: 179.99,
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    category: 'Books & Media',
    stock: 40
  },
  {
    id: '14',
    title: 'Wireless Turntable',
    description: 'Bluetooth-enabled record player with built-in speakers',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500',
    category: 'Books & Media',
    stock: 15
  },
  {
    id: '15',
    title: 'Gaming Console Bundle',
    description: '4K gaming console with two controllers and three games',
    price: 499.99,
    image_url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500',
    category: 'Books & Media',
    stock: 20
  }
];