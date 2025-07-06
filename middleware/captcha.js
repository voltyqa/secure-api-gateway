// middleware/captcha.js

module.exports = (req, res, next) => {
  const suspicious = false; // Simulate check, replace with real captcha logic if needed

  if (suspicious) {
    return res.status(403).json({ error: 'Captcha verification required' });
  }

  next();
};
