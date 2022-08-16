const { createClient } = require("redis");

const redisClient = createClient({
  host: process.env.NODE_ENV === "production" ? "localhost:80" : "141.164.48.244",
  url: `redis://${process.env.REDIS_HOST}`,
  password: process.env.REDIS_PASSWORD,
  port: 6379,
});

module.exports = redisClient;