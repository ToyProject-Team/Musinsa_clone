import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { Container, AuthInput, FindIdButton } from 'components/FindPage/UserFindAuth/styles';
import useInput from 'hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { INIT, useUserFindDispatch, useUserFindState } from 'context/UserFindContext';
import { PostApi } from 'utils/api';

const UserFindPassword = () => {
	const userFind = useUserFindState();
	const dispatch = useUserFindDispatch();

	// useContext 초기화
	useEffect(() => {
		dispatch({ type: INIT });
	}, []);

	const navigate = useNavigate();

	const [userId, onChangeUserId, setUserId] = useInput('');
	const [passwordButtonLoading, setPasswordButtonLoading] = useState(false);

	const onClickClear = useCallback(() => {
		setUserId('');
	}, []);

	const onClickCheckPassword = useCallback(async () => {
		if (userId.length === 0) return;

		try {
			const params = {
				loginId: userId,
			};
			const result = await PostApi('/api/auth/isExistedLoginId', params);
			let token = result.data.loginIdCheckToken;

			localStorage.setItem('userId', userId);

			navigate(`choice?token=${token}`);
		} catch (error) {
			alert('회원정보가 없습니다.');
			console.log(error);
		}
	}, [userId]);

	// key 이벤트
	const onKeyUp = useCallback(
		e => {
			if (e.keyCode === 13) onClickCheckPassword();
		},
		[userId],
	);

	return (
		<Container>
			<div>
				<div>
					<label style={{ display: 'inline-block', margin: '16px 0 8px' }}>
						비밀번호를 찾으려는 아이디
					</label>
					<AuthInput>
						<input
							type="text"
							value={userId}
							onChange={onChangeUserId}
							maxlength="20"
							onKeyUp={onKeyUp}
						/>
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
						{passwordButtonLoading && <LoadingIcon className="loading"></LoadingIcon>}
					</button>
				</FindIdButton>
			</div>
		</Container>
	);
};

export default UserFindPassword;
