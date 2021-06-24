import React, { useState, useEffect } from 'react';
import { Button, Box, Tabs, Tab, makeStyles, withStyles, Typography } from '@material-ui/core';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import ManageComponent from '../components/ManageComponent';

function ManageChallenge({ match }) {
	const CId = match.params.challengeId;
	const challengeData = useChallengeState();
	const [title, setTitle] = useState("");
	useEffect(() => {
		console.log(challengeData[CId - 1].name);
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
			height: '100vh',
		},
		tabs: {
			borderRight: `0px solid ${theme.palette.divider}`,
		},
	}));
	const classes = useStyles();

	const ManTab = withStyles((theme) => ({
		root: {
			width: '220px',
			height: '70px',
			textTransform: 'none',
			fontSize: theme.typography.pxToRem(19),
			marginRight: theme.spacing(1),
			backgroundColor: '#CCFCCB',
			fontFamily: [
				'맑은 고딕',
				'Arial',
				'sans-serif',
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
					<ManageComponent value={value} index={0} title={title}/>
					<ManageComponent value={value} index={1} />
					<ManageComponent value={value} index={2} />
					<ManageComponent value={value} index={3} />
					<ManageComponent value={value} index={4} />
					<ManageComponent value={value} index={5} />
				</div>
			</div>
		</div>
	);
}

export default ManageChallenge;
