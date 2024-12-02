import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const categories = [
  {
    name: 'Electronics',
    href: '/products?category=Electronics',
    featured: [
      { name: 'Laptops', href: '/products?category=Electronics&subcategory=Laptops' },
      { name: 'Smartphones', href: '/products?category=Electronics&subcategory=Smartphones' },
      { name: 'Audio', href: '/products?category=Electronics&subcategory=Audio' },
    ],
  },
  {
    name: 'Fashion',
    href: '/products?category=Fashion',
    featured: [
      { name: 'Men', href: '/products?category=Fashion&subcategory=Men' },
      { name: 'Women', href: '/products?category=Fashion&subcategory=Women' },
      { name: 'Accessories', href: '/products?category=Fashion&subcategory=Accessories' },
    ],
  },
  {
    name: 'Home & Living',
    href: '/products?category=Home+%26+Living',
    featured: [
      { name: 'Furniture', href: '/products?category=Home&subcategory=Furniture' },
      { name: 'Decor', href: '/products?category=Home&subcategory=Decor' },
      { name: 'Kitchen', href: '/products?category=Home&subcategory=Kitchen' },
    ],
  },
];

export function NavLinks() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (categoryName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(categoryName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <div className="flex items-center space-x-8" ref={menuRef}>
      {categories.map((category) => (
        <div
          key={category.name}
          className="relative"
          onMouseEnter={() => handleMouseEnter(category.name)}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
            onClick={() => setActiveMenu(activeMenu === category.name ? null : category.name)}
          >
            <span>{category.name}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
              activeMenu === category.name ? 'rotate-180' : ''
            }`} />
          </button>

          {activeMenu === category.name && (
            <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 mt-2">
              {category.featured.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setActiveMenu(null)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
              <Link
                to={category.href}
                className="block px-4 py-2 text-sm text-brand-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setActiveMenu(null)}
              >
                View All
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}