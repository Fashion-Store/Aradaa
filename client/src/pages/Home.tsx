import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const categories = [
    {
      title: 'Elegant Dresses',
      description: 'Timeless pieces for every occasion',
      image: '/api/placeholder/400/500',
      link: '/shop?category=dresses'
    },
    {
      title: 'Formal Collection',
      description: 'Professional and sophisticated',
      image: '/api/placeholder/400/500',
      link: '/shop?category=formal'
    },
    {
      title: 'Casual Wear',
      description: 'Comfort meets style',
      image: '/api/placeholder/400/500',
      link: '/shop?category=casual'
    }
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Classic Black Dress',
      price: 12500,
      image: '/api/placeholder/300/400',
      originalPrice: 15000
    },
    {
      id: '2',
      name: 'Silk Evening Gown',
      price: 25000,
      image: '/api/placeholder/300/400',
      originalPrice: null
    },
    {
      id: '3',
      name: 'Floral Summer Dress',
      price: 8500,
      image: '/api/placeholder/300/400',
      originalPrice: 10000
    },
    {
      id: '4',
      name: 'Professional Blazer Set',
      price: 18500,
      image: '/api/placeholder/300/400',
      originalPrice: null
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-light text-gray-900 mb-6">
              Adaraa
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
              Where elegance meets timeless fashion. Discover our premium collection of women's clothing designed for the modern woman.
            </p>
            <div className="space-x-4">
              <Link to="/shop">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-4">
              Explore Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections, each piece selected for its quality, elegance, and timeless appeal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={category.link}>
                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what's popular this season. These carefully selected pieces represent the perfect blend of current trends and timeless elegance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/product/${product.id}`}>
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 text-sm">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900">
                          Rs. {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="px-8 py-3">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
