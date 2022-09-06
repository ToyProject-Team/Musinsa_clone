const express = require('express')
const Order = require('../models/order')
const User = require('../models/user')
const authJWT = require('../utils/authJWT')
const router = express.Router()

router.get('/orderList', authJWT, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                id: req.myId
            }
        }) 

        const myOrder = await exUser.getMyOrder({
            // joinTableAttributes: [],
            attributes: []
        })
        res.status(200).send({ myOrder })
    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.post('/refundMyOrder', async (req, res, next) => {
    try {
        /* 액세스 토큰(access token) 발급 */
        /* ... 중략 ... */
        /* 결제정보 조회 */
        const { body } = req;
        const { merchant_uid, reason, cancel_request_amount, refund_holder, refund_bank, refund_account } = body; // 클라이언트로부터 전달받은 주문번호, 환불사유, 환불금액, 가상계좌 정보(예금주, 계좌번호, 은행코드)
        const userOrder = await Order.findOne({
            where: {
                MerchantUid: merchant_uid
            }
        })
        if (!userOrder) {
            return res.status(400).send({ message: "주문 상품에 대한 데이터가 없습니다" })
        }
          /* ... 중략 ... */
        const paymentData = userOrder; // 조회된 결제정보
        const { ImpUid, amount, cancel_amount } = paymentData; // 조회한 결제정보로부터 imp_uid, amount(결제금액), cancel_amount(환불된 총 금액) 추출
        /* 아임포트 REST API로 결제환불 요청 */
        const getCancelData = await axios({
            url: "https://api.iamport.kr/payments/cancel",
            method: "post",
            headers: {
            "Content-Type": "application/json",
            "Authorization": access_token // 아임포트 서버로부터 발급받은 엑세스 토큰
            },
            data: {
            reason, // 가맹점 클라이언트로부터 받은 환불사유
            ImpUid: ImpUid, // imp_uid를 환불 `unique key`로 입력
            amount: cancel_request_amount, // 가맹점 클라이언트로부터 받은 환불금액
            refund_holder, // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
            refund_bank, // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(ex. KG이니시스의 경우 신한은행은 88번)
            refund_account // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
            }
        });

        const data = getCancelData.data
        res.status(200).send({ data }); // 환불 결과
          /* 환불 결과 동기화 */
    } catch (e) {
        console.error(e)
        next(e)
    }
})
module.exports = router