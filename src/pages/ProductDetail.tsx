import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/productService';
import { Product } from '../types';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart, Package, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';
import { Footer } from '../components/layout/Footer';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  async function loadProduct(productId: string) {
    try {
      const data = await getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError('Ürün yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-500 py-8">
        {error || 'Ürün bulunamadı.'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to="/products"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Ürünlere Dön</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full rounded-lg shadow-sm"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-gray-500">
              Stok: {product.stock} adet
            </span>
          </div>

          <Button
            onClick={() => addItem(product)}
            className="w-full flex items-center justify-center space-x-2"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Sepete Ekle</span>
          </Button>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Ücretsiz Kargo</h3>
                <p className="text-sm text-gray-500">
                  100 TL ve üzeri alışverişlerde ücretsiz kargo
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Güvenli Alışveriş</h3>
                <p className="text-sm text-gray-500">
                  256-bit SSL sertifikası ile güvenli ödeme
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}