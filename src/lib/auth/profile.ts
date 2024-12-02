import { supabase } from '../supabase';
import { Profile, ProfileUpdate } from './types';

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

export async function updateProfile(userId: string, updates: ProfileUpdate): Promise<Error | null> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;
    
    const { error: updateError } = await supabase.auth.updateUser({
      data: updates
    });

    if (updateError) throw updateError;
    
    return null;
  } catch (error) {
    console.error('Update profile error:', error);
    return error as Error;
  }
}

export async function createProfile(profile: Omit<Profile, 'created_at'>): Promise<Error | null> {
  try {
    const { error } = await supabase.from('profiles').upsert({
      ...profile,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return null;
  } catch (error) {
    console.error('Create profile error:', error);
    return error as Error;
  }
}