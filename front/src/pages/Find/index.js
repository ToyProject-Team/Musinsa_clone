import React from 'react';
import { Container, Header, Inner, Section, Menubar } from './styles';
import { ReactComponent as BackArrow } from 'assets/svg/BackArrow.svg';
import { NavLink } from 'react-router-dom';

const Find = ({ children, title }) => {
	return (
		<Container>
			<Inner>
				<Header>
					<div>
						<h2>아이디 찾기</h2>
						<div>
							<button class="back">
								<span>이전 페이지로 이동</span>
								<BackArrow></BackArrow>
							</button>
						</div>
					</div>
				</Header>
				<Section>
					<Menubar aria-label="찾을 대상">
						<NavLink to="/find/id">아이디 찾기</NavLink>
						<NavLink to="/find/password">비밀번호 찾기</NavLink>
					</Menubar>
					{children}
				</Section>
			</Inner>
		</Container>
	);
};

export default Find;
