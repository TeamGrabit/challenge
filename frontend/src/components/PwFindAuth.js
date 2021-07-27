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

const isEmail = (email) => {
	const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
	return emailRegex.test(email);
};

function PwFindAuth({ setStatus, user_id, setUserId }) {
	const [email, setEmail] = useState("");
	const [isSend, setIsSend] = useState(false); // 이메일 인증 메일이 발송되었는지 여부
	const [isMailAuth, setisMailAuth] = useState(false); // 이메일 인증 완료 여부
	const [authNum, setAuthNum] = useState(""); // 입력된 인증번호
	const authMailSend = useSendAuthMail();
	const authMailCheck = useCheckAuthMail();
	const authMailSendHandler = async () => { // mail 전송
		const result = await authMailSend(email, user_id, 1);
		console.log(result);
		// TODO: 가입되지 않은 사용자입니다. 새로 가입해주세요 추가해야함
		if (!result) { alert('인증 메일 전송에 실패했습니다. 다시 한 번 시도해주세요'); } else { alert('인증 메일이 전송되었습니다. 메일함을 확인해주세요'); }
		setIsSend(result);
	};
	const authMailCheckHandler = async () => { // email 인증번호 맞게 입력했는지 확인
		const result = await authMailCheck(email, authNum);
		if (result) { alert('인증에 성공했습니다.'); } else { alert('인증번호가 올바르지 않습니다. 다시 한 번 확인해주세요'); }
		setisMailAuth(result);
		setStatus(result);
	};
	return (
		<div className="pw-find-auth">
			<Box mt={2}>
				<div className="text">아이디</div>
				<CssTextField
					required
					name="id"
					variant="outlined"
					label="id"
					placeholder="아이디를 입력하세요"
					value={user_id}
					onChange={(e) => setUserId(e.target.value)}
					disabled={isMailAuth}
				/>
			</Box>
			<Box mt={2}>
				<div className="text">가입 이메일</div>
				<CssTextField
					required
					name="email"
					variant="outlined"
					label="email"
					placeholder="email을 입력하세요"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isMailAuth}
					error={email.length > 0 && !isEmail(email)}
				/>

				<Button
					className="btn"
					variant="contained"
					onClick={authMailSendHandler}
				>
					인증 하기
				</Button>

			</Box>
			{isSend ?
				<Box mt={2}>
					<div className="text">인증번호</div>
					<CssTextField
						required
						name="email"
						variant="outlined"
						label="인증번호"
						placeholder="인증번호를 입력하세요"
						value={authNum}
						disabled={isMailAuth}
						onChange={(e) => setAuthNum(e.target.value)}
					/>
					<Button
						className="btn"
						variant="contained"
						onClick={authMailCheckHandler}
						disabled={isMailAuth}
					>
						인증 완료
					</Button>
				</Box>
				:
				null}
		</div>);
}
export default PwFindAuth;
