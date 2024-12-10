import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Timer, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts } from '../../services/productService';

export function FlashDeals() {
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    async function loadDeals() {
      try {
        const { data } = await getProducts({
          pageSize: 4,
          sortBy: 'newest',
        });
        setDeals(data);
      } catch (error) {
        console.error('Error loading flash deals:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDeals();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Flash Deals</h2>
            </div>
            <div className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full">
              <Timer className="h-4 w-4" />
              <span className="text-sm font-medium">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
          <Link
            to="/products"
            className="text-brand-primary hover:text-brand-dark flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/products/${deal.id}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={deal.image_url}
                    alt={deal.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -30%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {deal.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {deal.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xl font-bold text-brand-primary">
                        {formatCurrency(deal.price * 0.7)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(deal.price)}
                        </span>
                        <span className="text-sm font-medium text-red-500">
                          30% OFF
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {deal.stock} left
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(deal.stock / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}