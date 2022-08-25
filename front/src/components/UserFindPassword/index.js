import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { Container, AuthInput, FindIdButton } from 'components/UserFindId/styles';
import useInput from 'hooks/useInput';

const UserFindPassword = () => {
	const [userId, onChangeUserId, setUserId] = useInput('');

	const onClickClear = useCallback(() => {
		setUserId('');
	}, []);

	const onClickCheckPassword = useCallback(() => {
		if (userId.length === 0) return;

		console.log(1);
	}, [userId]);

	return (
		<Container>
			<div>
				<div>
					<label style={{ display: 'inline-block', margin: '16px 0 8px' }}>
						비밀번호를 찾으려는 아이디
					</label>
					<AuthInput>
						<input type="text" value={userId} onChange={onChangeUserId} maxlength="20" />
						<button type="button" className="clearBtn" onClick={onClickClear}>
							<CancelIcon></CancelIcon>
						</button>
					</AuthInput>
				</div>
				<FindIdButton>
					<button
						type="button"
						onClick={onClickCheckPassword}
						className={userId.length > 0 && 'active'}
					>
						다음
						<LoadingIcon className="loading"></LoadingIcon>
					</button>
				</FindIdButton>
			</div>
		</Container>
	);
};

export default UserFindPassword;
