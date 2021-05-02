import React from 'react';
import { TextField, Button, Box, Grid } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

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

function LogInForm() {
	return (
		<div className="form">
			<Grid>
				<Box mt={2}>
					<CssTextField variant="outlined" label="ID" placeholder="아이디를 입력하세요" />
				</Box>
				<Box mt={2}>
					<CssTextField variant="outlined" label="PW" type="password" placeholder="비밀번호를 입력하세요" />
				</Box>
			</Grid>
			<Button className="loginBtn" variant="contained">LogIn</Button>
		</div>
	);
}

export default LogInForm;
