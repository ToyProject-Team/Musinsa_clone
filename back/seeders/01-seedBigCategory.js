'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        var temp = [
            '상의',
            '아우터',
            '바지',
            '원피스',
            '스커트',
            '스니커즈',
            '신발',
            '가방',
            '여성 가방',
            '스포츠/용품',
            '모자',
            '양말/레그웨어',
            '속옷',
            '선글라스/안경테',
            '악세서리',
            '시계',
            '주얼리',
            '뷰티',
            '디지털/테크',
            '생활/취미/예술',
            '책/음악/티켓',
            '반려동물',
        ];
        const dummyBigCategory = [];
        for (var i = 0; i < temp.length; i++) {
            dummyBigCategory.push({
                categoryName: temp[i],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert('BigCategories', dummyBigCategory);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('BigCategories', null, {});
    },
};
