import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { ProfileForm } from '../components/profile/ProfileForm';
import { OrderList } from '../components/profile/OrderList';
import { User, Package } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Profil Bilgileri</h2>
        </div>
        <ProfileForm user={user} onProfileUpdate={checkAuth} />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Package className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Siparişlerim</h2>
        </div>
        <OrderList userId={user.id} />
      </div>
      <Footer />
    </div>
  );
}