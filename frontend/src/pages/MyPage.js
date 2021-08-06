import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Input, TextField, Modal, Backdrop, Fade } from '@material-ui/core';
import axios from 'axios';
import { SideBar, ChangePassword } from '../components/index';
import { useUserState } from '../MVVM/Model/UserModel';
import { useChange } from '../MVVM/ViewModel/UserViewModel';
import { API_URL } from '../CommonVariable';

function MyPage() {
	const userData = useUserState();
	const Change = useChange();
	const [Name, setName] = useState();
	const [Email, setEmail] = useState();
	const [GitId, setGitId] = useState();
	const [open, setopen] = useState(false);
	useEffect(() => {
		axios.get(`${API_URL}/user/${userData.userId}`).then((res) => {
			setName(res.data.user_name);
			setEmail(res.data.user_email);
			setGitId(res.data.git_id);
		})
			.catch((error) => { console.log(error); });
	}, []);
	const handleOpen = () => {
		setopen(true);
	};
	const handleClose = () => {
		setopen(false);
	};
	const changeName = (e) => {
		setName(e.currentTarget.value);
	};
	const changeGitId = (e) => {
		setGitId(e.currentTarget.value);
	};
	const save = async () => {
		const result = await Change(userData.userId, Name, GitId);
		console.log(result)
		if (result) {
			alert('정보를 수정하였습니다.');
		} else alert('정보 수정에 실패했습니다.');
	};
	return (
		<div className="mypage">
			<SideBar />
			<Grid container className="profile">
				<Grid item xs={12}>
					<Grid container spacing={3} justify="center">
						<Grid item>
							<Box className="pro_img">
								<img src={`https://github.com/${userData.gitId}.png`} alt={`${userData.gitId}`} className="pro_img" />
							</Box>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={4} alignItems="center" justify="center">
						<Grid item>
							<Box className="pro_name">
								이름
							</Box>
						</Grid>
						<Grid item>
							<TextField value={Name} onChange={changeName} className="pro_nameFix" />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2} alignItems="center" justify="center">
						<Grid item>
							<Box className="pro_email">
								이메일
							</Box>
						</Grid>
						<Grid item>
							<TextField value={Email} disabled className="pro_emailFix" />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3} alignItems="center" justify="center">
						<Grid item>
							<Box className="pro_github">
								github
							</Box>
						</Grid>
						<Grid item>
							<TextField value={GitId} onChange={changeGitId} className="pro_githubFix" />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3} justify="center">
						<Grid item>
							<Button className="pro_password" onClick={handleOpen}>
								패스워드 변경
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3} justify="center">
						<Grid item>
							<Button className="pro_secession">
								회원탈퇴
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<Grid container spacing={3} justify="center">
						<Grid item>
							<Button className="pro_save" onClick={save}>
								저장
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
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
						<ChangePassword onClose={handleClose} id={userData.userId} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

export default MyPage;
