import React, { useState } from 'react';
import { Button, Modal, makeStyles, Backdrop, Fade } from '@material-ui/core';
import RequestApproval from '../components/RequestApproval';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
	},
}));

function challengeStatusModify() {
	const classes = useStyles();
	const [open, setopen] = useState(false);
	const handleOpen = () => {
		setopen(true);
	};
	const handleClose = () => {
		setopen(false);
	};
	return (
		<div className="challengeStatusModify">
			<div className="body">
				<div className="title">
					나의 챌린지 현황
				</div>
				<div className="box">
					<Button className="status_box" onClick={handleOpen}>
						여기에 네모들 들어갈 예정
					</Button>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<div className={classes.paper}>
								<RequestApproval />
							</div>
						</Fade>
					</Modal>
				</div>
				<Button className="canselBtn" type="button">
					취소
				</Button>
				<Button className="completeBtn" type="button">
					수정완료
				</Button>
			</div>
		</div>
	);
}

export default challengeStatusModify;
