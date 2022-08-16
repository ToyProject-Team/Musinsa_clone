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
import { useNavigate } from 'react-router';
import Modal from 'react-modal';
import Order from 'pages/Order';

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
	const [size, setSize] = useState('옵션 선택');
	const [color, setColor] = useState('옵션 선택');
	const [selected, setSelected] = useState(false);
	const [clickedlike, setClickedlike] = useState(true);
	const [selectedPrice, setSelectedPrice] = useState(0);
	const [orderAmount, setOrderAmount] = useState(1);
	const [showModal, setShowModal] = useState(false);

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

	const sizeSelected = e => {
		setSize(e.target.value);
	};
	const colorSelected = e => {
		setColor(e.target.value);
	};

	useEffect(() => {
		if (size !== '옵션 선택' && color !== '옵션 선택') {
			setSelected(true);
		} else {
		}
	}, [size, color]);

	const onLikeClicked = useCallback(() => {
		setClickedlike(prev => !prev);
	}, [clickedlike]);

	// const openModal = useCallback(() => {
	// 	setShowModal(prev => !prev);
	// 	console.log(showModal);
	// }, [showModal]);

	const openModal = () => {
		setShowModal(showModal => !showModal);
	};

	return (
		<div>
			<FormWrapper style={{ 'background-color': '#f3f3f3' }}>
				<BuyOption onChange={sizeSelected} value={size}>
					<option>옵션 선택</option>
					<option>S</option>
					<option>M</option>
					<option>L</option>
					<option>XL</option>
				</BuyOption>
				<BuyOption onChange={colorSelected} value={color}>
					<option>옵션 선택</option>
					<option>블랙</option>
					<option>네이비</option>
					<option>차콜</option>
					<option>화이트</option>
				</BuyOption>
			</FormWrapper>
			{selected ? <SelectForm price={data.productPrice} size={size} color={color} /> : <></>}
			<TotalPrice>
				<p>총 상품 금액</p>
				<div>{!selected ? 0 : selectedPrice + data.productPrice}원</div>
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
				<ButtonLike clickedlike={clickedlike}>
					<Button clickedlike={clickedlike} onClick={onLikeClicked} />
					<Like clickedlike={clickedlike}>{data.likes}</Like>
				</ButtonLike>
				<ButtonCart>
					<i></i>
				</ButtonCart>
			</ButtonWrapper>
		</div>
	);
};

export default PurchaseForm;
