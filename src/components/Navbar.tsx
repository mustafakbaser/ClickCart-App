import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { Button } from './ui/Button';
import { ShoppingCart, User, LogOut, Store } from 'lucide-react';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.total);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">E-Store</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-700 hover:text-gray-900">
              Ürünler
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                  <User className="h-5 w-5" />
                  <span>{user.full_name}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Çıkış</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Giriş Yap
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}