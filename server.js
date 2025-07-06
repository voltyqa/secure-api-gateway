const express = require('express');
const dotenv = require('dotenv');
const applySecurity = require('./middleware/security');
const firewall = require('./middleware/firewall');
const bodyParser = require('body-parser');
const supabase = require('./utils/supabaseClient');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

applySecurity(app);     // helmet, morgan, rate limiter
app.use(firewall);      // 🛡️ custom firewall

app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

 // ✅ Insert into Supabase
  const { data, error } = await supabase
    .from('submissions')      // ⚠️ Make sure this table exists in your Supabase DB
    .insert([{ name, email }]);

  if (error) {
    return res.status(500).json({ error: 'Supabase insert failed', details: error.message });
  }

  res.json({
    message: 'Data saved to Supabase successfully!',
    data,
  });
});

  res.json({
    message: 'Data received successfully',
    data: { name, email },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
