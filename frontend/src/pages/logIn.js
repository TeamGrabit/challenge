import React from 'react';
import LogInForm from '../components/logInForm';

function LogIn() {
	return (
		<div className="login">
			<div className="form">
				<LogInForm />
			</div>
			<div className="appendix">
				<a className="text" href="/FindPw">비밀번호가 기억이 안나십니까?</a>
				<a className="text" href="/Join">저희 사이트가 처음이시라구요?</a>
			</div>
		</div>

	);
}

export default LogIn;
