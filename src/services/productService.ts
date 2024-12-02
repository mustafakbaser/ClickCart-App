import { Product } from '../types';
import { mockProducts } from '../lib/supabase';

export async function getProducts(): Promise<Product[]> {
  // Simüle edilmiş API gecikmesi
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
}

export async function getProduct(id: string): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const product = mockProducts.find(p => p.id === id);
  if (!product) throw new Error('Product not found');
  return product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts.filter(p => p.category === category);
}