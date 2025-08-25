import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(0);

  // Sample product data
  const product = {
    id: id || '1',
    name: 'Classic Black Dress',
    price: 12500,
    originalPrice: 15000,
    description: 'This elegant black dress is perfect for any formal occasion. Crafted from premium fabric with attention to detail, it features a flattering silhouette that complements every figure. The timeless design ensures you\'ll look sophisticated and confident.',
    features: [
      'Premium quality fabric',
      'Flattering silhouette',
      'Professional tailoring',
      'Easy care instructions',
      'Versatile styling options'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/api/placeholder/500/600',
      '/api/placeholder/500/600',
      '/api/placeholder/500/600',
      '/api/placeholder/500/600'
    ],
    category: 'dresses',
    inStock: true
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Silk Evening Gown',
      price: 25000,
      image: '/api/placeholder/300/400'
    },
    {
      id: '3',
      name: 'Floral Summer Dress',
      price: 8500,
      image: '/api/placeholder/300/400'
    },
    {
      id: '4',
      name: 'Professional Blazer Set',
      price: 18500,
      image: '/api/placeholder/300/400'
    }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize
    });

    alert('Product added to cart!');
  };

  return (
    <div className="min-h-screen bg-white pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[4/5] overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-gray-900'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-serif font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-semibold text-gray-900">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3"
                disabled={!product.inStock}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Product Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-serif font-light text-gray-900 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
              >
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm">
                      {relatedProduct.name}
                    </h3>
                    <span className="text-lg font-semibold text-gray-900">
                      Rs. {relatedProduct.price.toLocaleString()}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
