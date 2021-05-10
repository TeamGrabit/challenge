import React, { useState, useEffect } from 'react';
import { Grid, Button, Tabs, Tab, AppBar, Link } from '@material-ui/core';
import ChallengeList from '../components/ChallengeList';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function Main() {
	const [ing, setIng] = useState([
		{ name: "참여1", id: 1 },
		{ name: "참여2", id: 2 },
		{ name: "참여3", id: 3 },
		{ name: "참여4", id: 4 },
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

	return (
		<div className="main">
			<div className="info">
				<Tabs className="tab_sel" value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="참여중인 챌린지" {...a11yProps(0)} />
					<Tab label="종료된 챌린지" {...a11yProps(1)} />
				</Tabs>
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
