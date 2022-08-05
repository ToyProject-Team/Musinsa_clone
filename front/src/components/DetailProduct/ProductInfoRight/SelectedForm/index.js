import { SelectedOption, Selected, Amount, Price, Decrease, SelectWrapper } from './styles';

import { useState } from 'react';

const SelectForm = ({ price, size, color }) => {
	const [orderAmount, setOrderAmount] = useState(1);
	const [selectedPrice, setSelectedPrice] = useState(price);
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
					<div>{selectedPrice}원</div>
					<p>X</p>
				</Price>
			</SelectedOption>
		</div>
	);
};
export default SelectForm;
