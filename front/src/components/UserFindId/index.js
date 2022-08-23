import React from 'react';
import { Container } from './styles';
import { ReactComponent as Cancel } from 'assets/svg/Cancel.svg';
import { ReactComponent as Loading } from 'assets/svg/Loading.svg';

const UserFindId = () => {
	return (
		<>
			<div id="tab-panel1" role="tabpanel" aria-labelledby="tab-button1">
				<div class="login-find-radio">
					<div class="login-find-radio__item">
						<div class="login-radio">
							<input
								type="radio"
								id="radioMobileNumber"
								class="blind login-radio__radio"
								name="findType"
							/>
							<label for="radioMobileNumber" class="login-radio__label">
								휴대전화
							</label>
						</div>
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
					</div>

					<div class="login-find-radio__item">
						<div class="login-radio">
							<input
								type="radio"
								id="radioEmail"
								class="blind login-radio__radio"
								name="findType"
							/>
							<label for="radioEmail" class="login-radio__label">
								이메일
							</label>
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
					</div>
				</div>

				<div class="login-button login-button--static">
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
			</div>
		</>
	);
};

export default UserFindId;
