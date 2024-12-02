import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchSuggestions() {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, title, price, image_url')
          .ilike('title', `%${debouncedQuery}%`)
          .limit(5);

        if (error) throw error;
        setSuggestions(data || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-900 p-4 shadow-lg">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-brand-primary"
                  autoFocus
                />
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>

              {loading && (
                <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="flex items-center space-x-4 py-2 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {product.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}