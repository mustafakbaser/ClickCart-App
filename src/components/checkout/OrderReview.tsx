import { Button } from '../ui/Button';
import { CartItem } from '../../types';
import { CheckoutFormData } from '../../types/checkout';
import { calculateOrderSummary, getShippingMethods } from '../../services/checkoutService';
import { formatCurrency } from '../../lib/utils';

interface OrderReviewProps {
  formData: CheckoutFormData;
  items: CartItem[];
  loading: boolean;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function OrderReview({
  formData,
  items,
  loading,
  onBack,
  onPlaceOrder,
}: OrderReviewProps) {
  const shippingMethod = getShippingMethods().find(
    (method) => method.id === formData.shippingMethod
  );
  const summary = calculateOrderSummary(items, formData.shippingMethod);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Order Review</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600">
              <p>{formData.shippingAddress.fullName}</p>
              <p>{formData.shippingAddress.address}</p>
              <p>
                {formData.shippingAddress.city}, {formData.shippingAddress.state}{' '}
                {formData.shippingAddress.postalCode}
              </p>
              <p>{formData.shippingAddress.country}</p>
              <p>{formData.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Shipping Method
            </h3>
            <p className="text-sm text-gray-600">
              {shippingMethod?.name} - {shippingMethod?.description}
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Payment Method
            </h3>
            <p className="text-sm text-gray-600">
              {formData.paymentMethod === 'credit_card'
                ? 'Credit Card'
                : 'Bank Transfer'}
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatCurrency(summary.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatCurrency(summary.tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(summary.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Payment
        </Button>
        <Button
          onClick={onPlaceOrder}
          disabled={loading}
          className="min-w-[200px]"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
}