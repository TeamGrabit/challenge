import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

function NowChallenge() {
	const [title, setTitle] = useState("하루에 밥 한끼 먹기");
	return (
		<Grid className="NowChallenge">
			<Grid className="head">
				<Typography className="headTitle">{title}</Typography>
				<Grid className="btnCon">
					<Button className="btn">Invite</Button>
					<Button className="btn">Admit</Button>
				</Grid>
			</Grid>
			{/* 팀 잔디 */}
			<Grid className="secondGrid">
				{/* 나의 잔디, 커밋왕 */}
				<Typography>secondGrid</Typography>
			</Grid>
			<Grid className="lastGrid">
				{/* 팀원 잔디, 실패왕, 최근커밋로그 */}
				<Typography>LastGrid</Typography>
			</Grid>
		</Grid>
	);
}

export default NowChallenge;
