import React from 'react';
import { Container, Header, Inner, Section, Menubar } from './styles';
import { ReactComponent as BackArrow } from 'assets/svg/BackArrow.svg';
import { Link, Navigate, NavLink, Route, Routes, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import { UserFindProvider } from 'context/UserFindContext';

const FindId = loadable(() => import('components/FindPage/UserFindId'), {
	fallback: <div>로딩중</div>,
});

const FindPassword = loadable(() => import('components/FindPage/UserFindPassword'), {
	fallback: <div>로딩중</div>,
});

const FindPasswordAuth = loadable(() => import('components/FindPage/UserFindPasswordAuth'), {
	fallback: <div>로딩중</div>,
});

const Find = () => {
	const titleArray = ['아이디 찾기', '비밀번호 찾기'];
	const pageURL = Object.values(useParams())[0];

	if (pageURL === '') {
		return <Navigate to="/find/id" />;
	}

	return (
		<UserFindProvider>
			<Container>
				<Inner>
					<Header>
						<div>
							<h2 style={{ fontWeight: '700' }}>
								{pageURL === 'id' ? titleArray[0] : titleArray[1]}
							</h2>
							<div>
								<Link to="/login">
									<button class="back">
										<span>이전 페이지로 이동</span>
										<BackArrow></BackArrow>
									</button>
								</Link>
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
							<Route exact path="/password" element={<FindPassword />} /> {/* 패스워드 찾기 */}
							<Route path="/password/choice" element={<FindPasswordAuth />} /> {/* 패스워드 찾기 */}
							<Route path="/password/change" element={<FindPasswordAuth />} /> {/* 패스워드 변경 */}
						</Routes>
					</Section>
				</Inner>
			</Container>
		</UserFindProvider>
	);
};

export default Find;
