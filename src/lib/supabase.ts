import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Sample Products
export const mockProducts = [
  {
    id: '1',
    title: 'Wireless Kulaklık',
    description: 'Yüksek ses kalitesi, aktif gürültü önleme özelliği',
    price: 999.99,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Elektronik',
    stock: 50
  },
  {
    id: '2',
    title: 'Akıllı Saat',
    description: 'Fitness takibi, kalp ritmi ölçümü, bildirimler',
    price: 1299.99,
    image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    category: 'Elektronik',
    stock: 30
  },
  {
    id: '3',
    title: 'Deri Cüzdan',
    description: 'El yapımı, hakiki deri, çok bölmeli',
    price: 299.99,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    category: 'Aksesuar',
    stock: 100
  },
  {
    id: '4',
    title: 'Spor Ayakkabı',
    description: 'Hafif, nefes alabilen materyal, konforlu',
    price: 799.99,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Ayakkabı',
    stock: 45
  }
];