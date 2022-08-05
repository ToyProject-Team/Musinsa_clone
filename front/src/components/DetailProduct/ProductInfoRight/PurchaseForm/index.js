import { FormWrapper, BuyOption, SelectOption, Option, TotalPrice } from './styles';
import { useCallback, useEffect, useState } from 'react';

const PurchaseForm = () => {
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');
	const [select, setSelected] = useState(false);
	const sizeSelected = e => {
		setSize(e.target.value);
	};
	const colorSelected = e => {
		setColor(e.target.value);
	};
	useEffect(() => {
		if (color !== '옵션 선택' && size !== '옵션 선택') {
			setSelected(true);
		} else if (color === '옵션 선택' && size === '옵션 선택') {
			setSelected(false);
		}
	}, [color, select]);

	return (
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
			{select == true ? console.log('오') : <></>}
			<TotalPrice></TotalPrice>
		</FormWrapper>
	);
};

export default PurchaseForm;
