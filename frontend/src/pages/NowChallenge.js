import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';

function NowChallenge({ match }) {
	const CId = match.params.challengeId;
	const challengeData = useChallengeState();
	const [title, setTitle] = useState("");
	useEffect(() => {
		// 추후 challengeId 넣어서 해당 정보만 받아아오기
		console.log(challengeData[CId - 1].name);
		setTitle(challengeData[CId - 1].name);
	}, [CId]);
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
