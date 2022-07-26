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
                indexes: [
                    {
                        unique: true,
                        fields: [
                            'ProductMainTagId',
                            'ProductSubTagId',
                            'UserId',
                            'ProductId',
                        ],
                        name: 'my_carts_unique_p_p_u_p_id', //Identifier name is too long 오류 방지
                    },
                ],
                sequelize,
            },
        );
    }
    static associate(db) {
        db.MyCart.belongsTo(db.Product, {
            foreignKey: {
                name: 'ProductId',
                allowNull: false,
            },
        });
        db.MyCart.belongsTo(db.ProductMainTag, {
            foreignKey: { name: 'ProductMainTagId', allowNull: false },
        });
        db.MyCart.belongsTo(db.ProductSubTag, {
            foreignKey: { name: 'ProductSubTagId', allowNull: false },
        });

        db.MyCart.belongsTo(db.User, {
            foreignKey: { name: 'UserId', allowNull: false },
        });
    }
};
