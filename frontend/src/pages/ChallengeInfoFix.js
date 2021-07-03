import React, { useState } from 'react';
import { Button, Modal, Backdrop, Fade, Grid } from '@material-ui/core';
import Slider from 'react-slick';
import { RequestApproval } from '../components/index';

function ChallengeInfoFix(props) {
	const _props = props;
	const _challengeId = _props.match.params.challengeId;
	console.log(_challengeId);
	const [open, setopen] = useState(false);
	const handleOpen = () => {
		setopen(true);
	};
	const handleClose = () => {
		setopen(false);
	};
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
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: 'grass-slider'
	};
	const Ahe = () => {
		alert('1');
	};
	return (
		<div className="challengeInfoFix">
			<div className="body">
				<div className="title">
					나의 챌린지 현황
				</div>
				<div className="box">
					<Grid className="left-con">
						<Slider {...settings}>
							{
								otherGrass.map((data) => (
									<Grid className="myGrass">
										{data.map((g) => (
											<button className="setBtn" type="button" onClick={Ahe}>
												<Grid className={['grass', g ? 'fill-grass' : 'unfill-grass']} />
											</button>
										))}
									</Grid>
								))
							}
						</Slider>
					</Grid>
				</div>
				<div className="btnSet">
					<Button className="Btn" type="button">
						취소
					</Button>
					<Button className="Btn" type="button">
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
						<RequestApproval onClose={handleClose} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default ChallengeInfoFix;
