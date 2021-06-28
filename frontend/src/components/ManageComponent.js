import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';

function ManageComponent({ value, index, CId }) {
	console.log(CId);
	const challengeData = useChallengeState();
	const [title, setTitle] = useState("");
	const [user, setUser] = useState("");
	const [sDate, setsDate] = useState("");
	const [eDate, seteDate] = useState("");
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
										<div className="member_inner">
											{c}
										</div>
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
					<div className="content_box">
						<div>
							{sDate.getFullYear()}
							년
							{" "}
							{sDate.getMonth()}
							월
							{" "}
							{sDate.getDate()}
							일
						</div>
						<div>
							{eDate.getFullYear()}
							년
							{" "}
							{eDate.getMonth()}
							월
							{" "}
							{eDate.getDate()}
							일
						</div>
					</div>
				</div>
			)}
			{value === index && value === 5 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 중단</div>
					</div>
					<div className="content_box">
						<Typography>정말 중단하시겠습니까?</Typography>
					</div>
				</div>
			)}
		</div>
	);
}

export default ManageComponent;
