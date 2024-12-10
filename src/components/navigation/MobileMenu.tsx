import { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, ShoppingCart, User as UserIcon, Smartphone, Laptop, Headphones, Shirt, Watch, Gem, Sofa, UtensilsCrossed, Wrench, Bike, Tent, Dumbbell } from 'lucide-react';
import { CartItem } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  user: User | null;
  cartItems: CartItem[];
}

const categories = [
  {
    name: 'Electronics',
    items: [
      { name: 'Smartphones', icon: Smartphone },
      { name: 'Laptops', icon: Laptop },
      { name: 'Audio', icon: Headphones },
    ]
  },
  {
    name: 'Fashion',
    items: [
      { name: 'Men', icon: Shirt },
      { name: 'Women', icon: Gem },
      { name: 'Accessories', icon: Watch },
    ]
  },
  {
    name: 'Home & Living',
    items: [
      { name: 'Furniture', icon: Sofa },
      { name: 'Kitchen', icon: UtensilsCrossed },
      { name: 'Tools', icon: Wrench },
    ]
  },
  {
    name: 'Sports & Outdoors',
    items: [
      { name: 'Fitness', icon: Dumbbell },
      { name: 'Outdoor', icon: Tent },
      { name: 'Cycling', icon: Bike },
    ]
  }
];

// Rest of the component code remains exactly the same
export function MobileMenu({ isOpen, onToggle, user, cartItems }: MobileMenuProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={onToggle}
        className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={onToggle}
            />
            
            <motion.div
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl z-50"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
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
                  {/* User Section */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    {user ? (
                      <div className="flex items-center space-x-3">
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

                  {/* Categories */}
                  <div className="p-4 space-y-6">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                          {category.name}
                        </h3>
                        <div className="space-y-2">
                          {category.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                to={`/products?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(item.name)}`}
                                className="flex items-center justify-between p-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                onClick={onToggle}
                              >
                                <div className="flex items-center space-x-3">
                                  <Icon className="h-5 w-5 text-brand-primary" />
                                  <span>{item.name}</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Preview */}
                  {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
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

                      <div className="space-y-3">
                        {cartItems.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="h-12 w-12 object-cover rounded"
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}