import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Smartphone, Laptop, Headphones, Shirt, Watch, Gem, Sofa, UtensilsCrossed, Wrench, Bike, Tent, Dumbbell } from 'lucide-react';
import { cn } from '../../lib/utils';

const categories = [
  {
    name: 'Electronics',
    href: '/products?category=Electronics',
    icon: Laptop,
    featured: [
      { 
        name: 'Smartphones',
        href: '/products?category=Electronics&subcategory=Smartphones',
        icon: Smartphone,
        description: 'Latest smartphones and accessories'
      },
      { 
        name: 'Laptops',
        href: '/products?category=Electronics&subcategory=Laptops',
        icon: Laptop,
        description: 'Powerful laptops for work and gaming'
      },
      { 
        name: 'Audio',
        href: '/products?category=Electronics&subcategory=Audio',
        icon: Headphones,
        description: 'High-quality audio equipment'
      }
    ],
    trending: [
      'Latest iPhone Models',
      'Gaming Laptops',
      'Wireless Earbuds'
    ]
  },
  {
    name: 'Fashion',
    href: '/products?category=Fashion',
    icon: Shirt,
    featured: [
      { 
        name: 'Men',
        href: '/products?category=Fashion&subcategory=Men',
        icon: Shirt,
        description: 'Men\'s clothing and accessories'
      },
      { 
        name: 'Women',
        href: '/products?category=Fashion&subcategory=Women',
        icon: Gem,
        description: 'Women\'s fashion collection'
      },
      { 
        name: 'Accessories',
        href: '/products?category=Fashion&subcategory=Accessories',
        icon: Watch,
        description: 'Watches, jewelry, and more'
      }
    ],
    trending: [
      'Summer Collection',
      'Designer Watches',
      'Sustainable Fashion'
    ]
  },
  {
    name: 'Home & Living',
    href: '/products?category=Home+%26+Living',
    icon: Sofa,
    featured: [
      { 
        name: 'Furniture',
        href: '/products?category=Home&subcategory=Furniture',
        icon: Sofa,
        description: 'Modern and classic furniture'
      },
      { 
        name: 'Kitchen',
        href: '/products?category=Home&subcategory=Kitchen',
        icon: UtensilsCrossed,
        description: 'Kitchen appliances and accessories'
      },
      { 
        name: 'Tools',
        href: '/products?category=Home&subcategory=Tools',
        icon: Wrench,
        description: 'Home improvement tools'
      }
    ],
    trending: [
      'Smart Home Devices',
      'Ergonomic Furniture',
      'Kitchen Gadgets'
    ]
  },
  {
    name: 'Sports & Outdoors',
    href: '/products?category=Sports+%26+Outdoors',
    icon: Bike,
    featured: [
      { 
        name: 'Fitness',
        href: '/products?category=Sports&subcategory=Fitness',
        icon: Dumbbell,
        description: 'Fitness equipment and accessories'
      },
      { 
        name: 'Outdoor',
        href: '/products?category=Sports&subcategory=Outdoor',
        icon: Tent,
        description: 'Camping and hiking gear'
      },
      { 
        name: 'Cycling',
        href: '/products?category=Sports&subcategory=Cycling',
        icon: Bike,
        description: 'Bikes and cycling equipment'
      }
    ],
    trending: [
      'Smart Fitness Devices',
      'Camping Essentials',
      'Electric Bikes'
    ]
  }
];

// Rest of the component code remains exactly the same
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
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={cn(
                "flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary transition-colors",
                activeMenu === category.name && "text-brand-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.name}</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                activeMenu === category.name && "rotate-180"
              )} />
            </button>

            {activeMenu === category.name && (
              <div className="absolute top-full left-0 w-screen max-w-screen-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-2 p-6">
                <div className="grid grid-cols-2 gap-x-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                      Featured Categories
                    </h3>
                    <ul className="space-y-4">
                      {category.featured.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className="group flex items-center"
                              onClick={() => setActiveMenu(null)}
                            >
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                                <ItemIcon className="h-6 w-6 text-brand-primary" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                      Trending Now
                    </h3>
                    <ul className="space-y-4">
                      {category.trending.map((item) => (
                        <li key={item}>
                          <Link
                            to={`${category.href}?trending=true`}
                            className="text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                            onClick={() => setActiveMenu(null)}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to={category.href}
                        className="text-sm font-medium text-brand-primary hover:text-brand-dark transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        View All {category.name} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}