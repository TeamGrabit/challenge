import React, { useState } from 'react';
import { Button, Modal, makeStyles, Backdrop, Fade } from '@material-ui/core';
import { RequestApproval } from '../components/index';

function getModalStyle() {
	const top = 0;
	const left = 0;

	return {
		top: `${top}%`,
		left: `${left}%`,
	};
}

function challengeInfoFix(props) {
	const _challengeId = props.match.params.challengeId;
	const [open, setopen] = useState(false);
	const [modalStyle] = useState(getModalStyle);
	const handleOpen = () => {
		setopen(true);
	};
	const handleClose = () => {
		setopen(false);
	};
	return (
		<div className="challengeInfoFix">
			<div className="body">
				<div className="title">
					나의 챌린지 현황
				</div>
				<div className="box">
					<Button className="status_box" onClick={handleOpen}>
						여기에 네모들 들어갈 예정
					</Button>
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
				style={modalStyle}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="modalPaper">
						<RequestApproval />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default challengeInfoFix;
