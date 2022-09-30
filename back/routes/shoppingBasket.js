const express = require('express');
const { Op } = require('sequelize');
const {
    User,
    Product,
    ProductImg,
    MyCart,
    ProductMainTag,
    ProductSubTag,
} = require('../models');
const authJWT = require('../utils/authJWT');
const router = express.Router();

router.get('/shoppingList', authJWT, async (req, res, next) => {
    try {
        const owner = await User.findOne({
            where: {
                id: req.myId,
            },
        });

        if (!owner)
            return res
                .status(400)
                .send({ message: '유저의 조회 결과가 없습니다' });

        const shoppingBaskets = await owner.getMyCarts({
            attributes: ['id', 'packingAmount'],

            include: [
                {
                    model: ProductMainTag,
                    attributes: ['name'],
                    include: {
                        model: ProductSubTag,
                        attributes: ['name', 'amount'],
                    },
                },
                {
                    model: ProductSubTag,
                    attributes: ['name', 'amount'],
                },
                {
                    model: Product,
                    attributes: [
                        'id',
                        'productTitle',
                        'productInfo',
                        'productPrice',
                        'likes',
                        'comments',
                    ],

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
                },
            ],
        });

        res.status(200).send(shoppingBaskets);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/shoppingCartPurchase', authJWT, async (req, res, next) => {
    try {
        if (!req.body.productId) {
            return res.status(400).send({
                message:
                    '상품에 대한 식별 번호가 지급되지 않았습니다 구매할 상품에 대한 상품 식별 번호를 넘겨주세요',
            });
        }
        if (!req.body.MerchantUid) {
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
        if (req.body.price) {
            return res.status(403).send({
                message:
                    '가격 정보가 지급되지 않았습니다. 가격 정보를 넘겨주세요',
            });
        }

        const { imp_uid, merchant_uid } = req.body; // req의 query에서 imp_uid, merchant_uid 추출
        // 액세스 토큰(access token) 발급 받기
        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post', // POST method
            headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
            data: {
                imp_key: '7886282210238108', // REST API 키
                imp_secret:
                    'lNItGvMSCUT2kTs0QiIha0fzoOgE3VgRFC2ykVwmEuCnoOpd2VTkLy4LHohY2ZZpyxhxP5uEhs9QyFPC', // REST API Secret
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
        if (amount != req.body.productPrice) {
            return res.status(405).send({ message: '위조된 결제 시도입니다' });
        }
        const exUser = await User.findOne({
            where: {
                id: req.myId,
            },
        });

        const exProduct = await Product.findOne({
            where: {
                id: req.body.ProductId,
            },
        });
        await sequelize.transaction(async (t) => {
            await exUser.addmyOrder(
                {
                    id: req.body.ProductId,
                    orderPrice: req.body.price,
                    state: 1,
                    MerchantUid: merchant_uid,
                    ImpUid: imp_uid,
                },
                { transaction: t },
            );

            await exUser.removeMyCart(exProduct);
            res.status(200).send({ message: '일반 결제 성공' });
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/del', authJWT, async (req, res, next) => {
    try {
        const { shoppingBasketId } = req.body;

        if (!shoppingBasketId) {
            return res
                .status(400)
                .send({ message: '입력값을 다시 확인해주세요' });
        }

        const owner = await User.findOne({
            where: {
                id: req.myId,
            },
        });

        if (!owner)
            return res
                .status(400)
                .send({ message: '유저의 조회 결과가 없습니다' });

        const shoppingBasket = await MyCart.findOne({
            where: {
                id: shoppingBasketId,
                UserId: req.myId,
            },
        });

        if (!shoppingBasket)
            return res
                .status(401)
                .send({ message: '유효하지 않은 요청입니다.' });

        shoppingBasket.destroy();

        res.status(200).send({ success: true });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
