export const authError = err => {
	switch (err.response.status) {
		case 400:
			return alert('이메일 인증 또는 휴대폰 인증이 완료되지 않은 사용자입니다');
		case 401:
			return alert('해당 휴대폰 번호를 가진 유저의 조회 결과가 없습니다');
		case 402:
			return alert('이미 사용중인 이메일 입니다.');
		case 500:
			return alert('서버에러');
		default:
			console.error(err);
			break;
	}
};
