import React from 'react';
import { TextField, Button } from '@material-ui/core';

function LogInForm() {
	return (
		<div className="logInForm">
			<TextField variant="outlined" label="ID" placeholder="아이디를 입력하세요" helperText="영문자/숫자, 5~10자 이내" />
			<TextField variant="outlined" label="PW" placeholder="비밀번호를 입력하세요" helperText="영문자/숫자/특수문자, 8~20자 이내" />
			<Button className="btn" variant="contained">LogIn</Button>
		</div>
	);
}

export default LogInForm;
