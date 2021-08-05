import React, { useState } from 'react';
import { Paper, Checkbox, FormGroup, FormControlLabel, Button } from '@material-ui/core';

function RegisterTerms({ changeStatus }) {
	const [checked, setChecked] = React.useState(false);

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};
	return (
		<div className="register-terms">
			<Paper className="terms" variant="outlined">
				<div className="stuff">
					<p className="title">회 원 약 관</p>
					이것은 회원 약관이다.
					동해 물과 백두산이 마르고 닳도록
					하느님이 보우하사 우리나라 만세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
					남산 위에 저 소나무, 철갑을 두른 듯
					바람 서리 불변함은 우리 기상일세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
					가을 하늘 공활한데 높고 구름 없이
					밝은 달은 우리 가슴 일편단심일세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
					이 기상과 이 맘으로 충성을 다하여
					괴로우나 즐거우나 나라 사랑하세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
					동해 물과 백두산이 마르고 닳도록
					하느님이 보우하사 우리나라 만세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
					남산 위에 저 소나무, 철갑을 두른 듯
					바람 서리 불변함은 우리 기상일세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
					가을 하늘 공활한데 높고 구름 없이
					밝은 달은 우리 가슴 일편단심일세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
					이 기상과 이 맘으로 충성을 다하여
					괴로우나 즐거우나 나라 사랑하세.
					무궁화 삼천리 화려 강산
					대한 사람, 대한으로 길이 보전하세.
				</div>
			</Paper>
			<div className="checkform">
				<FormGroup row>
					<FormControlLabel
						className="text"
						control={<Checkbox checked={checked} onChange={handleChange} name="checked" />}
						label="동의"
					/>
				</FormGroup>
				<Button
					className="btn"
					variant="contained"
					onClick={() => changeStatus(1)}
					disabled={!checked}
				>
					다음
				</Button>
			</div>
		</div>
	);
}

export default RegisterTerms;
