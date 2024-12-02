import { useEffect, useState } from 'react';
import { Order } from '../../types/profile';
import { getOrders } from '../../services/orderService';
import { formatCurrency } from '../../lib/utils';

interface OrderListProps {
  userId: string;
}

export function OrderList({ userId }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      const data = await getOrders(userId);
      setOrders(data);
      setLoading(false);
    }

    loadOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Henüz siparişiniz bulunmuyor.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm text-gray-500">
                Sipariş No: {order.id}
              </span>
              <p className="font-medium text-gray-900">
                {formatCurrency(order.total)}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              order.status === 'delivered'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {order.status === 'delivered' ? 'Teslim Edildi' : 'İşlemde'}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {new Date(order.created_at).toLocaleDateString('tr-TR')}
          </div>
          <div className="mt-3 space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="text-sm text-gray-600">
                {item.quantity}x Ürün #{item.product_id} - {formatCurrency(item.price * item.quantity)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}