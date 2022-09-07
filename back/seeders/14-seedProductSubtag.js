'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    // const categoryCount = [9, 12, 8, 3, 3, 3, 11, 13, 9, 13, 7, 2, 5, 3, 8, 5, 7, 12, 11, 11, 2, 2]

    // const dummyProductSubtag = []
    // for (var i = 1; i < 23; i++) {
    //   for (var j = 0; j < categoryCount[i-1]; j++) {
    //     dummyProductSubtag.push({
    //       categoryName: j+1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       BigCategoryId: i
    //     })
    //   }
    // }
    
    // await queryInterface.bulkInsert("productsubtags", dummyProductSubtag);
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
