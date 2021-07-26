import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, TextField, Typography, Modal, Fade } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import ExpelMember from './ExpelMember';
import { useUserState } from '../MVVM/Model/UserModel';
import { useDeleteChallenge, useSaveChallenge } from '../MVVM/ViewModel/ChallengeViewModel';

function ManageComponent({ value, index, challengeData, setChallengeData, CId }) {
	const user_id = useUserState();
	const deleteChallenge = useDeleteChallenge();
	const saveChallenge = useSaveChallenge();
	const [title, setTitle] = useState("");
	const [user, setUser] = useState("");
	const [sDate, setsDate] = useState();
	const [eDate, seteDate] = useState();
	const [open, setopen] = useState(false);
	const [expel, setExpel] = useState("");
	const [leader, setLeader] = useState();
	const [password, setPW] = useState();
	const changeTitle = (e) => {
		setTitle(e.currentTarget.value);
	};
	const handleOpen = (c) => {
		console.log(c);
		setopen(true);
		setExpel(c);
	};
	const handleClose = () => {
		setopen(false);
	};
	const handleDelete = () => {
		const result = deleteChallenge(CId);
		console.log(CId);
		console.log(result);
		if (!result) {
			alert("삭제 실패");
		} else {
			alert("삭제 완료");
			// history.push('/challenge');
		}
	};
	const handleSave = async () => {
		const challengeInfo = {
			name: title,
			challenge_start: sDate,
			challenge_end: eDate,
			challenge_leader: leader,
			user_id: user_id.userId,
			private_key: password
		};
		const result = await saveChallenge(CId, challengeInfo);
		console.log(result);
		if (!result) {
			alert("저장 실패");
		} else {
			alert("저장 완료");
			// history.push('/challenge');
			setChallengeData({
				name: title,
				challenge_users: user,
				challenge_start: sDate,
				challenge_end: eDate
			});
		}
	};
	const handleExpel = () => {
		alert("추방하였습니다");
		setopen(false);
	};
	useEffect(() => {
		setTitle(challengeData.name);
		setUser(challengeData.challenge_users);
		setsDate(new Date(challengeData.challenge_start));
		seteDate(new Date(challengeData.challenge_end));
		setLeader(challengeData.challenge_leader);
		setPW(challengeData.private_key);
	}, [challengeData]);

	return (
		<div className="manageComponent">
			{value === index && value === 0 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 이름 관리</div>
						<Button className="saveBtn" onClick={handleSave}>저장</Button>
					</div>
					<div className="content_box">
						<TextField
							variant="outlined"
							inputProps={{ style: { fontSize: 20 } }}
							margin="dense"
							className="txt_title"
							value={title}
							onChange={changeTitle}
						/>
					</div>
				</div>
			)}
			{value === index && value === 1 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 멤버 관리</div>
						<Button className="saveBtn">저장</Button>
					</div>
					<div className="content_box">
						<Grid container spacing={1}>
							{challengeData.challenge_users.map((c) => (
								<Grid item lg={3} md={4} sm={6} xs={12}>
									<div className="member_box">
										<Box className="member_inner" value={c} onClick={() => handleOpen(c)}>
											{c}
										</Box>
									</div>
								</Grid>
							))}
						</Grid>
					</div>
				</div>
			)}
			{value === index && value === 2 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 날짜 관리</div>
						<Button className="saveBtn" onClick={handleSave}>저장</Button>
					</div>
					<div className="date_box">
						<Typography className="date_name">시작 날짜 :</Typography>
						<DatePicker
							className="date_pick"
							selected={sDate}
							onChange={(date) => setsDate(date)}
							dateFormat="yyyy. MM. dd"
						/>
					</div>
					<div className="date_box">
						<Typography className="date_name">종료 날짜 :</Typography>
						<DatePicker
							className="date_pick"
							selected={eDate}
							onChange={(date) => seteDate(date)}
							dateFormat="yyyy. MM. dd"
						/>
					</div>
				</div>
			)}
			{value === index && value === 5 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 중단</div>
					</div>
					<div className="content_box">
						<div className="quit_box">
							<Typography className="quit_msg">정말 중단하시겠습니까?</Typography>
							<Button className="quitBtn" onClick={handleDelete}>중단</Button>
						</div>
					</div>
				</div>
			)}
			<Modal
				className="modal"
				open={open}
				onClose={handleClose}
			>
				<Fade in={open}>
					<ExpelMember onClose={handleClose} handleExpel={handleExpel} member={expel} />
				</Fade>
			</Modal>
		</div>
	);
}

export default ManageComponent;
