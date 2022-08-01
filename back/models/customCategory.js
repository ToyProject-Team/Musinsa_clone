const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class CustomCategory extends Model {
    static init(sequelize) {
        return super.init(
            {
                categoryName: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true
                }
            },
            {
                modelName: 'CustomCategory',
                tableName: 'CustomCategories',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.ProductImg.belongsToMany(db.Product, {
            through: 'CustomCategoryMatch'
        })
    }
}