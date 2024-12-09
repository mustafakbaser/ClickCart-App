import { create } from 'zustand';
import { CartItem, Product } from '../types';
import { 
  getCart, 
  addToCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart as clearCartService 
} from '../services/cartService';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  total: number;
  loadCart: () => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  total: 0,

  loadCart: async () => {
    set({ loading: true, error: null });
    try {
      const items = await getCart();
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      set({ items, total, loading: false });
    } catch (error) {
      console.error('Cart loading error:', error);
      set({ error: 'Failed to load cart', loading: false });
    }
  },

  addItem: async (product: Product, quantity: number = 1) => {
    set({ loading: true, error: null });
    try {
      const success = await addToCart(product, quantity);
      if (success) {
        await get().loadCart();
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      set({ error: 'Failed to add item to cart', loading: false });
    }
  },

  removeItem: async (productId: string) => {
    set({ loading: true, error: null });
    try {
      const success = await removeFromCart(productId);
      if (success) {
        await get().loadCart();
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      set({ error: 'Failed to remove item from cart', loading: false });
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    set({ loading: true, error: null });
    try {
      const success = await updateCartItemQuantity(productId, quantity);
      if (success) {
        await get().loadCart();
      } else {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      set({ error: 'Failed to update quantity', loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      const success = await clearCartService();
      if (success) {
        set({ items: [], total: 0, loading: false });
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      set({ error: 'Failed to clear cart', loading: false });
    }
  },
}));