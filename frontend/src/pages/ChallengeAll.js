import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChallengeTable from '../components/ChallengeTable';
import Paging from '../components/Paging';
import { API_URL } from '../CommonVariable';
import { useUserState } from '../MVVM/Model/UserModel';

function ChallengeAll() {
	const user_id = useUserState();
	const [allData, setAllData] = useState([]);
	const [page, setPage] = useState(1);
	const [sel, setSel] = useState("name");
	const [filter, setFilter] = useState("");
	const postsPerPage = 10;
	const indexOfLast = page * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const handlePage = (newValue) => {
		console.log(newValue);
		setPage(newValue);
	};
	const handleSelect = (e) => {
		setSel(e.target.value);
		console.log(e.target.value);
	};
	const handleFilter = (e) => {
		setFilter(e.target.value);
		// setAllData.filter(info => info.sel.includes(e.target.value));
	};
	function currentPosts(tmp) {
	  let currentPosts = 0;
	  currentPosts = tmp.slice(indexOfFirst, indexOfLast);
	  return currentPosts;
	};
	useEffect(() => {
		axios.get(`${API_URL}/challenge`).then((res) => {
			console.log(res.data);
			setAllData(res.data.challenges.filter(info => info.state == 0));
		});
	}, []);
	// console.log(allData);
	return (
		<div className="challengeAll">
			<div>
				<ChallengeTable data={currentPosts(allData)} user_id={user_id}/>
				<Paging page={page} count={allData.length} setPage={handlePage}/>
				<div className="search">
					<select
						className="select"
						value={sel}
						onChange={handleSelect}
						>
						{/*<option value="카테고리">카테고리</option>*/}
						<option value="name">제 목</option>
						<option value="challenge_leader">챌린지 리더</option>
					</select>
					<input type="text" className="filter" placeholder="검색" onChange={handleFilter}/>
				</div>
			</div>
		</div>
	);
}

export default ChallengeAll;
