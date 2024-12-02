import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#003840] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About ClickCart</h3>
            <p className="text-gray-300 text-sm">
              Your one-stop destination for premium shopping. We offer quality products
              with exceptional service and fast delivery.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-[#02A676]">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#02A676]">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#02A676]">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-[#02A676]">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-[#02A676]">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-[#02A676]">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#02A676]">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#02A676]">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#02A676]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>support@clickcart.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <MapPin size={16} />
                <span>123 Commerce St, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ClickCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}