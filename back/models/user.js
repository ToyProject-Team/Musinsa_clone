const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                loginId: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true
                },
                email: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING(200),
                    allowNull: false
                },
                nickname: {
                    type: DataTypes.STRING(30),
                    unique: true
                },
                phoneNumber: {
                    type: DataTypes.STRING(30),
                    allowNull: true,
                    unique: true
                }
            },
            {
                modelName: 'User',
                tableName: 'Users',
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