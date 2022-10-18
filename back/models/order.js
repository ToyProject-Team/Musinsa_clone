const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Order extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
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
                    allowNull: false,
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
                    allowNull: false,
                },
            },
            {
                modelName: 'Order',
                tableName: 'Orders',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize,
            },
        );
    }
    static associate(db) {
        db.Order.belongsTo(db.Product, {
            foreignKey: {
                name: 'ProductId',
                allowNull: false,
            },
        });
        db.Order.belongsTo(db.ProductMainTag, {
            foreignKey: {
                name: 'ProductMainTagId',
                allowNull: false,
            },
        });
        db.Order.belongsTo(db.ProductSubTag, {
            foreignKey: {
                name: 'ProductSubTagId',
                allowNull: false,
            },
        });
        db.Order.belongsTo(db.User, {
            foreignKey: {
                name: 'UserId',
                allowNull: false,
            },
        });
    }
};
