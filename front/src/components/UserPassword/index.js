import React, { useCallback } from 'react';
import { LoginContainer, LookButton } from './styles';

const UserPassword = ({ props, look, dom }) => {
	const { password, onChangePassword, setPassword } = props;
	const { passwordLookButton, setPasswordLookButton } = look;
	const { passwordRef } = dom;

	// input clear button
	const onClickClear = useCallback(() => {
		setPassword('');
	}, [setPassword]);

	// password input look
	const onClickLookPassword = useCallback(() => {
		setPasswordLookButton(v => !v);

		if (passwordLookButton) passwordRef.current.type = 'password';
		else passwordRef.current.type = 'text';
	}, [passwordLookButton]);

	return (
		<LoginContainer>
			<div>
				<input
					className={passwordLookButton ? 'look' : ''}
					type="password"
					value={password}
					onChange={onChangePassword}
					ref={passwordRef}
					placeholder="비밀번호"
				/>
				{password.length > 0 && (
					<button type="button" onClick={() => onClickClear('password')}>
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
				<LookButton
					className={passwordLookButton ? 'look' : ''}
					type="button"
					aria-label="비밀번호 보이기"
					onClick={onClickLookPassword}
				></LookButton>
			</div>
		</LoginContainer>
	);
};

export default UserPassword;
