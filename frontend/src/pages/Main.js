import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Tabs, Tab } from '@material-ui/core';

function Main() {
	const [ing, setIng] = useState("");
	const [fin, setFin] = useState("");

	return (
		<div className="main">
			<div className="info">
				<div className="tab_sel">
					<Box className="tab_box">
						참여중인 챌린지
					</Box>
				</div>
				<Grid container spacing={3} className="cha_list">
					<Grid item xs={3}>
						<Box className="cha_box">
							1일 1커밋
						</Box>
					</Grid>
					<Grid item xs={3}>
						<Box className="cha_box">
							2일 1커밋
						</Box>
					</Grid>
					<Grid item xs={3}>
						<Box className="cha_box">
							1일 1운동
						</Box>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default Main;
