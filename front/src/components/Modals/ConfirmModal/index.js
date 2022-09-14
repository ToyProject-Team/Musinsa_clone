import Modal from 'components/Modals/Modal';
import { ButtonContainer, Button, Label } from 'components/Modals/Modal/style';
import React from 'react';

const ConfirmModal = ({ show, onCloseModal, onClickConfirm, content }) => {
	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<Label className="label">
				<span>{content}</span>
			</Label>
			<ButtonContainer>
				<Button className="button" onClick={onCloseModal}>
					취소
				</Button>
				<Button className="button" onClick={onClickConfirm}>
					확인
				</Button>
			</ButtonContainer>
		</Modal>
	);
};

export default ConfirmModal;
