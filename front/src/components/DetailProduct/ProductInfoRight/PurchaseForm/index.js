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
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Order from 'pages/Order';
import { useProductDetailState } from 'context/ProductDetailContext';
import { thousandComma } from 'utils/thousandComma';

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

const PurchaseForm = ({ data }) => {
	const navigate = useNavigate();
	const detail = useProductDetailState();

	const [size, setSize] = useState('옵션 선택');
	const [color, setColor] = useState('옵션 선택');
	const [selected, setSelected] = useState(false);
	const [clickedlike, setClickedlike] = useState(true);
	const [selectedPrice, setSelectedPrice] = useState(0);
	const [orderAmount, setOrderAmount] = useState(1);
	const [showModal, setShowModal] = useState(false);

	const [option, setOption] = useState({});
	const [selectList, setSelectList] = useState({});
	const [selectIdx, setSelectIdx] = useState();
	const [totalPrice, setTotalPrice] = useState(0);

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

	useEffect(() => {
		optionListInit();
	}, []);

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

	const SelectForm = ({ price, size, color }) => {
		const onIncrease = () => {
			setOrderAmount(orderAmount + 1);
			setSelectedPrice(selectedPrice + price);
		};
		const onDecrease = () => {
			if (orderAmount === 1) {
				alert('더이상 수량을 줄일 수 없습니다.');
			} else {
				setOrderAmount(orderAmount - 1);
				setSelectedPrice(selectedPrice - price);
			}
		};
		const onCancel = () => {
			setSelected(!selected);
			setSelectedPrice(0);
			setOrderAmount(1);
			setSize('옵션 선택');
			setColor('옵션 선택');
		};

		return (
			<div>
				<SelectedOption>
					<Selected>
						{size}/{color}
					</Selected>
					<Amount>
						<ul>
							<Decrease orderAmount={orderAmount} onClick={onDecrease}>
								-
							</Decrease>
							<li>{orderAmount}</li>
							<li onClick={onIncrease}>+</li>
						</ul>
					</Amount>
					<Price>
						<div>{selectedPrice + data.productPrice}원</div>
						<p onClick={onCancel}>X</p>
					</Price>
				</SelectedOption>
			</div>
		);
	};

	useEffect(() => {
		let answer = Object.values(selectList)
			?.map(v =>
				v.map(item => {
					return Number(Object.values(item)[0]);
				}),
			)
			.flat(Infinity);

		if (answer.length > 0) answer = answer.reduce((a, b) => a + b);

		setTotalPrice(answer);
	}, [selectList]);

	// useEffect(() => {
	// 	if (size !== '옵션 선택' && color !== '옵션 선택') {
	// 		setSelected(true);
	// 	} else {
	// 	}
	// }, [size, color]);

	const onLikeClicked = useCallback(() => {
		setClickedlike(prev => !prev);
	}, [clickedlike]);

	const openModal = () => {
		setShowModal(showModal => !showModal);
		// if (!user.login) {
		// 	alert('로그인 후 구매가 가능합니다.');
		// 	navigate('/login');
		// } else {
		// 	const payment_data = {
		// 		price: selectedPrice + data.productPrice,
		// 		id: data.ProductId,
		// 		name: data.productTitle,
		// 		date: new Date(),
		// 	};
		// 	dispatch({ payment_data, type: PAYMENT });
		// }
	};

	return (
		<div>
			<FormWrapper style={{ backgroundColor: '#f3f3f3' }}>
				{Object.keys(data.option).map((item, idx) => {
					return (
						Array.isArray(option) && (
							<BuyOption
								key={item + idx}
								onChange={selectOption}
								value={option[idx][item]}
								name={item}
								data-index={idx}
							>
								<option>옵션 선택</option>
								{typeof data.option[item][0] === 'string'
									? data.option[item].map(itemOption => (
											<option key={itemOption}>{itemOption}</option>
									  ))
									: selectIdx >= 0 &&
									  data.option[item][selectIdx].map(itemOption => (
											<option key={itemOption}>{itemOption}</option>
									  ))}
							</BuyOption>
						)
					);
				})}
			</FormWrapper>
			{Object.keys(selectList)?.map((option_1, idx) => {
				if (typeof selectList[option_1] === 'number') {
					// 옵션 1개 인경우
					return (
						<div key={option_1 + idx}>
							<SelectedOption>
								<Selected>{option_1}</Selected>
								<Amount>
									<ul>
										<Decrease orderAmount={orderAmount}>-</Decrease>
										<li>{orderAmount}</li>
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
										<p>X</p>
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
				{/* <div>{!selected ? 0 : selectedPrice + data.productPrice}원</div> */}
			</TotalPrice>
			<ButtonWrapper>
				<ButtonBuy onClick={openModal}>바로구매</ButtonBuy>
				{showModal ? (
					<Modal style={ModalStyle} isOpen={true}>
						<Order openModal={openModal} price={selectedPrice + data.productPrice} />
					</Modal>
				) : (
					<></>
				)}
				<ButtonLike clickedlike={clickedlike} onClick={onLikeClicked}>
					<Button clickedlike={clickedlike} />
					<Like clickedlike={clickedlike}>{thousandComma(detail.product.likes)}</Like>
				</ButtonLike>
				<ButtonCart>
					<i></i>
				</ButtonCart>
			</ButtonWrapper>
		</div>
	);
};

export default PurchaseForm;
