import React, { useState } from 'react';
import { Button, Modal, Backdrop, Fade, Grid } from '@material-ui/core';
import Slider from 'react-slick';
import { RequestApproval } from '../components/index';

function ChallengeInfoFix(props) {
	const _props = props;
	const _challengeId = _props.match.params.challengeId;
	const [open, setopen] = useState(false);
	const handleOpen = () => {
		setopen(true);
	};
	const handleClose = () => {
		setopen(false);
	};
	const grassHandler = () => {
		window.location.href = `/challenge/info/${_challengeId}`;
	};
	const grassInitialData = [
		[
			true, false, false, false, true, false, false,
			false, false, true, false, false, true, false,
			true, false, false, false, false, false, true,
			true, false, false, false, false, false, true,
			true, false, false
		],
		[
			true, false, false, false, true, false, false,
			false, false, true, false, false, true, false,
			true, false, false, false, false, false, true,
			true, false, false, false, false, false, true,
			true, false
		],
		[
			true, false, false, false, true, false, false,
			false, false, true, false, false, true, false,
			true, false, false, false, false, false, true,
			true, false, false, false, false, false, true,
			true, false, true
		]
	];
	const grassData = grassInitialData.map((array) => array.map((data, index) => [data, index + 1]));
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
						{grassData[0].map((data) => (
							<div className="setBtn">
								<Grid className={['grass', data[0] ? 'fill-grass' : 'unfill-grass']} onClick={handleOpen} role="button" tabIndex={0}>
									<div className="text">
										{(month + 10) % 12}
										/
										{data[1]}
									</div>
								</Grid>
							</div>
						))}
						{grassData[1].map((data) => (
							<div className="setBtn">
								<Grid className={['grass', data[0] ? 'fill-grass' : 'unfill-grass']} onClick={handleOpen} role="button" tabIndex={0}>
									<div className="text">
										{(month + 11) % 12}
										/
										{data[1]}
									</div>
								</Grid>
							</div>
						))}
						{grassData[2].map((data) => (
							<div className="setBtn">
								<Grid className={['grass', data[0] ? 'fill-grass' : 'unfill-grass']} onClick={handleOpen} role="button" tabIndex={0}>
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
						취소
					</Button>
					<Button className="Btn" type="button" onClick={grassHandler}>
						수정완료
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
						<RequestApproval onClose={handleClose} ch_id={_challengeId} user_id="qf9ar8nv" />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default ChallengeInfoFix;
