import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export async function updatePassword(currentPassword: string, newPassword: string): Promise<{ error: AuthError | null }> {
  try {
    // First verify the current password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: supabase.auth.getUser().then(({ data }) => data.user?.email || ''),
      password: currentPassword,
    });

    if (signInError) {
      return { error: new Error('Current password is incorrect') as AuthError };
    }

    // If current password is correct, update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) throw updateError;

    return { error: null };
  } catch (error) {
    console.error('Error updating password:', error);
    return { error: error as AuthError };
  }
}

export async function enable2FA(): Promise<{ error: AuthError | null; url?: string }> {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp'
    });

    if (error) throw error;

    return { error: null, url: data.totp.qr_code };
  } catch (error) {
    console.error('Error enabling 2FA:', error);
    return { error: error as AuthError };
  }
}

export async function verify2FACode(code: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.mfa.challenge({
      factorId: 'totp',
      code,
    });

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Error verifying 2FA code:', error);
    return { error: error as AuthError };
  }
}