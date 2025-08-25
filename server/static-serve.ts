import path from 'path';
import express from 'express';

/**
 * Sets up static file serving for the Express app
 * @param app Express application instance
 */
export function setupStaticServing(app: express.Application) {
  // In production, serve static files from the public directory
  if (process.env.NODE_ENV === 'production') {
    console.log('Setting up static file serving for production...');
    app.use(express.static(path.join(process.cwd(), 'public')));

    // For any other routes that don't start with /api, serve the index.html file
    app.get('/*splat', (req, res, next) => {
      // Skip API routes
      if (req.path.startsWith('/api/')) {
        return next();
      }
      
      console.log(`Serving SPA route: ${req.path}`);
      res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
      return;
    });
  } else {
    console.log('Development mode - static files served by Vite dev server');
    
    // In development, just handle the catch-all for non-API routes
    app.get('/*splat', (req, res, next) => {
      // Skip API routes
      if (req.path.startsWith('/api/')) {
        return next();
      }
      
      // In development, let the frontend handle routing
      res.status(404).json({ 
        error: 'Route not found', 
        message: 'This route should be handled by the frontend in development mode' 
      });
      return;
    });
  }
}
