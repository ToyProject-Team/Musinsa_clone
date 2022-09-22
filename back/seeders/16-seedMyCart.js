'use strict';

const { Product, ProductMainTag, ProductSubTag, MyCart } = require('../models');
const { truncateForce } = require('../utils/seeder-helper');

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
                        model: ProductMainTag,
                        attributes: ['name'],
                        include: {
                            model: ProductSubTag,
                            attributes: ['name', 'amount'],
                        },
                    },
                ],
            });

            if (product.ProductMainTags || product.ProductMainTags.length == 0)
                continue;

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
                const productMainTag =
                    product.ProductMainTags[
                        rand(0, product.ProductMainTags.length - 1)
                    ];

                const productSubTag =
                    productMainTag.ProductSubTags[
                        rand(0, ProductMainTag.ProductSubTags.length - 1)
                    ];

                const size = productMainTag.name;
                const color = productSubTag.name;
                const amount = productSubTag.amount;

                Cart.push({
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    UserId: randNumbers[k],
                    ProductId: productId,
                    packingAmount: rand(1, amount),
                    packingSize: size,
                    packingColor: color,
                });
            }
        }

        await queryInterface.bulkInsert('MyCarts', Cart);
    },

    async down(queryInterface, Sequelize) {
        await truncateForce(queryInterface, 'MyCarts');
    },
};
