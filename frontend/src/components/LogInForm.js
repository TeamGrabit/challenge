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

function LogInForm({ loginHandler, id, setId, pw, setPw }) {
	return (
		<div className="form">
			<Grid>
				<Box mt={2}>
					<CssTextField variant="outlined" label="ID" placeholder="아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)} />
				</Box>
				<Box mt={2}>
					<CssTextField variant="outlined" label="PW" type="password" placeholder="비밀번호를 입력하세요" value={pw} onChange={(e) => setPw(e.target.value)} />
				</Box>
			</Grid>
			<Button className="loginBtn" variant="contained" onClick={loginHandler}>LogIn</Button>
		</div>
	);
}

export default LogInForm;
