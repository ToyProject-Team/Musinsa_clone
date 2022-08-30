const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class ProductSize extends Model {
    static init(sequelize) {
        return super.init(
            {
                size: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                modelName: 'ProductSize',
                tableName: 'ProductSizes',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.ProductImg.belongsTo(db.Product)
    }
}