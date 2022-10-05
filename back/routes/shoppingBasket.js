const express = require('express');
const {
    User,
    Product,
    ProductImg,
    MyCart,
    ProductMainTag,
    ProductSubTag,
} = require('../models');
const authJWT = require('../utils/authJWT');
const {
    getIamportAccessToken,
    getIamportPaymentData,
} = require('../utils/iamport');
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
        const { shoppingBasketId, merchant_uid, imp_uid } = req.body;

        if (!shoppingBasketId)
            return res.status(400).send({
                message:
                    '장바구니 번호가 지급되지 않았습니다 장바구니 번호를 넘겨주세요',
            });

        if (!merchant_uid)
            return res.status(401).send({
                message:
                    '주문 번호가 지급되지 않았습니다 주문 번호를 넘겨주세요',
            });

        if (!imp_uid)
            return res.status(402).send({
                message:
                    'uniqueKey가 지급되지 않았습니다. uniqueKey를 넘겨주세요',
            });

        // iamport 액세스 토큰(access token)
        const iamportAccessToken = await getIamportAccessToken();
        // 조회한 결제 정보
        const { amount, status } = await getIamportPaymentData(
            iamportAccessToken,
            imp_uid,
        );

        // 결제 검증하기
        if (amount != req.body.price) {
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
