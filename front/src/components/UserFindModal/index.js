import Modal from 'components/Modal';
import { Button, Label } from 'components/Modal/style';
import UserFind from 'components/UserFind';
import useInput from 'hooks/useInput';
import React, { useCallback } from 'react';

const UserFindModal = ({ show, onCloseModal }) => {
	const [answer, onChangeAnswer, setAnswer] = useInput('');
	const [question, onChangeQuestion, setQuestion] = useInput('1');

	const onClickFind = useCallback(() => {
		console.log(1);
	}, []);

	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<UserFind
				props={{
					answer,
					onChangeAnswer,
					setAnswer,
					onChangeQuestion,
				}}
			></UserFind>
			<Button style={{ marginTop: '10px' }} className="button" onClick={onClickFind}>
				확인
			</Button>
		</Modal>
	);
};

export default UserFindModal;
