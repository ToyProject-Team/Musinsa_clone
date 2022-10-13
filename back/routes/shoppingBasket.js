const express = require('express');
const {
    User,
    Product,
    ProductImg,
    MyCart,
    ProductMainTag,
    ProductSubTag,
    sequelize,
    Order,
    Sequelize,
    CustomCategory,
} = require('../models');
const authJWT = require('../utils/middlewares/authJWT');
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
                            model: CustomCategory,
                            attributes: ['id', 'categoryName'],
                            through: { attributes: [] },
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

router.post('/purchase', authJWT, async (req, res, next) => {
    try {
        const { purchasedDataList, merchant_uid, imp_uid } = req.body;

        const owner = await User.findOne({
            where: {
                id: req.myId,
            },
        });

        if (!purchasedDataList)
            return res.status(400).send({
                message: 'purchasedDataList가 지급되지 않았습니다.',
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

        // /**
        //  * 결제 검증
        //  */

        // iamport 액세스 토큰(access token)
        const iamportAccessToken = await getIamportAccessToken();
        // 조회한 결제 정보
        const paymentData = await getIamportPaymentData(
            iamportAccessToken,
            imp_uid,
        );

        const totalPrice = paymentData.amount;

        /** 총 금액 */
        let isValidatePruchase = true;

        const sumPurchasedPrice = purchasedDataList
            .map(({ price }) => price)
            .reduce((pre, cur) => pre + cur);

        isValidatePruchase = sumPurchasedPrice == totalPrice;

        if (isValidatePruchase) {
            for (let { shoppingBasketId, price, amount } of purchasedDataList) {
                const shoppingBasket = await MyCart.findOne({
                    where: {
                        id: shoppingBasketId,
                        UserId: owner.id,
                    },
                    attributes: ['packingAmount'],
                    include: [
                        {
                            model: ProductSubTag,
                            attributes: ['name', 'amount'],
                        },
                        {
                            model: Product,
                            attributes: ['id', 'productPrice'],
                        },
                    ],
                });

                const productSubTag = shoppingBasket.ProductSubTag;
                const product = shoppingBasket.Product;

                /** 장바구니와 입력된 개수와 같은지 */
                if (amount != shoppingBasket.packingAmount) {
                    isValidatePruchase = false;
                    break;
                }

                /** productSubTag개수를 초과한 경우 */
                if (amount <= productSubTag.amount) {
                    isValidatePruchase = false;
                    break;
                }

                /** 실제 price 값이 나오는지 */
                if (price != amount * product.productPrice) {
                    isValidatePruchase = false;
                    break;
                }
            }
        }

        if (!isValidatePruchase)
            return res.status(405).send({ message: '위조된 결제 시도입니다' });

        // 결제 시도
        const t = await sequelize.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        });

        try {
            for (let { shoppingBasketId, price, amount } of purchasedDataList) {
                const shoppingBasket = await MyCart.findOne({
                    where: {
                        id: shoppingBasketId,
                        UserId: owner.id,
                    },
                    attributes: ['id', 'ProductId', 'ProductMainTagId'],
                    include: [
                        {
                            model: ProductSubTag,
                            attributes: ['id', 'name', 'amount'],
                        },
                    ],
                });

                if (!shoppingBasket) {
                    return res.status(404).send({
                        message:
                            '요청한 장바구니가 존재하지 않습니다. (요청한 장바구니 id : ' +
                            shoppingBasketId +
                            ')',
                    });
                }

                let productSubTag = shoppingBasket.ProductSubTag;

                await Order.create(
                    {
                        UserId: owner.id,
                        ProductId: shoppingBasket.ProductId,
                        orderPrice: price,
                        amount: amount,
                        state: 1,
                        cancelableAmount: price,
                        MerchantUid: merchant_uid,
                        ImpUid: imp_uid,
                        ProductSubTagId: productSubTag.id,
                        ProductMainTagId: shoppingBasket.ProductMainTagId,
                    },
                    { transaction: t },
                );

                productSubTag = await productSubTag.reduceAmount(amount, {
                    transaction: t,
                });
                await shoppingBasket.destroy({ transaction: t });
            }
            await t.commit();
        } catch (err) {
            await t.rollback();
            throw err;
        }

        res.status(200).send({ message: '일반 결제 성공' });
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
