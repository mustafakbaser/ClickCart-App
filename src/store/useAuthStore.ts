import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { signIn, signUp, signOut, getCurrentUser } from '../lib/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user, error } = await signIn(email, password);
      
      if (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
      
      set({ user, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  signUp: async (email, password, fullName) => {
    set({ loading: true, error: null });
    try {
      const { user, error } = await signUp(email, password, fullName);
      
      if (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
      
      set({ user, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await signOut();
      set({ user: null, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const user = await getCurrentUser();
      set({ user, loading: false, error: null });
    } catch (error) {
      set({ user: null, loading: false, error: null });
    }
  },
}));