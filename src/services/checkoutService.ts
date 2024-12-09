import { supabase } from '../lib/supabase';
import { CartItem } from '../types';
import { CheckoutFormData, OrderSummary } from '../types/checkout';
import * as orderService from './orderService';

export async function createOrder(
  items: CartItem[],
  formData: CheckoutFormData
): Promise<{ orderId: string } | { error: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const orderSummary = calculateOrderSummary(items, formData.shippingMethod);

    const result = await orderService.createOrder(user.id, {
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total: orderSummary.total,
      shipping_address: formData.shippingAddress,
      billing_address: formData.billingAddress.sameAsShipping 
        ? formData.shippingAddress 
        : formData.billingAddress,
      shipping_method: formData.shippingMethod,
      payment_method: formData.paymentMethod
    });

    // Clear cart after successful order
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    return { orderId: result.orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'Failed to create order' };
  }
}

export function calculateOrderSummary(
  items: CartItem[],
  shippingMethodId: string
): OrderSummary {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = getShippingCost(shippingMethodId);
  const tax = subtotal * 0.18; // 18% KDV

  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax
  };
}

export function getShippingMethods() {
  return [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivery in 4-5 business days',
      price: 9.99,
      estimatedDays: '4-5'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Delivery in 1-2 business days',
      price: 19.99,
      estimatedDays: '1-2'
    },
    {
      id: 'free',
      name: 'Free Shipping',
      description: 'Delivery in 5-7 business days',
      price: 0,
      estimatedDays: '5-7'
    }
  ];
}

function getShippingCost(methodId: string): number {
  const method = getShippingMethods().find(m => m.id === methodId);
  return method?.price ?? 0;
}