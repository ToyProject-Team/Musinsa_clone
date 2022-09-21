'use strict';

const { ProductMainTag } = require('../models');
const { truncateForce } = require('../utils/seeder-helper');

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let option = ['S', 'M', 'L', 'XL', 'XXL'];
        const dummyProductMainTags = [];
        for (var i = 1; i < 200; i++) {
            let randNums = [];
            let amount = rand(1, 5);
            for (j = 0; j < amount; j++) {
                let ran = rand(0, 4);
                if (!randNums.includes(ran)) {
                    randNums.push(option[ran]);
                }
            }
            if (randNums.length == 0) {
                randNums.push(option[0]);
            }
            console.log(randNums);
            for (var j = 0; j < amount; j++) {
                dummyProductMainTags.push({
                    name: randNums[j],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    ProductId: i,
                });
            }
        }
        console.log(dummyProductMainTags);
        await queryInterface.bulkInsert(
            'ProductMainTags',
            dummyProductMainTags,
        );
    },

    async down(queryInterface, Sequelize) {
        await truncateForce(queryInterface, 'ProductMainTags');
    },
};
