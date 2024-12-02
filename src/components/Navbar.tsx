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
    <nav className="bg-[#003840] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-[#02A676]" />
            <span className="text-xl font-bold text-white">ClickCart</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/products" className="text-gray-100 hover:text-[#02A676] transition-colors">
              Products
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-100 hover:text-[#02A676] transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#02A676] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-1 text-gray-100 hover:text-[#02A676] transition-colors">
                  <User className="h-5 w-5" />
                  <span>{user.user_metadata?.full_name}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="border-[#02A676] text-[#02A676] hover:bg-[#02A676] hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm" className="bg-[#02A676] hover:bg-[#007369] text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}