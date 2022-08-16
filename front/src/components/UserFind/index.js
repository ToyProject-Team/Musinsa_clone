import UserEmail from 'components/UserEmail';
import React, { useCallback } from 'react';
import { SignupContainer } from './styles';

const UserFind = ({ props }) => {
	const { answer, onChangeAnswer, setAnswer, onChangeQuestion } = props;

	return (
		<>
			<SignupContainer>
				<label>
					질문/답변
					<span>필수 입력</span>
				</label>
				<div className="login-input__wrap select-container">
					<select name="dlv_selectbox" onChange={onChangeQuestion}>
						<option value="1">나의 보물 1호는?</option>
						<option value="2">가장 좋아하는 프로그래밍은?</option>
						<option value="3">하루에 공부하는 시간은?</option>
						<option value="4">강아지 이름은?</option>
						<option value="5">미래의 나의 꿈은?</option>
						<option value="6">더 배워 보고싶은 기술은?</option>
					</select>
				</div>
			</SignupContainer>
			<UserEmail
				email={answer}
				setEmail={setAnswer}
				onChangeEmail={onChangeAnswer}
				placeholder="답변"
				title={false}
			></UserEmail>
		</>
	);
};

export default UserFind;
