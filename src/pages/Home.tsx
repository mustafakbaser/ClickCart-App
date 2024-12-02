import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function Home() {
  const user = useAuthStore((state) => state.user);

  const features = [
    {
      icon: <ShoppingBag className="h-6 w-6 text-[#02A676]" />,
      title: 'Wide Product Range',
      description: 'Choose from thousands of products',
    },
    {
      icon: <Truck className="h-6 w-6 text-[#02A676]" />,
      title: 'Fast Delivery',
      description: 'Same day shipping for your orders',
    },
    {
      icon: <Shield className="h-6 w-6 text-[#02A676]" />,
      title: 'Secure Shopping',
      description: '100% secure payment system',
    },
    {
      icon: <Clock className="h-6 w-6 text-[#02A676]" />,
      title: '24/7 Support',
      description: 'We are always here for you',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#003840] to-[#005A5B] rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-white/[0.2]" />
        <div className="relative container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The Next Generation of Shopping
            </h1>
            <p className="mt-6 text-xl text-gray-100">
              Discover with one click, own with ease. Shopping is smarter with ClickCart.
            </p>
            <div className="mt-10">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-[#02A676] hover:bg-[#007369] text-white border-none"
                >
                  Start Shopping
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
                className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-[#003840]">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only shown to non-authenticated users */}
      {!user && (
        <section className="bg-[#003840] rounded-2xl text-white">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Join the ClickCart Family
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Sign up now to never miss special offers.
              </p>
              <div className="mt-8">
                <Link to="/register">
                  <Button 
                    size="lg"
                    className="bg-[#02A676] hover:bg-[#007369] text-white border-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}