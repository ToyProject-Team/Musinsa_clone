import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import CartTable from 'components/Mypage/Cart/Table';
import { OrderTable, CartPayment, OrderBtn, ModalStyle } from 'components/Mypage/Cart/styles';
import { FaPlus, FaEquals } from 'react-icons/fa';
import Order from 'components/Order';
import OrderModal from 'components/Modals/OrderModal';
import { useNavigate } from 'react-router';
import { thousandComma } from 'utils/thousandComma';
import { CheckLabel } from './Table/styles';
import { getData } from 'utils/getData';
import axios from 'axios';

const dummyCart = {
	exCart: [
		{
			id: '4',
			productTitle: 'Fish',
			productPrice: 20000,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 1,
			bigCategory: 1,
			smallCategory: 2,
			option_1: 'Gray',
			option_2: '95',
			img: 'https://image.msscdn.net/images/goods_img/20211207/2260272/2260272_1_500.jpg?t=20211207211906',
			check: false,
		},
		{
			id: '5',
			productTitle: 'Fish',
			productPrice: 15000,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 2,
			bigCategory: 1,
			smallCategory: 1,
			option_1: 'Gray',
			option_2: '95',
			img: 'https://mblogthumb-phinf.pstatic.net/MjAxODAxMDNfNDAg/MDAxNTE0OTYyNTA5NjU0.u5cU9gnAdMHK4uAmf54gNGbKZig0WoIiCKAD2qCaDf0g.yzxNuwFxteMsF9wX7Q0M4QqucBCF6INyczLsjoKyCDwg.JPEG.yg11398/0.jpg?type=w800',
			check: false,
		},
		{
			id: '6',
			productTitle: 'Fish',
			productPrice: 5000,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
			bigCategory: 1,
			smallCategory: 5,
			option_1: 'Gray',
			option_2: '95',
			img: 'https://mblogthumb-phinf.pstatic.net/MjAxODAxMDNfNDAg/MDAxNTE0OTYyNTA5NjU0.u5cU9gnAdMHK4uAmf54gNGbKZig0WoIiCKAD2qCaDf0g.yzxNuwFxteMsF9wX7Q0M4QqucBCF6INyczLsjoKyCDwg.JPEG.yg11398/0.jpg?type=w800',
			check: true,
		},
		{
			id: '7',
			productTitle: 'Fish',
			productPrice: 70000,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
			bigCategory: 1,
			smallCategory: 5,
			option_1: 'Gray',
			option_2: '95',
			img: 'https://mblogthumb-phinf.pstatic.net/MjAxODAxMDNfNDAg/MDAxNTE0OTYyNTA5NjU0.u5cU9gnAdMHK4uAmf54gNGbKZig0WoIiCKAD2qCaDf0g.yzxNuwFxteMsF9wX7Q0M4QqucBCF6INyczLsjoKyCDwg.JPEG.yg11398/0.jpg?type=w800',
			check: false,
		},
		{
			id: '8',
			productTitle: 'Fish',
			productPrice: 8000,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
			bigCategory: 1,
			smallCategory: 5,
			option_1: 'Gray',
			option_2: '95',
			img: 'https://mblogthumb-phinf.pstatic.net/MjAxODAxMDNfNDAg/MDAxNTE0OTYyNTA5NjU0.u5cU9gnAdMHK4uAmf54gNGbKZig0WoIiCKAD2qCaDf0g.yzxNuwFxteMsF9wX7Q0M4QqucBCF6INyczLsjoKyCDwg.JPEG.yg11398/0.jpg?type=w800',
			check: false,
		},
		{
			id: '9',
			productTitle: 'Fish',
			productPrice: 9000,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
			bigCategory: 1,
			smallCategory: 5,
			option_1: 'Gray',
			option_2: '95',
			img: 'https://mblogthumb-phinf.pstatic.net/MjAxODAxMDNfNDAg/MDAxNTE0OTYyNTA5NjU0.u5cU9gnAdMHK4uAmf54gNGbKZig0WoIiCKAD2qCaDf0g.yzxNuwFxteMsF9wX7Q0M4QqucBCF6INyczLsjoKyCDwg.JPEG.yg11398/0.jpg?type=w800',
			check: false,
		},
		{
			id: '10',
			productTitle: 'Fish',
			productPrice: 1000,
			nonMemberPrice: 52000,
			deliveryFrom: true,
			deliveryWay: false,
			deliveryCompany: 'CJ대한통운',
			count: 3,
			bigCategory: 1,
			smallCategory: 5,
			option_1: 'Gray',
			option_2: '95',
			img: 'https://mblogthumb-phinf.pstatic.net/MjAxODAxMDNfNDAg/MDAxNTE0OTYyNTA5NjU0.u5cU9gnAdMHK4uAmf54gNGbKZig0WoIiCKAD2qCaDf0g.yzxNuwFxteMsF9wX7Q0M4QqucBCF6INyczLsjoKyCDwg.JPEG.yg11398/0.jpg?type=w800',
			check: false,
		},
	],
};

function Cart() {
	const [cartList, setCartList] = useState([]);
	const [data, setData] = useState([]);
	console.log('cart', cartList);
	// console.log('data', data);

	const [addData, setAddData] = useState([
		{
			check: false,
			count: 1
		}
	]);

	//장바구니 리스트 가져오기
	useEffect(() => {
		axios
			.get('http://141.164.48.244/api/shoppingBasket/shoppingList', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: loginToken.accessToken,
				},
			})
			.then(res => {
				setCartList(res.data.exCart);
			});
		const dataArr = [];
		cartList.map(list =>
			list.ProductMainTags.map(Mainitem => Mainitem.ProductSubTags.map(item => dataArr.push(item))),
		);
		setData(dataArr);
		
			
	}, []);

	//데이터 구조 변경
	

	const chageData = useCallback(() => {
		cartList.ProductMainTags.ProductSubTags.push(addData);
	})

	const [checkBox, setCheckBox] = useState(false);
	const [sum, setSum] = useState(0);
	const loginToken = getData();
	// console.log(loginToken);

	const [pay, setPay] = useState('card');
	const [order, setOrder] = useState(false);

	const [modalOrder, setModalOrder] = useState(false);

	const [checkedList, setCheckedList] = useState([]);
	//

	// 체크

	// const checkItem = useCallback(() => {
	// 	setCheckBox(check => !check);
	// 	setCheckedList(
	// 		cartList.map(v =>
	// 			v.ProductMainTags.map(Mainitem =>
	// 				Mainitem.ProductSubTags.map(item => ({ ...item, check: !checkBox })),
	// 			),
	// 		),
	// 	);
	// }, [cartList, checkBox]);

	// console.log('checklist', checkedList);

	const checkItem = useCallback(
		checked => {
			if (checked) {
				const checklistArr = [];
				cartList.map(list =>
					list.ProductMainTags.map(Mainitem =>
						Mainitem.ProductSubTags.map(item => checklistArr.push(item)),
					),
				);
				setCheckedList(checklistArr);
			} else {
				setCheckedList([]);
			}
		},
		[cartList],
	);

	console.log('chlist', checkedList);

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

	// 모두 체크 확인 및 총상품 금액
	useEffect(() => {
		let arrId = [];
		cartList.map(v => (v.check ? arrId.push(v.id) : arrId.filter(f => f !== v.id)));

		if (cartList.length === arrId.length) setCheckBox(true);
		else setCheckBox(false);

		// 총 상품 금액
		if (arrId.length > 0) {
			setSum(
				arrId
					.map(v => {
						let total = 0;
						cartList.map(m => m.id === v && (total += m.count * m.productPrice));
						return total;
					})
					?.reduce((a, b) => a + b),
			);
		} else setSum(0);
	}, [cartList]);

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
											onChange={e => checkItem(e.target.checked)}
											checked={
												checkedList.length === 0
													? false
													: checkedList.length === data.length
													? true
													: false
											}
										/>
									</label>
									{/* <CheckLabel onClick={checkItem} className={checkBox ? 'active' : ''}></CheckLabel> */}
								</th>
								<th scope="col">상품정보</th>
								<th scope="col">상품금액</th>
								<th scope="col">수량</th>
								<th scope="col">주문금액</th>
								<th scope="col">배송 형태/배송비</th>
								<th>&nbsp;</th>
							</tr>
						</thead>
						{cartList.map(list =>
							list.ProductMainTags.map(Mainitem =>
								Mainitem.ProductSubTags.map((item, index) => (
									<CartTable
										key={index}
										data={data}
										setData={setData}
										item={item}
										list={list}
										Mainitem={Mainitem}
										checkedList={checkedList}
										setCheckedList={setCheckedList}
									/>
								)),
							),
						)}
						{/* {cartList.map((item, index) => (
							<CartTable key={index} data={data} setData={setData} item={item} />
						))} */}
					</OrderTable>
					<CartPayment>
						<li>
							<p>상품금액</p>
							<p>
								<span>{thousandComma(sum)}</span>원
							</p>
						</li>
						<li>
							<FaPlus />
						</li>
						<li>
							<p>배송비</p>
							<p>
								<span>{sum > 30000 || sum === 0 ? 0 : thousandComma(3000)}</span>원
							</p>
						</li>
						<li>
							<FaEquals />
						</li>
						<li>
							<p>최종 결제 금액</p>
							<p>
								<span>{thousandComma(sum + (sum > 30000 || sum === 0 ? 0 : 3000))}</span>원
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
						price={thousandComma(sum + (sum > 30000 ? 0 : 3000))}
						pay={pay}
						setPay={setPay}
					></OrderModal>
				)}
			</MypageMain>
		</>
	);
}

export default Cart;
