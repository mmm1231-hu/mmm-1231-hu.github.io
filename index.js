/*
DONT TRY TO UPDATE `express` package into `express@5.2.1`, it is buggy and incompataible

*/


const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import configurations
const connectDatabase = require('./src/config/database');
const setupSecurity = require('./src/common/middleware/security');
const { errorHandler, notFound } = require('./src/common/middleware/errorHandler');
const { apiLimiter, authLimiter } = require('./src/common/middleware/rateLimiter');

// Import routes
const authRoutes = require('./src/routes/auth.router');
const userRoutes = require('./src/routes/user.router');
const ruleRoutes = require('./src/routes/rule.router');
const systemSettingsRoutes = require('./src/routes/systemSettings.router');
const itemRoutes = require('./src/routes/item.router');

const app = express();

// Connect to database
connectDatabase();

// Setup security (CORS, Helmet)
setupSecurity(app);

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));

// API routes with rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', apiLimiter, userRoutes);
app.use('/api/rules', apiLimiter, ruleRoutes);
app.use('/api/settings', apiLimiter, systemSettingsRoutes);
app.use('/api/items', apiLimiter, itemRoutes);
app.use('/api/orders', apiLimiter, require('./src/routes/order.router'));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug endpoint in development
if (process.env.NODE_ENV === 'development') {
  const fs = require('fs');

  app.get('/debug/uploads/:path(*)', (req, res) => {
    const uploadPath = path.join(__dirname, 'uploads');
    const filePath = path.join(uploadPath, req.params.path);
    console.log('[DEBUG] Checking file:', filePath);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      res.json({
        exists: true,
        path: filePath,
        relativePath: req.params.path,
        size: stats.size,
        isFile: stats.isFile(),
        readable: fs.accessSync(filePath, fs.constants.R_OK) === undefined
      });
    } else {
      res.status(404).json({
        exists: false,
        path: filePath,
        relativePath: req.params.path
      });
    }
  });
}

const expressStaticGzip = require('express-static-gzip');
/*
icon
user d0_30
https://discord.gg/BP9bbdfd7y

https://discord.gg/gs1
*/

// Serve React frontend static files - USE ABSOLUTE PATH
const clientDistPath = path.resolve(__dirname, '..', 'client', 'dist');
console.log('[STATIC] Serving frontend from:', clientDistPath);

// Serve static files with Brotli/Gzip support
app.use('/', expressStaticGzip(clientDistPath, {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}));

// Fallback for uncompressed files if the above fails or files don't exist
app.use('/', express.static(clientDistPath));

// Handle client-side routing - serve index.html for any unknown routes
// This must come AFTER API routes but BEFORE the 404 handler
app.get('*', (req, res, next) => {
  // If the request is for an API route that wasn't found, let it go to 404 handler
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.resolve(clientDistPath, 'index.html');
  console.log('[ROUTE] Serving index.html for:', req.path, 'from:', indexPath);
  res.sendFile(indexPath);
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\x1b[32m✓ Server running on port ${PORT} in ${process.env.NODE_ENV} mode\x1b[0m`);
});

module.exports = app;