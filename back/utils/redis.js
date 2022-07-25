const { createClient } = require("redis");

const redisClient = createClient({
  host: "localhost:80",
  url: `redis://${process.env.REDIS_HOST}`,
  password: process.env.REDIS_PASSWORD,
  port: 6379,
});

module.exports = redisClient;