const express = require('express');
const dotenv = require('dotenv');
const applySecurity = require('./middleware/security');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// 🔐 Apply security middleware
applySecurity(app);

// ✅ Routes
app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  res.json({
    message: 'Data received successfully',
    data: { name, email },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
