import Modal from 'components/Modals/Modal';
import { Button, Label } from 'components/Modals/Modal/style';
import React from 'react';

const TextModal = ({ show, onCloseModal, content }) => {
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

export default TextModal;
