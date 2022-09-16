const DataTypes = require('sequelize');
const { Model } = DataTypes

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                loginId: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                    unique: 'loginId',
                    fields: 'loginId'
                },
                email: {
                    type: DataTypes.STRING(200),
                    allowNull: true,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING(200),
                    allowNull: true
                },
                nickname: {
                    type: DataTypes.STRING(30),
                    unique: true
                },
                phoneNumber: {
                    type: DataTypes.STRING(30),
                    allowNull: true
                },
                address: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                socialEmail: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                agreement: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true, 
                },
                questionType: {
                    type: DataTypes.INTEGER(11),
                    allowNull: true, 
                },
                questionAnswer: {
                    type: DataTypes.STRING(100),
                    allowNull: true, 
                },
                rank: {
                    type: DataTypes.INTEGER(11),
                    allowNull: true
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
        db.User.belongsToMany(db.Product, {
            through: db.Order,
            as: 'myOrder'
        })
        db.User.belongsToMany(db.Product, {
            through: 'MyCart',
            as: 'myCart'
        })
        db.User.belongsToMany(db.Product, {
            through: db.Comment,
            as: "commented"
        })
        db.User.belongsToMany(db.Product, {
            through: 'ProductThumbsUp',
            as: 'likeIt'
        })
        db.User.belongsToMany(db.Product, {
            through: 'Views',
            as: 'Viewer'
        })
        db.User.belongsToMany(db.Product, {
            through: 'isLikes'
        })
    }
}