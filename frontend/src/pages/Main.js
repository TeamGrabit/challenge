import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Tabs, Tab } from '@material-ui/core';

function Main() {
	const [ing, setIng] = useState("");
	const [fin, setFin] = useState("test@gmail.com");

	return (
		<>
			<div className="landing">
				<Grid container spacing={3} className="cha_list">

					<Grid item xs={12}>
						참여중인 챌린지
					</Grid>
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
		</>
	);
}

export default Main;
