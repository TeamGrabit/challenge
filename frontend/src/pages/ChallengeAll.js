import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import ChallengeTable from '../components/ChallengeTable';
import Paging from '../components/Paging';
import { API_URL } from '../CommonVariable';
import { useUserState } from '../MVVM/Model/UserModel';

function ChallengeAll() {
	const user_id = useUserState();
	const [allData, setAllData] = useState([]);
	const [page, setPage] = useState(1);
	const postsPerPage = 10;
	const indexOfLast = page * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const handlePage = (newValue) => {
		console.log(newValue);
		setPage(newValue);
	};
	function currentPosts(tmp) {
	  let currentPosts = 0;
	  currentPosts = tmp.slice(indexOfFirst, indexOfLast);
	  return currentPosts;
	}
	useEffect(() => {
		axios.get(`${API_URL}/challenge`).then((res) => {
			console.log(res.data);
			setAllData(res.data.challenges.filter( info => info.state == 0));
		});
	}, []);
	// console.log(allData);
	return (
		<div className="challengeAll">
			<div>
				<ChallengeTable data={currentPosts(allData)} user_id={user_id}/>
				<Paging page={page} count={allData.length} setPage={handlePage}/>
			</div>
		</div>
	);
}

export default ChallengeAll;
