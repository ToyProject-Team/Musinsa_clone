import React, { useCallback, useState } from 'react';
import { Container, RadioItem, RadioButton } from './styles';
import { ReactComponent as Cancel } from 'assets/svg/Cancel.svg';
import { ReactComponent as Loading } from 'assets/svg/Loading.svg';

const UserFindId = () => {
	const [auth, setAuth] = useState('emailAuth');

	const onChangeRadio = useCallback(
		e => {
			setAuth(e.target.value);
		},
		[auth],
	);

	return (
		<>
			<Container>
				<div>
					<RadioItem>
						<RadioButton>
							<label htmlFor="phoneAuth" className={auth === 'phoneAuth' && 'active'}>
								휴대폰
							</label>
							<input
								type="radio"
								value="phoneAuth"
								id="phoneAuth"
								onChange={onChangeRadio}
								name="auth"
							/>
						</RadioButton>
						<div>
							<div>
								<div>
									<input
										type="text"
										class="login-input__input"
										id="inputName"
										title="이름 입력"
										placeholder="이름"
									/>
									<button type="button" class="login-input__button-clear" id="inputNameClearButton">
										<Cancel></Cancel>
									</button>
								</div>
								<p class="login-input__validation" id="textValidInputName"></p>
							</div>
							<div class="login-input">
								<div class="login-input__wrap" id="inputMobileNumberLayer">
									<input
										type="tel"
										pattern="[0-9]*"
										inputmode="numberic"
										class="login-input__input"
										id="inputMobileNumber"
										title="휴대전화 입력 (번호만 입력)"
										placeholder="휴대전화 (-없이)"
										maxlength="11"
									/>
									<button
										type="button"
										class="login-input__button-clear"
										id="inputMobileNumberClearButton"
									>
										<Cancel></Cancel>
									</button>
									<button
										type="button"
										id="sendAuthCodeByMobileNumberButton"
										class="login-input__button-text"
									>
										인증 요청
										<Loading></Loading>
									</button>
								</div>
								<p class="login-input__validation" id="textValidInputMobileNumber"></p>
							</div>
							<div class="login-input">
								<div class="login-input__wrap" id="inputAuthCodeByMobileNumberLayer">
									<input
										type="number"
										pattern="[0-9]*"
										inputmode="numberic"
										class="login-input__input"
										title="인증번호 입력"
										placeholder="인증번호"
										id="inputAuthCodeByMobileNumber"
										maxlength="5"
									/>
									<button
										type="button"
										class="login-input__button-clear"
										id="inputAuthCodeByMobileNumberClearButton"
									>
										<Cancel></Cancel>
									</button>
								</div>
								<p class="login-input__validation" id="textValidInputAuthCodeByMobileNumber"></p>
							</div>
						</div>
					</RadioItem>

					<RadioItem>
						<div class="login-radio">
							<label htmlFor="emailAuth" className={auth === 'emailAuth' && 'active'}>
								이메일
							</label>
							<input
								type="radio"
								value="emailAuth"
								id="emailAuth"
								onChange={onChangeRadio}
								name="auth"
							/>
						</div>
						<div class="login-find-radio__details" id="findMemberIdEmailLayer">
							<div class="login-input">
								<div class="login-input__wrap" id="inputEmailLayer">
									<input
										type="email"
										class="login-input__input"
										title="이메일 입력"
										placeholder="이메일"
										id="inputEmail"
									/>
									<button
										type="button"
										class="login-input__button-clear"
										id="inputEmailClearButton"
									>
										<Cancel></Cancel>
									</button>
									<button
										type="button"
										id="sendAuthCodeByEmailButton"
										class="login-input__button-text"
									>
										인증 요청
										<Loading></Loading>
									</button>
								</div>
								<p class="login-input__validation" id="textValidInputEmail"></p>
							</div>
							<div class="login-input">
								<div class="login-input__wrap" id="inputAuthCodeByEmailLayer">
									<input
										type="number"
										pattern="[0-9]*"
										inputmode="numberic"
										class="login-input__input"
										title="인증번호 입력"
										placeholder="인증번호"
										id="inputAuthCodeByEmail"
										maxlength="5"
									/>
									<button
										type="button"
										class="login-input__button-clear"
										id="inputAuthCodeByEmailClearButton"
									>
										<Cancel></Cancel>
									</button>
								</div>
								<p class="login-input__validation" id="textValidInputAuthCodeByEmail"></p>
							</div>
						</div>
					</RadioItem>
				</div>

				<div>
					<button
						type="button"
						class="login-button__item login-button__item--blue"
						id="searchIdButton"
						disabled=""
					>
						아이디 찾기
						<Loading></Loading>
					</button>
				</div>
			</Container>
		</>
	);
};

export default UserFindId;
