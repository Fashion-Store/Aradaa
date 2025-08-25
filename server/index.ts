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
        filteredProducts.sort((a, b) => b.isNew ? 1 : -1);
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