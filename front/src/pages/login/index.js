import React from 'react';
import {
	Container,
	LoginSection,
	Header,
	Form,
	Input,
	Button,
	AutoLogin,
	FindLogin,
	KakaoLogIn,
	LinkContainer,
	Signup,
} from 'pages/login/styles';

const LogIn = () => {
	return (
		<Container>
			<LoginSection>
				<Header>로그인</Header>
				<Form>
					<div>
						<Input>아이디</Input>
						<Input>비밀번호</Input>
						<Button>로그인</Button>
					</div>
					<div>
						<AutoLogin></AutoLogin>
						<FindLogin>
							<span>아이디 찾기</span>
							<span>비밀번호 찾기</span>
						</FindLogin>
					</div>
					<div>
						<KakaoLogIn></KakaoLogIn>
					</div>
				</Form>
				<LinkContainer>
					<Signup href="/signup">회원가입</Signup>
				</LinkContainer>
			</LoginSection>
		</Container>
	);
};

export default LogIn;
