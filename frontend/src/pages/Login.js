import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LogInForm } from '../components';
import { useLoginUser } from '../MVVM/ViewModel/UserViewModel';

function LogIn({ history }) {
	const [id, setId] = useState(123);
	const [pw, setPw] = useState(123);
	const userLogin = useLoginUser();
	const loginHandler = async () => {
		const status = await userLogin(id, pw);
		if (status) {
			history.push('/challenge/ing');
		} else {
			alert('로그인 실패');
		}
	};
	return (
		<div className="login">
			<LogInForm loginHandler={loginHandler} />
			<div className="appendix">
				<a className="text" href="/findpw">비밀번호가 기억이 안나십니까?</a>
				<a className="text" href="/register">저희 사이트가 처음이시라구요?</a>
			</div>
		</div>
	);
}

export default withRouter(LogIn);
