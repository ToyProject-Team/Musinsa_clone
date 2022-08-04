import './App.css';
import { BrowserRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Main = loadable(() => import('pages/Main'), {
	fallback: <div>로딩중</div>,
});
const LogIn = loadable(() => import('pages/Login'), {
	fallback: <div>로딩중</div>,
});
<<<<<<< HEAD
const Detail = loadable(() => import('pages/Dtail'), {
	fallback: <div>로딩중</div>,
});
const MyPage = loadable(() => import('pages/Mypage'), {
	fallback: <div>로딩중</div>,
});

const Like = loadable(() => import('pages/Like'), {
	fallback: <div>로딩중</div>,
});

const Cart = loadable(() => import('pages/Cart'), {
=======
const SignUp = loadable(() => import('pages/Signup'), {
	fallback: <div>로딩중</div>,
});
const Detail = loadable(() => import('pages/Detail'), {
	fallback: <div>로딩중</div>,
});
const MyPage = loadable(() => import('pages/Mypage'), {
>>>>>>> a1b58fe9ee58b79f0e2e379ec30e6b72e204aa6d
	fallback: <div>로딩중</div>,
});

function App() {
	return (
		<BrowserRouter>
			<Routes>
<<<<<<< HEAD
				<Route path="/" element={<Main />} /> {/* => 메인페이지 */}
				<Route path="login/*" element={<LogIn />} /> {/* => 로그인페이지 */}
				<Route path="detail/*" element={<Detail />} /> {/* => 상세페이지 */}
				<Route path="mypage/*" element={<MyPage />} /> {/* => 마이페이지 */}
				<Route path="like/*" element={<Like />} /> {/* => 좋아요 */}
				<Route path="cart/*" element={<Cart />} /> {/* => 장바구니 */}
=======
				<Route path="/" element={<Main />} /> {/* => 메인 페이지 */}
				<Route path="login/*" element={<LogIn />} /> {/* => 로그인 페이지 */}
				<Route path="signup" element={<SignUp />} /> {/* => 회원가입 페이지 */}
				<Route path="detail/*" element={<Detail />} /> {/* => 상세 페이지 */}
				<Route path="mypage/*" element={<MyPage />} /> {/* => 마이 페이지 */}
>>>>>>> a1b58fe9ee58b79f0e2e379ec30e6b72e204aa6d
			</Routes>
		</BrowserRouter>
	);
}

export default App;
