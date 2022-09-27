'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { truncateForce } = require('../utils/seeder-helper');

module.exports = {
    async up(queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var dummyUser = [];
        dummyUser.push({
            loginId: 'test',
            email: 'sola2014@naver.com',
            password: await bcrypt.hash('test', 10),
            nickname: '이민서',
            phoneNumber: '01062077206',
            createdAt: new Date(),
            updatedAt: new Date(),
            agreement: 1,
            questionType: 1,
            questionAnswer: '312321',
        });
        for (var i = 0; i < 70; i++) {
            // console.log(i)
            let name = faker.name.findName();
            let randPhoneNumber = faker.phone.number('010-####-####');
            dummyUser.push({
                loginId: faker.internet.email(),
                email: faker.internet.email(name),
                password: await bcrypt.hash(faker.random.alpha(10), 10),
                nickname: name,
                phoneNumber: i,
                address: rand(10000, 300000),
                createdAt: new Date(),
                updatedAt: new Date(),
                agreement: rand(0, 1),
                questionType: rand(1, 6),
                questionAnswer: faker.commerce.productName(),
                recipientNumber: randPhoneNumber,
                recipient: name,
                addressNumber: randPhoneNumber,
            });
        }

        await queryInterface.bulkInsert('Users', dummyUser);
    },

    async down(queryInterface, Sequelize) {
        await truncateForce(queryInterface, 'Users');
    },
};
