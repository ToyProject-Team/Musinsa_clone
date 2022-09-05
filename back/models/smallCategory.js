const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class SmallCategory extends Model {
    static init(sequelize) {
        return super.init(
            {
                categoryName: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                }
            },
            {
                modelName: 'SmallCategory',
                tableName: 'SmallCategories',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.SmallCategory.hasMany(db.Product)
        db.SmallCategory.belongsTo(db.BigCategory)
        db.SmallCategory.hasMany(db.CategoryColor)
    }
}