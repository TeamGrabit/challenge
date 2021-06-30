import React, { useState, useEffect } from 'react';
import { Button, Box, Tabs, Tab, makeStyles, withStyles, useMediaQuery } from '@material-ui/core';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import ManageComponent from '../components/ManageComponent';

function ManageChallenge({ match }) {
	const CId = match.params.challengeId;
	console.log(CId);
	const challengeData = useChallengeState();
	const [title, setTitle] = useState("");
	useEffect(() => {
		if (CId !== undefined) console.log(challengeData[CId - 1].name);
		setTitle(challengeData[CId - 1].name);
	}, [CId, challengeData]);

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
						<div>{title}</div>
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
								<MobileTab label="..." />
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
								<ManTab label="..." />
								<ManTab label="챌린지 중단" />
							</Tabs>
					}
					<div className="comp_all">
						<ManageComponent value={value} index={0} CId={CId} />
						<ManageComponent value={value} index={1} CId={CId} />
						<ManageComponent value={value} index={2} CId={CId} />
						<ManageComponent value={value} index={3} CId={CId} />
						<ManageComponent value={value} index={4} CId={CId} />
						<ManageComponent value={value} index={5} CId={CId} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageChallenge;
