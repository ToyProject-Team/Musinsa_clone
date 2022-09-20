'use strict';

const { Product, ProductSize } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let Cart = [];
        for (let productId = 1; productId <= 100; productId++) {
            const product = await Product.findOne({
                where: { id: productId },
                include: [
                    {
                        model: ProductSize,
                        attributes: ['size', 'amount'],
                    },
                ],
            });

            if (product.ProductSizes.length == 0) continue;

            let temp = rand(0, 6);
            let randNumbers = [];
            let idx = 0;
            while (true) {
                if (idx == temp) {
                    break;
                }
                let randNumber = rand(1, 50);
                if (!randNumbers.includes(randNumber)) {
                    randNumbers.push(randNumber);
                    idx++;
                }
            }

            for (var k = 0; k < temp; k++) {
                const { size, amount } =
                    product.ProductSizes[
                        rand(0, product.ProductSizes.length - 1)
                    ];

                Cart.push({
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    UserId: randNumbers[k],
                    ProductId: productId,
                    packingAmount: rand(1, amount),
                    packingSize: size,
                });
            }
        }

        await queryInterface.bulkInsert('MyCarts', Cart);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
