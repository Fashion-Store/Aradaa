import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.h1 
              className="text-2xl font-serif font-bold text-gray-900 tracking-wide"
              whileHover={{ scale: 1.05 }}
            >
              Adaraa
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                  location.pathname === item.path
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                    : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/orders"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Orders
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingBag className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <nav className="py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-gray-900'
                      : 'text-gray-600'
                  }`}
                  onClick={handleMenuItemClick}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-100 pt-4 space-y-4">
                {user ? (
                  <>
                    <Link
                      to="/orders"
                      className="block text-sm text-gray-600"
                      onClick={handleMenuItemClick}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-sm text-gray-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block text-sm text-gray-600"
                    onClick={handleMenuItemClick}
                  >
                    Login
                  </Link>
                )}
                
                <Link
                  to="/cart"
                  className="flex items-center text-sm text-gray-600"
                  onClick={handleMenuItemClick}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Cart ({getTotalItems()})
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
