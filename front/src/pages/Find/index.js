import React from 'react';
import { Container, Header, Inner, Section, Menubar } from './styles';
import { ReactComponent as BackArrow } from 'assets/svg/BackArrow.svg';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import loadable from '@loadable/component';

const FindId = loadable(() => import('components/UserFindId'), {
	fallback: <div>로딩중</div>,
});

const FindPassword = loadable(() => import('components/UserFindPassword'), {
	fallback: <div>로딩중</div>,
});

const Find = () => {
	const titleArray = ['아이디 찾기', '비밀번호 찾기'];
	const pageURL = Object.values(useParams())[0];

	return (
		<Container>
			<Inner>
				<Header>
					<div>
						<h2>{pageURL === 'id' ? titleArray[0] : titleArray[1]}</h2>
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

					<Routes>
						<Route path="/id" element={<FindId />} /> {/* id 찾기 */}
						<Route path="/password" element={<FindPassword />} /> {/* 패스워드 찾기 */}
					</Routes>
				</Section>
			</Inner>
		</Container>
	);
};

export default Find;
