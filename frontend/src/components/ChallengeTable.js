import React from 'react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

function ChallengeTable({ data, user_id }) {
	return (
		<div>
			<Table className="cha_Table">
				<TableHead className="cha_TableHead">
					<TableRow className="headRow">
						<TableCell className="headCate">카테고리</TableCell>
						<TableCell className="headTitle">제목</TableCell>
						<TableCell className="headLeader">챌린지 리더</TableCell>
						<TableCell className="headJoin">참여하기</TableCell>
					</TableRow>
				</TableHead>
				<TableBody className="cha_TableBody">
					{data !== undefined && data.map((c) => (
						c.state === 0 &&
						<TableRow className="bodyRow">
							<TableCell className="bodyCate">-</TableCell>
							<TableCell className="bodyTitle">
								<div className="cha_name">
									{c.name}
								</div>
							</TableCell>
							<TableCell className="bodyLeader">{c.challenge_leader}</TableCell>
							<TableCell className="bodyJoin">
								{c.challenge_users.includes(user_id.userId) === false ?
									<Button className="joinBtn" variant="contained" color="secondary">Join</Button>
									:
									<div>참여중</div>
								}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default ChallengeTable;
