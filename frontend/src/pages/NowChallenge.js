import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

function NowChallenge(props) {
	const [title, setTitle] = useState("하루에 밥 한끼 먹기");

	// const postId = props.match.params.postId;
	// const variable = { postId: postId };
	// const [Title, setTitle] = useState("");
	// const [Nickname, setNickname] = useState("");
	// const [Content, setContent] = useState("");

	// useEffect(() => {
	// 	axios.post('/api/postDetail', variable)
	// 	.then(response=>{
	// 		setTitle(response.data.title)
	// 		setNickname(response.data.nickname)
	// 		setContent(response.data.content)
	// 	})
	// }, [])
	return (
		<Grid className="NowChallenge">
			<Grid className="head">
				<Typography className="headTitle">{title}</Typography>
				<Grid className="btnCon">
					<Button className="btn">Invite</Button>
					<Button className="btn">Admit</Button>
				</Grid>
			</Grid>
			{/* 팀 잔디 */}
			<Grid className="secondGrid">
				{/* 나의 잔디, 커밋왕 */}
				<Typography>secondGrid</Typography>
			</Grid>
			<Grid className="lastGrid">
				{/* 팀원 잔디, 실패왕, 최근커밋로그 */}
				<Typography>LastGrid</Typography>
			</Grid>
		</Grid>
	);
}

export default NowChallenge;
