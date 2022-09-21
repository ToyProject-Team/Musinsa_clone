'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let option = ['S', 'M', 'L', 'XL', 'XXL'];

        const ProductSize = [];
        for (var i = 0; i < 1700; i++) {
            var randsize = [];
            let temp = rand(0, 7);
            for (let j = 0; j < temp; j++) {
                let ranSize = option[rand(0, 4)];
                if (!randsize.includes(ranSize)) {
                    ProductSize.push({
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        amount: rand(0, 7),
                        size: ranSize,
                        ProductId: i + 1,
                    });
                }
                randsize.push(ranSize);
            }
        }

        await queryInterface.bulkInsert('ProductSizes', ProductSize);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductSizes', null, {});
    },
};
