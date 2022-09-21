'use strict';

const { faker } = require('@faker-js/faker');

const categoryName = [
    '데일리',
    '트랜디',
    '레이어드',
    '패션',
    '모던',
    '여름',
    '기본',
    '클래식',
    '컬렉션',
    '캐시',
    '비주얼',
    '셋업',
    '어센틱',
    '홀리데이',
    '선물',
];

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var dummyCustomCategory = [];

        // console.log(rand)
        for (var i = 0; i < 15; i++) {
            dummyCustomCategory.push({
                categoryName: categoryName[i],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert(
            'CustomCategories',
            dummyCustomCategory,
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('CustomCategories', null, {});
    },
};
