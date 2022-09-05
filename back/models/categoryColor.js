const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class CategoryColor extends Model {
    static init(sequelize) {
        return super.init(
            {
                Color: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    unique: true
                },
            },
            {
                modelName: 'CategoryColor',
                tableName: 'CategoryColors',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        CategoryColor.belongsTo(db.SmallCategory)
    }
}