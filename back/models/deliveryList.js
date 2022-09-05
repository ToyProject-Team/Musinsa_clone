const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class DeliveryList extends Model {
    static init(sequelize) {
        return super.init(
            {
                orderPrice: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
            },
            {
                modelName: 'DeliveryList',
                tableName: 'DeliveryLists',
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