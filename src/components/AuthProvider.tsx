import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loadCart = useCartStore((state) => state.loadCart);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };

    initAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user, loadCart]);

  return <>{children}</>;
}