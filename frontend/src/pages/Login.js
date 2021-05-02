import React, { useState } from 'react';
import LogInForm from '../components/logInForm';
import { useLoginUser } from '../MVVM/ViewModel/UserViewModel';

function LogIn() {
  const [id, setId] = useState(123);
	const [pw, setPw] = useState(123);
	const userLogin = useLoginUser();
	const loginHandler = () => {
		userLogin(id, pw);
	};
	return (
		<div className="login">
			<LogInForm />
			<div className="appendix">
				<a className="text" href="/findpw">비밀번호가 기억이 안나십니까?</a>
				<a className="text" href="/register">저희 사이트가 처음이시라구요?</a>
			</div>
		</div>
	);
}

export default LogIn;
