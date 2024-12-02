import { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/useCartStore';
import { formatCurrency } from '../../lib/utils';

interface WishListProps {
  userId: string;
}

export function WishList({ userId }: WishListProps) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Wishlist</h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="mt-1 text-sm text-gray-500">
            Save items you'd like to purchase later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* Wishlist items will be mapped here */}
        </div>
      )}
    </div>
  );
}