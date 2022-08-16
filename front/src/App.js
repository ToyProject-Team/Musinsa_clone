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
const Detail = loadable(() => import('pages/Dtail'), {
	fallback: <div>로딩중</div>,
});
const MyPage = loadable(() => import('pages/Mypage'), {
	fallback: <div>로딩중</div>,
});

const SignUp = loadable(() => import('pages/Signup'), {
	fallback: <div>로딩중</div>,
});

const Order = loadable(() => import('pages/Order'), {
	fallback: <div>로딩중</div>,
});

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} /> {/* => 메인페이지 */}
					<Route path="login/*" element={<LogIn />} /> {/* => 로그인페이지 */}
					<Route path="detail/*" element={<Detail />} /> {/* => 상세페이지 */}
					<Route path="mypage/*" element={<MyPage />} /> {/* => 마이페이지 */}
					<Route path="signup" element={<SignUp />} /> {/* => 회원가입 페이지 */}
					<Route path="order" element={<Order />} /> {/* => 결제 페이지 */}
					<Route path="api/*" element={<LogIn />} /> {/* => 로그인페이지 */}
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
