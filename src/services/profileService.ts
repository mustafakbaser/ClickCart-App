import { supabase } from '../lib/supabase';
import { Profile, ProfileUpdate } from '../types/profile';

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
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function updateProfile(userId: string, updates: ProfileUpdate): Promise<Error | null> {
  try {
    // First update the profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (profileError) throw profileError;

    // Then update the user metadata
    const { error: userError } = await supabase.auth.updateUser({
      data: updates
    });

    if (userError) throw userError;
    
    return null;
  } catch (error) {
    console.error('Error updating profile:', error);
    return error as Error;
  }
}

export async function uploadAvatar(userId: string, file: File): Promise<string | Error> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const avatarUrl = data.publicUrl;
    
    const updateError = await updateProfile(userId, { avatar_url: avatarUrl });
    if (updateError) throw updateError;

    return avatarUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return error as Error;
  }
}