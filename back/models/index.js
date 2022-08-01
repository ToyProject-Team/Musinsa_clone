const Sequelize = require("sequelize");

const user = require('./user')
const product = require('./product')
const bigCategory = require('./bigCategory')
const ProductImg = require('./productImg');
const SmallCategory = require("./smallCategory");

const db = {};
db.User = user;
db.Product = product;
db.BigCategory = bigCategory;
db.ProductImg = ProductImg;
db.SmallCategory = SmallCategory;

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  console.log(modelName);
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;