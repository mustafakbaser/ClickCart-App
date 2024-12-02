import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { getProfile } from './profile';

export async function getCurrentSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getCurrentSession();
    if (!session) return null;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const profile = await getProfile(user.id);
    if (profile) {
      user.user_metadata = {
        ...user.user_metadata,
        ...profile,
      };
    }

    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}