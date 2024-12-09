import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CheckoutFormData } from '../../types/checkout';
import { getShippingMethods } from '../../services/checkoutService';

interface ShippingFormProps {
  initialData: CheckoutFormData;
  onComplete: (data: Partial<CheckoutFormData>) => void;
}

export function ShippingForm({ initialData, onComplete }: ShippingFormProps) {
  const [formData, setFormData] = useState(initialData);
  const shippingMethods = getShippingMethods();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Shipping Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.shippingAddress.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.shippingAddress.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.shippingAddress.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              id="address"
              name="address"
              value={formData.shippingAddress.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <Input
              id="city"
              name="city"
              value={formData.shippingAddress.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <Input
              id="state"
              name="state"
              value={formData.shippingAddress.state}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.shippingAddress.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <Input
              id="country"
              name="country"
              value={formData.shippingAddress.country}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Shipping Method</h2>

        <div className="space-y-4">
          {shippingMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                formData.shippingMethod === method.id
                  ? 'border-brand-primary bg-brand-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={formData.shippingMethod === method.id}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shippingMethod: e.target.value,
                    }))
                  }
                  className="h-4 w-4 text-brand-primary"
                />
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
              <span className="font-medium">
                {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-full md:w-auto">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}