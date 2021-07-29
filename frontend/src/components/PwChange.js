import React, { useState } from 'react';
import { withStyles, Box, Button, TextField } from '@material-ui/core';
import { useChangePw } from '../MVVM/ViewModel/UserViewModel';

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

function PwChange({ history, user_id }) {
	const [password, setPw] = useState("");
	const [pwCheck, setPwCheck] = useState("");
	const changePw = useChangePw();
	const submitHandler = async () => {
		if (password.length === 0 || password !== pwCheck) { alert("올바르지 않은 입력입니다.\n입력을 다시 한 번 확인해주세요."); } else {
			// pw change viewmodel 함수 호출
			console.log(user_id, password);
			const result = changePw(user_id, password);
			if (result) {
				alert('비밀번호가 정상적으로 변경되었습니다.');
				history.push('/login');
			} else alert('비밀번호 변경에 실패했습니다.');
		}
	};
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
						error={password.length > 0 && password !== pwCheck}
					/>
					<Button
						className="btn"
						onClick={submitHandler}
					>
						변경하기
					</Button>
				</Box>
			</div>
		</div>);
}
export default PwChange;
