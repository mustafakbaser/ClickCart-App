import { Link } from 'react-router-dom';
import { Laptop, ShoppingBag, Home, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: <Laptop className="h-8 w-8" />,
    color: 'bg-blue-500',
    link: '/products?category=Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: <ShoppingBag className="h-8 w-8" />,
    color: 'bg-pink-500',
    link: '/products?category=Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
  },
  {
    id: 'home',
    name: 'Home & Living',
    icon: <Home className="h-8 w-8" />,
    color: 'bg-green-500',
    link: '/products?category=Home+%26+Living',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=500',
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    icon: <Dumbbell className="h-8 w-8" />,
    color: 'bg-orange-500',
    link: '/products?category=Sports+%26+Outdoors',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function FeaturedCategories() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Shop by Category
        </motion.h2>
        
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link
                to={category.link}
                className="group block relative overflow-hidden rounded-xl aspect-square shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/30 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center group-hover:scale-105 transition-transform duration-300">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}