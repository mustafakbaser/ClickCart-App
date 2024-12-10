import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-darkest text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About ClickCart</h3>
            <p className="text-gray-300 text-sm">
              Your one-stop destination for premium shopping. We offer quality products
              with exceptional service and fast delivery.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-brand-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?featured=true"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Featured Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?sort=newest"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shipping-policy"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone size={16} />
                <a 
                  href="tel:+15551234567"
                  className="hover:text-brand-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail size={16} />
                <a 
                  href="mailto:contact@clickcart.com"
                  className="hover:text-brand-primary transition-colors"
                >
                  contact@clickcart.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin size={16} />
                <a 
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primary transition-colors"
                >
                  123 Commerce St, NY 10001
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} ClickCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}