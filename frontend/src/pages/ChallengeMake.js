import React, { useState, useRef } from 'react';
import { Box, Grid, Button, TextField } from '@material-ui/core';

function ChallengeMake() {
	const [Name, setName] = useState("");
	const [Category, setCategory] = useState("");
	const [CateSel, setCateSel] = useState("notsel");
	const [sttDate, setSttdate] = useState("");
	const [finDate, setFindate] = useState("");
	const [Intro, setIntro] = useState("");
	const sttRef = useRef(null);
	const finRef = useRef(null);
	const selRef = useRef(null);

	const changeName = (e) => {
		setName(e.currentTarget.value);
	};
	const changeCategory = (e) => {
		setCategory(e.currentTarget.value);
	};
	const changeCateSel = (e) => {
		setCateSel(e.currentTarget.value);
		if (e.currentTarget.value === "") {
			selRef.current.disabled = false;
		} else {
			selRef.current.disabled = true;
		}
	};
	const changeSttdate = (e) => {
		setSttdate(e.currentTarget.value);
	};
	const changeFindate = (e) => {
		setFindate(e.currentTarget.value);
	};
	const changeIntro = (e) => {
		setIntro(e.currentTarget.value);
	};

	const handleCheck = () => {
		if (sttRef.current.disabled === true) {
			sttRef.current.disabled = false;
		} else {
			sttRef.current.disabled = true;
		}
		if (finRef.current.disabled === true) {
			finRef.current.disabled = false;
		} else {
			finRef.current.disabled = true;
		}
	};

	const handleSelect = () => {
		if (selRef.current.disabled === true) {
			selRef.current.disabled = false;
		} else {
			selRef.current.disabled = true;
		}
	};

	return (
		<div className="challengeMake">
			<div className="makefield">
				<Grid item xs={12} className="name_grid">
					<Grid container spacing={1} alignItems="center">
						<Grid>
							<Box className="cha_name">
								챌린지명
							</Box>
						</Grid>
						<Grid>
							<input value={Name} onChange={changeName} className="name_txtfield" />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} className="name_grid">
					<Grid container spacing={1} alignItems="center">
						<Grid>
							<Box className="cha_name">
								카테고리
							</Box>
						</Grid>
						<Grid>
							<input disabled value={Category} onChange={changeCategory} ref={selRef} className="category_txtfield" size="10" />
						</Grid>
						<Grid>
							<select id="selbox" value={CateSel} onChange={changeCateSel} className="category_selfield">
								<option value="커밋">커밋</option>
								<option value="운동">운동</option>
								<option value="공부">공부</option>
								<option value="기타">기타</option>
								<option value="">직접입력</option>
							</select>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} className="name_grid">
					<Grid container spacing={1} alignItems="center">
						<Grid>
							<input type="checkbox" onChange={handleCheck} className="date_check" />
						</Grid>
						<Grid>
							<Box className="cha_name">
								시작날짜
							</Box>
						</Grid>
						<Grid>
							<input disabled value={sttDate} onChange={changeSttdate} ref={sttRef} className="date_txtfield" size="11" />
						</Grid>
						<Grid>
							<Box className="cha_name">
								종료날짜
							</Box>
						</Grid>
						<Grid>
							<input disabled value={finDate} onChange={changeFindate} ref={finRef} className="date_txtfield" size="11" />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid>
							<Box className="cha_name">
								그룹소개
							</Box>
						</Grid>
						<Grid>
							<textarea value={Intro} onChange={changeIntro} className="intro_txtfield" />
						</Grid>
					</Grid>
				</Grid>
				<div className="btn_out">
					<Button className="btn_cancel">
						취소
					</Button>
					<Button className="btn_clear">
						저장
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChallengeMake;
