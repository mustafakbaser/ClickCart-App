import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CheckoutFormData } from '../../types/checkout';
import { CreditCard, Building } from 'lucide-react';

interface PaymentFormProps {
  initialData: CheckoutFormData;
  onComplete: (data: Partial<CheckoutFormData>) => void;
  onBack: () => void;
}

export function PaymentForm({ initialData, onComplete, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [selectedMethod, setSelectedMethod] = useState<'credit_card' | 'bank_transfer'>('credit_card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...formData,
      paymentMethod: selectedMethod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Payment Method</h2>

        <div className="space-y-4">
          <label
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              selectedMethod === 'credit_card'
                ? 'border-brand-primary bg-brand-primary/5'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="credit_card"
              checked={selectedMethod === 'credit_card'}
              onChange={(e) => setSelectedMethod('credit_card')}
              className="h-4 w-4 text-brand-primary"
            />
            <div className="ml-4 flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-900">Credit Card</span>
            </div>
          </label>

          <label
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              selectedMethod === 'bank_transfer'
                ? 'border-brand-primary bg-brand-primary/5'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              checked={selectedMethod === 'bank_transfer'}
              onChange={(e) => setSelectedMethod('bank_transfer')}
              className="h-4 w-4 text-brand-primary"
            />
            <div className="ml-4 flex items-center">
              <Building className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium text-gray-900">Bank Transfer</span>
            </div>
          </label>
        </div>

        {selectedMethod === 'credit_card' && (
          <div className="mt-6 space-y-6">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <Input
                  id="cvc"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'bank_transfer' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Please use the following bank account details to complete your transfer:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium">Bank:</span> Example Bank
              </p>
              <p className="text-sm">
                <span className="font-medium">Account Name:</span> ClickCart Ltd
              </p>
              <p className="text-sm">
                <span className="font-medium">Account Number:</span> 1234567890
              </p>
              <p className="text-sm">
                <span className="font-medium">Sort Code:</span> 12-34-56
              </p>
              <p className="text-sm">
                <span className="font-medium">Reference:</span> Please use your order number
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Billing Address</h2>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.billingAddress.sameAsShipping}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  billingAddress: {
                    ...prev.billingAddress,
                    sameAsShipping: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4 text-brand-primary rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              Same as shipping address
            </span>
          </label>
        </div>

        {!formData.billingAddress.sameAsShipping && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Billing address fields similar to shipping form */}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Shipping
        </Button>
        <Button type="submit">
          Review Order
        </Button>
      </div>
    </form>
  );
}