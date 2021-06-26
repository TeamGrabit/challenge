import React, { useState } from 'react';
import { Paper, withStyles, Box, Grid, Button, TextField } from '@material-ui/core';

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#464E47',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#464E47',
			},
			'&:hover fieldset': {
				borderColor: '#96E6B3',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#96E6B3',
			},
		},
	},
})(TextField);

function RegisterForm({ changeStatus }) {
    
	return (
		<div className="register-form">
			<Grid>
				<Box mt={2}>
					<CssTextField required variant="outlined" label="이름" placeholder="이름을 입력하세요" 
                    // error={this.state.data.customer === "" ? true : false }
                    helperText="This is Helper Text"/>
				</Box>
				<Box mt={2}>
					<CssTextField required variant="outlined" label="email" placeholder="email을 입력하세요" />
				</Box>
				<Box mt={2}>
					<CssTextField required variant="outlined" label="ID" placeholder="아이디를 입력하세요" />
				</Box>
				<Box mt={2}>
					<CssTextField required variant="outlined" label="PW" type="password" placeholder="비밀번호를 입력하세요" />
				</Box>
				<Box mt={2}>
					<CssTextField required variant="outlined" label="PW 확인" type="password" placeholder="비밀번호를 한번 더 입력하세요" />
				</Box>
				<Box mt={2}>
					<CssTextField required variant="outlined" label="Github ID" placeholder="Github ID를 입력하세요" />
				</Box>
			</Grid>
		</div>
	);
}

export default RegisterForm;
