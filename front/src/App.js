import './App.css';
import { BrowserRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Main = loadable(() => import('pages/main'), {
	fallback: <div>로딩중</div>,
});
const LogIn = loadable(() => import('pages/login'), {
	fallback: <div>로딩중</div>,
});
const SignUp = loadable(() => import('pages/Signup'), {
	fallback: <div>로딩중</div>,
});
const Detail = loadable(() => import('pages/detail'), {
	fallback: <div>로딩중</div>,
});
const MyPage = loadable(() => import('pages/mypage'), {
	fallback: <div>로딩중</div>,
});

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} /> {/* => 메인 페이지 */}
				<Route path="login/*" element={<LogIn />} /> {/* => 로그인 페이지 */}
				<Route path="signup" element={<SignUp />} /> {/* => 회원가입 페이지 */}
				<Route path="detail/*" element={<Detail />} /> {/* => 상세 페이지 */}
				<Route path="mypage/*" element={<MyPage />} /> {/* => 마이 페이지 */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
