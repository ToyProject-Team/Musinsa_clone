'use strict';

const { Op } = require("sequelize");
const { ProductMainTag } = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const color = ['흰색', '라이트 그레이', '회색', '다크 그레이', '검정색', '딥레드', '빨간색', '라즈베리', '네온 핑크', '분홍색', '라이트 핑크', '페일 핑크', '피치', '네온 오렌지', '주황색', '아이보리', '라이트 옐로우', '노란색', '머스타드', '금색', '네온', '그린', '라이트', '그린', '민트', '녹색', '올리브 그린', '카키', '다크 그린', '스카이 블루', '네온 블루', '파란색', '네이비', '라벤더', '보라색', '다크 바이올렛', '버건디', '갈색', '레드 브라운', '카키 베이지', '카멜', '샌드', '베이지색', '데님', '연청', '중청', '진청', '흑청', '스트라이프', '도트', '체크', '글렌 체크', '타탄 체크', '깅엄 체크', '윈도우 페인', '헤링본', '하운드 투스', '페이즐리', '플라워', '카모', '애니멀', '패치워크']
    let exProduct = await ProductMainTag.findAll({
      // where: {
      //   ProductId: {
      //     [Op.lte]: 20
      //   }
      // },
      attributes: ["id", "ProductId"]
    })
    // console.log(exProduct)
    let dummyProductMainTags = []
    let cur = -1
    let randNums = []
    let ranName
    console.log(exProduct.length)
    for (let i = 0; i < exProduct.length; i++) {
      let x = rand(1,4)
      randNums = []
      console.log(exProduct[i].id)
      for (let j = 0; j < x; j++) {
        if (cur != exProduct.ProductId) {
          cur = exProduct.ProductId
        }
        let ran = rand(0,61)
        if (!randNums.includes(ran)) {
          randNums.push(ran)
          ranName = color[ran]
        }
        dummyProductMainTags.push({
          name: ranName,
          amount: rand(0, 4),
          createdAt: new Date(),
          updatedAt: new Date(),
          ProductMainTagId: exProduct[i].id
        })        
      }
    }
    await queryInterface.bulkInsert("ProductSubTags", dummyProductMainTags);
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

