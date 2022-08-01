const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class ProductImg extends Model {
    static init(sequelize) {
        return super.init(
            {
                src: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true
                }
            },
            {
                modelName: 'ProductImg',
                tableName: 'ProductImgs',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
        db.ProductImg.belongsTo(db.Product)
    }
}