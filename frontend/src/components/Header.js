import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Popover,
	MenuItem
} from '@material-ui/core';

import { useUserState } from '../MVVM/Model/UserModel';
import { useLogoutUser, useVerifyUser } from '../MVVM/ViewModel/UserViewModel';

function Header() {
	const userState = useUserState();
	const userlogout = useLogoutUser();
	const userVerify = useVerifyUser();
	// const git = "MOBUMIN";

	const [isLogined, setIsLogined] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		userVerify();
	}, []);

	useEffect(() => {
		if (userState.auth === "user") setIsLogined(true);
		console.log(userState);
	}, [userState]);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = async () => {
		await userlogout().then((result) => {
			console.log(result);
			if (result) {
				alert('로그아웃 성공');
				window.location.href = '/';
			} else alert('로그아웃 실패');
		});
		setIsLogined(false);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'menulist' : undefined;

	return (
		<AppBar className="header" position="static">
			<Toolbar>
				{
					isLogined ?
						<Link className="link" to="/challenge">
							<img className="logoImg" src="/ChallengeLogo.png" alt="logo" />
							<Typography className="title" variant="h5">
								세살버릇 여든까지
							</Typography>
						</Link>
						:
						<Link className="link" to="/">
							<img className="logoImg" src="/ChallengeLogo.png" alt="logo" />
							<Typography className="title" variant="h5">
								세살버릇 여든까지
							</Typography>
						</Link>
				}
				<div className="grow" />
				{
					isLogined ?
						<>
							<IconButton onClick={handleClick}>
								<img src={`https://github.com/${userState.gitId}.png`} alt={`${userState.gitId}`} className="profileImg" />
							</IconButton>
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<Link className="link" to="/mypage"><MenuItem>마이페이지</MenuItem></Link>
								<MenuItem onClick={logout}>로그아웃</MenuItem>
							</Popover>
						</>
						:
						<>
							<Link className="link" to="/login">
								<Button className={`${`profileBtn`} ${`loginBtn`}`}>로그인</Button>
							</Link>
							<Link className="link" to="/register">
								<Button className="profileBtn">회원가입</Button>
							</Link>
						</>
				}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
