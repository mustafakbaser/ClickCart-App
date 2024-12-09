import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { formatCurrency } from '../lib/utils';

interface OrderDetails {
  id: string;
  total: number;
  status: string;
  created_at: string;
  shipping_address: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (err) {
        console.error('Error loading order:', err);
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the order you're looking for.
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600">
          Thank you for your order. We'll send you shipping confirmation when your order ships.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600">Order number</p>
            <p className="text-lg font-medium text-gray-900">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Order date</p>
            <p className="text-lg font-medium text-gray-900">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Shipping Information
          </h2>
          <div className="text-sm text-gray-600">
            <p>{order.shipping_address.fullName}</p>
            <p>{order.shipping_address.address}</p>
            <p>
              {order.shipping_address.city}, {order.shipping_address.state}{' '}
              {order.shipping_address.postalCode}
            </p>
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <span>Order Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/profile?tab=orders"
          className="inline-flex items-center text-brand-primary hover:text-brand-dark"
        >
          <Package className="h-5 w-5 mr-2" />
          <span>View Order Status</span>
        </Link>

        <Link to="/products">
          <Button className="inline-flex items-center">
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}