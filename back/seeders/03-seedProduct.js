'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function weather(randIdx) {
      if (randIdx == 0) {
        return 'S/S'
      } else if (randIdx == 1){
        return 'F/W'
      } else {
        return 'ALL'
      }
    }

    function whoDeliver (ran) {
      if (ran == 0) {
        return 'CJ대한통운'
      }
      if (ran == 1) {
        console.log()
        return '로젠택배'
      }
      if (ran == 2) {
        return '롯데택배'
      }
    }
    function premium (randIdx) {
      if (randIdx > 20) {
        return 110
      } else if (randIdx > 7) {
        return 120
      } else if (randIdx > 2) {
        return 130
      } else {
        return 140
      }
    }

    var dummyProduct = [];
    var randPrices = []
    const categoryImgCOunt = [180, 180, 180, 34, 180, 180, 180, 180, 90, 180, 180, 180, 180, 180, 180, 140, 156, 172, 186, 180, 180, 172]
    for (i = 0; i< categoryImgCOunt.reduce((a,b) => a + b); i++) {
      randPrices.push(rand(200, 3000) * 100)
    }

    var temp = ['상의', '아우터', '바지', '원피스', '스커트', '스니커즈', '신발', '가방', '여성 가방', '스포츠/용품', '모자', '양말/레그웨어', '속옷', '선글라스/안경테', '악세서리', '시계', '주얼리', '뷰티', '디지털/테크', '생활/취미/예술', '책/음악/티켓', '반려동물'
    ];
    const categoryitemsCount = [9, 12, 8, 3, 3, 3, 11, 13, 9, 13, 7, 2, 5, 3, 8, 5, 7, 12, 11, 11, 2, 2]

    let sum = 0
    let Idx = 0
    let dividedCount = 20
    let ImgSmallIdx = 0
    // console.log(categoryImgCOunt.reduce((a,b) => a + b))
    for (var i = 0; i < categoryImgCOunt.reduce((a,b) => a + b); i++) {
      if (sum == categoryImgCOunt[Idx]) {
        Idx +=1
        dividedCount = parseInt(categoryImgCOunt[Idx] / categoryitemsCount[Idx])
        ImgSmallIdx = 0
        sum = 0 
      }
      // console.log(sum, ImgSmallIdx, dividedCount)
      sum +=1
      let nonMemberPriceValue = randPrices[i]
      dummyProduct.push({
        ProductTitle: faker.commerce.product(),
        productInfo: faker.git.commitMessage(),
        productPrice: (nonMemberPriceValue/100)* premium(rand(0,60)),
        views: rand(1000, 20000),
        sells: rand(1000, 3000),
        likes: rand(0, 1000),
        comments: rand(0, 12000),
        gender : rand(0,1),
        season : String(rand(2020, 2021))+" "+weather(rand(0,2)),
        beRleased : faker.date.between('2022-07-09T00:00:00.000Z', '2022-09-31T00:00:00.000Z'),
        deliveryFrom : rand(0,1),
        deliveryWay : rand(0,1),
        deliveryCompany : whoDeliver(rand(0,2)),
        nonMemberPrice : nonMemberPriceValue,
        rookiePrice : (nonMemberPriceValue/100)*90,
        memberPrice : (nonMemberPriceValue/100)*89,
        bronzePrice : (nonMemberPriceValue/100)*88,
        silverPrice : (nonMemberPriceValue/100)*87,
        goldPrice : (nonMemberPriceValue/100)*86,
        platinumPrice : (nonMemberPriceValue/100)*85,
        diamondPrice : (nonMemberPriceValue/100)*84,
        createdAt: new Date(),
        updatedAt: new Date(),
        BigCategoryId: Idx+1,
        SmallCategoryId: ImgSmallIdx +1, 
      });
      if (sum % dividedCount == 0 && i != 0) {
        ImgSmallIdx +=1
      }
    }

    await queryInterface.bulkInsert("Products", dummyProduct);
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