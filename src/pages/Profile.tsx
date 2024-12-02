import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Tabs } from '../components/profile/Tabs';
import { PersonalInfo } from '../components/profile/PersonalInfo';
import { OrderHistory } from '../components/profile/OrderHistory';
import { AddressBook } from '../components/profile/AddressBook';
import { PaymentMethods } from '../components/profile/PaymentMethods';
import { WishList } from '../components/profile/WishList';
import { NotificationSettings } from '../components/profile/NotificationSettings';
import { SecuritySettings } from '../components/profile/SecuritySettings';
import { User, Settings, ShoppingBag, MapPin, CreditCard, Heart, Bell, Shield } from 'lucide-react';

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'orders', label: 'Order History', icon: ShoppingBag },
  { id: 'addresses', label: 'Address Book', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Welcome back,</span>
          <span className="font-medium text-gray-900">{user.user_metadata?.full_name}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </aside>

        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'personal' && <PersonalInfo user={user} />}
            {activeTab === 'orders' && <OrderHistory userId={user.id} />}
            {activeTab === 'addresses' && <AddressBook userId={user.id} />}
            {activeTab === 'payments' && <PaymentMethods userId={user.id} />}
            {activeTab === 'wishlist' && <WishList userId={user.id} />}
            {activeTab === 'notifications' && <NotificationSettings userId={user.id} />}
            {activeTab === 'security' && <SecuritySettings user={user} />}
          </div>
        </main>
      </div>
    </div>
  );
}