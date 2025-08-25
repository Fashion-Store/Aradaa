import * as React from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = React.useState('featured');
  const [showFilters, setShowFilters] = React.useState(false);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'formal', label: 'Formal Wear' },
    { value: 'casual', label: 'Casual Wear' },
    { value: 'new-arrivals', label: 'New Arrivals' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Sample products data
  const products = [
    {
      id: '1',
      name: 'Classic Black Dress',
      price: 12500,
      originalPrice: 15000,
      image: '/api/placeholder/300/400',
      category: 'dresses',
      isNew: false
    },
    {
      id: '2',
      name: 'Silk Evening Gown',
      price: 25000,
      originalPrice: null,
      image: '/api/placeholder/300/400',
      category: 'formal',
      isNew: true
    },
    {
      id: '3',
      name: 'Floral Summer Dress',
      price: 8500,
      originalPrice: 10000,
      image: '/api/placeholder/300/400',
      category: 'casual',
      isNew: false
    },
    {
      id: '4',
      name: 'Professional Blazer Set',
      price: 18500,
      originalPrice: null,
      image: '/api/placeholder/300/400',
      category: 'formal',
      isNew: false
    },
    {
      id: '5',
      name: 'Bohemian Maxi Dress',
      price: 14500,
      originalPrice: 16000,
      image: '/api/placeholder/300/400',
      category: 'dresses',
      isNew: true
    },
    {
      id: '6',
      name: 'Office Pencil Dress',
      price: 11500,
      originalPrice: null,
      image: '/api/placeholder/300/400',
      category: 'formal',
      isNew: false
    },
    {
      id: '7',
      name: 'Casual T-shirt Dress',
      price: 6500,
      originalPrice: 8000,
      image: '/api/placeholder/300/400',
      category: 'casual',
      isNew: true
    },
    {
      id: '8',
      name: 'Elegant Cocktail Dress',
      price: 22000,
      originalPrice: null,
      image: '/api/placeholder/300/400',
      category: 'dresses',
      isNew: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category === selectedCategory || 
      (selectedCategory === 'new-arrivals' && product.isNew);
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-white pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif font-light text-gray-900 mb-4">
            Shop Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium women's fashion. Each piece is carefully chosen for its quality, style, and elegance.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center gap-2 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category.value)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={`/product/${product.id}`}>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-gray-900 text-white px-2 py-1 text-xs font-medium">
                        NEW
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                        SALE
                      </div>
                    )}
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
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
