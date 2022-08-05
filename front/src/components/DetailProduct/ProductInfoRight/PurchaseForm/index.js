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
	SelectedOption,
	Selected,
	Amount,
	Price,
	Decrease,
} from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import SelectForm from '../SelectedForm';

const PurchaseForm = ({ data }) => {
	const navigate = useNavigate();
	const [size, setSize] = useState('옵션 선택');
	const [color, setColor] = useState('옵션 선택');
	const [selected, setSelected] = useState(false);
	const [clickedlike, setClickedlike] = useState(true);

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
		// navigate(`/${mypage}`);
		setClickedlike(prev => !prev);
		console.log(clickedlike);
	}, [clickedlike]);

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
				{/* color !== '옵션 선택' && size !== '옵션 선택' ? */}
			</FormWrapper>
			{selected === true ? (
				<SelectForm price={data.productPrice} size={size} color={color} />
			) : (
				<></>
			)}
			<TotalPrice>
				<p>총 상품 금액</p>
				<div>{data.productPrice}원</div>
			</TotalPrice>
			<ButtonWrapper>
				<ButtonBuy>바로구매</ButtonBuy>
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
