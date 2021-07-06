import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Modal, Fade, Backdrop, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Slider from 'react-slick';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import { useGetChallenge } from '../MVVM/ViewModel/ChallengeViewModel';

function NowChallenge({ match }) {
	const CId = match.params.challengeId;
	const challengeData = useChallengeState();
	const [detailData, setDetailData] = useState();
	useEffect(() => {
		setDetailData(challengeData);
		const key = new Date();
	}, [challengeData]);
	if (detailData) console.log(detailData[CId].name);
	const [title, setTitle] = useState("");
	const [inviteOpen, setInviteOpen] = useState(false);
	const [admitOpen, setAdmitOpen] = useState(false);
	// grass Init Data --- temp
	const grassInitialData = [
		true, false, false, false, true, false, false,
		false, false, true, false, false, true, false,
		true, false, false, false, false, false, true
	];
	const otherGrass = [
		[
			false, false, false, false, false, false, false,
			false, false, false, false, false, false, false,
			false, false, false, false, false, false, false
		],
		[
			true, true, true, true, true, true, true,
			true, true, true, true, true, true, true,
			true, true, true, true, true, true, true
		]
	];
	// grass init data --- temp end
	// <-- grass carousel setting
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: 'grass-slider'
	};
	// grass carousel setting -->
	const grassHandler = () => {
		window.location.href = `/challenge/info/${CId}/fix`;
	};
	return (
		<>
			<Grid className="NowChallenge">
				<Grid className="head">
					<Typography className="headTitle">{title}</Typography>
					<Grid className="btnCon">
						<Button className="btn" onClick={() => setInviteOpen(true)}>Invite</Button>
						<Button className="btn" onClick={() => setAdmitOpen(true)}>Admit</Button>
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
						<Typography className="sub-title">최근 커밋 로그</Typography>
						<Grid className="commit-log">
							{/* 백엔드에서 내용 불러오기 */}
							<p className="rank">log</p>
						</Grid>
					</Grid>
				</Grid>
				<Grid className="lastGrid">
					{/* 팀원 잔디, 실패왕, 최근커밋로그 */}
					<Grid className="left-con">
						<Typography className="sub-title">다른 잔디</Typography>
						<Slider {...settings}>
							{
								otherGrass.map((data) => (
									<Grid className="myGrass">
										{data.map((g) => (
											<Grid className={['grass', g ? 'fill-grass' : 'unfill-grass']} />
										))}
									</Grid>
								))
							}
						</Slider>
					</Grid>
					<Grid className="middle-con">
						<Typography className="sub-title">이달의 실패왕</Typography>
						<Grid className="failKing">
							{/* 백엔드에서 내용 불러오기 */}
							<p className="rank">김바다</p>
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
			</Grid>
			<Modal
				className="modal"
				open={inviteOpen}
				onClose={() => setInviteOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={inviteOpen}>
					<Grid className="inviteModalPaper">
						<Grid className="head">초대하기</Grid>
						<Grid className="body">
							<Grid className="input-con">
								<TextField variant="outlined" label="E-mail" fullWidth />
								<Button style={{ marginLeft: '1rem', backgroundColor: '#CCFCCB', height: '100%' }}>전송</Button>
							</Grid>
							{/* 다인 초대는 추후지원 */}
							{/* <Grid className="icon-con">
								<IconButton style={{ width: '2rem', height: '2rem' }}>
									<AddIcon />
								</IconButton>
							</Grid> */}
						</Grid>
					</Grid>
				</Fade>
			</Modal>
			<Modal
				className="modal"
				open={admitOpen}
				onClose={() => setAdmitOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={admitOpen}>
					<Grid className="inviteModalPaper">
						<Grid className="head">인증 요청 목록</Grid>
						{/* 백에서 불러오기 */}
						<Grid className="admit-body">
							<Grid className="admit-content">
								<Grid className="admit-name">이름</Grid>
								<Grid className="admit-reason">내역</Grid>
								<Grid className="admit-btn-con">
									<Button style={{ backgroundColor: '#CCFCCB', marginTop: '5px' }}>수락</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Fade>
			</Modal>
		</>
	);
}

export default NowChallenge;
