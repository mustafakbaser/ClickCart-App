import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

interface AddressBookProps {
  userId: string;
}

export function AddressBook({ userId }: AddressBookProps) {
  const [addresses, setAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Address Book</h2>
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Address</span>
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add your first delivery address to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* Address cards will be mapped here */}
        </div>
      )}

      {isAddingNew && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
            <form className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                required
              />
              <Input
                type="text"
                placeholder="Address Line 1"
                required
              />
              <Input
                type="text"
                placeholder="Address Line 2 (Optional)"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="City"
                  required
                />
                <Input
                  type="text"
                  placeholder="State"
                  required
                />
              </div>
              <Input
                type="text"
                placeholder="Postal Code"
                required
              />
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}