const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class ProductSubTag extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                modelName: 'ProductSubTag',
                tableName: 'ProductSubTags',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.ProductSubTag.belongsTo(db.ProductMainTag)
    }
}