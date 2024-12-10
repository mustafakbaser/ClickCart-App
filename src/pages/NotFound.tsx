import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Browse Products</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}