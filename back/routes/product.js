const express = require('express');
const Product = require('../models/product');
const User = require('../models/user');
const ProductImg = require('../models/productImg');
const CustomCategory = require('../models/customCategory');
const Comment = require('../models/comment');
const ProductMainTag = require('../models/productMainTag');
const ProductSubTag = require('../models/productSubTag');
const AWS = require('aws-sdk');
const fs = require('fs');
const { sequelize, Op, Sequelize } = require('sequelize');
const authJWT = require('../utils/authJWT');
const axios = require('axios');
const { Order } = require('../models');
const router = express.Router();

function checkParams(bigCategory, price) {
    if (!bigCategory) {
    }
}

require('dotenv');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

router.get('/productList', async (req, res, next) => {
    try {
        const startIndx =
            req.query.page == undefined || req.query.page <= 0
                ? 0
                : (Number(req.query.page) - 1) * 100;
        console.log(req.query);

        let whereStatement = {
            productPrice: {
                [Op.between]: [
                    req.query.priceMin
                        ? Number(req.query.priceMin)
                        : req.query.price
                        ? req.query.price == 1
                            ? 0
                            : req.query.price == 2
                            ? 50000
                            : req.query.price == 3
                            ? 100000
                            : req.query.price == 4
                            ? 200000
                            : 300000
                        : 0,
                    req.query.priceMax
                        ? Number(req.query.priceMax)
                        : req.query.price
                        ? req.query.price == 1
                            ? 50000
                            : req.query.price == 2
                            ? 100000
                            : req.query.price == 3
                            ? 200000
                            : req.query.price == 4
                            ? 300000
                            : 700000
                        : 700000,
                ],
            },
        };

        if (req.query.bigCategoryId) {
            whereStatement.bigCategoryId = {
                [Op.eq]: Number(req.query.bigCategoryId),
            };
        }

        if (req.query.smallCategoryId) {
            whereStatement.smallCategoryId = {
                [Op.eq]: Number(req.query.smallCategoryId),
            };
        }

        const productData = await Product.findAll({
            where: {
                [Op.and]: [whereStatement],
            },
            include: [
                {
                    model: ProductImg,
                    attributes: ['src'],
                },
                {
                    model: ProductMainTag,
                    attributes: ['name'],
                    include: {
                        model: ProductSubTag,
                        attributes: ['name', 'amount'],
                    },
                    // attributes: ["src"]
                },
            ],
            order: [
                req.query.mainSort == 1
                    ? ['productPrice', 'ASC']
                    : req.query.mainSort == 2
                    ? ['productPrice', 'DESC']
                    : req.query.mainSort == 3
                    ? ['comments', 'DESC']
                    : req.query.mainSort == 4
                    ? ['comments', 'ASC']
                    : ['id', 'ASC'],
            ],
            limit: 100,
            offset: startIndx,
            attributes: [
                'id',
                'productTitle',
                'productPrice',
                'likes',
                'comments',
            ],
        });
        //a
        if (!productData) {
            return res.status(400).json({
                message: '상품 조회 결과가 없습니다 입력값을 다시 확인해주세요',
            });
        }

        res.status(200).json({ productData });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/productDetail', async (req, res, next) => {
    console.log(req.query.productId);
    try {
        if (!req.query.productId) {
            return res
                .status(401)
                .send({ message: 'productId가 쿼리로 전달되지 않았습니다' });
        }
        let product = await Product.findOne({
            include: [
                {
                    model: ProductImg,
                    attributes: ['src'],
                },
                {
                    model: CustomCategory,
                    attributes: ['id'],
                    through: { attributes: [] },
                },
                {
                    model: ProductMainTag,
                    attributes: ['name'],
                    include: {
                        model: ProductSubTag,
                        attributes: ['name', 'amount'],
                    },
                    // attributes: ["src"]
                },
            ],
            where: {
                id: req.query.productId,
            },

            attributes: {
                exclude: ['productInfo', 'createdAt', 'updatedAt', 'deletedAt'],
            },
        });

        if (!product) {
            return res
                .status(400)
                .json({ message: '상품 조회 결과가 없습니다' });
        }
        const comment = await Comment.findAndCountAll({
            raw: true,
            where: {
                ProductId: product.id,
            },
        });
        sum = 0;
        for (let i = 0; i < comment.count; i++) {
            sum += comment.rows[i].ValueBrightness;
            sum += comment.rows[i].ValueColorSense;
            sum += comment.rows[i].ValueStorageSpace;
        }
        rated = (sum / (comment.count * 3)).toFixed(1);
        product.setDataValue('commentCount', comment.count);
        product.setDataValue('rated', rated);

        res.status(200).json({ product });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/addCart', authJWT, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                id: req.myId,
            },
        });
        console.log(req.body.productId);
        const checkProduct = await exUser.getProduct({
            where: {
                id: req.body.productId,
            },
        });
        if (checkProduct.length > 0) {
            return res
                .status(400)
                .send({ message: '이미 장바구니에 있는 상품입니다' });
        }
        await exUser.addProduct(req.body.productId);

        res.status(200).send({ success: true });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/likeProduct', authJWT, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                id: req.myId,
            },
        });

        const checkLike = await exUser.getLikeIt({
            where: {
                id: req.body.productId,
            },
        });
        if (checkLike.length > 0) {
            return res
                .status(400)
                .send({ message: '이미 좋아요한 상품입니다' });
        }

        await Product.update(
            {
                likes: Sequelize.literal('likes + 1'),
            },
            {
                where: {
                    id: req.body.productId,
                },
            },
        );

        await exUser.addLikeIt(req.body.productId);

        res.status(200).send({ success: true });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/purchase', authJWT, async (req, res, next) => {
    try {
        console.log(req.body);
        if (!req.body.ProductId) {
            return res.status(400).send({
                message:
                    '상품에 대한 식별 번호가 지급되지 않았습니다 구매할 상품에 대한 상품 식별 번호를 넘겨주세요',
            });
        }
        if (!req.body.Merchant_uid) {
            return res.status(401).send({
                message:
                    '주문 번호가 지급되지 않았습니다 주문 번호를 넘겨주세요',
            });
        }
        if (!req.body.imp_uid) {
            return res.status(402).send({
                message:
                    'uniqueKey가 지급되지 않았습니다. uniqueKey를 넘겨주세요',
            });
        }
        if (!req.body.price) {
            return res.status(403).send({
                message:
                    '가격 정보가 지급되지 않았습니다. 가격 정보를 넘겨주세요',
            });
        }
        if (!req.body.amount) {
            return res.status(406).send({
                message:
                    '구매갯수 정보가 지급되지 않았습니다. 가격 정보를 넘겨주세요',
            });
        }

        const { imp_uid, Merchant_uid } = req.body; // req의 query에서 imp_uid, Merchant_uid 추출
        // 액세스 토큰(access token) 발급 받기
        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post', // POST method
            headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
            data: {
                imp_key: '3360868424546062', // REST API 키
                imp_secret:
                    'R0poOeLPunhouN0YaMFSRKJh1ACv6C9Atijr0BHTBUB2DWk3sc7Fv3s3qvlqpZprvqli25IWWG7brjXq', // REST API Secret
            },
        });
        const { access_token } = getToken.data.response; // 인증 토큰
        // imp_uid로 아임포트 서버에서 결제 정보 조회
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
            method: 'get', // GET method
            headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
        });
        const paymentData = getPaymentData.data.response; // 조회한 결제 정보
        // 결제 검증하기
        const { amount, status } = paymentData;
        console.log(amount, req.body.price);
        if (amount != req.body.price) {
            return res.status(405).send({ message: '위조된 결제 시도입니다' });
        }
        const exUser = await User.findOne({
            where: {
                id: req.myId,
            },
        });
        // console.log(req.body, Merchant_uid, imp_uid, exUser)
        const isExistedOrder = await Order.findOne({
            where: {
                UserId: req.myId,
                ProductId: req.body.ProductId,
            },
        });
        // console.log(isExistedOrder)
        if (isExistedOrder) {
            return res.status(407).send({ message: '이미 접수된 주문입니다' });
        }
        await Order.create({
            UserId: req.myId,
            ProductId: req.body.ProductId,
            orderPrice: req.body.price,
            amount: req.body.amount,
            state: 1,
            MerchantUid: Merchant_uid,
            cancelableAmount: req.body.price,
            ImpUid: imp_uid,
        });
        res.status(200).send({ message: '일반 결제 성공' });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
