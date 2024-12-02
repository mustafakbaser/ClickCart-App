import { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { User as UserIcon, LogOut, Heart, Package } from 'lucide-react';

interface UserMenuProps {
  user: User | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const signOut = useAuthStore((state) => state.signOut);

  if (!user) {
    return (
      <Link
        to="/login"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-primary hover:bg-brand-dark transition-colors"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
        <UserIcon className="h-5 w-5" />
        <span className="text-sm font-medium">{user.user_metadata?.full_name}</span>
      </button>

      <div className="invisible group-hover:visible absolute right-0 w-56 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
        <div className="p-2">
          <Link
            to="/profile"
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </Link>

          <Link
            to="/orders"
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Package className="h-4 w-4" />
            <span>Orders</span>
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Heart className="h-4 w-4" />
            <span>Wishlist</span>
          </Link>

          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

          <button
            onClick={() => signOut()}
            className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}