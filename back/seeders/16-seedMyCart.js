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

            if (
                product.ProductMainTags == undefined ||
                product.ProductMainTags.length == 0
            ) {
                console.warn(
                    `product [id: ${product.id}]에 ProductMainTags가 없습니다!\n오류 방지를 위헤 MyCart 테이블에 넣지 않습니다`,
                );
                continue;
            }

            for (let productMainTag of product.ProductMainTags) {
                if (
                    productMainTag.ProductSubTags == undefined ||
                    productMainTag.ProductSubTags.length == 0
                ) {
                    console.warn(
                        `product[id: ${product.id}].ProductMainTags[${productMainTag}]에 ProductSubTags가 없습니다!\n오류 방지를 위헤 MyCart 테이블에 넣지 않습니다`,
                    );
                    continue;
                }

                for (let productSubTag of productMainTag.ProductSubTags) {
                    const packingAmount = rand(1, productSubTag.amount);
                    const userId = rand(1, 50);

                    if (packingAmount > 0) {
                        Cart.push({
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            UserId: userId,
                            ProductId: product.id,
                            productMainTagId: productMainTag.id,
                            productSubTagId: productSubTag.id,
                            packingAmount,
                        });
                    }
                }
            }
        }
        await queryInterface.bulkInsert('MyCarts', Cart);
    },

    async down(queryInterface, Sequelize) {
        await truncateForce(queryInterface, 'MyCarts');
    },
};
