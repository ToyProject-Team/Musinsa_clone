import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from 'axios';
import Tr from "components/mypage/table/tr";

function useMypage_main() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => setInfo(res.data))
    .catch(err => console.log(err));
  },[]);

  return <div>
    <table>
      <thead>
        <tr>
          <th>상품정보</th>
          <th>주문일자</th>
          <th>주문번호</th>
          <th>주문금액</th>
          <th>주문상태</th>
        </tr>
      </thead>
      <Tr info={info} />
    </table>
  </div>;
}

export default useMypage_main;
