const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class Comment extends Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: DataTypes.STRING(300),
                    allowNull: false,
                },
                valueSize: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
                ValueBrightness: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
                ValueColorSense: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
                ValueStorageSpace: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
                DateTIme: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                modelName: 'Comment',
                tableName: 'Comments',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize
            }
        )
    }
    static associate(db) {
    }
}