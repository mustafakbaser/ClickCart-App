import { supabase } from '../lib/supabase';
import { Order } from '../types/profile';

export async function getOrders(userId: string): Promise<Order[]> {
  try {
    // First fetch orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, user_id, total, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (ordersError) throw ordersError;
    if (!orders) return [];

    // Then fetch order items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const { data: items, error: itemsError } = await supabase
          .from('order_items')
          .select('product_id, quantity, price')
          .eq('order_id', order.id);

        if (itemsError) throw itemsError;

        return {
          ...order,
          items: items || []
        };
      })
    );

    return ordersWithItems;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}