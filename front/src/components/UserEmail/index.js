import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LoginContainer } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';

const UserEmail = ({ email, setEmail, onChangeEmail, placeholder, title }) => {
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
				{title && (
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
					{email?.length > 0 && (
						<button type="button" onClick={() => onClickClear()}>
							<CancelIcon />
						</button>
					)}
				</div>
				{signUpPage && <p>아이디는 필수정보 입니다.</p>}
			</LoginContainer>
		</>
	);
};

export default UserEmail;
