import Modal from 'components/Modal';
import { Button, Label } from 'components/Modal/style';
import React from 'react';

const AuthModal = ({ show, onCloseModal }) => {
	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<Label className="label">
				<span>인증번호가 발송되었습니다.</span>
			</Label>
			<Button className="button" onClick={onCloseModal}>
				확인
			</Button>
		</Modal>
	);
};

export default AuthModal;
