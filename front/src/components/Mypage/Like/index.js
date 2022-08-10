import React from 'react';
import { MypageMain } from "pages/Mypage/styles.js";
import LikeList from 'components/Mypage/Like/List';

function mainlike() {
	return <>
    <MypageMain>
          <LikeList/>
    </MypageMain>
  </>;
}

export default mainlike;
