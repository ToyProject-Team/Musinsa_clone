const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  development: { 
    username: process.env.NODE_ENV=='production'? 'root' : 'plz',
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.NODE_ENV=='production'? 'root' : 'plz',
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.NODE_ENV=='production'? 'root' : 'plz',
    password: process.env.DB_PASSWORD,
    database: "musinsaApp",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};