import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useLoginUser } from '../MVVM/ViewModel/UserViewModel';

function Login() {
	const [id, setId] = useState(123);
	const [pw, setPw] = useState(123);
	const userLogin = useLoginUser();
	const loginHandler = () => {
		userLogin(id, pw);
	};
	return (
		<>
			<Button variant="contained" onClick={loginHandler}>
				Login
			</Button>
		</>
	);
}

export default Login;
