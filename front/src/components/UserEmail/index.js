import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LoginContainer } from './styles';

const UserEmail = ({ props, placeholder }) => {
	const { email, onChangeEmail, setEmail } = props;

	const [signUpPage, setSignUpPage] = useState(
		window.location.pathname === '/login' ? false : true,
	);

	// input clear button
	const onClickClear = useCallback(() => {
		setEmail('');
	}, [setEmail]);

	return (
		<>
			<LoginContainer>
				{signUpPage && (
					<label>
						아이디
						<span>필수 입력</span>
					</label>
				)}
				<div>
					<input
						className="email"
						value={email}
						onChange={onChangeEmail}
						placeholder={placeholder}
					/>
					{email.length > 0 && (
						<button type="button" onClick={() => onClickClear()}>
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
					)}
				</div>
				{signUpPage && <p>아이디는 필수정보 입니다.</p>}
			</LoginContainer>
		</>
	);
};

export default UserEmail;
