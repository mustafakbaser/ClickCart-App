import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Package } from 'lucide-react';

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  async function loadOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user?.id);

      if (error) throw error;
      setMessage('Profil başarıyla güncellendi.');
    } catch (err) {
      setMessage('Profil güncellenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Profil Bilgileri</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <Input
              id="email"
              type="email"
              value={user?.email}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad
            </label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`p-3 rounded-md ${
              message.includes('hata') 
                ? 'bg-red-50 text-red-500' 
                : 'bg-green-50 text-green-500'
            }`}>
              {message}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Package className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Siparişlerim</h2>
        </div>

        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Henüz siparişiniz bulunmuyor.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500">
                      Sipariş No: {order.id}
                    </span>
                    <p className="font-medium text-gray-900">
                      {order.total.toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status === 'delivered' ? 'Teslim Edildi' : 'İşlemde'}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('tr-TR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}