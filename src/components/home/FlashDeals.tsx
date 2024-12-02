import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Timer, ArrowRight } from 'lucide-react';

export function FlashDeals() {
  const [deals, setDeals] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Simulated flash deals (using featured products)
    async function loadDeals() {
      const response = await fetch('/api/products?featured=true');
      const data = await response.json();
      setDeals(data.slice(0, 4));
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

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">Flash Deals</h2>
            <div className="flex items-center space-x-2 bg-[#02A676] text-white px-3 py-1 rounded-full">
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
            className="text-[#02A676] hover:text-[#007369] flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Link
              key={deal.id}
              to={`/products/${deal.id}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="relative">
                <img
                  src={deal.image_url}
                  alt={deal.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  -20%
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 line-clamp-1">
                {deal.title}
              </h3>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-lg font-bold text-[#02A676]">
                  {formatCurrency(deal.price * 0.8)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(deal.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}