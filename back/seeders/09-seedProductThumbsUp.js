'use strict';

const { truncateSync } = require('fs');
const { truncateForce } = require('../utils/seeder-helper');

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let dummyProductThumbsUp = [];
        for (var j = 0; j < 100; j++) {
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
            for (var k = 0; k < temp; k++)
                dummyProductThumbsUp.push({
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    UserId: randNumbers[k],
                    ProductId: j + 1,
                });
        }

        await queryInterface.bulkInsert(
            'ProductThumbsUp',
            dummyProductThumbsUp,
        );
    },

    async down(queryInterface, Sequelize) {
        await truncateForce(queryInterface, 'ProductThumbsup');
    },
};
