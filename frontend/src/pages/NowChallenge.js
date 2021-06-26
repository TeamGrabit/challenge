import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';

function NowChallenge({ match }) {
	const CId = match.params.challengeId;
	const challengeData = useChallengeState();
	const [title, setTitle] = useState("");
	const grassInitialData = [
		true, false, false, false, true, false, false,
		false, false, true, false, false, true, false,
		true, false, false, false, false, false, true
	];
	useEffect(() => {
		// 추후 challengeId 넣어서 해당 정보만 받아아오기
		console.log(challengeData[CId - 1].name);
		setTitle(challengeData[CId - 1].name);
	}, [CId, challengeData]);
	const grassHandler = () => {
		window.location.href = `/challenge/info/${CId}/fix`;
	};
	return (
		<Grid className="NowChallenge">
			<Grid className="head">
				<Typography className="headTitle">{title}</Typography>
				<Grid className="btnCon">
					<Button className="btn">Invite</Button>
					<Button className="btn">Admit</Button>
				</Grid>
			</Grid>
			<Grid className="teamGrass">
				{/* 팀 잔디 */}
				{grassInitialData.map((data) => (
					<Grid className={['grass', data ? 'fill-grass' : 'unfill-grass']} />
				))}
			</Grid>
			<Grid className="secondGrid">
				{/* 나의 잔디, 커밋왕 */}
				<Grid className="left-con" style={{ cursor: 'pointer' }} onClick={grassHandler}>
					<Typography className="sub-title">나의 잔디</Typography>
					<Grid className="myGrass">
						{grassInitialData.map((data) => (
							<Grid className={['grass', data ? 'fill-grass' : 'unfill-grass']} />
						))}
					</Grid>
				</Grid>
				<Grid className="right-con">
					<Typography className="sub-title">이달의 커밋왕</Typography>
					<Grid className="commitKing">
						{/* 백엔드에서 내용 불러오기 */}
						<p className="rank">1등: 이현광</p>
						<p className="rank">2등: 김수빈</p>
						<p className="rank">3등: 차현철</p>
					</Grid>
				</Grid>
			</Grid>
			<Grid className="lastGrid">
				{/* 팀원 잔디, 실패왕, 최근커밋로그 */}
				<Grid className="left-con">
					<Typography className="sub-title">다른 잔디</Typography>
					<Grid className="myGrass">
						{grassInitialData.map((data) => (
							<Grid className={['grass', data ? 'fill-grass' : 'unfill-grass']} />
						))}
					</Grid>
				</Grid>
				<Grid className="middle-con">
					<Typography className="sub-title">이달의 실패왕</Typography>
					<Grid className="failKing">
						{/* 백엔드에서 내용 불러오기 */}
						<p className="rank">김바다</p>
					</Grid>
				</Grid>
				<Grid className="right-con">
					<Typography className="sub-title">최근 커밋 로그</Typography>
					<Grid className="commit-log">
						{/* 백엔드에서 내용 불러오기 */}
						<p className="rank">log</p>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default NowChallenge;
