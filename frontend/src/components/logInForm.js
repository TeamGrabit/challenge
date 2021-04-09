import React from 'react';
import { TextField, Button, Box, Grid, GridList } from '@material-ui/core';

function LogInForm() {
	return (
		<div style={{ display: 'flex' }}>
			{/* <GridList cols={2} className="logInForm"> */}
			<Grid>
				<Box mt={2}>
					<TextField variant="outlined" label="ID" placeholder="아이디를 입력하세요" helperText="영문자/숫자, 5~10자 이내" />
				</Box>
				<Box mt={2}>
					<TextField variant="outlined" label="PW" placeholder="비밀번호를 입력하세요" helperText="영문자/숫자/특수문자, 8~20자 이내" />
				</Box>
			</Grid>
			<Grid>
				<Button shape="round" className="btn" variant="contained">LogIn</Button>
			</Grid>
			{/* </GridList> */}
		</div>
	);
}

export default LogInForm;
