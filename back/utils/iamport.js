const axios = require('axios');

/**
 * @returns {Promise<string>} Iamport의 Access Token
 */
exports.getIamportAccessToken = async () => {
    const response = await axios({
        url: 'https://api.iamport.kr/users/getToken',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
            imp_key: process.env.IMP_KEY,
            imp_secret: process.env.IMP_SECRET_KEY,
        },
    });

    return response.data.response.access_token;
};

/**
 * @param {string} accessToken Iamport access token
 * @param {string} imp_uid payment unique id
 * @returns {Promise<{amount:number, status: string}>} Iamport의 response 정보
 */
exports.getIamportPaymentData = async (accessToken, imp_uid) => {
    const response = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`,
        method: 'get',
        headers: { Authorization: accessToken },
    });

    return response.data.response;
};

/**
 * 아임포트 REST API로 결제환불 요청
 * @param {*} accessToken Iamport access token
 * @param {*} reason 가맹점 클라이언트로부터 받은 환불사유
 * @param {*} ImpUid imp_uid를 환불 `unique key`로 입력
 * @param {*} amount 가맹점 클라이언트로부터 받은 환불금액
 * @param {*} refund_holder [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
 * @param {*} refund_bank [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(ex. KG이니시스의 경우 신한은행은 88번)
 * @param {*} refund_account [가상계좌 환불시 필수입력] 환불 수령계좌 번호
 * @returns {Promise<any>} 결제환불 응답 데이터
 */
exports.cancelPaymentData = async (
    accessToken,
    reason,
    ImpUid,
    amount,
    refund_holder,
    refund_bank,
    refund_account,
) => {
    const response = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        },
        data: {
            reason,
            ImpUid,
            amount,
            refund_holder,
            refund_bank,
            refund_account,
        },
    });

    return response.data;
};
