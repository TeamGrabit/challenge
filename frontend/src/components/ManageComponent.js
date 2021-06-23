import React from 'react';
import { Button, Grid, Box, Typography } from '@material-ui/core';

function ManageComponent({ value, index }) {
	return (
		<div className="manageComponent">
			{value === index && value === 0 && (
				<div className="comp_title">
					<div>챌린지 이름 관리</div>
				</div>
			)}
			{value === index && value === 1 && (
				<div>
					<div>챌린지 멤버 관리</div>
				</div>
			)}
			{value === index && value === 2 && (
				<div>
					<div>챌린지 날짜 관리</div>
				</div>
			)}
			{value === index && value === 5 && (
				<div>
					<div>챌린지 중단</div>
				</div>
			)}
		</div>
	);
}

export default ManageComponent;
