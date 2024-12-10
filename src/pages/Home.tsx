import { HeroCarousel } from '../components/home/HeroCarousel';
import { FlashDeals } from '../components/home/FlashDeals';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { FeaturedProducts } from '../components/FeaturedProducts';

export function Home() {
  return (
    <div>
      <HeroCarousel />
      <FeaturedCategories />
      <FlashDeals />
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}