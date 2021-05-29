import React, { useState, useEffect } from 'react';
import { Button, Grid, Tabs, Tab, Typography } from '@material-ui/core';
import { useChallengeState } from '../MVVM/Model/ChallengeModel';
import ManageComponent from '../components/ManageComponent';

function ManageChallenge({ match }) {
	const CId = match.params.challengeId;
	const challengeData = useChallengeState();
	const [title, setTitle] = useState("");
	useEffect(() => {
		// 추후 challengeId 넣어서 해당 정보만 받아아오기
		console.log(challengeData[CId - 1].name);
		setTitle(challengeData[CId - 1].name);
	}, [CId, challengeData]);

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="ManageChallenge">
			<div className="info">
				<Tabs
					orientation="vertical"
					className="man_tab"
					value={value}
					onChange={handleChange}
					aria-label="ant example"
				>
					<Tab label="Item One" />
					<Tab label="Item Two" />
					<Tab label="Item Three" />
					<Tab label="Item Four" />
					<Tab label="Item Five" />
					<Tab label="Item Six" />
				</Tabs>
				<ManageComponent value={value} index={0} />
				<ManageComponent value={value} index={1} />
				<ManageComponent value={value} index={2} />
				<ManageComponent value={value} index={3} />
				<ManageComponent value={value} index={4} />
				<ManageComponent value={value} index={5} />
			</div>
		</div>
	);
}

export default ManageChallenge;
