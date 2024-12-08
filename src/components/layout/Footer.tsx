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
                href="#" 
                className="text-gray-300 hover:text-brand-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-brand-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
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
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/deals" 
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Special Deals
                </Link>
              </li>
              <li>
                <Link 
                  to="/new-arrivals" 
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-brand-primary transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail size={16} />
                <span>iletisim@mustafabaser.net</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin size={16} />
                <span>123 Commerce St, NY 10001</span>
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