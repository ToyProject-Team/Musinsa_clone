import React from 'react';
import { MypageMain } from "pages/Mypage/styles.js";
import Ul from "components/Mypage/Like/List";
import { LikeSection } from "./styles";




function mainlike() {

  const dummyData = {
    id:'1',
    ProductCompany:'어프어프',
    ProductImg:'https://image.msscdn.net/images/goods_img/20191115/1226331/1226331_1_500.jpg?t=20191115100755',
    ProductName: 'Bear heart',
    ProductOption: 'FREE',
    ProductPrice: '20681',
    ProductNum: '1',
    OrderDay: '2020.03.02',
    OrderNum: '12345',
    Orderstatus: '환불완료',
  }

	return <>
    <MypageMain>
          <LikeSection>
            <header>
            <h1>좋아요</h1>
            <h2>상품</h2>
            </header> 
            <Ul data={dummyData} />
          </LikeSection>
    </MypageMain>
  </>
}

export default mainlike;
