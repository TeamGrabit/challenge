import React, { useState, useEffect } from 'react';
import { Button, Modal, Backdrop, Fade, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { RequestApproval } from '../components/index';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import { useUserState } from '../MVVM/Model/UserModel';
import { API_URL } from '../CommonVariable';

function ChallengeInfoFix(props) {
	const history = useHistory();
	const _props = props;
	const _challengeId = _props.match.params.challengeId;
	const challengeData = useChallengeState();
	const userData = useUserState();
	const [MyGrass, setMyGrass] = useState();
	const [open, setopen] = useState(false);
	const [Month, setMonth] = useState(0);
	const [Day, setDay] = useState(0);
	const today = new Date();
	const handleOpen = (check_true, a, b) => {
		if (!check_true) {
			setMonth(a);
			setDay(b);
			setopen(true);
		}
	};
	const handleClose = () => {
		setopen(false);
	};
	const grassHandler = () => {
		history.push(`/challenge/info/${_challengeId}`);
	};
	useEffect(() => {
		axios.get(`${API_URL}/grass/personal`, {
			params: {
				user_id: userData.userId,
				challenge_id: _challengeId,
				month: today.getMonth() + 1,
				year: today.getFullYear()
			}
		}).then((res) => {
			setMyGrass(res.data.isCommitedList.map((array) => array.map((data, index) => [data, index + 1])));
		})
			.catch((error) => { console.log(error); });
	}, [challengeData]);
	const day = new Date();
	const month = day.getMonth() + 1;
	return (
		<div className="challengeInfoFix">
			<div className="body">
				<div className="title">
					나의 챌린지 현황
				</div>
				<div className="box">
					<Grid className="myGrass">
						{MyGrass !== undefined && MyGrass[0].map((data) => (
							<div className="setBtn">
								<Grid className={['grass', data[0] ? 'fill-grass' : 'unfill-grass']} onClick={() => handleOpen(data[0], (month + 10) % 12, data[1])} role="button" tabIndex={0}>
									<div className="text">
										{(month + 10) % 12}
										/
										{data[1]}
									</div>
								</Grid>
							</div>
						))}
						{MyGrass !== undefined && MyGrass[1].map((data) => (
							<div className="setBtn">
								<Grid className={['grass', data[0] ? 'fill-grass' : 'unfill-grass']} onClick={() => handleOpen(data[0], (month + 11) % 12, data[1])} role="button" tabIndex={0}>
									<div className="text">
										{(month + 11) % 12}
										/
										{data[1]}
									</div>
								</Grid>
							</div>
						))}
						{MyGrass !== undefined && MyGrass[2].map((data) => (
							<div className="setBtn">
								<Grid className={['grass', data[0] ? 'fill-grass' : 'unfill-grass']} onClick={() => handleOpen(data[0], (month + 12) % 12, data[1])} role="button" tabIndex={0}>
									<div className="text">
										{(month + 12) % 12}
										/
										{data[1]}
									</div>
								</Grid>
							</div>
						))}
					</Grid>
				</div>
				<div className="btnSet">
					<Button className="Btn" type="button" onClick={grassHandler}>
						변경완료
					</Button>
				</div>
			</div>
			<Modal
				className="modal"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="modalPaper">
						<RequestApproval onClose={handleClose} challengeId={_challengeId} userId={userData.userId} month={Month} day={Day} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default ChallengeInfoFix;
