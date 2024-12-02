import { useState } from 'react';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { Bell } from 'lucide-react';

interface NotificationSettingsProps {
  userId: string;
}

export function NotificationSettings({ userId }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    priceAlerts: false,
  });
  const [loading, setLoading] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Order Updates</h3>
            <p className="text-sm text-gray-500">
              Receive notifications about your order status
            </p>
          </div>
          <Switch
            checked={settings.orderUpdates}
            onCheckedChange={() => handleToggle('orderUpdates')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Promotions</h3>
            <p className="text-sm text-gray-500">
              Get notified about sales and special offers
            </p>
          </div>
          <Switch
            checked={settings.promotions}
            onCheckedChange={() => handleToggle('promotions')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-500">
              Receive our weekly newsletter
            </p>
          </div>
          <Switch
            checked={settings.newsletter}
            onCheckedChange={() => handleToggle('newsletter')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Price Alerts</h3>
            <p className="text-sm text-gray-500">
              Get notified when items in your wishlist go on sale
            </p>
          </div>
          <Switch
            checked={settings.priceAlerts}
            onCheckedChange={() => handleToggle('priceAlerts')}
          />
        </div>
      </div>

      <Button
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
}