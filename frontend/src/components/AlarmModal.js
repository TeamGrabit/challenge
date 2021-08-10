import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Fade, Modal, TextField, Button, Backdrop } from '@material-ui/core';
import { API_URL } from '../CommonVariable';

function AlarmModal({ open, closeHandler }) {
	return (
		<Modal
			className="modal"
			open={open}
			onClose={closeHandler}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<Grid className="inviteModalPaper">
					<Grid className="head">알림</Grid>
					<Grid className="admit-body">
						<Grid className="admit-content">
							{/* 알람 불러오기 */}
							hi
						</Grid>
					</Grid>
				</Grid>
			</Fade>
		</Modal>
	);
}

export default AlarmModal;
