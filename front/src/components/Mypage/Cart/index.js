import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import CartTable from 'components/Mypage/Cart/Table';
import { OrderTable, CartPayment, OrderBtn, ModalStyle } from 'components/Mypage/Cart/styles';
import { FaPlus, FaEquals } from 'react-icons/fa';
import dummy from 'components/Mypage/data.json';
import Modal from 'react-modal';
import Order from 'components/Order';
import OrderModal from 'components/Modals/OrderModal';
import { useNavigate } from 'react-router';
import { thousandComma } from 'utils/thousandComma';

const dummyCart = {
	exCart: [
		{
			id: '4',
			productTitle: 'Fish',
			productPrice: 57200,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 1,
		},
		{
			id: '5',
			productTitle: 'Fish',
			productPrice: 57200,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 2,
		},
		{
			id: '6',
			productTitle: 'Fish',
			productPrice: 57200,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
		},
		{
			id: '7',
			productTitle: 'Fish',
			productPrice: 57200,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
		},
		{
			id: '8',
			productTitle: 'Fish',
			productPrice: 57200,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
		},
		{
			id: '9',
			productTitle: 'Fish',
			productPrice: 57200,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
		},
		{
			id: '10',
			productTitle: 'Fish',
			productPrice: 57200,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
		},
	],
};
function Cart() {
	const navigate = useNavigate();

	const [pay, setPay] = useState('card');
	const [order, setOrder] = useState(false);

	const [modalOrder, setModalOrder] = useState(false);

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

	useEffect(() => {
		if (selectedPrice.length > 0) {
			let total = [...selectedPrice].reduce((a, b) => a + b);
			setSum(total);
		} else {
			setSum(0);
		}
	}, [selectedPrice]);

	const onCloseModal = useCallback(() => {
		setModalOrder(false);
		setOrder(false);
	}, [modalOrder]);

	// 바로구매
	const onClickOrderButton = useCallback(() => {
		setModalOrder(true);
	}, []);

	// 결제
	const onClickOrder = useCallback(() => {
		setModalOrder(false);
		setOrder(true);
	}, []);

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
						{dummyCart[Object.keys(dummyCart)].map((data, index) => (
							<CartTable
								data={data}
								key={data.id}
								id={data.id}
								img={
									'https://mblogthumb-phinf.pstatic.net/MjAxODAxMDNfNDAg/MDAxNTE0OTYyNTA5NjU0.u5cU9gnAdMHK4uAmf54gNGbKZig0WoIiCKAD2qCaDf0g.yzxNuwFxteMsF9wX7Q0M4QqucBCF6INyczLsjoKyCDwg.JPEG.yg11398/0.jpg?type=w800'
								}
								brand={data.id}
								model={data.id}
								price={data.id}
								state={data.id}
								option={data.id}
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
						<button onClick={onClickOrderButton}>결제하기</button>
						{order && <Order pay={pay} />}
					</OrderBtn>
				</div>

				{modalOrder && (
					<OrderModal
						show={modalOrder}
						onCloseModal={onCloseModal}
						onClickConfirm={onClickOrder}
						price={thousandComma(100000)}
						pay={pay}
						setPay={setPay}
					></OrderModal>
				)}
			</MypageMain>
		</>
	);
}

export default Cart;
