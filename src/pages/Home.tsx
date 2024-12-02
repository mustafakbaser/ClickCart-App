import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      title: 'Geniş Ürün Yelpazesi',
      description: 'Binlerce ürün arasından seçim yapın',
    },
    {
      icon: <Truck className="h-6 w-6 text-blue-600" />,
      title: 'Hızlı Teslimat',
      description: 'Siparişleriniz aynı gün kargoda',
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: 'Güvenli Alışveriş',
      description: '%100 güvenli ödeme sistemi',
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: '7/24 Destek',
      description: 'Her zaman yanınızdayız',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2]" />
        <div className="relative container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Modern Alışverişin Adresi
            </h1>
            <p className="mt-6 text-xl text-blue-100">
              En yeni ürünler, en iyi fiyatlar ve en hızlı teslimat ile
              alışverişin keyfini çıkarın.
            </p>
            <div className="mt-10">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Alışverişe Başla
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 rounded-2xl">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hemen Üye Olun
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Özel fırsatları kaçırmamak için hemen üye olun.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button size="lg">Üye Ol</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}