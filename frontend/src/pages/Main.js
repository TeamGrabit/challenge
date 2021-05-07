import React, { useState, useEffect } from 'react';
import { Grid, Button, Tabs, Tab, AppBar } from '@material-ui/core';
import ChallengeList from '../components/ChallengeList';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

function Main() {
	const [ing, setIng] = useState(["참여1", "참여2", "참여3"]);
	const [fin, setFin] = useState(["종료1", "종료2", "종료3"]);
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
