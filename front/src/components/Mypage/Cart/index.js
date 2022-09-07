import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import CartTable from 'components/Mypage/Cart/Table';
import { OrderTable, CartPayment, OrderBtn, ModalStyle } from 'components/Mypage/Cart/styles';
import { FaPlus, FaEquals } from 'react-icons/fa';
import dummy from 'components/Mypage/data.json';
import Modal from 'react-modal';
import Order from 'pages/Order';
import { getData } from 'utils/getData';

function Cart() {
	// 전체 체크박스
	const [checkedItems, setCheckedItems] = useState([]);
	const onCheckedAll = useCallback(
		checked => {
			if (checked) {
				const checkedItemsArray = [];
				dummy.forEach(data => checkedItemsArray.push(data.id));
				dummy.forEach(data => setSelectedPrice(prev => [...prev, data.price]));
				setCheckedItems(checkedItemsArray);
			} else {
				setCheckedItems([]);
				setSelectedPrice([]);
			}
		},
		[dummy],
	);

	const [showModal, setShowModal] = useState(false);
	const openModal = () => {
		setShowModal(showModal => !showModal);
	};

	// 상품금액 계산
	const [selectedPrice, setSelectedPrice] = useState([]);
	const [sum, setSum] = useState(0);
	const [cartList, setCartList] = useState([]);
	const loginToken = getData();
	console.log(loginToken);

	useEffect(() => {
		fetch('http://141.164.48.244/api/shoppingBasket/shoppingList', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: loginToken.accessToken,
			},
		})
			.then(res => res.json())
			.then(res => {
				setCartList(res.exCart);
			});

		if (selectedPrice.length > 0) {
			let total = [...selectedPrice].reduce((a, b) => a + b);
			setSum(total);
		} else {
			setSum(0);
		}
	}, [selectedPrice]);

	// console.log(selectedPrice);
	// console.log(checkedItems);
	// console.log(sum);

	console.log(cartList);

	return (
		<>
			<MypageMain>
				<div>
					<h3>장바구니</h3>
					<OrderTable>
						<colgroup>
							<col width="3.62%" />
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
										<input
											type="checkbox"
											id="check_all"
											onChange={e => onCheckedAll(e.target.checked)}
											checked={
												checkedItems.length === 0
													? false
													: checkedItems.length === dummy.length
													? true
													: false
											}
										/>
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
						{cartList.map((data, index) => (
							<CartTable
								key={index}
								id={data.id}
								img={data.url}
								model={data.productTitle}
								price={data.productPrice}
								state={data.deliveryCompany}
								option={data.option}
								checkedItems={checkedItems}
								setCheckedItems={setCheckedItems}
								setSelectedPrice={setSelectedPrice}
								selectedPrice={selectedPrice}
							/>
						))}
					</OrderTable>
					<CartPayment>
						<li>
							<p>상품금액</p>
							<p>
								<span>{sum}</span>원
							</p>
						</li>
						<li>
							<FaPlus />
						</li>
						<li>
							<p>배송비</p>
							<p>
								<span>0</span>원
							</p>
						</li>
						<li>
							<FaEquals />
						</li>
						<li>
							<p>최종 결제 금액</p>
							<p>
								<span>0</span>원
							</p>
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
				</div>
				;
			</MypageMain>
		</>
	);
}

export default Cart;
