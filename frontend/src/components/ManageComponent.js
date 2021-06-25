import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Typography } from '@material-ui/core';
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
						<Button className="saveBtn">수정</Button>
					</div>
					<input className="txt_title" value={title} />
				</div>
			)}
			{value === index && value === 1 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 멤버 관리</div>
						<Button className="saveBtn">수정</Button>
					</div>
					<div>{user}</div>
				</div>
			)}
			{value === index && value === 2 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 날짜 관리</div>
						<Button className="saveBtn">수정</Button>
					</div>
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
			)}
			{value === index && value === 5 && (
				<div className="comp_box">
					<div className="title_box">
						<div className="comp_title">챌린지 중단</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ManageComponent;
