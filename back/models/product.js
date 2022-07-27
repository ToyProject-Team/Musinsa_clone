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
        db.Product.belongsToMany(db.User, {
            through: 'ProductThumbsUp'
        })
        db.Product.belongsToMany(db.User, {
            through: 'Views',
            as:'IsViewed'
        })
        db.Product.belongsToMany(db.User, {
            through: 'rate'
        })
        db.Product.belongsToMany(db.BigCategory, {
            through: 'productCategory'
        })
    }
}