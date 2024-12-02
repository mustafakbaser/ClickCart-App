import { useState } from 'react';
import { Button } from '../ui/Button';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

interface PaymentMethodsProps {
  userId: string;
}

export function PaymentMethods({ userId }: PaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Card</span>
        </Button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-8">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a credit card to make checkout easier.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Payment method cards will be mapped here */}
        </div>
      )}
    </div>
  );
}