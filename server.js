require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ Root route — GET /
app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

// ✅ POST route — /submit
app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  res.json({ message: 'Data received successfully', data: { name, email } });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
