import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ImgSpan } from '../styles';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { thousandComma } from 'utils/thousandComma';
import { smallCategory } from 'utils/smallCategory';
import { CheckLabel } from './styles';
import OrderModal from 'components/Modals/OrderModal';
import Order from 'components/Order';

function CartTable({ data, index, setData, item }) {
	const [modalOrder, setModalOrder] = useState(false);
	const [pay, setPay] = useState('card');
	const [order, setOrder] = useState(false);

	// 수량 기입
	const handleChange = useCallback(
		({ target: { value } }) => {
			setData(prev => prev.map(v => (v.id === item.id ? { ...v, count: Number(value) } : v)));
		},
		[data],
	);

	// 수량 증가
	const plusCount = useCallback(() => {
		setData(prev => prev.map(v => (v.id === item.id ? { ...v, count: v.count + 1 } : v)));
	}, [data]);

	// 수량 감소
	const minusCount = useCallback(() => {
		if (item.count === 1) {
			alert('수량을 줄일 수 없습니다.');
		} else {
			setData(prev => prev.map(v => (v.id === item.id ? { ...v, count: v.count - 1 } : v)));
		}
	}, [data]);

	// 체크
	const checkItem = useCallback(() => {
		setData(prev => prev.map(v => (v.id === item.id ? { ...v, check: !v.check } : v)));
	}, [data]);

	// 삭제
	const removeItem = useCallback(() => {
		setData(prev => prev.filter(v => v.id !== item.id));
	}, [data]);

	// 결제 모달창
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
		<tbody>
			<tr>
				<td colSpan="7" className="cart_cont">
					<table>
						<colgroup>
							<col width="3.62%" />
							<col width="*" />
							<col width="9.5%" />
							<col width="12%" />
							<col width="9.5%" />
							<col width="17.3%" />
							<col width="12%" />
						</colgroup>
						<tbody>
							<tr>
								<td>
									<CheckLabel
										onClick={checkItem}
										className={item.check ? 'active' : ''}
									></CheckLabel>
								</td>
								<td className="top">
									<div>
										<ImgSpan>
											<img src={item.img} alt="더미데이터" />
										</ImgSpan>
										<ul>
											<li>{smallCategory[item.bigCategory][item.smallCategory]}</li>
											<li>
												<strong>{item.productTitle}</strong>
											</li>
											<li>
												{item.option_1} / {item.option_2}
											</li>
										</ul>
									</div>
								</td>
								<td> {thousandComma(item.productPrice)}원</td>
								<td>
									<div className="input_amount">
										<button value={item.count} onClick={minusCount}>
											<FiMinus style={item.count === 1 ? { color: '#ddd' } : { color: '#777' }} />
										</button>
										<input type="text" value={item.count} onChange={handleChange}></input>
										<button value={item.count} onClick={plusCount}>
											<FiPlus style={{ color: '#777' }} />
										</button>
									</div>
								</td>
								<td>{thousandComma(item.productPrice * item.count)}원</td>
								<td>{item.productPrice * item.count > 30000 ? 0 : thousandComma(3000)}</td>
								<td>
									<div>
										<button className="btn" onClick={onClickOrderButton}>
											결제하기
										</button>
										{order && <Order pay={pay} />}
										<button className="del_btn" onClick={removeItem}>
											<FiX />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>

			{modalOrder && (
				<OrderModal
					show={modalOrder}
					onCloseModal={onCloseModal}
					onClickConfirm={onClickOrder}
					price={thousandComma(
						item.productPrice * item.count + (item.productPrice * item.count > 30000 ? 0 : 3000),
					)}
					pay={pay}
					setPay={setPay}
				></OrderModal>
			)}
		</tbody>
	);
}

export default CartTable;
