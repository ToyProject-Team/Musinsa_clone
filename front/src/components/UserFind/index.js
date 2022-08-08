import React, { useCallback } from 'react';
import { SignupContainer } from './styles';

const UserFind = () => {
	const onSubmitForm = useCallback(e => {
		e.preventDefault();
		console.log(e);
	}, []);

	return (
		<>
			<SignupContainer>
				<label>
					질문/답변
					<span>필수 입력</span>
				</label>
				<div class="login-input__wrap select-container">
					<select name="dlv_selectbox">
						<option value="나의 보물 1호는?">나의 보물 1호는?</option>
						<option value="가장 좋아하는 프로그래밍은?">가장 좋아하는 프로그래밍은?</option>
						<option value="하루에 공부하는 시간은?">하루에 공부하는 시간은?</option>
						<option value="강아지 이름은?">강아지 이름은?</option>
						<option value="미래의 나의 꿈은?">미래의 나의 꿈은?</option>
						<option value="더 배워 보고싶은 기술은?">더 배워 보고싶은 기술은?</option>
					</select>
				</div>
			</SignupContainer>
			<SignupContainer>
				<div class="login-input__wrap">
					<input placeholder="답변" maxlength="30" type="text" />
					<button type="button">
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>입력한 내용 삭제</title>
							<circle cx="10" cy="10" r="10" fill="#B3B3B3"></circle>
							<path
								d="M5.52786 5.52742L14.4722 14.4718M14.4722 5.52734L5.52783 14.4717"
								stroke="white"
							></path>
						</svg>
					</button>
				</div>
				<p>답변이 올바르지 않습니다.</p>
			</SignupContainer>
		</>
	);
};

export default UserFind;
