const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const applySecurity = require('./middleware/security');
const firewall = require('./middleware/firewall');
const { supabase } = require('./utils/supabaseClient');

// Load environment variables
dotenv.config();

// ❗ Create Express app BEFORE using `app`
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
applySecurity(app);
app.use(firewall);

// Routes
app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const { data, error } = await supabase.from('submissions').insert([{ name, email }]);

  if (error) {
    return res.status(500).json({ error: 'Database insert failed', details: error });
  }

  res.json({
    message: 'Data saved to Supabase',
    data,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
