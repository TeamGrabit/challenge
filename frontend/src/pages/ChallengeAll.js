import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChallengeTable from '../components/ChallengeTable';
import Paging from '../components/Paging';
import { Button } from '@material-ui/core';
import { API_URL } from '../CommonVariable';
import { useUserState } from '../MVVM/Model/UserModel';

function ChallengeAll() {
	const user_id = useUserState();
	const [allData, setAllData] = useState([]);
	const [showData, setShowData] = useState([]);
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
	};
	const handleFilter = (e) => {
		setFilter(e.target.value);
	};
	const handleSearch = () => {
		if(sel === "name") {
			setShowData(allData.filter(info => info.name.includes(filter)));
		} else if(sel === "challenge_leader") {
			setShowData(allData.filter(info => info.challenge_leader.includes(filter)));
		}
	};
	const handleEnter = (e) => {
		if(e.key === 'Enter'){
			handleSearch();
		}
	};
	const handleReset = () => {
		setShowData(allData);
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
			setShowData(res.data.challenges.filter(info => info.state == 0));
		});
	}, []);
	// console.log(allData);
	return (
		<div className="challengeAll">
			<div>
				<ChallengeTable data={currentPosts(showData)} user_id={user_id}/>
				<Paging page={page} count={showData.length} setPage={handlePage}/>
				<div className="search">
					<div className="search_field">
						<select
							className="select"
							value={sel}
							onChange={handleSelect}
							>
							{/*<option value="카테고리">카테고리</option>*/}
							<option value="name">제 목</option>
							<option value="challenge_leader">챌린지 리더</option>
						</select>
						<input type="text" className="filter" placeholder="검색어를 입력하세요" onChange={handleFilter} onKeyPress={handleEnter}/>
						<Button className="searchBtn" onClick={handleSearch}>검색</Button>
						<Button className="resetBtn" onClick={handleReset}>초기화</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChallengeAll;
