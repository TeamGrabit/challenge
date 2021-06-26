import React, { useState } from 'react';
import { withStyles, Box, Button, TextField } from '@material-ui/core';

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

function RegisterForm({ changeStatus }) {
	const isEmail = (email) => {
		const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

		return emailRegex.test(email);
	};
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		id: "",
		pw: "",
		githubId: "",
	});
	const [validPw, setValidPw] = useState("");
	const updateField = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="register-form">
			<div className="wrap-form">
				<Box mt={2}>
					<CssTextField
						required
						name="name"
						variant="outlined"
						label="이름"
						placeholder="이름을 입력하세요"
						value={userInfo.name}
						onChange={updateField}
					/>
				</Box>
				<Box mt={2}>
					<CssTextField
						required
						name="email"
						variant="outlined"
						label="email"
						placeholder="email을 입력하세요"
						value={userInfo.email}
						onChange={updateField}
						error={!isEmail(userInfo.email)}
						// helperText="이메일 형식을 맞춰주세요"
					/>
					<Button
						className="btn"
						variant="contained"
					>
						인증하기
					</Button>
				</Box>
				<Box mt={2}>
					<CssTextField
						required
						name="id"
						variant="outlined"
						label="ID"
						placeholder="아이디를 입력하세요"
						value={userInfo.id}
						onChange={updateField}
					/>
					<Button
						className="btn"
						variant="contained"
					>
						중복확인
					</Button>
				</Box>
				<Box mt={2}>
					<CssTextField
						required
						name="pw"
						variant="outlined"
						label="PW"
						type="password"
						placeholder="비밀번호를 입력하세요"
						value={userInfo.pw}
						onChange={updateField}
					/>
				</Box>
				<Box mt={2}>
					<CssTextField
						required
						variant="outlined"
						label="PW 확인"
						type="password"
						placeholder="비밀번호를 한번 더 입력하세요"
						value={validPw}
						onChange={(e) => setValidPw(e.target.value)}
						error={!(validPw === userInfo.pw)}
						helperText="위와 동일하게 입력해주세요"
					/>
				</Box>
				<Box mt={2}>
					<CssTextField
						required
						name="githubId"
						variant="outlined"
						label="Github ID"
						placeholder="Github ID를 입력하세요"
						value={userInfo.githubId}
						onChange={updateField}
					/>
				</Box>
			</div>
			<div className="wrap-btn">
				<Button
					className="btn"
					variant="contained"
					onClick={() => changeStatus(0)}
				>
					이전단계
				</Button>
				<Button
					className="btn"
					variant="contained"
				// onClick={() => changeStatus(1)}
				// disabled={!checked}
				>
					가입완료
				</Button>
			</div>
		</div>
	);
}

export default RegisterForm;
