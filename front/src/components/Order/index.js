import { useCallback, useContext } from 'react';
import { useState } from 'react';
import TextModal from 'components/Modals/TextModal';
import { useEffect } from 'react';
import { PostHeaderBodyApi } from 'utils/api';
import { getData } from 'utils/getData';
import { URLquery } from 'utils/URLquery';
import { useLocation } from 'react-router';
import { useScript } from 'hooks/useScript';

const impNumber = process.env.REACT_APP_PAYMENT;

const Order = ({ modal, pay, orderArr, checkList }) => {
    const jQueryScript = useScript('https://code.jquery.com/jquery-1.12.4.min.js');
    const iamportScript = useScript('https://cdn.iamport.kr/js/iamport.payment-1.1.8.js');

    const data = getData();
    const { accessToken } = data;

    const location = useLocation();
    const query = URLquery(location);
    const { productId } = query;

    const [modalOrder, setModalOrder] = useState(false);
    console.log(orderArr);

    useEffect(() => {
        if (iamportScript === 'ready' && jQueryScript === 'ready') {
            let pg = '';
            let pay_method = '';
            let price = 0;

            price = orderArr.reduce((a, b) => a + Number(b.price), 0);

            if (pay === 'card') pg = 'html5_inicis';
            else if (pay === 'kakao') pg = 'kakaopay';
            else if (pay == 'payco') pg = 'payco';

            var { IMP } = window; // 생략가능
            IMP.init(impNumber); // <-- 본인 가맹점 식별코드 삽입
            IMP.request_pay(
                {
                    pg,
                    pay_method: 'card',
                    merchant_uid: `mid_${new Date().getTime()}`,
                    name: 'Test 상품',
                    amount: price,
                    buyer_email: 'devhyuktest@gmail.com',
                    buyer_name: '홍길동',
                    buyer_tel: '01096361038',
                    buyer_addr: '서울특별시 강남구 신사동',
                    buyer_postcode: '01181',
                },
                rsp => {
                    // callback
                    if (rsp.success) {
                        // 결제 성공 시 로직,
                        if (productId == undefined) {
                            const data = {
                                purchasedDataList: orderArr,
                                merchant_uid: rsp.merchant_uid,
                                imp_uid: rsp.imp_uid,
                            };

                            PostHeaderBodyApi(
                                '/api/shoppingBasket/purchase',
                                data,
                                'Authorization',
                                accessToken,
                            ).then(res => {
                                setModalOrder(true);
                            });
                        } else {
                            const data = {
                                authPayment: {
                                    imp_uid: rsp.imp_uid,
                                    Merchant_uid: rsp.merchant_uid,
                                },
                                orderList: orderArr,
                            };

                            PostHeaderBodyApi(
                                '/api/product/purchase',
                                data,
                                'Authorization',
                                accessToken,
                            )
                                .then(res => {
                                    setModalOrder(true);
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                        }
                    } else {
                        // 결제 실패 시 로직,
                        console.log('error');
                    }
                },
            );
        }
    }, [jQueryScript, iamportScript, pay]);

    const onCloseModal = useCallback(() => {
        setModalOrder(false);
    }, []);

    return (
        <TextModal
            show={modalOrder}
            onCloseModal={onCloseModal}
            content="결제가 완료 되었습니다."
        ></TextModal>
    );
};

export default Order;
