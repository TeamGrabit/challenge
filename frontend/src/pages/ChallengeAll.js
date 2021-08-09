import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, withStyles, Tabs, Tab } from '@material-ui/core';
import { API_URL } from '../CommonVariable';
import { useUserState } from '../MVVM/Model/UserModel';
import { useGetChallengeAll } from '../MVVM/ViewModel/ChallengeViewModel';

function ChallengeAll() {
	// const user_id = useUserState();
	// const getChallengeAll = useGetChallengeAll();
	// console.log('challengeAll');
	const [allData, setAllData] = useState([]);
	useEffect(() => {
		axios.get(`${API_URL}/challenge`).then((res) => {
			console.log(res.data);
			setAllData(res.data.challenges);
		});
	}, []);
	console.log(allData);
	return (
		<div className="challengeAll">
			{allData !== undefined && allData.map((c) => (
				<div className="cha_name">{c.name}</div>
			))}
		</div>
	);
}

export default ChallengeAll;
