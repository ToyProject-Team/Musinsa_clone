const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class ProductMainTag extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
            },
            {
                modelName: 'ProductMainTag',
                tableName: 'ProductMainTags',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize,
            },
        );
    }
    static associate(db) {
        db.ProductMainTag.belongsTo(db.Product);
        db.ProductMainTag.hasMany(db.ProductSubTag);
    }
};
