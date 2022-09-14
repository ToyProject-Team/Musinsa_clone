import {
	FormWrapper,
	BuyOption,
	ButtonBuy,
	ButtonWrapper,
	TotalPrice,
	ButtonLike,
	ButtonCart,
	Button,
	Like,
	Selected,
	SelectedOption,
	Amount,
	Decrease,
	Price,
} from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Order from 'components/Order';
import {
	LIKES,
	useProductDetailDispatch,
	useProductDetailState,
} from 'context/ProductDetailContext';
import { thousandComma } from 'utils/thousandComma';
import { getData } from 'utils/getData';
import { URLquery } from 'utils/URLquery';
import { DeleteHeaderBodyApi, GetTokenApi, PostHeaderBodyApi } from 'utils/api';
import ConfirmModal from 'components/Modals/ConfirmModal';
import OrderModal from 'components/Modals/OrderModal';

const PurchaseForm = ({ data }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const detail = useProductDetailState();
	const dispatch = useProductDetailDispatch();
	const user = getData();

	const [clickedlike, setClickedlike] = useState(true);
	const [selectedPrice, setSelectedPrice] = useState(0);

	const [option_1, setOpion_1] = useState(data.ProductMainTags.map(item => item.name));
	const [option_2, setOpion_2] = useState([]);
	const [option, setOption] = useState({});
	const [selectList, setSelectList] = useState({});
	const [selectIdx, setSelectIdx] = useState();
	const [totalPrice, setTotalPrice] = useState(0);

	const [pay, setPay] = useState('card');
	const [order, setOrder] = useState(false);

	const [modalOrder, setModalOrder] = useState(false);
	const [modalBasket, setModalBasket] = useState(false);

	// 새로고침
	// 선택 List 옵션 초기화
	const optionListInit = useCallback(() => {
		const value = Object.keys(data.option);
		setOption(() =>
			value.map(v => {
				return { [v]: '옵션 선택' };
			}),
		);
	}, []);

	// 좋아요 표시
	const userLikes = useCallback(async () => {
		const token = user.accessToken;
		const query = URLquery(location);
		try {
			const result = await GetTokenApi('/api/mypage/favoriteGoods', token);
			let likeProduct = result.data.likeProduct.filter(v => `${v.id}` === query.productId);
			setClickedlike(Object.keys(likeProduct).length > 0 ? true : false);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		optionListInit();
		if (user) userLikes();
	}, []);

	const changeDispatch = useCallback((type, payload) => {
		return dispatch({ type, payload });
	}, []);

	const onChangeOption_1 = useCallback(
		e => {
			const { value } = e.target;
			const obj = data.ProductMainTags.filter(v => v.name === value)[0];
			const arr = obj.ProductSubTags.map(v => v.name);
			setOpion_2(arr);
		},
		[data],
	);

	const onChangeOption_2 = useCallback(
		e => {
			const { value } = e.target;
			const obj = data.ProductMainTags.filter(v => v.name === value)[0];
			const arr = obj.ProductSubTags.map(v => v.name);
			setOpion_2(arr);
		},
		[data],
	);
	// 옵션 선택
	const selectOption = useCallback(
		e => {
			const { name, value } = e.target;
			const objData = Object.keys(data.option);
			const index = Number(e.target.getAttribute('data-index'));
			const lastOptionIndex = objData.includes('add') ? objData.length - 2 : objData.length - 1;
			let inifFlag = false;

			if (index === 0) {
				optionListInit();
				setSelectIdx(data.option[name].indexOf(value));
			}

			if (index === lastOptionIndex && value !== '옵션 선택') {
				// 마지막 옵션 눌렀다면?
				if (objData.length === Number(name.replace('option', ''))) {
					const key = option[0][objData[0]];
					const nowValue = value;
					const oldValue = selectList[key];
					let flag = false;

					if (objData.length > 1) {
						// 옵션이 2개 이상일 경우
						selectList[key]?.map(v => {
							if (Object.keys(v)[0] === nowValue) flag = true;
						});
						if (flag) return alert('이미 선택한 상품입니다.');

						setSelectList(prev => {
							return {
								...prev,
								[key]: oldValue ? [...oldValue, { [nowValue]: 1 }] : [{ [nowValue]: 1 }],
							};
						});
						inifFlag = true;
					} else {
						// 옵션이 1개인 경우
						if (selectList[nowValue]) return alert('이미 선택한 상품입니다.');

						setSelectList(prev => {
							return {
								...prev,
								[nowValue]: 1,
							};
						});
						inifFlag = true;
					}
				}
			}
			setOption(prev => {
				prev[index][name] = value;
				return prev;
			});

			if (inifFlag) {
				optionListInit();
				setSelectIdx(-1);
			}
		},
		[option, selectList],
	);

	const onClickIncrease = useCallback(
		(option_1, option_2) => {
			setSelectList(prev => {
				prev = {
					...prev,
					[option_1]: prev[option_1].map(v =>
						v[option_2] ? { ...v, [option_2]: v[option_2] + 1 } : v,
					),
				};
				return prev;
			});
		},
		[selectList],
	);

	const onClickDecrease = useCallback(
		(option_1, option_2) => {
			setSelectList(prev => {
				prev = {
					...prev,
					[option_1]: prev[option_1].map(v =>
						v[option_2] ? { ...v, [option_2]: v[option_2] - 1 } : v,
					),
				};
				return prev;
			});
		},
		[selectList],
	);

	const onClickRemove = useCallback(
		(option_1, option_2) => {
			setSelectList(prev => {
				prev = {
					...prev,
					[option_1]: prev[option_1].filter(v => !v[option_2]),
				};

				if (prev[option_1].length === 0) delete prev[option_1];

				return prev;
			});
		},
		[selectList],
	);

	useEffect(() => {
		let answer = 0;
		if (Object.keys(selectList).length > 0) {
			answer = Object.values(selectList)
				?.map(v =>
					v.map(item => {
						return Number(Object.values(item)[0]);
					}),
				)
				.flat(Infinity)
				.reduce((a, b) => a + b);
		}

		setTotalPrice(answer);
	}, [selectList]);

	// 좋아요
	const onLikeClicked = useCallback(async () => {
		if (!user) {
			const { pathname, search } = location;
			navigate(`/login?redirect=${pathname}${search}`);
		}

		const token = user.accessToken;
		const query = URLquery(location);

		setClickedlike(prev => !prev);
		if (clickedlike) {
			changeDispatch(LIKES, {
				likes: detail.product.likes - 1,
			});
			detail.product.likes -= 1;

			try {
				const params = {
					productId: query.productId,
				};
				await DeleteHeaderBodyApi('/api/mypage/favoriteGoods/del', params, 'Authorization', token);
			} catch (error) {
				setClickedlike(true);
			}
		} else {
			changeDispatch(LIKES, {
				likes: detail.product.likes + 1,
			});
			detail.product.likes += 1;

			try {
				const params = {
					productId: query.productId,
				};
				PostHeaderBodyApi('/api/product/likeProduct', params, 'Authorization', token);
			} catch (error) {
				setClickedlike(false);
			}
		}
	}, [clickedlike]);

	// 장바구니 추가
	const onClickBasket = useCallback(() => {
		if (!user) {
			const { pathname, search } = location;
			navigate(`/login?redirect=${pathname}${search}`);
		}

		const token = user.accessToken;
		const query = URLquery(location);

		try {
			const params = {
				productId: query.productId,
			};
			PostHeaderBodyApi('/api/product/addCart', params, 'Authorization', token);
			setModalBasket(true);
		} catch (error) {}
	}, []);

	const onCloseModal = useCallback(() => {
		setModalBasket(false);
		setModalOrder(false);
		setOrder(false);
	}, [modalBasket, modalOrder]);

	const onLinkModal = useCallback(() => {
		setModalBasket(false);
		navigate('/mypage/cart');
	}, [modalBasket]);

	// 바로구매
	const onClickOrderButton = useCallback(() => {
		if (!user) {
			const { pathname, search } = location;
			navigate(`/login?redirect=${pathname}${search}`);
		}

		setModalOrder(true);
	}, []);

	// 결제
	const onClickOrder = useCallback(() => {
		if (!user) {
			const { pathname, search } = location;
			navigate(`/login?redirect=${pathname}${search}`);
		}

		setModalOrder(false);
		setOrder(true);
	}, []);

	return (
		<div>
			<FormWrapper style={{ backgroundColor: '#f3f3f3' }}>
				<BuyOption onChange={onChangeOption_1}>
					<option>옵션 선택</option>
					{option_1.map(option => (
						<option value={option}>{option}</option>
					))}
				</BuyOption>
				<BuyOption onChange={onChangeOption_2}>
					<option>옵션 선택</option>
					{option_2.map(option => (
						<option>{option}</option>
					))}
				</BuyOption>
			</FormWrapper>
			{Object.keys(selectList)?.map((option_1, idx) => {
				// const orderCount = item[option_1];
				if (typeof selectList[option_1] === 'number') {
					// 옵션 1개 인경우
					return (
						<div key={option_1 + idx}>
							<SelectedOption>
								<Selected>{option_1}</Selected>
								<Amount>
									<ul>
										<Decrease orderAmount={1}>-</Decrease>
										<li>{1}</li>
										<li>+</li>
									</ul>
								</Amount>
								<Price>
									<div>{selectedPrice + data.productPrice}원</div>
									<p>X</p>
								</Price>
							</SelectedOption>
						</div>
					);
				} else {
					// 옵션 2개 이상
					return selectList[option_1].map(item => {
						const option_2 = Object.keys(item)[0];
						const orderCount = item[option_2];
						return (
							<div key={option_1 + option_2}>
								<SelectedOption>
									<div>
										{option_1}/{option_2}
									</div>
									<div>
										<ul>
											<Decrease
												orderAmount={orderCount}
												onClick={() =>
													orderCount > 1
														? onClickDecrease(option_1, option_2)
														: alert('더이상 수량을 줄일 수 없습니다.')
												}
											>
												-
											</Decrease>
											<li>{orderCount}</li>
											<li onClick={() => onClickIncrease(option_1, option_2)}>+</li>
										</ul>
									</div>
									<div>
										<div>{thousandComma(orderCount * detail.product.rookiePrice)}원</div>
										<p onClick={() => onClickRemove(option_1, option_2)}>X</p>
									</div>
								</SelectedOption>
							</div>
						);
					});
				}
			})}
			<TotalPrice>
				<p>총 상품 금액</p>
				<div>{thousandComma(totalPrice * detail.product.rookiePrice)}원</div>
			</TotalPrice>
			<ButtonWrapper>
				<ButtonBuy onClick={onClickOrderButton}>바로구매</ButtonBuy>
				{order && <Order pay={pay} />}
				<ButtonLike clickedlike={clickedlike} onClick={onLikeClicked}>
					<Button clickedlike={clickedlike} />
					<Like clickedlike={clickedlike}>{thousandComma(detail.product.likes)}</Like>
				</ButtonLike>
				<ButtonCart onClick={onClickBasket}>
					<i>장바구니 아이콘</i>
				</ButtonCart>
			</ButtonWrapper>

			{modalOrder && (
				<OrderModal
					show={modalOrder}
					onCloseModal={onCloseModal}
					onClickConfirm={onClickOrder}
					price={thousandComma(totalPrice * detail.product.rookiePrice)}
					pay={pay}
					setPay={setPay}
				></OrderModal>
			)}

			<ConfirmModal
				show={modalBasket}
				onCloseModal={onCloseModal}
				onClickConfirm={onLinkModal}
				content={'장바구니로 이동하시겠습니까?'}
			></ConfirmModal>
		</div>
	);
};

export default PurchaseForm;
