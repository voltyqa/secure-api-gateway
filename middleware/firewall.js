// middleware/firewall.js

const blockedIPs = [
  "160.202.36.25", // Add malicious IPs here
];

const firewall = (req, res, next) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const clientIP = xForwardedFor
    ? xForwardedFor.split(',')[0].trim()
    : req.socket.remoteAddress;

  if (blockedIPs.includes(clientIP)) {
    console.log(`❌ Blocked IP: ${clientIP}`);
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
};

module.exports = firewall;
