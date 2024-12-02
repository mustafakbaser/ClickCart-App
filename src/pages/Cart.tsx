import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <ShoppingBag className="h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-900">Sepetiniz Boş</h2>
        <p className="text-gray-600">Alışverişe başlamak için ürünleri inceleyin.</p>
        <Link to="/products">
          <Button>Ürünleri İncele</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Alışveriş Sepeti</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-6 flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex items-center space-x-4">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="rounded-md border border-gray-300 py-1 px-2"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <span className="text-lg font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-gray-900">Toplam</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(total)}
            </span>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Sepeti Temizle</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <span>Ödemeye Geç</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}