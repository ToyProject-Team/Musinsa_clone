import Modal from 'components/Modal';
import { Button, Label } from 'components/Modal/style';
import useInput from 'hooks/useInput';
import React, { useCallback } from 'react';

const UserFindModal = ({ show, onCloseModal }) => {
	const onClickFind = useCallback(() => {
		console.log(1);
	}, []);

	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<Button style={{ marginTop: '10px' }} className="button" onClick={onClickFind}>
				확인
			</Button>
		</Modal>
	);
};

export default UserFindModal;
