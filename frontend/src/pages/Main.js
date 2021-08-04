import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, Tabs, Tab } from '@material-ui/core';
import ChallengeList from '../components/ChallengeList';
import { useUserState } from '../MVVM/Model/UserModel';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';

function Main() {
	const user_id = useUserState();
	const challengeData = useChallengeState();
	console.log(challengeData);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const AntTabs = withStyles({
		root: {
			flexGrow: 1,
			borderBottom: '1px solid #000000',
		},
		indicator: {
			display: 'flex',
			backgroundColor: "#96e6b3",
			height: 5,
		},
	})(Tabs);

	const AntTab = withStyles((theme) => ({
		root: {
			textTransform: 'none',
			fontSize: theme.typography.pxToRem(16),
			marginRight: theme.spacing(1),
			fontFamily: [
				'맑은 고딕',
				'Arial',
				'sans-serif',
			].join(','),
			'&$selected': {
				fontWeight: theme.typography.fontWeightBold,
			},
			'&:hover': {
				fontWeight: theme.typography.fontWeightBold,
			},
		},
		selected: {},
	}))((props) => <Tab disableRipple {...props} />);

	return (
		<div className="main">
			<div className="info">
				<AntTabs
					className="tab_sel"
					value={value}
					onChange={handleChange}
					aria-label="ant example"
				>
					<AntTab label="참여중인 챌린지" />
					<AntTab label="종료된 챌린지" />
				</AntTabs>
				<ChallengeList list={challengeData} index={value} user_id={user_id} />
			</div>
		</div>
	);
}

export default Main;
