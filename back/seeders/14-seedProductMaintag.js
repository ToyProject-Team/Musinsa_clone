'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const categoryCount = [9, 12, 8, 3, 3, 3, 11, 13, 9, 13, 7, 2, 5, 3, 8, 5, 7, 12, 11, 11, 2, 2]
    const dummyProductMainTags = []
    for (var i = 1; i < 23; i++) {
      randNums = []
      ran = rand(20, 40)
      if (!randNums.includes(ran)) {
        randNums.push(ran)
      }
      for (var j = 0; j < randNums.length; j++) {
        dummyProductMainTags.push({
          name: randNums,
          createdAt: new Date(),
          updatedAt: new Date(),
          ProductId: i
        })
      }
    }
    
    await queryInterface.bulkInsert("productmaintags", dummyProductMainTags);
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
