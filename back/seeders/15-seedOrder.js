'use strict';

const { User, Product, ProductMainTag, ProductSubTag } = require('../models');
const { truncateForce } = require('../utils/seeder-helper');

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let dummyOrder = [];
        let cnt = 0;
        for (let i = 1; i < 51; i++) {
            const product = await Product.findOne({
                where: { id: i },
                include: [
                    {
                        model: ProductMainTag,
                        attributes: ['name'],
                        include: {
                            model: ProductSubTag,
                            attributes: ['name', 'amount'],
                        },
                    },
                ],
            });

            let repeat = rand(1, 6);
            cnt += 1;
            const productMainTag =
                product.ProductMainTags[
                    rand(0, product.ProductMainTags.length - 1)
                ];

            const productSubTag =
                productMainTag.ProductSubTags[
                    rand(0, productMainTag.ProductSubTags.length - 1)
                ];
            const size = productMainTag.name;
            const color = productSubTag.name;
            const amount = productSubTag.amount;

            dummyOrder.push({
                orderPrice: product.productPrice,
                cancelableAmount: product.productPrice,
                state: rand(1, 2),
                MerchantUid: rand(1324141, 4324141),
                ImpUid: rand(1324123, 4324141),
                orderSize: size,
                orderColor: color,
                amount: rand(1, amount),
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: i,
                ProductId: cnt,
            });
        }

        await queryInterface.bulkInsert('Orders', dummyOrder);
    },

    async down(queryInterface, Sequelize) {
        await truncateForce(queryInterface, 'Orders');
    },
};
