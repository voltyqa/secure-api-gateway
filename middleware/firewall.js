// middleware/firewall.js

const blockedIPs = [
  160.202.36.25, // Add malicious IPs here
];

const firewall = (req, res, next) => {
  const clientIP =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (blockedIPs.includes(clientIP)) {
    console.log(`❌ Blocked IP: ${clientIP}`);
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
};

module.exports = firewall;
