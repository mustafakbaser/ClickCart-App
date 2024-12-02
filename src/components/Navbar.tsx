import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { Button } from './ui/Button';
import { ShoppingCart, User, LogOut, Store, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  { name: 'Electronics', href: '/products?category=Electronics' },
  { name: 'Fashion', href: '/products?category=Fashion' },
  { name: 'Home & Living', href: '/products?category=Home+%26+Living' },
  { name: 'Sports & Outdoors', href: '/products?category=Sports+%26+Outdoors' },
];

export function Navbar() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const cartItems = useCartStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled ? 'bg-[#003840]/95 backdrop-blur-sm shadow-md' : 'bg-[#003840]'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-[#02A676]" />
            <span className="text-xl font-bold text-white">ClickCart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-100 hover:text-[#02A676] transition-colors">
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center space-x-1 text-gray-100 hover:text-[#02A676] transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/products" className="text-gray-100 hover:text-[#02A676] transition-colors">
              All Products
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-100 hover:text-[#02A676] transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#02A676] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-100 hover:text-[#02A676] transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user.user_metadata?.full_name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-[#02A676] hover:bg-[#007369] text-white"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-100 hover:text-[#02A676]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-100 hover:text-[#02A676]">
                Home
              </Link>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center justify-between text-gray-100 hover:text-[#02A676]"
              >
                <span>Categories</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', isCategoryDropdownOpen && 'rotate-180')} />
              </button>
              
              {isCategoryDropdownOpen && (
                <div className="pl-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block text-gray-300 hover:text-[#02A676]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
              
              <Link to="/products" className="text-gray-100 hover:text-[#02A676]">
                All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}