// middleware/ipBlacklist.js

const blockedIPs = new Set([
  '123.123.123.123',  // Example blocked IPs
  '111.111.111.111',
]);

module.exports = (req, res, next) => {
  const ip = req.ip;

  if (blockedIPs.has(ip)) {
    console.log(`Blocked request from blacklisted IP: ${ip}`);
    return res.status(403).json({ error: 'Access denied from your IP' });
  }

  next();
};
