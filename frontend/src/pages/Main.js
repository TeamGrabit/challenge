import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, Tabs, Tab } from '@material-ui/core';
import ChallengeList from '../components/ChallengeList';

function Main() {
	const [ing, setIng] = useState([
		{ name: "1일 1커밋 챌린지", id: 1 },
		{ name: "참여2", id: 2 },
		{ name: "참여3", id: 3 },
		{ name: "이름이 굉장히 그것도 굉장히 길고 긴 챌린지", id: 4 },
		{ name: "참여5", id: 5 },
		{ name: "참여6", id: 6 },
		{ name: "참여7", id: 7 }
	]);
	const [fin, setFin] = useState([
		{ name: "종료1", id: 8 },
		{ name: "종료2", id: 9 },
		{ name: "종료3", id: 10 }]);
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
				<ChallengeList list={ing} value={value} index={0}>
					item one
				</ChallengeList>
				<ChallengeList list={fin} value={value} index={1}>
					item two
				</ChallengeList>
			</div>
		</div>
	);
}

export default Main;
