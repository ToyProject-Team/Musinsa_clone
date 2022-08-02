'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var dummyMatch = [];
    for (var i = 1; i <3651 ; i++) {
      let temp = rand(0,6)
      let randNumbers = []
      let idx = 0
      while (true) {
        if (idx == temp) {
          break
        }
        let randNumber = rand(1, 15)
        if (!randNumbers.includes(randNumber)) {
          randNumbers.push(randNumber)
          idx ++
        }
        // console.log(randNumbers)
      }
      for (var k = 0; k < temp; k++) {
        dummyMatch.push({
          CustomCategoryId: randNumbers[k],
          ProductId: i,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        // console.log(dummyMatch)
      }
      // console.log(i)
    }

    await queryInterface.bulkInsert("CustomCategoryMatch", dummyMatch);
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
