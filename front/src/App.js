import './App.css';
import { BrowserRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Main = loadable(() => import('pages/Main'), {
	fallback: <div>로딩중</div>,
});
const LogIn = loadable(() => import('pages/Login'), {
	fallback: <div>로딩중</div>,
});
const Detail = loadable(() => import('pages/Dtail'), {
	fallback: <div>로딩중</div>,
});
const MyPage = loadable(() => import('pages/Mypage'), {
	fallback: <div>로딩중</div>,
});

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} /> {/* => 메인페이지 */}
				<Route path="login/*" element={<LogIn />} /> {/* => 로그인페이지 */}
				<Route path="detail/*" element={<Detail />} /> {/* => 상세페이지 */}
				<Route path="mypage/*" element={<MyPage />} /> {/* => 마이페이지 */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
