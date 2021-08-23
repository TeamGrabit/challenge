import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Fade, Modal, TextField, Button, Backdrop } from '@material-ui/core';
import { API_URL } from '../CommonVariable';
import { useGetAlarms } from '../MVVM/ViewModel/AlarmViewModel';
import { useUserState } from '../MVVM/Model/UserModel'

function AlarmModal({ open, closeHandler }) {
	const userData = useUserState();
	const GetAlarms = useGetAlarms();
	const [Alarms, setAlarms] = useState([]);
	useEffect(() => {
		GetAlarms(userData.userId).then((docs) => {
			setAlarms(docs)
		})
	}, [userData])
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
						{
							Alarms === null ? <p>데이터를 불러오는 중입니다.</p>
								: Alarms === undefined ? <p>데이터가 없습니다.</p>
									: Alarms.map((d) => (
										<Grid className="admit-content">
											{d.message}
										</Grid>
									))
						}
					</Grid>
				</Grid>
			</Fade>
		</Modal>
	);
}

export default AlarmModal;
