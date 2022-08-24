import Modal from 'components/Modal';
import { Button, Label } from 'components/Modal/style';
import React from 'react';

const AuthModal = ({ show, onCloseModal, content }) => {
	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<Label className="label">
				<span>{content}</span>
			</Label>
			<Button className="button" onClick={onCloseModal}>
				확인
			</Button>
		</Modal>
	);
};

export default AuthModal;
