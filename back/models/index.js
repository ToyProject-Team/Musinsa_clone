const Sequelize = require('sequelize');

const user = require('./user');
const product = require('./product');
const bigCategory = require('./bigCategory');
const ProductImg = require('./productImg');
const SmallCategory = require('./smallCategory');
const CustomCategory = require('./customCategory');
const Comment = require('./comment');
const Order = require('./order');
const CategoryColor = require('./categoryColor');
const ProductMainTag = require('./productMainTag');
const ProductSubTag = require('./productSubTag');
const MyCart = require('./myCart');

const db = {};
db.User = user;
db.Product = product;
db.BigCategory = bigCategory;
db.ProductImg = ProductImg;
db.SmallCategory = SmallCategory;
db.CustomCategory = CustomCategory;
db.Comment = Comment;
db.Order = Order;
db.CategoryColor = CategoryColor;
db.ProductMainTag = ProductMainTag;
db.ProductSubTag = ProductSubTag;
db.MyCart = MyCart;

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
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
