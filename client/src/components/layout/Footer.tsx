import * as React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-gray-900">Adaraa</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Premium women's fashion collection featuring elegant designs and timeless style. 
              Discover luxury clothing that celebrates femininity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link to="/shop" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Shop All
              </Link>
              <Link to="/about" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
              <Link to="/orders" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Track Order
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Categories
            </h4>
            <div className="space-y-2">
              <Link to="/shop?category=dresses" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Dresses
              </Link>
              <Link to="/shop?category=formal" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Formal Wear
              </Link>
              <Link to="/shop?category=casual" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Casual Wear
              </Link>
              <Link to="/shop?category=new-arrivals" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">info@adaraafashion.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">+92 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Adaraa Fashion Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
