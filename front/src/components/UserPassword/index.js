import React, { useCallback, useState } from 'react';
import { LoginContainer, LookButton } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';

const UserPassword = ({
	password,
	setPassword,
	onChnage,
	lookBtn,
	setLookBtn,
	dom,
	reg,
	placeholder,
	title,
	validation,
}) => {
	// input clear button
	const onClickClear = useCallback(() => {
		setPassword('');
	}, [setPassword]);

	// password input look
	const onClickLookPassword = useCallback(() => {
		setLookBtn(v => !v);

		if (lookBtn) dom.current.type = 'password';
		else dom.current.type = 'text';
	}, [lookBtn]);

	return (
		<LoginContainer>
			{title && (
				<label>
					비밀번호
					<span>필수 입력</span>
				</label>
			)}
			<div>
				<input
					className={lookBtn ? 'look' : ''}
					type="password"
					value={password}
					onChange={onChnage}
					ref={dom}
					placeholder={placeholder}
				/>
				{password?.length > 0 && (
					<button type="button" onClick={() => onClickClear('password')}>
						<CancelIcon />
					</button>
				)}
				<LookButton
					className={lookBtn ? 'look' : ''}
					type="button"
					aria-label="비밀번호 보이기"
					onClick={onClickLookPassword}
				></LookButton>
			</div>

			{password.length > 0 && !reg && validation && title && (
				<p className="login-input__validation">8~30자 이내로 입력해 주십시오.</p>
			)}
			{password.length > 0 && !reg && validation && !title && (
				<p className="login-input__validation">비밀번호가 다릅니다.</p>
			)}
		</LoginContainer>
	);
};

export default UserPassword;
