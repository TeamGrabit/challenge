import React, { useState } from 'react';
import DateToString from '../functions/DateToString';
import { EntrancePwModal, Spinner } from '../components';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

function ChallengeTable({ data, user_id, loading}) {	
	const [pwModal, setPwModal] = useState(false);
	const [selChallenge, setSelChallenge] = useState("");
	const JoinHandler = (sel_id) => {
		setSelChallenge(sel_id);
		setPwModal(true);
	};
	return (
		<div className="container_table">
			{loading ? <Spinner /> :
			<Table className="cha_Table">
				<TableHead className="cha_TableHead">
					<TableRow className="headRow">
						<TableCell className="headCate">카테고리</TableCell>
						<TableCell className="headTitle">제목</TableCell>
						<TableCell className="headStart">시작</TableCell>
						<TableCell className="headEnd">종료</TableCell>
						<TableCell className="headLeader">챌린지 리더</TableCell>
						<TableCell className="headJoin">참여하기</TableCell>
					</TableRow>
				</TableHead>
				<TableBody className="cha_TableBody">
					{data !== undefined && data.map((c) => (
						<TableRow className="bodyRow">
							<TableCell className="bodyCate">-</TableCell>
							<TableCell className="bodyTitle">
								<div className="cha_name">
									{c.name}
								</div>
							</TableCell>
							<TableCell className="bodyStart">{DateToString(c.challenge_start)}</TableCell>
							<TableCell className="bodyEnd">{DateToString(c.challenge_end)}</TableCell>
							<TableCell className="bodyLeader">{c.challenge_leader}</TableCell>
							<TableCell className="bodyJoin">
								{c.challenge_users.includes(user_id.user_id) === false ?
									<div>
										<Button className="joinBtn" variant="contained" color="secondary" onClick={() => JoinHandler(c._id)}>Join</Button>
									</div>
									:
									<div>참여중</div>
								}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			}
			<EntrancePwModal open={pwModal} closeHandler={()=>setPwModal(false)} CId={selChallenge} UId={user_id.user_id} />
		</div>
	)
}

export default ChallengeTable;
