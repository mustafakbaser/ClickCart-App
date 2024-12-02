import { User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: Error | null;
  message?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at: string;
}

export interface ProfileUpdate {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}