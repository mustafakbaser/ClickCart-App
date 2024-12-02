import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './ui/Button';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => addItem(product)}
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Sepete Ekle</span>
          </Button>
        </div>
      </div>
    </div>
  );
}