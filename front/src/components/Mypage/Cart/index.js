import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import CartTable, { CartContext } from 'components/Mypage/Cart/Table';
import { OrderTable, CartPayment, OrderBtn, ModalStyle } from 'components/Mypage/Cart/styles';
import { FaPlus, FaEquals } from 'react-icons/fa';
import dummy from 'components/Mypage/data.json';
import Modal from 'react-modal';
import Order from 'pages/Order';

function Cart() {
	// 전체 체크박스
	const [checkedItems, setCheckedItems] = useState([]);
	const onCheckedAll = useCallback(
		checked => {
			if (checked) {
				const checkedItemsArray = [];
				dummy.forEach(data => checkedItemsArray.push(data.id));
				setCheckedItems(checkedItemsArray);
			} else {
				setCheckedItems([]);
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

	useEffect(() => {
		if (selectedPrice.length > 0) {
			let total = [...selectedPrice].reduce((a, b) => a + b);
			setSum(total);
		}
	}, [selectedPrice]);

	const test = () => {
		console.log(dummy[0].id, checkedItems[0]);
		if ((dummy[0].id = checkedItems[0])) {
			console.log('helklo');
			setSelectedPrice([dummy[checkedItems[0] - 1].price]);
			setCheckedItems(checkedItems.filter(el => el !== undefined));
			addcalc();
		} else {
			setSelectedPrice([]);
			minuscalc();
		}
	};

	const addcalc = () => {
		for (let i = 0; i < selectedPrice.length; i++) {
			let a = sum;
			a = a + selectedPrice[i];
			setSum(a);
		}
	};

	const minuscalc = () => {
		for (let i = 0; i < selectedPrice.length; i++) {
			let b = sum;
			b = b - selectedPrice[i];
			setSum(b);
		}
	};

	console.log('selectedPrice', selectedPrice);
	console.log('checkedItems', checkedItems);
	console.log('sum', sum);

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
						{dummy.map((data, index) => (
							<CartTable
								key={data.id}
								id={data.id}
								img={data.url}
								brand={data.brandName}
								model={data.model}
								price={data.price}
								state={data.orderstatus}
								option={data.option}
								checkedItems={checkedItems}
								setCheckedItems={setCheckedItems}
								test={test}
								setSelectedPrice={setSelectedPrice}
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
