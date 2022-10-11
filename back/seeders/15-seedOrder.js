'use strict';

const { User, Product, ProductMainTag, ProductSubTag } = require('../models');
const { truncateForce } = require('../utils/seeder-helper');

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let dummyOrder = [];
        for (let productId = 1; productId <= 50; productId++) {
            const product = await Product.findOne({
                where: { id: productId },
                include: [
                    {
                        model: ProductMainTag,
                        include: {
                            model: ProductSubTag,
                        },
                    },
                ],
            });

            const productMainTag =
                product.ProductMainTags[
                    rand(0, product.ProductMainTags.length - 1)
                ];
            const productSubTag =
                productMainTag.ProductSubTags[
                    rand(0, productMainTag.ProductSubTags.length - 1)
                ];

            const amount = rand(1, productSubTag.amount);

            dummyOrder.push({
                orderPrice: product.productPrice * amount,
                cancelableAmount: amount,
                state: rand(1, 2),
                MerchantUid: rand(1324141, 4324141),
                ImpUid: rand(1324123, 4324141),
                amount: amount,
                createdAt: new Date(),
                updatedAt: new Date(),
                UserId: rand(1, 50),
                ProductId: product.id,
                ProductMainTagId: productMainTag.id,
                ProductSubTagId: productSubTag.id,
            });
        }

        await queryInterface.bulkInsert('Orders', dummyOrder);
    },

    async down(queryInterface, Sequelize) {
        await truncateForce(queryInterface, 'Orders');
    },
};
