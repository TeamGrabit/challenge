import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Typography, Modal, Fade, Backdrop, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Slider from 'react-slick';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import { useGetChallenge } from '../MVVM/ViewModel/ChallengeViewModel';
import { API_URL } from '../CommonVariable';
import { useUserState } from '../MVVM/Model/UserModel';

function NowChallenge({ match }) {
	const CId = match.params.challengeId;
	const challengeData = useChallengeState();
	const userData = useUserState();
	const [title, setTitle] = useState("");
	const [inviteOpen, setInviteOpen] = useState(false);
	const [admitOpen, setAdmitOpen] = useState(false);
	const [challengeGrass, setChallengeGrass] = useState();
	const [myGrass, setMyGrass] = useState();
	const [king, setKing] = useState(null);
	const [poor, setPoor] = useState(null);
	const today = new Date();
	useEffect(() => {
		const result = challengeData.filter((item) => item.challenge_id === CId);
		result.map((c, i) => {
			console.log(i);
			setTitle(c.name);
			return 1;
		});
		// team grass
		axios.get(`${API_URL}/grass/challenge`, { params: {
			challenge_id: CId,
			month: today.getMonth() + 1,
			year: today.getFullYear()
		} }).then((res) => {
			setChallengeGrass(res.data.isCommitedList.flat());
		})
			.catch((error) => { console.log(error); });
		// my grass
		axios.get(`${API_URL}/grass/personal`, { params: {
			user_id: userData.userId,
			challenge_id: CId,
			month: today.getMonth() + 1,
			year: today.getFullYear()
		} }).then((res) => {
			setMyGrass(res.data.isCommitedList.flat());
		})
			.catch((error) => { console.log(error); });
		// other grass
		// king
		axios.get(`${API_URL}/challengeKing/${CId}`).then((res) => {
			console.log(res);
			// king api 수정되면 넣기
		});
		// poor
		axios.get(`${API_URL}/challengePoor/${CId}`).then((res) => {
			console.log(res);
			// poor api 수정되면 넣기
		});
	}, [challengeData]);
	// grass Init Data --- temp
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
					<Grid className="head-left">
						<Typography className="headTitle">{title}</Typography>
						<Grid className="teamGrass">
							{/* 팀 잔디 */}
							{challengeGrass !== undefined && challengeGrass.map((data) => (
								<Grid className={['grass', data ? 'fill-grass' : 'unfill-grass']} />
							))}
						</Grid>
					</Grid>
					<Grid className="head-right">
						<Button className="btn" onClick={() => setInviteOpen(true)}>Invite</Button>
						<Button className="btn" onClick={() => setAdmitOpen(true)}>Admit</Button>
					</Grid>
				</Grid>
				<Grid className="secondGrid">
					{/* 나의 잔디, 커밋왕 */}
					<Grid className="left-con" style={{ cursor: 'pointer' }} onClick={grassHandler}>
						<Typography className="sub-title">나의 잔디</Typography>
						<Grid className="myGrass">
							{myGrass !== undefined && myGrass.map((data) => (
								<Grid className={['grass', data ? 'fill-grass' : 'unfill-grass']} />
							))}
						</Grid>
					</Grid>
					<Grid className="right-con">
						<Typography className="sub-title">이달의 커밋왕</Typography>
						<Grid className="commitKing">
							{
								king === null ?
									<p className="rank">데이터를 불러오는 중입니다.</p>
									: king.map((d) => <p className="rank">{d}</p>)
							}
						</Grid>
					</Grid>
				</Grid>
				<Grid className="lastGrid">
					{/* 팀원 잔디, 실패왕 */}
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
							{
								poor === null ?
									<p className="rank">데이터를 불러오는 중입니다.</p>
									: poor.map((d) => <p className="rank">{d}</p>)
							}
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
