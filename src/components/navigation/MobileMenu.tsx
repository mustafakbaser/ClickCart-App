import { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, ShoppingCart, User as UserIcon } from 'lucide-react';
import { CartItem } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  user: User | null;
  cartItems: CartItem[];
}

export function MobileMenu({ isOpen, onToggle, user, cartItems }: MobileMenuProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="lg:hidden">
      <button
        onClick={onToggle}
        className="p-2 text-gray-700 dark:text-gray-200"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Menu
                </span>
                <button
                  onClick={onToggle}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="px-2 py-4">
                  {/* User Section */}
                  <div className="px-3 mb-6">
                    {user ? (
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.user_metadata?.full_name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-primary hover:bg-brand-dark transition-colors"
                        onClick={onToggle}
                      >
                        Sign In
                      </Link>
                    )}
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {['Electronics', 'Fashion', 'Home & Living'].map((category) => (
                      <Link
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        onClick={onToggle}
                      >
                        <span>{category}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>

                  {/* Cart Preview */}
                  {cartItems.length > 0 && (
                    <div className="mt-6 px-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <ShoppingCart className="h-5 w-5 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Cart ({totalItems})
                          </span>
                        </div>
                        <Link
                          to="/cart"
                          className="text-sm text-brand-primary hover:text-brand-dark"
                          onClick={onToggle}
                        >
                          View All
                        </Link>
                      </div>

                      <div className="space-y-2">
                        {cartItems.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="h-10 w-10 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.quantity} × {formatCurrency(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}