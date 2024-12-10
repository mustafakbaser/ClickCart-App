import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { NavLinks } from './navigation/NavLinks';
import { MobileMenu } from './navigation/MobileMenu';
import { CartPreview } from './navigation/CartPreview';
import { SearchBar } from './navigation/SearchBar';
import { UserMenu } from './navigation/UserMenu';
import { Store } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
        : 'bg-white dark:bg-gray-900'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Store className="h-8 w-8 text-brand-primary group-hover:text-brand-dark transition-colors" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ClickCart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <NavLinks />
            <SearchBar />
            <CartPreview items={cartItems} />
            <UserMenu user={user} />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu 
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            user={user}
            cartItems={cartItems}
          />
        </div>
      </div>
    </nav>
  );
}