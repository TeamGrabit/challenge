import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Button, TextField, Select, MenuItem, useMediaQuery } from '@material-ui/core';
import { useUserState } from '../MVVM/Model/UserModel';
import { useCreateChallenge } from '../MVVM/ViewModel/ChallengeViewModel';

function ChallengeMake({ history }) {
	const user = useUserState();
	const createChallenge = useCreateChallenge();
	const today = new Date();
	const endday = new Date(2099, 11, 31);
	const [Name, setName] = useState("");
	const [Password, setPassword] = useState("");
	const [PWcheck, setPWcheck] = useState("");
	const [Category, setCategory] = useState("");
	const [CateSel, setCateSel] = useState("notsel");
	const [sDate, setsDate] = useState(today);
	const [eDate, seteDate] = useState(endday);
	const [Intro, setIntro] = useState("");
	const [dateRef, setDateRef] = useState(true);
	const [selRef, setSelRef] = useState(true);
	const [Nameerror, setNameerror] = useState(false);
	const [Namehint, setNamehint] = useState("");
	const [PWerror, setPWerror] = useState(false);
	const [PWhint, setPWhint] = useState("");

	const changePassword = (e) => {
		setPassword(e.currentTarget.value);
	};
	const changePWcheck = (e) => {
		setPWcheck(e.currentTarget.value);
	};
	const changeName = (e) => {
		setName(e.currentTarget.value);
	};
	const changeCategory = (e) => {
		setCategory(e.currentTarget.value);
	};
	const changeCateSel = (e) => {
		setCateSel(e.target.value);
		if (e.target.value === "직접입력") {
			setSelRef(false);
			setCategory("");
		} else {
			setSelRef(true);
			setCategory(e.target.value);
		}
	};
	const changeIntro = (e) => {
		setIntro(e.currentTarget.value);
	};
	const handleCheck = () => {
		if (dateRef === true) {
			setsDate(today);
			seteDate(endday);
			setDateRef(false);
		} else {
			setDateRef(true);
		}
	};
	const handleMake = async () => {
		if (Password === PWcheck) {
			setPWerror(false);
			setPWhint("");
		} else {
			setPWerror(true);
			setPWhint("비밀번호가 일치하지 않습니다.");
		}
		if (Name === "") {
			setNameerror(true);
			setNamehint("챌린지명을 입력하십시오.");
		} else {
			setNameerror(false);
			setNamehint("");
		}
		if (Name !== "" && Password === PWcheck) {
			const challengeInfo = {
				userId: user.userId,
				name: Name,
				challenge_start: sDate,
				challenge_end: eDate,
				private_key: Password,
			};
			const result = await createChallenge(challengeInfo);
			console.log(result);
			if (!result) {
				alert("생성 실패");
			} else {
				alert("생성 완료");
				history.push('/challenge');
			}
		}
	};
	const isMobile = useMediaQuery("(max-width: 550px)");

	return (
		<div className="challengeMake">
			<div className="makefield">
				<div className="info_grid">
					<div className="info_title">
						챌린지명
					</div>
					<TextField
						className="name_txt"
						variant="outlined"
						inputProps={isMobile ? { style: { fontSize: 16 } } : { style: { fontSize: 20 } }}
						margin="dense"
						onChange={changeName}
						error={Nameerror}
						helperText={Namehint}
					/>
				</div>
				<div className="pw_grid">
					<div className="info_grid">
						<div className="info_title">
							비밀번호
						</div>
						<TextField
							className="name_txt"
							variant="outlined"
							type="Password"
							inputProps={isMobile ? { style: { fontSize: 16 } } : { style: { fontSize: 20 } }}
							margin="dense"
							onChange={changePassword}
						/>
					</div>
					<div className="pw_between" />
					<div className="info_grid">
						<div className="info_title">
							비밀번호 확인
						</div>
						<TextField
							className="name_txt"
							variant="outlined"
							type="Password"
							inputProps={isMobile ? { style: { fontSize: 16 } } : { style: { fontSize: 20 } }}
							margin="dense"
							onChange={changePWcheck}
							error={PWerror}
							helperText={PWhint}
						/>
					</div>
				</div>
				<div className="info_grid">
					<div className="info_title">
						카테고리
					</div>
					<TextField
						className="category_txt"
						variant="outlined"
						inputProps={isMobile ? { style: { fontSize: 16 } } : { style: { fontSize: 20 } }}
						disabled={selRef}
						value={Category}
						margin="dense"
						onChange={changeCategory}
					/>
					<div className="category_selbox">
						<Select
							className="category_sel"
							value={CateSel}
							onChange={changeCateSel}
						>
							<MenuItem value="커밋">커밋</MenuItem>
							<MenuItem value="운동">운동</MenuItem>
							<MenuItem value="공부">공부</MenuItem>
							<MenuItem value="기타">기타</MenuItem>
							<MenuItem value="직접입력">직접입력</MenuItem>
						</Select>
					</div>
				</div>
				<div className="date_grid">
					<div className="date_alltitle">
						<input className="date_check" type="checkbox" onChange={handleCheck} />
						<div>시작 - 종료</div>
					</div>
					<div className="date_all">
						<div className="date_field">
							<div className="date_title">
								시작날짜
							</div>
							<DatePicker
								disabled={dateRef}
								className="date_pick"
								selected={sDate}
								onChange={(date) => setsDate(date)}
								dateFormat="yyyy. MM. dd"
							/>
						</div>
						<div className="date_between" />
						<div className="date_field">
							<div className="date_title">
								종료날짜
							</div>
							<DatePicker
								disabled={dateRef}
								className="date_pick"
								selected={eDate}
								onChange={(date) => seteDate(date)}
								dateFormat="yyyy. MM. dd"
							/>
						</div>
					</div>
				</div>
				<div className="intro_grid">
					<div className="intro_title">
						그룹소개
					</div>
					<TextField
						className="intro_txt"
						value={Intro}
						onChange={changeIntro}
						variant="outlined"
						inputProps={isMobile ? { style: { fontSize: 14 } } : { style: { fontSize: 16 } }}
						margin="dense"
						multiline
						rows={6}
					/>
				</div>
			</div>
			<div className="btn">
				<Link className="link" to="/challenge">
					<Button className="btn_cancel">
						취소
					</Button>
				</Link>
				<Button className="btn_clear" onClick={handleMake}>
					생성
				</Button>
			</div>
		</div>
	);
}

export default withRouter(ChallengeMake);
