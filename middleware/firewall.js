module.exports = function (req, res, next) {
  const ip = req.ip;

  // Simple SQL injection pattern block
  const sqlInjectionPattern = /(\%27)|(\')|(\-\-)|(\%23)|(#)/i;
  if (sqlInjectionPattern.test(req.url)) {
    return res.status(403).send("Blocked: Potential SQL Injection");
  }

  // TODO: Add logic to detect brute force or DDoS here

  next();
};
