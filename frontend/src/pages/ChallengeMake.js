import React, { useState } from 'react';
import { Link, Button, TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';

function ChallengeMake() {
	const [Name, setName] = useState("");
	const [Category, setCategory] = useState("");
	const [CateSel, setCateSel] = useState("notsel");
	const [sDate, setsDate] = useState("");
	const [eDate, seteDate] = useState("");
	const [Intro, setIntro] = useState("");
	const [dateRef, setDateRef] = useState(true);
	const [selRef, setSelRef] = useState(true);

	const changeName = (e) => {
		setName(e.currentTarget.value);
	};
	const changeCategory = (e) => {
		setCategory(e.currentTarget.value);
	};
	const changeCateSel = (e) => {
		setCateSel(e.currentTarget.value);
		if (e.currentTarget.value === "") {
			setSelRef(false);
		} else {
			setSelRef(true);
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
						카테고리
					</div>
					<TextField
						className="category_txt"
						variant="outlined"
						inputProps={{ style: { fontSize: 20 } }}
						disabled={selRef}
						value={Category}
						onChange={changeCategory}
					/>
					<select className="category_selfield" id="selbox" value={CateSel} onChange={changeCateSel}>
						<option value="커밋">커밋</option>
						<option value="운동">운동</option>
						<option value="공부">공부</option>
						<option value="기타">기타</option>
						<option value="">직접입력</option>
					</select>
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
					<textarea value={Intro} onChange={changeIntro} className="intro_txtfield" />
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
