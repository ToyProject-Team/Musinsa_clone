'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var dummyProduct = [];
    
    for (var i = 0; i < 10; i++) {
      dummyProduct.push({
        ProductTitle: faker.commerce.product(),
        productInfo: faker.git.commitMessage(),
        productPrice: rand(10000, 300000),
        views: rand(0, 1000),
        likes: rand(0, 1000),
        comments: rand(0, 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("products", dummyProduct);
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
