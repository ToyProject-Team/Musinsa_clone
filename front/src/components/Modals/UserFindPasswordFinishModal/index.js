import Modal from 'components/Modals/Modal';
import { Button, Content, List, Title, RestText } from 'components/Modals/Modal/style';
import React from 'react';
import { Link } from 'react-router-dom';

const UserFindPasswordFinishModal = ({ show, onCloseModal, content, title, rest }) => {
	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<Title className="label" style={{ fontWeight: '900' }}>
				<span>{title}</span>
			</Title>
			<RestText>
				{rest}가 기억나지 않으세요?{' '}
				<Link to={rest === '비밀번호' ? '/find/password' : '/find/id'} onClick={onCloseModal}>
					{rest} 찾기
				</Link>
			</RestText>
			<Link to="/login">
				<Button className="button" onClick={onCloseModal}>
					로그인
				</Button>
			</Link>
		</Modal>
	);
};

export default UserFindPasswordFinishModal;
