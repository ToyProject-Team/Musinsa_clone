import './App.css';
import { BrowserRouter, Routes, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable(() => import('./pages/login/index.js'));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LogIn />} /> {/* => 메인페이지 */}
				<Route path="login/*" element={<LogIn />} />
				<Route path="" element={<LogIn />} /> {/* => 상세페이지 */}
				<Route path="" element={<LogIn />} /> {/* => 마이페이지 */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
