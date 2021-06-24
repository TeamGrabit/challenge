import React from 'react';
import { Button, Grid, Box, Typography } from '@material-ui/core';

function ManageComponent({ value, index, title }) {
	return (
		<div className="manageComponent">
			{value === index && value === 0 && (
				<div>
					<div className="title_box">
						<div className="comp_title">챌린지 이름 관리</div>
						<Button className="saveBtn">수정</Button>
					</div>
					<input className="txt_title">{title}</input>
				</div>
			)}
			{value === index && value === 1 && (
				<div>
					<div className="title_box">
						<div className="comp_title">챌린지 멤버 관리</div>
						<Button className="saveBtn">수정</Button>
					</div>
				</div>
			)}
			{value === index && value === 2 && (
				<div>
					<div className="title_box">
						<div className="comp_title">챌린지 날짜 관리</div>
						<Button className="saveBtn">수정</Button>
					</div>
				</div>
			)}
			{value === index && value === 5 && (
				<div>
					<div className="title_box">
						<div className="comp_title">챌린지 중단</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ManageComponent;
