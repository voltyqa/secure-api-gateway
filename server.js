// server.js

require('dotenv').config();           // .env file se variables load karne ke liye
const express = require('express');
const helmet = require('helmet');     // security headers ke liye
const morgan = require('morgan');     // request logging ke liye
const rateLimit = require('express-rate-limit'); // DDoS attack ke liye limiter

const firewall = require('./middleware/firewall');  // custom firewall middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());               // Security headers add karo
app.use(express.json());         // JSON request body parse karo
app.use(morgan('combined'));     // HTTP request logs console pe dikhao

// Rate limiting middleware - 15 minutes me 100 requests max per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Custom firewall middleware lagao
app.use(firewall);

// Test route (API endpoint)
app.get('/secure-data', (req, res) => {
  res.json({ message: 'Secure data accessed!' });
});

// Server ko start karo
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
