const express = require('express');

const User = require('../models/user');
const Product = require('../models/product');
const router = express.Router();
const authJWT = require('../utils/authJWT');
const ProductImg = require('../models/productImg');
const { Sequelize } = require('sequelize');

router.get('/favoriteGoods', authJWT, async (req, res, next) => {
    try {
        console.log(req.myId);
        const me = await User.findOne({
            where: {
                id: req.myId,
            },
        });
        console.log(me);
        if (!me) {
            return res
                .status(400)
                .send({ message: '유저의 조회 결과가 없습니다' });
        }

        const likeProduct = await me.getLikeIt({
            joinTableAttributes: [],
            attributes: ['id', 'productPrice', 'likes', 'productTitle'],
            include: [
                {
                    model: ProductImg,
                    attributes: ['src'],
                },
            ],
            limit: 100,
        });

        res.status(200).send({ likeProduct });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/favoriteGoods/del', authJWT, async (req, res, next) => {
    try {
        if (!req.body.productId) {
            return res
                .status(400)
                .send({ message: '입력값을 다시 확인해주세요' });
        }

        const me = await User.findOne({
            where: {
                id: req.myId,
            },
        });

        if (!me) {
            return res
                .status(401)
                .send({ message: '유저의 조회 결과가 없습니다' });
        }

        let checkList = await me.getLikeIt({
            where: {
                id: req.body.productId,
            },
        });
        console.log(checkList);
        if (checkList.length === 0) {
            return res.status(402).send({
                message: 'productId에 대한 상품 조회 결과가 없습니다',
            });
        }

        temp = await me.removeLikeIt(checkList);

        // Product에 like 하나 지움
        await Product.update(
            {
                likes: Sequelize.literal('likes - 1'),
            },
            {
                where: {
                    id: req.body.productId,
                },
            },
        );

        res.status(200).send({ success: true });
    } catch (e) {
        console.error(e);
        next(e);
    }
    // const
});

module.exports = router;
