import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Grid, Typography, Modal, Fade, Backdrop, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Slider from 'react-slick';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import { useGetChallenge } from '../MVVM/ViewModel/ChallengeViewModel';
import { API_URL } from '../CommonVariable';
import { useUserState } from '../MVVM/Model/UserModel';
import { EntrancePwModal, InviteModal } from '../components';
import UserRedirect from '../auth/UserRedirect';

function NowChallenge({ match }) {
	const history = useHistory();
	const CId = match.params.challengeId;
	const challengeData = useChallengeState();
	const userData = useUserState();
	const [title, setTitle] = useState("");
	const [inviteOpen, setInviteOpen] = useState(false);
	const [admitOpen, setAdmitOpen] = useState(false);
	const [challengeGrass, setChallengeGrass] = useState();
	const [myGrass, setMyGrass] = useState();
	const [otherGrass, setOtherGrass] = useState([[
		false, false, false, false, false, false, false,
		false, false, false, false, false, false, false,
		false, false, false, false, false, false, false
	],
	[
		true, true, true, true, true, true, true,
		true, true, true, true, true, true, true,
		true, true, true, true, true, true, true
	]]);
	const [king, setKing] = useState(null);
	const [poor, setPoor] = useState(null);
	const [admit, setAdmit] = useState(null);
	const today = new Date();
	const [pwModal, setPwModal] = useState(false);
	useEffect(() => {
		axios.get(`${API_URL}/challenge/${CId}`).then((res) => {
			if(userData.auth){
				if(res.data.challenge_users.includes(userData.user_id) === false) setPwModal(true);
				if(res.data.challenge_users.includes(userData.user_id) === true) setPwModal(false);
			}
		});
		// todo : grass mvvm 만들기. approve mvvm 이용하기.
		const result = challengeData.filter((item) => item.challenge_id === CId);
		result.map((c, i) => {
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
			user_id: userData.user_id,
			challenge_id: CId,
			month: today.getMonth() + 1,
			year: today.getFullYear()
		} }).then((res) => {
			setMyGrass(res.data.isCommitedList.flat());
		})
			.catch((error) => { console.log(error); });
		// other grass
		axios.get(`${API_URL}/grass/other`, { params: {
			user_id: userData.user_id,
			challenge_id: CId,
			month: today.getMonth() + 1,
			year: today.getFullYear()
		} }).then((res) => {
			const temp = [];
			res.data.OtherList.map((d) => temp.push(d.flat()));
			setOtherGrass(temp);
		});
		// king
		axios.get(`${API_URL}/challengeKing/${CId}`).then((res) => {
			setKing(res.data);
		});
		// poor
		axios.get(`${API_URL}/challengePoor/${CId}`).then((res) => {
			setPoor(res.data);
		});
		// approve
		axios.get(`${API_URL}/approve/list/${CId}`, { params: {
			user_id: userData.user_id
		}}).then((res) => {
			setAdmit(res.data.result);
			if(res.data.result.length === 0) setAdmit(null);
			else setAdmit(res.data.result);
			console.log(res.data.result);
		}).catch((error) => {console.log(error); });
	}, [challengeData]);
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
		history.push(`/challenge/info/${CId}/fix`);
	};
	const [email, setEmail] = useState("");
	const emailHandler = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};
	const inviteHandler = (e) => {
		e.preventDefault();
		axios.post(`${API_URL}/invite`, {
			challenge_id: CId,
			user_email: email
		}).then((res) => {
			console.log(res.data);
			alert(`${email}로 초대 메일을 성공적으로 보냈습니다.`);
			setInviteOpen(false);
			setEmail("");
		}).catch((e) => {
			alert(`${e} 오류가 발생했습니다.`);
		});
	};
	return (
		<>
			<UserRedirect />
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
							{
								pwModal !== true ?
									myGrass !== undefined && myGrass.map((data) => (
										<Grid className={['grass', data ? 'fill-grass' : 'unfill-grass']} />
									))
									:
									'가입이 되어있지 않습니다.'
							}
						</Grid>
					</Grid>
					<Grid className="right-con">
						<Typography className="sub-title">이달의 커밋왕</Typography>
						<Grid className="commitKing">
							{
								king === null ?
									<p className="rank">데이터를 불러오는 중입니다.</p>
									: king.map((d) => <p className="rank">{d.user_name}</p>)
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
									: <p className="rank">{poor.user_name}</p>
							}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<InviteModal open={inviteOpen} closeHandler={() => setInviteOpen(false)} CId={CId} />
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
					<Grid className="modal-background-4">
						<Grid className="head">인증 요청 목록</Grid>
						<Grid className="body">
							{
								admit === null ? <p>데이터가 없습니다.</p>
									: admit === undefined ? <p>데이터를 불러오는 중입니다.</p>
									: admit.map((d) => (
										<Grid className="body-content-card">
											<Grid className="admit-name">
												<p>{`${d.request_date} ${d.type === 0 ? '면제' : '인증'}`}</p>
												<p>{d.user_id}</p>	
											</Grid>
											<Grid className="admit-reason">{d.message}</Grid>
											<Grid className="admit-btn-con">
												<p>({d.approve_cnt}/총인원)</p>
												<Button style={{ backgroundColor: '#CCFCCB', marginTop: '5px' }}>수락</Button>
											</Grid>
										</Grid>
									))
							}
						</Grid>
					</Grid>
				</Fade>
			</Modal>
			<EntrancePwModal open={pwModal} closeHandler={()=>null} CId={CId} UId={userData.user_id} />
		</>
	);
}

export default NowChallenge;
