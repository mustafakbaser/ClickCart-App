import { supabase } from '../supabase';
import { AuthResponse } from './types';
import { createProfile } from './profile';

export async function signUp(
  email: string, 
  password: string, 
  fullName: string
): Promise<AuthResponse> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user data returned');

    const profileError = await createProfile({
      id: authData.user.id,
      full_name: fullName,
      email: email,
      updated_at: new Date().toISOString(),
    });

    if (profileError) throw profileError;

    return { 
      user: authData.user, 
      error: null,
      message: 'Please check your email for confirmation link'
    };
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      user: null, 
      error: error as Error
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        return { 
          user: null, 
          error: new Error('Please check your email and confirm your account')
        };
      }
      throw error;
    }

    if (!data.user) throw new Error('No user data returned');

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      user: null, 
      error: error as Error
    };
  }
}

export async function signOut(): Promise<Error | null> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return null;
  } catch (error) {
    console.error('Sign out error:', error);
    return error as Error;
  }
}