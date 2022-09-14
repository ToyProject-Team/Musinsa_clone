const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class BigCategory extends Model {
    static init(sequelize) {
        return super.init(
            {
                categoryName: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                }
            },
            {
                modelName: 'BigCategory',
                tableName: 'BigCategories',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.BigCategory.belongsTo(db.Product)
    }
}