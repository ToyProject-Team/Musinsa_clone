import { FormWrapper, BuyOption, SelectOption, Option, TotalPrice } from './styles';
import { useCallback, useEffect, useState } from 'react';
import SelectForm from '../SelectedForm';

const PurchaseForm = ({ data }) => {
	const [size, setSize] = useState('옵션 선택');
	const [color, setColor] = useState('옵션 선택');
	const [selected, setSelected] = useState(false);

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
		</div>
	);
};

export default PurchaseForm;
