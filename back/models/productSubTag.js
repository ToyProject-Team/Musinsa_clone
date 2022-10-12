const { Transaction } = require('sequelize');
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class ProductSubTag extends Model {
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
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                modelName: 'ProductSubTag',
                tableName: 'ProductSubTags',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize,
            },
        );
    }
    static associate(db) {
        db.ProductSubTag.belongsTo(db.ProductMainTag);
    }

    /**
     * 모델에서 개수를 지운다.
     * ```js
     * productSubTag = await productSubTag.reductAmount(10)
     * ```
     * @param {number} amount 지울 개수
     * @param {DataTypes.Options} option
     */
    async reduceAmount(amount, option) {
        if (this.amount < amount)
            throw new Error(
                `${amount}만큼 지울 수 없습니다. amount는 ${this.amount}보다 같거나 작아야 합니다.`,
            );

        if (amount <= this.amount) {
            await this.update({ amount: this.amount - amount }, option);
            return this.save(option);
        }
    }
};
