// middleware/security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

const applySecurity = (app) => {
  // Security headers
  app.use(helmet());

  // Request logging
  app.use(morgan('combined'));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });

  app.use(limiter);
};

module.exports = applySecurity;
