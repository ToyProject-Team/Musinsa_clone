'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          
        const ProductSize =[]
        for (var i = 0; i < 1700; i++){
        
            var randsize = []
            let temp = rand(0, 7)
            for (let j = 0; j < temp; j++) {
                let ranSize = rand(20,40)
                if (!randsize.includes(ranSize)) {
                    ProductSize.push({
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        amount: rand(0,7),
                        size: rand(20,40),
                        ProductId: i+1,
                    })
                }
                randsize.push(ranSize)
            }
        }
        
        await queryInterface.bulkInsert("ProductSizes", ProductSize);
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
