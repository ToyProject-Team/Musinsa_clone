const express = require('express');
const {
    ProductImg,
    ProductSubTag,
    ProductMainTag,
    Product,
} = require('../models');
const Order = require('../models/order');
const User = require('../models/user');
const authJWT = require('../utils/middlewares/authJWT');
const {
    cancelIamportPaymentData,
    getIamportAccessToken,
} = require('../utils/iamport');
const router = express.Router();

router.get('/orderList', authJWT, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                id: req.myId,
            },
        });

        const myOrders = await exUser.getMyOrders({
            attributes: [
                'id',
                'orderPrice',
                'amount',
                'state',
                'MerchantUid',
                'createdAt',
            ],
            include: [
                {
                    model: ProductSubTag,
                    attributes: ['name', 'amount'],
                },
                {
                    model: ProductMainTag,
                    attributes: ['name'],
                },
                {
                    model: Product,
                    attributes: ['productTitle'],
                    include: [
                        {
                            model: ProductImg,
                            attributes: ['src'],
                        },
                    ],
                },
            ],
        });
        res.status(200).send(myOrders);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/refundMyOrder', async (req, res, next) => {
    try {
        // 클라이언트로부터 전달받은 주문번호, 환불사유, 환불금액, 가상계좌 정보(예금주, 계좌번호, 은행코드)
        const {
            merchant_uid,
            reason,
            cancel_request_amount,
            refund_holder,
            refund_bank,
            refund_account,
        } = req.body;

        const userOrder = await Order.findOne({
            where: {
                MerchantUid: merchant_uid,
            },
        });
        if (!userOrder)
            return res
                .status(400)
                .send({ message: '주문 상품에 대한 데이터가 없습니다' });

        /* ... 중략 ... */
        const paymentData = userOrder; // 조회된 결제정보
        const { ImpUid, amount, cancel_amount } = paymentData; // 조회한 결제정보로부터 imp_uid, amount(결제금액), cancel_amount(환불된 총 금액) 추출

        const accessToken = await getIamportAccessToken();

        const paymentCancelData = await cancelIamportPaymentData(
            accessToken,
            reason,
            ImpUid,
            amount,
            refund_holder,
            refund_bank,
            refund_account,
        );

        res.status(200).send({ data: paymentCancelData }); // 환불 결과
        /* 환불 결과 동기화 */
    } catch (e) {
        console.error(e);
        next(e);
    }
});
module.exports = router;
