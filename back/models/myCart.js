const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class MyCart extends Model {
    static init(sequelize) {
        return super.init(
            {
                packingAmount: {
                    type: DataTypes.INTEGER,
                    // defaultValue: 2,
                    allowNull: false,
                },
                packingSize: {
                    // defaultValue: "S",
                    type: DataTypes.STRING(30),
                    allowNull: true,
                },
                packingColor: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
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
    static associate(db) {}
};
