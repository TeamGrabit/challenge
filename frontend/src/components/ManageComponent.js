import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, TextField, Typography, Modal, Fade, Backdrop } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import ExpelMember from './ExpelMember';

function ManageComponent({ value, index, CId }) {
	console.log(CId);
	const challengeData = useChallengeState();
	const [title, setTitle] = useState("");
	const [user, setUser] = useState("");
	const [sDate, setsDate] = useState("");
	const [eDate, seteDate] = useState("");
	const [open, setopen] = useState(false);
	const [expel, setExpel] = useState("");
	const handleOpen = () => {
		setopen(true);
		setExpel("");
	};
	const handleClose = () => {
		setopen(false);
		setExpel("");
	};
	useEffect(() => {
		setTitle(challengeData[CId - 1].name);
		setUser(challengeData[CId - 1].user);
		setsDate(challengeData[CId - 1].sDate);
		seteDate(challengeData[CId - 1].eDate);
	}, [CId, challengeData]);

	return (
		<div className="manageComponent">
			{value === index && value === 0 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 이름 관리</div>
						<Button className="saveBtn">저장</Button>
					</div>
					<div className="content_box">
						<TextField
							variant="outlined"
							inputProps={{ style: { fontSize: 20 } }}
							margin="dense"
							className="txt_title"
							value={title}
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
							{user.map((c) => (
								<Grid item lg={3} md={4} sm={6} xs={12}>
									<div className="member_box">
										<Box className="member_inner" onClick={handleOpen}>
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
						<Button className="saveBtn">저장</Button>
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
							<Button className="quitBtn">중단</Button>
						</div>
					</div>
				</div>
			)}
			<Modal
				className="modal"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div>
						<ExpelMember onClose={handleClose} member={expel} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default ManageComponent;
