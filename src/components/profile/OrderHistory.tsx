import { useState, useEffect } from 'react';
import { Order } from '../../types/profile';
import { getOrders } from '../../services/orderService';
import { formatCurrency } from '../../lib/utils';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface OrderHistoryProps {
  userId: string;
}

const statusIcons = {
  pending: Package,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
};

const statusColors = {
  pending: 'text-yellow-500',
  processing: 'text-blue-500',
  shipped: 'text-purple-500',
  delivered: 'text-green-500',
};

export function OrderHistory({ userId }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

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
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          When you make your first purchase, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Order History</h2>
      
      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          return (
            <div
              key={order.id}
              className="border rounded-lg hover:border-brand-primary transition-colors"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-1 ${statusColors[order.status]}`}>
                      <StatusIcon className="h-5 w-5" />
                      <span className="text-sm font-medium capitalize">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>

              {selectedOrder === order.id && (
                <div className="border-t p-4 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Order Items
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.quantity}x Product #{item.product_id}
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}