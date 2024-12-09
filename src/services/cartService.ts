import { supabase } from '../lib/supabase';
import { CartItem, Product } from '../types';

async function getUserCart() {
  const { data: cart, error } = await supabase
    .from('carts')
    .select('id')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Create a new cart if one doesn't exist
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: (await supabase.auth.getUser()).data.user?.id })
        .select('id')
        .single();

      if (createError) throw createError;
      return newCart;
    }
    throw error;
  }

  return cart;
}

export async function getCart(): Promise<CartItem[]> {
  try {
    const cart = await getUserCart();
    if (!cart) return [];

    const { data: items, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        products (
          id,
          title,
          description,
          price,
          image_url,
          stock
        )
      `)
      .eq('cart_id', cart.id);

    if (itemsError) throw itemsError;

    return (items || []).map((item: any) => ({
      id: item.products.id,
      quantity: item.quantity,
      title: item.products.title,
      description: item.products.description,
      price: item.products.price,
      image_url: item.products.image_url,
      stock: item.products.stock,
    }));
  } catch (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
}

export async function addToCart(product: Product, quantity: number = 1): Promise<boolean> {
  try {
    const cart = await getUserCart();
    if (!cart) return false;

    const { data: existingItem, error: existingError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cart.id)
      .eq('product_id', product.id)
      .maybeSingle();

    if (existingError) throw existingError;

    if (existingItem) {
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id: product.id,
          quantity,
        });

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
}

export async function updateCartItemQuantity(productId: string, quantity: number): Promise<boolean> {
  try {
    const cart = await getUserCart();
    if (!cart) return false;

    const { error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('cart_id', cart.id)
      .eq('product_id', productId);

    if (updateError) throw updateError;
    return true;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return false;
  }
}

export async function removeFromCart(productId: string): Promise<boolean> {
  try {
    const cart = await getUserCart();
    if (!cart) return false;

    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id)
      .eq('product_id', productId);

    if (deleteError) throw deleteError;
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
}

export async function clearCart(): Promise<boolean> {
  try {
    const cart = await getUserCart();
    if (!cart) return false;

    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (deleteError) throw deleteError;
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
}