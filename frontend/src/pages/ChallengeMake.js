import React, { useState } from 'react';
import { Link, Button, TextField, Select, MenuItem } from '@material-ui/core';
import DatePicker from 'react-datepicker';

function ChallengeMake() {
	const [Name, setName] = useState("");
	const [Password, setPassword] = useState("");
	const [Category, setCategory] = useState("");
	const [CateSel, setCateSel] = useState("notsel");
	const [sDate, setsDate] = useState("");
	const [eDate, seteDate] = useState("");
	const [Intro, setIntro] = useState("");
	const [dateRef, setDateRef] = useState(true);
	const [selRef, setSelRef] = useState(true);

	const changePassword = (e) => {
		setPassword(e.currentTarget.value);
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
			setDateRef(false);
		} else {
			setDateRef(true);
		}
	};

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
						inputProps={{ style: { fontSize: 20 } }}
						margin="dense"
						onChange={changeName}
					/>
				</div>
				<div className="info_grid">
					<div className="info_title">
						비밀번호
					</div>
					<TextField
						className="name_txt"
						variant="outlined"
						inputProps={{ style: { fontSize: 20 } }}
						margin="dense"
						onChange={changePassword}
					/>
				</div>
				<div className="info_grid">
					<div className="info_title">
						카테고리
					</div>
					<TextField
						className="category_txt"
						variant="outlined"
						inputProps={{ style: { fontSize: 20 } }}
						disabled={selRef}
						value={Category}
						margin="dense"
						onChange={changeCategory}
					/>
					<Select
						className="category_selfield"
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
				<div className="info_grid">
					<input className="date_check" type="checkbox" onChange={handleCheck} />
					<div className="info_title">
						시작날짜
					</div>
					<DatePicker
						disabled={dateRef}
						className="date_pick"
						selected={sDate}
						onChange={(date) => setsDate(date)}
						dateFormat="yyyy. MM. dd"
					/>
					<div className="info_title">
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
				<div className="intro_grid">
					<div className="info_title">
						그룹소개
					</div>
					<TextField
						className="intro_txtfield"
						value={Intro}
						onChange={changeIntro}
						variant="outlined"
						inputProps={{ style: { fontSize: 16 } }}
						margin="dense"
						multiline
						rows={6}
					/>
				</div>
				<div className="btn_out">
					<Link className="link" href="/challenge">
						<Button className="btn_cancel">
							취소
						</Button>
					</Link>
					<Button className="btn_clear">
						저장
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChallengeMake;
