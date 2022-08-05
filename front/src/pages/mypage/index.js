import React from 'react';
import MyHeader from 'components/mypage/header';
import MyMain from 'components/mypage/table';

const Mypage = () => {
	return (
		<div>
			<div>
				<MyHeader />
				<MyMain />
			</div>
		</div>
	);
};

export default Mypage;
