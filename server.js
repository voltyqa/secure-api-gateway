const supabase = require('./utils/supabaseClient');

app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const { data, error } = await supabase
      .from('submissions') // Make sure this matches your table name
      .insert([{ name, email }]);

    if (error) {
      console.error('❌ Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Supabase insert failed', details: error.message });
    }

    res.json({
      message: '✅ Data saved to Supabase successfully!',
      data,
    });
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
});
