import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Box, Tabs, Tab, makeStyles, withStyles, useMediaQuery } from '@material-ui/core';
import { API_URL } from '../CommonVariable';
import { useUserState } from '../MVVM/Model/UserModel';

function ResignChallenge({ match }) {
	const CId = match.params.challengeId;
	const [challengeData, setChallengeData] = useState([]);
	useEffect(() => {
		axios.get(`${API_URL}/challenge/${CId}`).then((res) => {
			console.log(res.data);
			setChallengeData(res.data);
			console.log(challengeData);
		});
	}, [CId]);
	const [value, setValue] = useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.paper,
			display: 'flex',
		},
		tabs: {
			borderRight: `0px solid ${theme.palette.divider}`,
		},
	}));
	const classes = useStyles();
	const isMobile = useMediaQuery("(max-width: 600px)");

	const ManTab = withStyles((theme) => ({
		root: {
			width: '220px',
			height: '70px',
			textTransform: 'none',
			fontSize: theme.typography.pxToRem(19),
			marginRight: theme.spacing(1),
			backgroundColor: '#CCFCCB',
			fontFamily: [
				'맑은 고딕', 'Arial', 'sans-serif',
			].join(','),
			'&$selected': {
				fontWeight: theme.typography.fontWeightBold,
				backgroundColor: '#96E6B3',
			},
			'&:hover': {
				fontWeight: theme.typography.fontWeightBold,
			},
		},
		selected: {},
	}))((props) => <Tab disableRipple {...props} />);

	const MobileTab = withStyles((theme) => ({
		root: {
			width: '50px',
			height: '20px',
			textTransform: 'none',
			fontSize: theme.typography.pxToRem(15),
			marginRight: theme.spacing(1),
			backgroundColor: '#CCFCCB',
			fontFamily: [
				'맑은 고딕', 'Arial', 'sans-serif',
			].join(','),
			'&$selected': {
				fontWeight: theme.typography.fontWeightBold,
				backgroundColor: '#96E6B3',
			},
			'&:hover': {
				fontWeight: theme.typography.fontWeightBold,
			},
		},
		selected: {},
	}))((props) => <Tab disableRipple {...props} />);

	return (
		<div className="resignChallenge">
			<div className="content">
				<div className="cha_nameBox">
					<div className="cha_name">
						<div>{challengeData.name}</div>
					</div>
				</div>
				<div className={classes.root}>
					{
						isMobile ?
							<Tabs
								orientation="vertical"
								className={classes.tabs}
								value={value}
								onChange={handleChange}
								aria-label="ant example"
								indicatorColor="transparent"
							>
								<MobileTab label="멤버" />
							</Tabs>
							:
							<Tabs
								orientation="vertical"
								className={classes.tabs}
								value={value}
								onChange={handleChange}
								aria-label="ant example"
								indicatorColor="transparent"
							>
								<ManTab label="챌린지 멤버" />
							</Tabs>
					}
					<div className="comp_all">
						<div className="comp_box">
							{/* <div className="title_box">
								<div className="comp_title">챌린지 멤버 관리</div>
							</div>
							<div className="content_box">
								<Grid container spacing={1}>
									{challengeData.challenge_users.map((c) => (
										<Grid item lg={3} md={4} sm={6} xs={12}>
											<div className="member_box">
												<Box className="member_inner" value={c}>
													{c}
												</Box>
											</div>
										</Grid>
									))}
								</Grid>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResignChallenge;
