import React, { useEffect, useState } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { withStyles, Box, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useSendAuthMail, useCheckAuthMail } from '../MVVM/ViewModel/UserViewModel';
import { API_URL } from '../CommonVariable';

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

function IdFind({ history }) {
	const [email, setEmail] = useState("");
	const [isSend, setIsSend] = useState(false); // 이메일 인증 메일이 발송되었는지 여부
	const [isMailAuth, setisMailAuth] = useState(false); // 이메일 인증 완료 여부
	const [authNum, setAuthNum] = useState(""); // 입력된 인증번호
	const authMailSend = useSendAuthMail();
	const authMailCheck = useCheckAuthMail();
	useEffect(() => {
		if (isMailAuth) {
			axios.get(`${API_URL}/authmail/id/${email}`).then((res) => {
				const { result } = res.data;
				if (result) { alert("아이디가 메일로 발송되었습니다."); } else { alert("메일 전송에 실패했습니다. 다시 시도해주세요"); }
			});
			history.push('/login');
		}
	}, [isMailAuth]);
	const authMailSendHandler = async () => { // mail 전송
		const result = await authMailSend(email, 1);
		// TODO: 가입되지 않은 사용자입니다. 새로 가입해주세요 추가해야함
		if (!result) { alert('인증 메일 전송에 실패했습니다. 다시 한 번 시도해주세요'); } else { alert('인증 메일이 전송되었습니다. 메일함을 확인해주세요'); }
		setIsSend(result);
	};
	const authMailCheckHandler = async () => { // email 인증번호 맞게 입력했는지 확인
		const result = await authMailCheck(email, authNum);
		console.log(result);
		if (result) { alert('인증에 성공했습니다.'); } else { alert('인증번호가 올바르지 않습니다. 다시 한 번 확인해주세요'); }
		setisMailAuth(result);
	};
	return (
		<div className="pw-find">
			<div className="wrap">
				<div className="title">
					<div>아이디 찾기</div>
					<LockOpenIcon className="lock-icon" />
				</div>
				<div className="process">
					<div className="highlight">이메일 인증</div>
				</div>
			</div>
			<div className="line" />
			{/* // TODO : 메일 적는 인풋, 버튼 만들고 누르면 메일로 아이디 전송되거나 / 해당 이메일로 가입된 아이디가 없습니다 뜨게 만들기 */}
			<div className="pw-find-auth">
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
			</div>
		</div>
	);
}
export default IdFind;
