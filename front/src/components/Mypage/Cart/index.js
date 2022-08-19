import React, { useCallback, useState } from "react";
import { MypageMain } from "pages/Mypage/styles.js";
import CartTable from "components/Mypage/Cart/Table";
import { OrderTable, CartPayment, OrderBtn } from "components/Mypage/Cart/styles";
import { FaPlus, FaEquals } from 'react-icons/fa';
import dummy from 'components/Mypage/data.json';
import Modal from "react-modal";
import Order from 'pages/Order';

function Cart() {

  // 전체 체크박스 
  const [checkedItems, setCheckedItems] = useState([]);
  const checkedItemHandler = (code, isChecked) => {
    if(isChecked){
      setCheckedItems([...checkedItems, code])
    }else if(!isChecked && checkedItems.find(one => one === code)){
      const filter = checkedItems.filter(one => one !== code)
      setCheckedItems([...filter])
    }
  }

  const onCheckedAll = useCallback((checked) => {
    if(checked){
      const checkedItemsArray = [];
      dummy.forEach(data => checkedItemsArray.push(data.id));
      setCheckedItems(checkedItemsArray)
    }else{
      setCheckedItems([]);
    }
  },
  [dummy]
  );

  // 결제하기 modal 
  const ModalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    content: {
      position: 'absolute',
      width: '445px',
      height: '700px',
      position: 'absolute',
      top: '90px',
      left: '30%',
      right: '40px',
      bottom: '40px',
    },
  };
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
		setShowModal(showModal => !showModal);
	};

  // 상품금액 계산 
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [checkPrice, setCheckedPrice] = useState([]);
  const [sum, setSum] = useState(0);
  const pricecalc = (price) =>{
    
  }

 


  

  return <>
  <MypageMain>
    <div>
      <h3>장바구니</h3>
      <OrderTable>
      <colgroup>
            <col width="3.62%"/>
            <col width="*" />
            <col width="9.5%" />
            <col width="12%" />
            <col width="9.5%" />
            <col width="17.3%" />
            <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">
              <label>
              <input type="checkbox" id="check_all"  onChange={(e) => onCheckedAll(e.target.checked)} 
              checked = { checkedItems.length === 0 ? false : checkedItems.length === dummy.length ? true : false} />
              </label>
            </th>
            <th scope="col">상품정보</th>
            <th scope="col">상품금액</th>
            <th scope="col">수량</th>
            <th scope="col">주문금액</th>
            <th scope="col">배송 형태/배송비</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        {dummy.map((data, index) => (
          <CartTable 
          key={data.id}
          id = {data.id} 
          img={data.url} 
          brand={data.brandName} 
          model={data.model} 
          price={data.price}
          state={data.orderstatus}
          option={data.option}
          checkedItems={checkedItems}
          setCheckedItems = {setCheckedItems}
          checkedItemHandler = {checkedItemHandler}
           />
        ))}   
      </OrderTable>
      <CartPayment>
        <li>
          <p>상품금액</p>
          <p><span>0</span>원</p>
        </li>
        <li>
          <FaPlus />
        </li>
        <li>
          <p>배송비</p>
          <p><span>0</span>원</p>
        </li>
        <li>
          <FaEquals />
        </li>
        <li>
          <p>최종 결제 금액</p>
          <p><span>0</span>원</p>
        </li>
      </CartPayment>
      <OrderBtn>
        <button onClick={openModal}>결제하기</button>
        {showModal ? (
					<Modal style={ModalStyle} isOpen={true}>
						<Order openModal={openModal} price={selectedPrice + dummy.price} />
					</Modal>
				) : (
					<></>
				)}
      </OrderBtn>
    </div>;
  </MypageMain>
  </>;
}

export default Cart;
