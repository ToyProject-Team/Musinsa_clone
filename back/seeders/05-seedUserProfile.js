'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const dummyProductImg = []
    const categoryName = ["Accessory", "Bag", "Beauty", "Culture", "DigitalTech", "Eyewear", "Headwear", "Jewelry", "Life", "Onepiece", "Outer", "Pants", "Pet", "Shoes", "Skirt", "Sneakers", "SocksLegwear", "SportsGoods", "Top", "Underwear", "Watch", "Womanbag"]
    let idxCount = 1
    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[0] + '/' + categoryName[0] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[1] + '/' + [1] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[2] + '/' + categoryName[2] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }
    
    for (var i = 1; i <= 34; i++) {
      dummyProductImg.push({
        src: categoryName[3] + '/' + categoryName[3] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[4] + '/' + categoryName[4] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[5] + '/' + categoryName[5] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[6] + '/' + categoryName[6] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[7] + '/' + categoryName[7] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }


    for (var i = 1; i <= 90; i++) {
      dummyProductImg.push({
        src: categoryName[8] + '/' + categoryName[8] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[9] + '/' + categoryName[9] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[10] + '/' + categoryName[10] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[11] + '/' + categoryName[11] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[12] + '/' + categoryName[12] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[13] + '/' + categoryName[13] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[14] + '/' + categoryName[14] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 140; i++) {
      dummyProductImg.push({
        src: categoryName[15] + '/' + categoryName[15] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }
    for (var i = 1; i <= 156; i++) {
      dummyProductImg.push({
        src: categoryName[16] + '/' + categoryName[16] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 172; i++) {
      dummyProductImg.push({
        src: categoryName[17] + '/' + categoryName[17] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 186; i++) {
      dummyProductImg.push({
        src: categoryName[18] + '/' + categoryName[18] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[19] + '/' + categoryName[19] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 180; i++) {
      dummyProductImg.push({
        src: categoryName[20] + '/' + categoryName[20] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

    for (var i = 1; i <= 172; i++) {
      dummyProductImg.push({
        src: categoryName[21] + '/' + categoryName[21] + String(i),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProductId: idxCount
      })
      idxCount+=1
    }

     await queryInterface.bulkInsert("ProductImgs", dummyProductImg);
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
