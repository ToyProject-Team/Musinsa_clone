'use strict';
const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      let dummyComment = []
      for (var j = 0; j < 100; j++) {
        let temp = rand(0,6)
        let randNumbers = []
        let idx = 0
        while (true) {
          if (idx == temp) {
            break
          }
          let randNumber = rand(1, 50)
          if (!randNumbers.includes(randNumber)) {
            randNumbers.push(randNumber)
            idx ++
          }
          // console.log(j, randNumbers)
        }
        // console.log(temp)
        // console.log(randNumbers)
        for (var k = 0; k < temp; k++)
        dummyComment.push({
            content: faker.lorem.sentence(5),
            valueSize: rand(0,9),
            ValueBrightness: rand(0,9),
            ValueColorSense: rand(0,9),
            ValueStorageSpace: rand(0,9),
            DateTIme: faker.date.between('2020-01-01T00:00:00.000Z', '2022-08-01T00:00:00.000Z'),
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: randNumbers[k],
            ProductId: j+1,
        })
    }
    
    await queryInterface.bulkInsert("comments", dummyComment);
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
