import React, { useState } from 'react';
import { Paper, Checkbox, FormGroup, FormControlLabel, Button } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

function RegisterComplete() {
	return (
		<div className="register-complete">
			<EmojiPeopleIcon />
			<div className="desc">
				<p className="title">회원 가입 완료</p>
				<p>회원 가입이 정상적으로 완료되었습니다.</p>
				<Button
					className="btn"
					variant="contained"
					onClick={() => { window.location.href = '/login'; }}
				>
					확인
				</Button>
			</div>
		</div>
	);
}

export default RegisterComplete;
