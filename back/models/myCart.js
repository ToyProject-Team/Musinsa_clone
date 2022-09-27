const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class MyCart extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                packingAmount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                modelName: 'MyCart',
                tableName: 'MyCarts',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize,
            },
        );
    }
    static associate(db) {
        db.MyCart.belongsTo(db.Product, { foreignKey: 'ProductId' });
        db.MyCart.belongsTo(db.ProductMainTag, {
            foreignKey: 'ProductMainTagId',
        });
        db.MyCart.belongsTo(db.ProductSubTag, {
            foreignKey: 'ProductSubTagId',
        });

        db.MyCart.belongsTo(db.User, { foreignKey: 'UserId' });
    }
};
