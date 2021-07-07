import React, { useState } from 'react';
import { withStyles, Box, Button, TextField } from '@material-ui/core';
import { useSendAuthMail, useCheckAuthMail, useCheckUniqueId, useSignUpUser } from '../MVVM/ViewModel/UserViewModel';

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

function RegisterForm({ changeStatus }) {
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		id: "",
		pw: "",
		githubId: "",
	});
	const [isSend, setIsSend] = useState(false); // 이메일 인증 메일이 발송되었는지 여부
	const [isMailAuth, setisMailAuth] = useState(false); // 이메일 인증 완료 여부
	const [authNum, setAuthNum] = useState(""); // 입력된 인증번호
	const [validPw, setValidPw] = useState(""); // 비밀번호 확인 란 value 담는 state
	const [isIdUnique, setIsIdUnique] = useState(false); // ID 중복 확인 여부
	const authMailSend = useSendAuthMail();
	const authMailCheck = useCheckAuthMail();
	const uniqueIdCheck = useCheckUniqueId();
	const signUpUser = useSignUpUser();

	const updateField = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value
		});
	};
	const idCheckHandler = async () => { // ID 중복 체크 확인
		const result = await uniqueIdCheck(userInfo.id);
		if (result) { alert('사용 가능한 id입니다.'); } else { alert('이미 존재하는 id입니다. 새로 입력해주세요'); }
		setIsIdUnique(result);
	};
	const authMailSendHandler = async () => { // mail 전송
		const result = await authMailSend(userInfo.email);
		console.log(result);
		if (!result) { alert('인증 메일 전송에 실패했습니다. 다시 한 번 시도해주세요'); } else { alert('인증 메일이 전송되었습니다. 메일함을 확인해주세요'); }
		setIsSend(result);
	};
	const authMailCheckHandler = async () => { // email 인증번호 맞게 입력했는지 확인
		const result = await authMailCheck(userInfo.email, authNum);
		if (result) { alert('인증에 성공했습니다.'); } else { alert('인증번호가 올바르지 않습니다. 다시 한 번 확인해주세요'); }
		console.log(result);
		setisMailAuth(result);
	};
	const check = () => {
		let message = "";
		// 이메일 인증 완료 확인
		if (!isMailAuth) message = "이메일 인증을 완료해주세요";
		// ID 중복 확인
		if (!isIdUnique) message = "ID 중복 확인을 완료해주세요";
		// pw 두개 똑같이 입력했는지 확인
		if (!(validPw === userInfo.pw)) message = "비밀번호, 비밀번호 확인란을 동일하게 입력해주세요";
		// 이메일 양식 확인
		if (!isEmail(userInfo.email)) message = "이메일을 올바르게 입력해주세요";
		// 폼이 다 채워졌는지 확인
		if (Object.keys(userInfo).find((key) => userInfo[key] === "")) message = "입력 란을 모두 채워주세요";

		return message;
	};
	const submitHandler = async () => {
		console.log("submit");
		// 폼이 다 채워졌는지 확인
		const message = check();
		if (message === "") {
			// 회원가입 back api 호출
			const result = await signUpUser(userInfo);
			if (!result) { alert("회원가입 실패"); }
			// 응답 받아서 회원가입 성공했으면 완료 페이지로 보내기
			changeStatus(2);
		} else {
			alert(message);
		}
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
						disabled={isMailAuth}
						error={!isEmail(userInfo.email)}
						helperText="이메일 형식을 맞춰주세요"
					/>
					{!isSend ?
						<Button
							className="btn"
							variant="contained"
							onClick={authMailSendHandler}
						>
							인증 하기
						</Button>
						:
						null}
				</Box>
				{isSend ?
					<Box mt={2}>
						<CssTextField
							required
							name="email"
							variant="outlined"
							label="인증번호"
							placeholder="인증번호를 입력하세요"
							helperText="이메일로 전송된 인증번호를 입력하세요"
							value={authNum}
							disabled={isMailAuth}
							onChange={(e) => setAuthNum(e.target.value)}
						/>
						<Button
							className="btn-nextHelper"
							variant="contained"
							onClick={authMailCheckHandler}
							disabled={isMailAuth}
						>
							인증 완료
						</Button>
					</Box>
					:
					null}

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
						onClick={idCheckHandler}
					>
						중복 확인
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
						onClick={submitHandler}
					>
						가입완료
					</Button>
				</div>
			</div>
		</div>
	);
}

export default RegisterForm;
