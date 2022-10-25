import React, { useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import Tr from 'components/Mypage/OrderList/Table';
import { OrderTable } from 'components/Mypage/OrderList/styles';
import { PagenationBox } from '../Like/styles';
import Pagination from 'react-js-pagination';
import { GetTokenApi } from 'utils/api';
import { getData } from 'utils/getData';

function OrderList() {
    // 페이지네이션
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(8);
    const handlePageChange = page => {
        setPage(page);
    };

    //주문내역조회 api연결
    const loginToken = getData();
    console.log(loginToken);
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        GetTokenApi('/api/order/orderList', loginToken.accessToken).then(res => {
            setOrderData(res.data.reverse());
        });
    }, []);

    console.log(123, orderData);

    return (
        <>
            <MypageMain>
                <div>
                    <h3>주문내역 조회</h3>
                    <OrderTable>
                        <colgroup>
                            <col width="*" />
                            <col width="14.2%" />
                            <col width="14.2%" />
                            <col width="14.2%" />
                            <col width="10.2%" />
                            <col width="15%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">상품정보</th>
                                <th scope="col">주문일자</th>
                                <th scope="col">주문번호</th>
                                <th scope="col">주문금액(수량)</th>
                                <th scope="col" colSpan="2">
                                    주문상태
                                </th>
                            </tr>
                        </thead>
                        {orderData
                            .slice(items * (page - 1), items * (page - 1) + items)
                            .map((data, index) => (
                                <Tr key={index} data={data} />
                            ))}
                    </OrderTable>
                    <PagenationBox>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={items}
                            totalItemsCount={orderData.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            hideNavigation={true}
                            hideFirstLastPages={true}
                        />
                    </PagenationBox>
                </div>
            </MypageMain>
        </>
    );
}

export default OrderList;
