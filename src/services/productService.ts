import { supabase } from '../lib/supabase';
import { Product, SortOption } from '../types';

interface GetProductsOptions {
  page?: number;
  pageSize?: number;
  sortBy?: SortOption;
  category?: string;
  search?: string;
}

interface ProductsResponse {
  data: Product[];
  totalCount: number;
}

export async function getProducts(options: GetProductsOptions = {}): Promise<ProductsResponse> {
  const {
    page = 1,
    pageSize = 12,
    sortBy = 'newest',
    category,
    search,
  } = options;

  try {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    // Apply category filter
    if (category) {
      query = query.ilike('category', `%${category}%`);
    }

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price-desc':
        query = query.order('price', { ascending: false });
        break;
      case 'title-asc':
        query = query.order('title', { ascending: true });
        break;
      case 'title-desc':
        query = query.order('title', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    const start = (page - 1) * pageSize;
    query = query.range(start, start + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      totalCount: count || 0,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function updateProductStock(id: string, quantity: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('products')
      .update({ stock: quantity })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
}