import React, { useState } from 'react';
import { withStyles, Box, Button, TextField } from '@material-ui/core';
import { useSendAuthMail, useCheckAuthMail } from '../MVVM/ViewModel/UserViewModel';

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#464E47',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#464E47',
			},
			'&:hover fieldset': {
				borderColor: '#96E6B3',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#96E6B3',
			},
		},
	},
})(TextField);

function PwChange() {
	const [password, setPw] = useState("");
	const [pwCheck, setPwCheck] = useState("");
	return (
		<div className="pw-change">
			<div>
				<Box mt={2}>
					<div className="text">비밀번호</div>
					<CssTextField
						required
						name="password"
						variant="outlined"
						label="비밀번호"
						placeholder="비밀번호를 입력하세요"
						type="password"
						value={password}
						onChange={(e) => setPw(e.target.value)}
						// disabled={isMailAuth}
						// error={!isEmail(email)}
					/>
				</Box>
				<Box mt={2}>
					<div className="text">
						비밀번호
						확인
					</div>
					<CssTextField
						required
						name="password-check"
						variant="outlined"
						label="비밀번호 확인"
						placeholder="비밀번호를 입력하세요"
						type="password"
						value={pwCheck}
						onChange={(e) => setPwCheck(e.target.value)}
						error={password !== pwCheck}
					/>
					<Button className="btn">변경하기</Button>
				</Box>
			</div>
		</div>);
}
export default PwChange;
