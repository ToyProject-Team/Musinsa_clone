const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Product extends Model {
    static init(sequelize) {
        return super.init(
            {
                productTitle: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                productInfo: {
                    type: DataTypes.STRING(400),
                    allowNull: false
                },
                productPrice: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                views: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                likes: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                comments: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                gender: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                season : {
                    type: DataTypes.STRING(10),
                    allowNull: false
                },
                beRleased : {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                deliveryFrom : {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                deliveryWay : {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                deliveryCompany : {
                    type: DataTypes.STRING(30),
                    // allowNull: false
                },
                nonMemberPrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                rookiePrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                memberPrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                bronzePrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                silverPrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                goldPrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                platinumPrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                diamondPrice : {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                },
                sells: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                }
            },
            {
                modelName: 'Product',
                tableName: 'Products',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.Product.belongsToMany(db.CustomCategory, {
            through: 'CustomCategoriesMatch'
        })
        db.Product.hasOne(db.ProductImg)
        db.Product.belongsToMany(db.User, {
            through: 'ProductThumbsUp'
        })
        db.Product.belongsToMany(db.User, {
            through: 'Views',
            as:'IsViewed'
        })
        db.Product.belongsToMany(db.User, {
            through: 'isLikes'
        })
        db.Product.belongsTo(db.BigCategory)
    }
}