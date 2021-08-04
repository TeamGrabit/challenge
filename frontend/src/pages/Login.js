import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LogInForm } from '../components';
import { useLoginUser } from '../MVVM/ViewModel/UserViewModel';

function LogIn({ history }) {
	const [id, setId] = useState("");
	const [pw, setPw] = useState("");
	const userLogin = useLoginUser();
	const loginHandler = async () => {
		const status = await userLogin(id, pw);
		console.log(status);
		if (status) {
			history.push('/challenge');
		} else {
			alert('로그인 실패');
		}
	};
	return (
		<div className="login">
			<LogInForm loginHandler={loginHandler} id={id} setId={setId} pw={pw} setPw={setPw} />
			<div className="appendix">
				<a className="text" href="/findid">아이디 찾기</a>
				<a className="text" href="/findpw">비밀번호 찾기</a>
				<a className="text" href="/register">회원가입</a>
			</div>
		</div>
	);
}

export default withRouter(LogIn);
