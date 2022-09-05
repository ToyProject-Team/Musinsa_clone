import React, { useCallback, useState } from 'react';
import { LoginContainer, LookButton } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';

const UserPassword = ({
	password,
	setPassword,
	onChange,
	onFocus,
	lookBtn,
	setLookBtn,
	dom,
	placeholder,
	title,
	reg,
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
			<div className={reg ? '' : 'danger-border'}>
				<input
					className={lookBtn ? 'look' : ''}
					type="password"
					value={password}
					onChange={onChange}
					onFocus={onFocus}
					ref={dom}
					placeholder={placeholder}
				/>
				{password?.length > 0 && (
					<button type="button" className="clearBtn" onClick={() => onClickClear('password')}>
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
		</LoginContainer>
	);
};

export default UserPassword;
