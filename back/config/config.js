const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  development: { 
    username: 'plz',
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: 'plz',
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: 'plz',
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};