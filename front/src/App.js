import './App.css';
import { BrowserRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Main = loadable(() => import('pages/Main'), {
	fallback: <div>로딩중</div>,
});
const LogIn = loadable(() => import('pages/login'), {
	fallback: <div>로딩중</div>,
});
const Dtail = loadable(() => import('pages/Dtail'), {
	fallback: <div>로딩중</div>,
});
const MyPage = loadable(() => import('pages/Mypage'), {
	fallback: <div>로딩중</div>,
});

const Like = loadable(() => import('pages/Like'), {
	fallback: <div>로딩중</div>,
});

const Cart = loadable(() => import('pages/Cart'), {
	fallback: <div>로딩중</div>,
});

const SignUp = loadable(() => import('pages/Signup'), {
	fallback: <div>로딩중</div>,
});

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} /> {/* => 메인페이지 */}
				<Route path="login/*" element={<LogIn />} /> {/* => 로그인페이지 */}
				<Route path="detail/*" element={<Dtail />} /> {/* => 상세페이지 */}
				<Route path="mypage/*" element={<MyPage />} /> {/* => 마이페이지 */}
				<Route path="like/*" element={<Like />} /> {/* => 좋아요 */}
				<Route path="cart/*" element={<Cart />} /> {/* => 장바구니 */}
				<Route path="signup" element={<SignUp />} /> {/* => 회원가입 페이지 */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
