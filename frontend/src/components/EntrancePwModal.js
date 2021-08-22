import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid, Fade, Modal, TextField, Button, Backdrop } from '@material-ui/core';
import { API_URL } from '../CommonVariable';

function EntrancePwModal({ open, CId, UId, closeHandler }) {
	const history = useHistory();
	const [pw, setPw] = useState('');
	const changeHandler = (e) => {
		setPw(e.target.value);
	}
	const submitHandler = (e) => {
		console.log(CId);
		console.log(pw);
		axios.patch(`${API_URL}/challenge/${CId}/in`, {
			user_id: UId,
			private_key: pw
		})
			.then((res) => {
				if(res.data) {
					alert(`가입되셨습니다!`);
					window.location.href=`/challenge`; // 리렌더링 필요
				}
				console.log(res);
			})
			.catch((e) => {
				alert(e);
			});
		e.preventDefault();
	}

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
				<Grid className="modal-background-4">
					<Grid className="head">비밀번호</Grid>
					<Grid className="body">
						<form onSubmit={submitHandler}>
							<Grid className="input-con">
								<TextField
									variant="outlined"
									label="Password"
									fullWidth
									value={pw}
									onChange={changeHandler}
									type="password"
								/>
								<Button
									style={{ marginLeft: '1rem', backgroundColor: '#CCFCCB', height: '100%' }}
									type="submit"
								>
									확인
								</Button>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</Fade>
		</Modal>
	);
}

export default EntrancePwModal;
