const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Order extends Model {
    static init(sequelize) {
        return super.init(
            {
                orderPrice: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                state: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                MerchantUid: {
                    type: DataTypes.STRING(100),
                    // allowNull: false
                },
                ImpUid: {
                    type: DataTypes.STRING(100),
                    // allowNull: false
                },
                cancelableAmount: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                // orderSize: {

                // },
                // orderColor: {

                // },
                
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