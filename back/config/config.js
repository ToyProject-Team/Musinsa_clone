const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: NODE_ENV==production? 'plz ': "root",
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: NODE_ENV==production? 'plz ': "root",
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: NODE_ENV==production? 'plz ': "root",
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};