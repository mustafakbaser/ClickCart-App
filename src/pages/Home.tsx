import { HeroCarousel } from '../components/home/HeroCarousel';
import { FlashDeals } from '../components/home/FlashDeals';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Footer } from '../components/layout/Footer';

export function Home() {
  return (
    <div>
      <HeroCarousel />
      <FeaturedCategories />
      <FlashDeals />
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <FeaturedProducts />
        </div>
      </div>
      <Footer />
    </div>
  );
}