import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getRelatedProducts } from '../services/productService';
import { Product } from '../types';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/useCartStore';
import { 
  ShoppingCart, 
  Package, 
  Shield, 
  ArrowLeft,
  Truck,
  Star,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { motion } from 'framer-motion';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  // Simulated product images (in a real app, these would come from the database)
  const productImages = [
    product?.image_url,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    'https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=500',
    'https://images.unsplash.com/photo-1505740106531-4243f3831c79?w=500'
  ].filter(Boolean);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  async function loadProduct(productId: string) {
    try {
      setLoading(true);
      const productData = await getProduct(productId);
      setProduct(productData);
      
      // Load related products
      if (productData) {
        const related = await getRelatedProducts(productData.category);
        setRelatedProducts(related.filter(p => p.id !== productId).slice(0, 4));
      }
    } catch (err) {
      setError('Failed to load product');
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
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/products"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={productImages[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => 
                    prev === 0 ? productImages.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => 
                    prev === productImages.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail images */}
          <div className="flex space-x-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-20 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">128 reviews</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.price > 100 && (
                  <p className="text-sm text-green-600 mt-1">
                    Free shipping on this item
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.stock > 0 && (
                  <span className="text-sm text-gray-500">
                    {product.stock} available
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => addItem(product)}
              className="flex-1 flex items-center justify-center space-x-2"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </Button>
            <Button
              variant="outline"
              className="p-3"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="p-3"
              aria-label="Share product"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Free Delivery</h3>
                <p className="text-sm text-gray-500">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-500">
                  30-day return policy
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Secure Shopping</h3>
                <p className="text-sm text-gray-500">
                  SSL encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={relatedProduct.image_url}
                    alt={relatedProduct.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">
                  {relatedProduct.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {formatCurrency(relatedProduct.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}