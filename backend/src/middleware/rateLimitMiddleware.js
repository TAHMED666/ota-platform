const requestStore = new Map();

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100);

const apiRateLimiter = (req, res, next) => {
  const key = `${req.ip}:${req.baseUrl}`;
  const currentTime = Date.now();
  const existing = requestStore.get(key);

  if (!existing || currentTime - existing.windowStart > WINDOW_MS) {
    requestStore.set(key, { count: 1, windowStart: currentTime });
    return next();
  }

  if (existing.count >= MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  existing.count += 1;
  requestStore.set(key, existing);
  return next();
};

module.exports = { apiRateLimiter };
