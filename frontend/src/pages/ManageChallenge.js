import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Tabs, Tab, makeStyles, withStyles, useMediaQuery } from '@material-ui/core';
import ManageComponent from '../components/ManageComponent';
import { API_URL } from '../CommonVariable';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import { useUserState } from '../MVVM/Model/UserModel';

function ManageChallenge({ match }) {
	const user_id = useUserState();
	const CId = match.params.challengeId;
	const compo_number = [0, 1, 2, 3, 4, 5];
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
		<div className="manageChallenge">
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
								<MobileTab label="이름" />
								<MobileTab label="멤버" />
								<MobileTab label="날짜" />
								<MobileTab label="..." />
								<MobileTab label="탈퇴" />
								<MobileTab label="중단" />
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
								<ManTab label="챌린지 이름 관리" />
								<ManTab label="챌린지 멤버 관리" />
								<ManTab label="챌린지 날짜 관리" />
								<ManTab label="..." />
								<ManTab label="챌린지 탈퇴" />
								<ManTab label="챌린지 중단" />
							</Tabs>
					}
					<div className="comp_all">
						{compo_number.map((c) => (
							<ManageComponent
								value={value}
								index={c}
								challengeData={challengeData}
								setChallengeData={setChallengeData}
								CId={CId}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageChallenge;
