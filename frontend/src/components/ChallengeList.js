import React from 'react';
import { Button, Grid, Box } from '@material-ui/core';
import { Spinner } from '../components';
import { Link } from 'react-router-dom';

function ChallengeList({ list, index, user }) {
	
	return (
		<div>
			<div className="challengeList">
				{user.user_id === undefined ? <Spinner /> :
				<Grid container spacing={3} className="cha_list">
					{list.map((c, i) => (
						index === c.state &&
						<Grid item lg={3} md={4} sm={6} xs={12}>
							<div className="cha_box">
								<Link className="link" to={`/challenge/info/${c.challenge_id}`}>
									<Box className="cha_inner">
										<div className="inner_text">
											{c.name}
										</div>
										<div className="wheel">
											{
												c.challenge_leader === user.user_id ?
													<Link className="link" to={`/challenge/manage/${c.challenge_id}`}>
														<img className="cha_manage" src="/image/바퀴black.png" alt="설정" />
													</Link>
													:
													<Link className="link" to={`/challenge/member/${c.challenge_id}`}>
														<img className="cha_manage" src="/image/바퀴black.png" alt="설정" />
													</Link>
											}
										</div>
									</Box>
								</Link>
							</div>
						</Grid>
					))}
					{index === 0 && (
						<Grid item lg={3} md={4} sm={6} xs={12}>
							<Link className="link" to="/challenge/make">
								<div className="cha_box">
									<Box className="cha_make">
										<div className="inner_text">
											+ Add a new challenge
										</div>
									</Box>
								</div>
							</Link>
						</Grid>
					)}
				</Grid>
				}
			</div>
		</div>
	);
}

export default ChallengeList;
