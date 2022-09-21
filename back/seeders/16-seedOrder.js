'use strict';

const { User, Product, ProductMainTag, ProductSubTag } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const categoryCount = [
            9, 12, 8, 3, 3, 3, 11, 13, 9, 13, 7, 2, 5, 3, 8, 5, 7, 12, 11, 11,
            2, 2,
        ];

        const dummyOrder = [];
        const exUser = await User.findAll({
            attributes: ['recipientNumber', 'recipient', 'addressNumber'],
            limit: 50,
        });
        // console.log(exUser)
        const product = await Product.findAll({
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
        console.log(product[1].ProductMainTags.length);
        for (let i = 1; i < 50; i++) {
            const productMainTag =
                product[i].ProductMainTags[
                    rand(0, product.ProductMainTags.length - 1)
                ];

            const productSubTag =
                productMainTag.ProductSubTags[
                    rand(0, ProductMainTag.ProductSubTags.length - 1)
                ];
            const orderSize = productMainTag.name;
            const orderColor = productSubTag.name;
            const orderAmount = productSubTag.amount;
            let ranNumber = [];
            let amount = rand(1, 6);
            for (let j = 0; j < amount; j++) {
                let randPrice = rand(10000, 200000);
                let temp = rand(1, 1500);
                if (!ranNumber.includes(temp)) {
                    ranNumber.push(temp);
                }
                dummyOrder.push({
                    orderPrice: randPrice,
                    cancelableAmount: randPrice,
                    amount: rand(1, 20),
                    state: rand(1, 2),
                    MerchantUid: rand(1324141, 4324141),
                    ImpUid: rand(1324123, 4324141),
                    orderSize: orderSize,
                    orderColor: orderColor,
                    amount: orderAmount,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    UserId: i,
                    ProductId: temp,
                });
            }
        }

        await queryInterface.bulkInsert('Orders', dummyOrder);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Orders', null, {});
    },
};
