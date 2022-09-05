import Modal from 'components/Modals/Modal';
import { Button, Content, List, Title, RestText } from 'components/Modals/Modal/style';
import React from 'react';
import { Link } from 'react-router-dom';

const UserFindIdFinishModal = ({ show, onCloseModal, content, title, rest }) => {
	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<Title className="label">
				<span>{title}</span>
			</Title>
			<Content>
				회원님의 휴대전화로
				<br />
				가입된 아이디가 있습니다.
			</Content>
			<List>
				<li>
					<div className="list-id">{content}</div>
					<div className="list-auth">본인인증</div>
				</li>
			</List>
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

export default UserFindIdFinishModal;
