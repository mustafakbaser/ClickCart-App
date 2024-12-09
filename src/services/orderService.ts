import { supabase } from '../lib/supabase';
import { Order } from '../types/profile';

export async function getOrders(userId: string): Promise<Order[]> {
  try {
    // First fetch orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, user_id, total, status, created_at, shipping_address, shipping_method')
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

export async function createOrder(
  userId: string,
  orderData: {
    items: Array<{ product_id: string; quantity: number; price: number }>;
    total: number;
    shipping_address: any;
    billing_address: any;
    shipping_method: string;
    payment_method: string;
  }
) {
  try {
    // Start a Supabase transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total: orderData.total,
        shipping_address: orderData.shipping_address,
        billing_address: orderData.billing_address,
        shipping_method: orderData.shipping_method,
        payment_method: orderData.payment_method,
        status: 'pending'
      })
      .select('id')
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(
        orderData.items.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price
        }))
      );

    if (itemsError) throw itemsError;

    return { orderId: order.id };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}