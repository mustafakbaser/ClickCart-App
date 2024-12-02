import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface CartPreviewProps {
  items: CartItem[];
}

export function CartPreview({ items }: CartPreviewProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="relative group">
      <Link to="/cart" className="relative p-2">
        <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>

      {items.length > 0 && (
        <div className="invisible group-hover:visible absolute right-0 w-80 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
          <div className="p-4">
            <div className="space-y-3">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 3 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                And {items.length - 3} more items...
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700 dark:text-gray-200">Subtotal</span>
                <span className="text-brand-primary">{formatCurrency(subtotal)}</span>
              </div>
              
              <Link
                to="/cart"
                className="mt-4 block w-full py-2 px-4 bg-brand-primary text-white text-center rounded-lg hover:bg-brand-dark transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}