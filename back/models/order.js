const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Order extends Model {
    static init(sequelize) {
        return super.init(
            {
                orderPrice: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
                state: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false
                }
            },
            {
                modelName: 'Order',
                tableName: 'Orders',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
    }
}