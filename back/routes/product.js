const express = require('express');
const Product = require('../models/product');
const User = require('../models/user');
const ProductImg = require('../models/productImg');
const CustomCategory = require('../models/customCategory');
const Comment = require('../models/comment');
const ProductMainTag = require('../models/productMainTag');
const ProductSubTag = require('../models/productSubTag');
const AWS = require('aws-sdk');
const { Op, Sequelize, QueryTypes } = require('sequelize');
const authJWT = require('../utils/middlewares/authJWT');
const { Order, MyCart, sequelize } = require('../models');
const {
    getIamportAccessToken,
    getIamportPaymentData,
} = require('../utils/iamport');
const router = express.Router();

require('dotenv');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

router.get('/productList', async (req, res, next) => {
    try {
        let {
            productTitle,
            page,
            mainSort,
            priceMin,
            priceMax,
            price,
            bigCategoryId,
            smallCategoryId,
        } = req.query;

        // 음수 가격 검색 금지
        if (!priceMin && priceMin < 0) {
            priceMin = 0;
        }

        if (price == 1) {
            priceMin = priceMin ? priceMin : 0;
            priceMax = priceMax ? priceMax : 50000;
        } else if (price == 2) {
            priceMin = priceMin ? priceMin : 50000;
            priceMax = priceMax ? priceMax : 100000;
        } else if (price == 3) {
            priceMin = priceMin ? priceMin : 100000;
            priceMax = priceMax ? priceMax : 200000;
        } else if (price == 4) {
            priceMin = priceMin ? priceMin : 200000;
            priceMax = priceMax ? priceMax : 300000;
        } else if (price) {
            priceMin = priceMin ? priceMin : 300000;
        }

        const startIndx =
            page == undefined || page <= 0 ? 0 : (Number(page) - 1) * 100;

        let whereStatement = {};

        if (priceMin || priceMax) {
            let statements = [];

            if (priceMin) {
                statements.push({ [Op.gte]: priceMin });
            }

            if (priceMax) {
                statements.push({ [Op.lte]: priceMax });
            }

            whereStatement.productPrice = {
                [Op.and]: statements,
            };
        }

        if (productTitle) {
            let titles = productTitle.split(',');

            whereStatement.productTitle = {
                [Op.and]: titles.map((title) => {
                    return {
                        [Op.like]: `%${title}%`,
                    };
                }),
            };
        }

        if (bigCategoryId) {
            whereStatement.bigCategoryId = {
                [Op.eq]: Number(bigCategoryId),
            };
        }

        if (smallCategoryId) {
            whereStatement.smallCategoryId = {
                [Op.eq]: Number(smallCategoryId),
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
                },
            ],
            order: [
                mainSort == 1
                    ? ['productPrice', 'ASC']
                    : mainSort == 2
                    ? ['productPrice', 'DESC']
                    : mainSort == 3
                    ? ['comments', 'DESC']
                    : mainSort == 4
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
    try {
        const { productId } = req.query;

        if (!productId) {
            return res
                .status(401)
                .send({ message: 'productId가 쿼리로 전달되지 않았습니다' });
        }

        const product = await Product.findOne({
            where: {
                id: productId,
            },
            include: [
                {
                    model: ProductImg,
                    attributes: ['src'],
                },
                {
                    model: CustomCategory,
                    attributes: ['id', 'categoryName'],
                    through: { attributes: [] },
                },
                {
                    model: ProductMainTag,
                    attributes: ['id', 'name'],
                    include: {
                        model: ProductSubTag,
                        attributes: ['id', 'name', 'amount'],
                    },
                },
            ],
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
        console.log(req.body)
        const exUser = await User.findOne({
            where: {
                id: req.myId,
            },
        });
        console.log(exUser)
        for (i = 0; i < req.body.addCarts.length; i++) {
            console.log(i, "번쨰!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            const checkMyCart = await exUser.getMyCarts({
                where: {
                    [Op.and]: [{
                        ProductId: req.body.addCarts[i].productId
                    }, {
                        ProductMainTagId: req.body.addCarts[i].mainTagId
                    }, {
                        ProductSubTagId: req.body.addCarts[i].subTagId
                    }
                ]}
            });
            
            if (checkMyCart.length > 0) {
                return res
                    .status(400)
                    .send({ message: '이미 추가된 카테고리입니다' });
            }

            const query = `
            SELECT 
                c.id,
                c.amount
            FROM Products as a
            INNER JOIN ProductMainTags as b
             ON a.id = b.ProductId
            INNER JOIN ProductSubTags as c
             ON b.id = c.ProductMainTagId 
            WHERE b.ProductId = :productId
            AND b.id = :mainTagId
            AND c.id = :subTagId
            LIMIT 1`; 
            console.log(query)
            const checkProduct = await sequelize.query(
                query,
                { 
                    replacements: {
                        productId: req.body.addCarts[i].productId,
                        mainTagId: req.body.addCarts[i].mainTagId,
                        subTagId: req.body.addCarts[i].subTagId
                    },
                    type: QueryTypes.SELECT 
                }
            )
            console.log(checkProduct)
            if (!checkProduct) {
                return res.status(401).send({ message: "존재하지 않는 상품을 장바구니에 추가하고있습니다" })
            }

            if (checkProduct[0].amount < req.body.addCarts[i].packingAmount) {
                return res.status(402).send({ message: "재고보다 담으려는 수량이 더 많습니다" })
            }
            await ProductSubTag.update(
                {
                    amount: Sequelize.literal(`amount - ${req.body.addCarts[i].packingAmount}`),
                },
                {
                    where: {
                        id: checkProduct[0].id,
                    },
                },
            );


            await MyCart.create({
                packingAmount: req.body.addCarts[i].packingAmount,
                UserId: req.myId,
                ProductId: req.body.addCarts[i].productId,
                ProductMainTagId: req.body.addCarts[i].mainTagId,
                ProductSubTagId: req.body.addCarts[i].subTagId,
                packingAmount: req.body.addCarts[i].packingAmount,
            })
        }

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
        

        const { imp_uid, Merchant_uid } = req.body.authPayment; // req의 query에서 imp_uid, Merchant_uid 추출
        // 액세스 토큰(access token) 발급 받기
        const iamportAccessToken = await getIamportAccessToken(); // 인증 토큰

        const paymentData = await getIamportPaymentData(
            iamportAccessToken,
            imp_uid,
        );
        // 결제 검증하기
        const { amount, status } = paymentData;

        let priceSum = 0;
        for (i = 0; i < req.body.orderList.length; i++) {
            priceSum += Number(req.body.orderList[i].price) * Number(req.body.orderList[i].amount);
        }
        console.log("amount ==", amount)
        console.log("priceSum ==", priceSum)
        if (amount != priceSum) {
            return res.status(405).send({ message: '위조된 결제 시도입니다' });
        }

        for (i = 0; i < req.body.orderList.length; i++) {

            if (!req.body.orderList[i].ProductId) {
                return res.status(400).send({
                    message:
                        '상품에 대한 식별 번호가 지급되지 않았습니다 구매할 상품에 대한 상품 식별 번호를 넘겨주세요',
                });
            }
            if (!req.body.authPayment.Merchant_uid) {
                return res.status(401).send({
                    message:
                        '주문 번호가 지급되지 않았습니다 주문 번호를 넘겨주세요',
                });
            }
            if (!req.body.authPayment.imp_uid) {
                return res.status(402).send({
                    message:
                        'uniqueKey가 지급되지 않았습니다. uniqueKey를 넘겨주세요',
                });
            }
            if (!req.body.orderList[i].price) {
                return res.status(403).send({
                    message:
                        '가격 정보가 지급되지 않았습니다. 가격 정보를 넘겨주세요',
                });
            }
            if (!req.body.orderList[i].amount) {
                return res.status(406).send({
                    message:
                        '구매갯수 정보가 지급되지 않았습니다. 가격 정보를 넘겨주세요',
                });
            }

            const isExistedOrder = await Order.findOne({
                where: {
                    UserId: req.myId,
                    ProductId: req.body.orderList[i].ProductId,
                    ProductMainTagId: req.body.orderList[i].ProductMainTagId,
                    ProductSubTagId: req.body.orderList[i].ProductSubTagId,
                },
            });
            // console.log(isExistedOrder)
            if (isExistedOrder) {
                return res
                    .status(407)
                    .send({ message: '이미 접수된 주문입니다' });
            }
            await Order.create({
                UserId: req.myId,
                ProductId: req.body.orderList[i].ProductId,
                orderPrice: req.body.orderList[i].price,
                amount: req.body.orderList[i].amount,
                state: 1,
                MerchantUid: Merchant_uid,
                cancelableAmount: req.body.orderList[i].price,
                ImpUid: imp_uid,
                ProductMainTagId: req.body.orderList[i].ProductMainTagId,
                ProductSubTagId: req.body.orderList[i].ProductSubTagId,
            });
        }
        res.status(200).send({ message: '일반 결제 성공' });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/search', authJWT, async (req, res, next) => {
    try {
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
