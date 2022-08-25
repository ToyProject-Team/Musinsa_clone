import Modal from 'components/Modals/Modal';
import React, { useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';

const SearchAddressModal = ({ show, onCloseModal, setDeliveryInfo }) => {
	const selectAddress = useCallback(data => {
		setDeliveryInfo(preState => ({
			...preState,
			address1: data.zonecode,
			address2: data.address,
		}));

		onCloseModal();
	}, []);

	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<DaumPostcode
				onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
				autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
				defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
			/>
		</Modal>
	);
};

export default SearchAddressModal;
