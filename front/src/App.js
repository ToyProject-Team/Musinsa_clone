import './App.css';
import { BrowserRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { UserProvider } from 'context/UserContext';

const Main = loadable(() => import('pages/Main'), {
	fallback: <div>로딩중</div>,
});
const LogIn = loadable(() => import('pages/Login'), {
	fallback: <div>로딩중</div>,
});
const SignUp = loadable(() => import('pages/Signup'), {
	fallback: <div>로딩중</div>,
});
const Find = loadable(() => import('pages/Find'), {
	fallback: <div>로딩중</div>,
});

const Dtail = loadable(() => import('pages/Dtail'), {
	fallback: <div>로딩중</div>,
});
const MyPage = loadable(() => import('pages/Mypage'), {
	fallback: <div>로딩중</div>,
});

const Agree = loadable(() => import('contract/Agree'), {
	fallback: <div>로딩중</div>,
});

const Terms = loadable(() => import('contract/Terms'), {
	fallback: <div>로딩중</div>,
});

const Sns = loadable(() => import('contract/Sns'), {
	fallback: <div>로딩중</div>,
});

const Kakao = loadable(() => import('pages/Kakao'), {
	fallback: <div>로딩중</div>,
});

const Notice = loadable(() => import('contract/Footer/Notice'), {
	fallback: <div>로딩중</div>,
});

const Declar = loadable(() => import('contract/Footer/Declar'), {
	fallback: <div>로딩중</div>,
});

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route exact path="/*" element={<Main />} /> {/* => 메인페이지 */}
					<Route path="login/*" element={<LogIn />} /> {/* => 로그인페이지 */}
					<Route path="signup" element={<SignUp />} /> {/* => 회원가입 페이지 */}
					<Route path="find/*" element={<Find />} /> {/* => 아이디 패스워드 찾기 페이지 */}
					<Route path="detail/*" element={<Dtail />} /> {/* => 상세페이지 */}
					<Route path="mypage/*" element={<MyPage />} /> {/* => 마이페이지 */}
					<Route path="kakao/oauth/callback" element={<Kakao />} /> {/* => 카카오 로그인 페이지 */}
					{/* 이용 약관 페이지 */}
					<Route path="signup/agreement/agree" element={<Agree />} />
					<Route path="signup/agreement/terms" element={<Terms />} />
					<Route path="signup/agreement/sns" element={<Sns />} />
					{/* 공용 컴포넌트 */}
					<Route path="footer/notice" element={<Notice />} />
					<Route path="footer/declar" element={<Declar />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
