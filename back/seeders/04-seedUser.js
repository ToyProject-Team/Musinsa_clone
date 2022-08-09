'use strict';

const { faker } = require("@faker-js/faker");
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var dummyUser = [];
    
    for (var i = 0; i < 50; i++) {
      // console.log(i)
      dummyUser.push({
        loginId: faker.internet.email(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.random.alpha(10), 10),
        nickname: faker.name.findName(),
        phoneNumber: i,
        address: rand(10000, 300000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", dummyUser);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
