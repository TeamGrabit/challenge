import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Fade, Modal, TextField, Button, Backdrop } from '@material-ui/core';
import { API_URL } from '../CommonVariable';

function InviteModal({ open, closeHandler, CId }) {
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
			closeHandler();
			setEmail("");
		}).catch((e) => {
			alert(`${e} 오류가 발생했습니다.`);
		});
	};
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
					<Grid className="head">초대하기</Grid>
					<Grid className="body">
						<form onSubmit={inviteHandler}>
							<Grid className="input-con">
								<TextField
									variant="outlined"
									label="E-mail"
									fullWidth
									value={email}
									onChange={emailHandler}
								/>
								<Button
									style={{ marginLeft: '1rem', backgroundColor: '#CCFCCB', height: '100%' }}
									type="submit"
								>
									전송
								</Button>
							</Grid>
						</form>
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
	);
}

export default InviteModal;
