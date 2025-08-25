import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { setupStaticServing } from './static-serve.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/adaraa-fashion';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Initialize database connection
connectDB();

// Sample routes for the fashion store
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Adaraa Fashion Store API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Products API endpoints
app.get('/api/products', (req, res) => {
  const sampleProducts = [
    {
      id: '1',
      name: 'Classic Black Dress',
      price: 12500,
      originalPrice: 15000,
      description: 'Elegant black dress perfect for any formal occasion.',
      category: 'dresses',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: false
    },
    {
      id: '2',
      name: 'Silk Evening Gown',
      price: 25000,
      originalPrice: null,
      description: 'Luxurious silk evening gown for special occasions.',
      category: 'formal',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: true
    },
    {
      id: '3',
      name: 'Floral Summer Dress',
      price: 8500,
      originalPrice: 10000,
      description: 'Light and comfortable floral dress for summer.',
      category: 'casual',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: false
    },
    {
      id: '4',
      name: 'Professional Blazer Set',
      price: 18500,
      originalPrice: null,
      description: 'Professional blazer set for office wear.',
      category: 'formal',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: false
    },
    {
      id: '5',
      name: 'Bohemian Maxi Dress',
      price: 14500,
      originalPrice: 16000,
      description: 'Flowing bohemian style maxi dress.',
      category: 'dresses',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: true
    },
    {
      id: '6',
      name: 'Office Pencil Dress',
      price: 11500,
      originalPrice: null,
      description: 'Sophisticated pencil dress for professional settings.',
      category: 'formal',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: false
    },
    {
      id: '7',
      name: 'Casual T-shirt Dress',
      price: 6500,
      originalPrice: 8000,
      description: 'Comfortable casual t-shirt dress.',
      category: 'casual',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: true
    },
    {
      id: '8',
      name: 'Elegant Cocktail Dress',
      price: 22000,
      originalPrice: null,
      description: 'Perfect dress for cocktail parties and evening events.',
      category: 'dresses',
      images: ['/api/placeholder/500/600'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      isNew: false
    }
  ];

  const { category, search, sortBy } = req.query;
  let filteredProducts = [...sampleProducts];

  // Filter by category
  if (category && category !== 'all') {
    if (category === 'new-arrivals') {
      filteredProducts = filteredProducts.filter(p => p.isNew);
    } else {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
  }

  // Filter by search query
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toString().toLowerCase())
    );
  }

  // Sort products
  if (sortBy) {
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Keep default order
        break;
    }
  }

  res.json({
    products: filteredProducts,
    total: filteredProducts.length
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  
  const sampleProducts = [
    {
      id: '1',
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
    },
    {
      id: '2',
      name: 'Silk Evening Gown',
      price: 25000,
      originalPrice: null,
      description: 'Luxurious silk evening gown for special occasions.',
      features: [
        'Pure silk fabric',
        'Elegant design',
        'Perfect for evening events',
        'Professional finishing',
        'Comfortable fit'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [
        '/api/placeholder/500/600',
        '/api/placeholder/500/600',
        '/api/placeholder/500/600',
        '/api/placeholder/500/600'
      ],
      category: 'formal',
      inStock: true
    }
  ];

  const product = sampleProducts.find(p => p.id === id);
  
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.json(product);
});

// Contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  console.log('Contact form submission:', { name, email, subject, message });
  
  // In a real application, you would send an email here
  // For now, we'll just log it and return success
  
  res.json({ 
    success: true, 
    message: 'Your message has been sent successfully!' 
  });
});

// Order creation
app.post('/api/orders', (req, res) => {
  const { customerInfo, shippingAddress, items, paymentMethod } = req.body;
  
  console.log('Order creation:', { customerInfo, shippingAddress, items, paymentMethod });
  
  const orderId = 'ORD' + Date.now();
  
  // In a real application, you would save to database and integrate with payment/shipping
  
  res.json({
    success: true,
    orderId: orderId,
    message: 'Order placed successfully!'
  });
});

// User authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email });
  
  // In a real application, you would validate credentials
  // For demo purposes, accept any login
  
  res.json({
    success: true,
    user: {
      id: '1',
      name: 'Jane Doe',
      email: email
    },
    token: 'demo-jwt-token'
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  console.log('Registration attempt:', { name, email });
  
  // In a real application, you would save to database
  // For demo purposes, accept any registration
  
  res.json({
    success: true,
    user: {
      id: '1',
      name: name,
      email: email
    },
    token: 'demo-jwt-token'
  });
});

// Placeholder image endpoint
app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  
  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle" dy=".3em">
        ${width} × ${height}
      </text>
    </svg>
  `;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.send(svg);
});

// Setup static file serving
setupStaticServing(app);

// Start server
export const startServer = (port = 3001) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Adaraa Fashion Store API server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      resolve(server);
    });

    server.on('error', (err) => {
      console.error('Server error:', err);
      reject(err);
    });
  });
};

// If this file is run directly, start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  startServer(port);
}
